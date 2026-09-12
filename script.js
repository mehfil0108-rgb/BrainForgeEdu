// ==========================================================================
// BRAINFORGE AI FETCH PROXY INTERCEPTOR
// ==========================================================================
const originalFetch = window.fetch;

window.fetch = async function (url, options) {
    if (url.includes("/api/generate") || url.includes("ai-generator") || url.includes("/questions")) {
        console.log("🚀 BrainForge Proxy: Intercepting AI request to bring UI to life...");

        let grade = "1";
        let subject = "maths";
        let topic = "General Challenge";

        try {
            if (options && options.body) {
                const data = JSON.parse(options.body);
                grade = data.grade || grade;
                subject = data.subject || subject;
                topic = data.topic || topic;
            }
        } catch (e) {
            console.warn("Proxy couldn't parse request body, using default parameters.");
        }

        let generatedQuestions = [];
        if (typeof generateQuestionsOnDemand === "function") {
            generatedQuestions = generateQuestionsOnDemand(grade, subject, topic);
        } else {
            generatedQuestions = Array.from({ length: 5 }, (_, i) => ({
                questionText: `[Grade ${grade} ${subject}] Sample question ${i + 1} for topic: ${topic}`,
                answers: ["Correct Answer", "Wrong Choice A", "Wrong Choice B", "Wrong Choice C"],
                correctIdx: 0
            }));
        }

        return new Response(JSON.stringify({
            success: true,
            topic: topic,
            questions: getUniqueQuizQuestions(generatedQuestions, 5)
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return originalFetch.apply(this, arguments);
};

// ============================================================
// ONBOARDING & UI TRANSITION HELPERS
// ============================================================
function transitionToStep2() {
    const step1 = document.getElementById("welcomeStep1");
    const step2 = document.getElementById("welcomeStep2");
    if (step1 && step2) {
        step1.style.opacity = "0";
        step1.style.transform = "translateX(-30px)";
        setTimeout(() => {
            step1.style.display = "none";
            step2.style.display = "flex";
            setTimeout(() => {
                step2.style.opacity = "1";
                step2.style.transform = "translateX(0)";
            }, 50);
        }, 300);
    }
}

function selectGradeBadge(element, gradeNum) {
    document.querySelectorAll('.grade-pill-btn').forEach(btn => {
        btn.classList.remove('active-grade-selection');
        btn.style.background = '#fafbfc';
        btn.style.color = '#70798c';
        btn.style.borderColor = '#e5e7ef';
    });

    document.querySelectorAll('.grade-pill-btn').forEach(btn => {
        if (btn.getAttribute('data-grade') === gradeNum) {
            btn.classList.add('active-grade-selection');
            btn.style.background = '#5b4bdb';
            btn.style.color = '#ffffff';
            btn.style.borderColor = '#5b4bdb';
        }
    });

    const hiddenGradeInput = document.getElementById("studentGradeSelect");
    if (hiddenGradeInput) {
        hiddenGradeInput.value = gradeNum;
    }
    localStorage.setItem("studentGrade", gradeNum);
    localStorage.setItem("brainforgeGrade", gradeNum);
}

function handleOnboardingSubmit(event) {
    if (event) event.preventDefault();
    const nameInput = document.getElementById("studentNameInput");
    const enteredName = nameInput ? nameInput.value.trim() : "Student";
    
    if (enteredName) {
        localStorage.setItem("studentName", enteredName);
        localStorage.setItem("brainforgeUser", enteredName);
    }
    
    const gradeVal = localStorage.getItem("studentGrade") || "1";
    localStorage.setItem("studentGrade", gradeVal);
    localStorage.setItem("brainforgeGrade", gradeVal);
    
    // Ensure new signups initialize clean starting progress values
    if (!localStorage.getItem("studentXP")) localStorage.setItem("studentXP", "0");
    if (!localStorage.getItem("studentLevel")) localStorage.setItem("studentLevel", "1");
    if (!localStorage.getItem("studentMaxXP")) localStorage.setItem("studentMaxXP", "100");
    
    const overlay = document.getElementById("welcomeScreenOverlay");
    if (overlay) overlay.style.display = "none";
    location.reload();
}

function startMission() {
    window.location.href = "mission.html";
}

function closeTopics() {
    const topicsSec = document.getElementById("topicsSection");
    if (topicsSec) topicsSec.style.display = "none";
}

function confirmUserLogout(e) {
    if (e) e.preventDefault();
    if (confirm("Are you sure you want to log out?")) { 
        localStorage.clear(); 
        window.location.href = "index.html"; 
    }
}

// ============================================================
// BRAINFORGE MASTER ENGINE - SESSIONS & LEVELS
// ============================================================
function checkUserSessionState() {
    const activeUser = localStorage.getItem("brainforgeUser") || localStorage.getItem("studentName");
    const welcomeOverlay = document.getElementById("welcomeScreenOverlay");

    if (welcomeOverlay) {
        welcomeOverlay.style.display = activeUser ? "none" : "flex";
    }
}
document.addEventListener("DOMContentLoaded", checkUserSessionState);

const levels = [
    { level: 1, name: "Brain Rookie", xp: 0 },
    { level: 2, name: "Mind Starter", xp: 100 },
    { level: 3, name: "Quick Thinker", xp: 250 },
    { level: 4, name: "Knowledge Seeker", xp: 500 },
    { level: 5, name: "Smart Solver", xp: 850 },
    { level: 6, name: "Brain Builder", xp: 1300 },
    { level: 7, name: "Idea Explorer", xp: 1900 },
    { level: 8, name: "Focus Fanatic", xp: 2650 },
    { level: 9, name: "Sharp Mind", xp: 3550 },
    { level: 10, name: "Cognitive Cadet", xp: 4600 },
    { level: 11, name: "Logic Learner", xp: 5800 },
    { level: 12, name: "Concept Master", xp: 7150 },
    { level: 13, name: "Problem Crusher", xp: 8650 },
    { level: 14, name: "Insight Scholar", xp: 10300 },
    { level: 15, name: "Brain Adept", xp: 12100 },
    { level: 16, name: "Intellect Expert", xp: 14050 },
    { level: 17, name: "Memory Wizard", xp: 16150 },
    { level: 18, name: "Master Analyst", xp: 18400 },
    { level: 19, name: "Wisdom Wanderer", xp: 20800 },
    { level: 20, name: "Prodigy", xp: 23350 },
    { level: 21, name: "Genius in Training", xp: 26050 },
    { level: 22, name: "Strategic Thinker", xp: 28900 },
    { level: 23, name: "Cognitive Titan", xp: 31900 },
    { level: 24, name: "Mastermind", xp: 35050 },
    { level: 25, name: "Elite Scholar", xp: 38350 },
    { level: 26, name: "Grand Thinker", xp: 41800 },
    { level: 27, name: "Sage of Science", xp: 45400 },
    { level: 28, name: "Transcendent Mind", xp: 49150 },
    { level: 29, name: "Legendary Scholar", xp: 53050 },
    { level: 30, name: "BrainForge Apex", xp: 57100 },
    { level: 31, name: "Synapse Spark", xp: 61300 },
    { level: 32, name: "Neuron Novice", xp: 65650 },
    { level: 33, name: "Cortex Climber", xp: 70150 },
    { level: 34, name: "Alpha Analyst", xp: 74800 },
    { level: 35, name: "Beta Brain", xp: 79600 },
    { level: 36, name: "Gamma Genius", xp: 84550 },
    { level: 37, name: "Delta Director", xp: 89650 },
    { level: 38, name: "Omega Oracle", xp: 94900 },
    { level: 39, name: "Infinite Intellect", xp: 100300 },
    { level: 40, name: "Dimension Thinker", xp: 105850 },
    { level: 41, name: "Quantum Pioneer", xp: 111550 },
    { level: 42, name: "Atomic Architect", xp: 117400 },
    { level: 43, name: "Molecular Master", xp: 123400 },
    { level: 44, name: "Cellular Savant", xp: 129550 },
    { level: 45, name: "Bio Prodigy", xp: 135850 },
    { level: 46, name: "Neural Knight", xp: 142300 },
    { level: 47, name: "Data Lord", xp: 148900 },
    { level: 48, name: "Cyber Sage", xp: 155650 },
    { level: 49, name: "Matrix Monarch", xp: 162550 },
    { level: 50, name: "Halfway Hero", xp: 169600 },
    { level: 51, name: "Vector Voyager", xp: 176800 },
    { level: 52, name: "Matrix Master", xp: 184150 },
    { level: 53, name: "Algorithm Ace", xp: 191650 },
    { level: 54, name: "Binary Boss", xp: 199300 },
    { level: 55, name: "Logic Legend", xp: 207100 },
    { level: 56, name: "System Supreme", xp: 215050 },
    { level: 57, name: "Core Commander", xp: 223150 },
    { level: 58, name: "Root Ruler", xp: 231400 },
    { level: 59, name: "Kernel King", xp: 239800 },
    { level: 60, name: "Network Nomad", xp: 248350 },
    { level: 61, name: "Ether Expert", xp: 257050 },
    { level: 62, name: "Cloud Captain", xp: 265900 },
    { level: 63, name: "Server Sovereign", xp: 274900 },
    { level: 64, name: "Packet Prince", xp: 284050 },
    { level: 65, name: "Protocol Priest", xp: 293350 },
    { level: 66, name: "Firewall Founder", xp: 302800 },
    { level: 67, name: "Cipher Chief", xp: 312400 },
    { level: 68, name: "Enigma Emperor", xp: 322150 },
    { level: 69, name: "Paradox Phantom", xp: 332050 },
    { level: 70, name: "Vortex Visionary", xp: 342100 },
    { level: 71, name: "Nebula Nomad", xp: 352300 },
    { level: 72, name: "Galaxy Guru", xp: 362650 },
    { level: 73, name: "Cosmic Conqueror", xp: 373150 },
    { level: 74, name: "Astral Architect", xp: 383800 },
    { level: 75, name: "Stellar Scholar", xp: 394600 },
    { level: 76, name: "Supernova Sage", xp: 405550 },
    { level: 77, name: "Quasar Quencher", xp: 416650 },
    { level: 78, name: "Pulsar Prince", xp: 427900 },
    { level: 79, name: "Blackhole Baron", xp: 439300 },
    { level: 80, name: "Singularity Sovereign", xp: 450850 },
    { level: 81, name: "Eternity Explorer", xp: 462550 },
    { level: 82, name: "Infinity Icon", xp: 474400 },
    { level: 83, name: "Timeless Titan", xp: 486400 },
    { level: 84, name: "Aion Adept", xp: 498550 },
    { level: 85, name: "Epoch Expert", xp: 510850 },
    { level: 86, name: "Chronos Chief", xp: 523300 },
    { level: 87, name: "Dimension Duke", xp: 535900 },
    { level: 88, name: "Realm Ruler", xp: 548650 },
    { level: 89, name: "Universe Usher", xp: 561550 },
    { level: 90, name: "Omni Overlord", xp: 574600 },
    { level: 91, name: "Zenith Zealot", xp: 587800 },
    { level: 92, name: "Apex Archon", xp: 601150 },
    { level: 93, name: "Summit Sage", xp: 614650 },
    { level: 94, name: "Pinnacle Phantom", xp: 628300 },
    { level: 95, name: "Ultimate Unit", xp: 642100 },
    { level: 96, name: "Absolute Authority", xp: 656050 },
    { level: 97, name: "Prime Protector", xp: 670150 },
    { level: 98, name: "Supreme Sovereign", xp: 684400 },
    { level: 99, name: "Transcendent Titan", xp: 698800 },
    { level: 100, name: "BrainForge Legend", xp: 713350 },
    { level: 101, name: "ADMIN", xp: 100000000 }
];

document.addEventListener("DOMContentLoaded", () => {
    // Fixed: Properly look up studentXP/userXP and default cleanly to 0 instead of 1
    let storedXP = localStorage.getItem("studentXP") !== null ? localStorage.getItem("studentXP") : localStorage.getItem("userXP");
    const currentXP = parseInt(storedXP) || 0;
    
    // Find the correct level object from your levels array based on current XP
    let currentLevelObj = levels[0];
    let nextLevelObj = levels[1];

    for (let i = 0; i < levels.length; i++) {
        if (currentXP >= levels[i].xp) {
            currentLevelObj = levels[i];
            nextLevelObj = levels[i + 1] || null; // null if max level (101)
        }
    }

    // Save the active level number
    localStorage.setItem("studentLevel", currentLevelObj.level);

    // 1. Update Level Number Box (e.g. "1")
    const levelNumberEl = document.getElementById("levelNumber");
    if (levelNumberEl) {
        levelNumberEl.innerText = currentLevelObj.level;
    }

    // 2. Update Title (e.g. "Brain Rookie")
    const levelTitleEl = document.getElementById("levelTitle");
    if (levelTitleEl) {
        levelTitleEl.innerText = currentLevelObj.name;
    }

    // 3. Update Subtitle text
    const nextLevelTextEl = document.getElementById("nextLevelText");
    if (nextLevelTextEl) {
        if (nextLevelObj) {
            nextLevelTextEl.innerText = `Keep learning to unlock Level ${nextLevelObj.level} (${nextLevelObj.name}).`;
        } else {
            nextLevelTextEl.innerText = `Maximum Rank Achieved!`;
        }
    }

    // 4. Update XP Progress Text
    const xpTextEl = document.getElementById("xpText") || document.getElementById("progXpText");
    if (xpTextEl) {
        if (nextLevelObj) {
            xpTextEl.innerText = `${currentXP} / ${nextLevelObj.xp} XP`;
        } else {
            xpTextEl.innerText = `${currentXP} XP (MAX)`;
        }
    }

    // 5. Update Progress Bar Fill Width
    const xpBarEl = document.getElementById("xpBar");
    if (xpBarEl) {
        if (nextLevelObj) {
            let prevXP = currentLevelObj.xp;
            let requiredXP = nextLevelObj.xp - prevXP;
            let earnedXP = currentXP - prevXP;
            let percentage = Math.min(Math.max((earnedXP / requiredXP) * 100, 0), 100);
            xpBarEl.style.width = `${percentage}%`;
        } else {
            xpBarEl.style.width = "100%";
        }
    }
});

function updateXPProgress() {
    let currentXP = parseInt(localStorage.getItem("studentXP")) || 0;
    let maxXP = parseInt(localStorage.getItem("studentMaxXP")) || 100;
    let currentLevel = parseInt(localStorage.getItem("studentLevel")) || 1;

    let percentage = Math.min(Math.max((currentXP / maxXP) * 100, 0), 100);

    const xpBar = document.getElementById("xpBar") || document.getElementById("progXpBar") || document.getElementById("overviewXpBar");
    if (xpBar) {
        xpBar.style.width = percentage + "%";
    }

    const levelNumberEl = document.getElementById("levelNumber");
    if (levelNumberEl) {
        levelNumberEl.innerText = currentLevel;
    }

    const xpTextEl = document.getElementById("xpText") || document.getElementById("progXpText") || document.getElementById("overviewXpText");
    if (xpTextEl) {
        xpTextEl.innerText = `${currentXP} / ${maxXP} XP`;
    }
    
    const totalXpEl = document.getElementById("totalXpDisplay") || document.getElementById("totalXP") || document.getElementById("xp");
    if (totalXpEl) {
        totalXpEl.innerText = currentXP;
    }
}

window.addEventListener("DOMContentLoaded", updateXPProgress);

let xp = Number(localStorage.getItem("brainforgeXP")) || 0;
let coins = Number(localStorage.getItem("brainforgeCoins")) || 0;

function getCurrentLevel() {
    let current = levels[0]; 
    for (const level of levels) {
        if (xp >= level.xp) current = level;
    }
    return current;
}

// Mouse Spotlight Follower
document.addEventListener("DOMContentLoaded", () => {
    const spotlight = document.getElementById("mouseGlowFollower");
    if (!spotlight) return;
    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX; 
        mouseY = e.clientY;
        spotlight.style.opacity = "1";
    });

    document.addEventListener("mouseleave", () => { 
        spotlight.style.opacity = "0"; 
    });

    function animateSpotlight() {
        currentX += (mouseX - currentX) * 0.12;
        currentY += (mouseY - currentY) * 0.12;
        spotlight.style.left = currentX + "px";
        spotlight.style.top = currentY + "px";
        requestAnimationFrame(animateSpotlight);
    }
    animateSpotlight();
});

function openSubjectGrades(subjectKey, subjectName) {
    const panel = document.getElementById("gradesGeneratorPanel");
    const title = document.getElementById("panelSubjectTitle");
    const gradesList = document.getElementById("gradesContentList");
    if (!panel) return;

    title.innerText = `${subjectName} — Performance`;
    const mockGrades = {
        'math': [{ topic: 'Algebra Basics', grade: '95% (A)' }, { topic: 'Fractions', grade: '88% (B+)' }],
        'science': [{ topic: 'Cell Biology', grade: '90% (A-)' }, { topic: 'Forces', grade: '85% (B)' }],
        'english': [{ topic: 'Comprehension', grade: '91% (A-)' }, { topic: 'Grammar', grade: '89% (B+)' }]
    };

    gradesList.innerHTML = '';
    (mockGrades[subjectKey] || []).forEach(item => {
        const row = document.createElement('div');
        row.style.cssText = "display: flex; justify-content: space-between; background: white; padding: 10px 14px; border-radius: 8px; border: 1px solid #e2e8f0; font-weight: 600;";
        row.innerHTML = `<span>${item.topic}</span> <span style="color: #5b4bdb;">${item.grade}</span>`;
        gradesList.appendChild(row);
    });

    localStorage.setItem("activeSubject", subjectKey);
    panel.style.display = "block";
    
    setTimeout(() => {
        panel.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 50);
}

const gradeButtons = document.querySelectorAll('.grade-btn');
gradeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        gradeButtons.forEach(btn => btn.classList.remove('active', 'selected'));
        this.classList.add('active', 'selected');
        const selectedGrade = this.getAttribute('data-grade') || this.textContent.trim();
        localStorage.setItem('selectedGrade', selectedGrade);
    });
});

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function getUniqueQuizQuestions(fullQuestionBank, requestedCount) {
    let shuffled = shuffleArray([...fullQuestionBank]);
    return shuffled.slice(0, requestedCount);
}

function addXP(amount) {
    let currentXP = parseInt(localStorage.getItem("studentXP")) || 0;
    let maxXP = parseInt(localStorage.getItem("studentMaxXP")) || 100;
    let currentLevel = parseInt(localStorage.getItem("studentLevel")) || 1;

    currentXP += amount;

    if (currentXP >= maxXP) {
        currentXP -= maxXP;
        currentLevel += 1;
        maxXP += 50;
        
        localStorage.setItem("studentLevel", currentLevel);
        localStorage.setItem("studentMaxXP", maxXP);
    }

    localStorage.setItem("studentXP", currentXP);

    if (typeof updateXPProgress === "function") {
        updateXPProgress();
    }
}

function openLogoutModal(event) {
    if (event) event.preventDefault();
    const modal = document.getElementById("logoutModal");
    const card = document.getElementById("logoutModalCard");
    if (modal) {
        modal.style.display = "flex";
        setTimeout(() => {
            modal.style.opacity = "1";
            if (card) card.style.transform = "scale(1)";
        }, 10);
    }
}

function closeLogoutModal() {
    const modal = document.getElementById("logoutModal");
    const card = document.getElementById("logoutModalCard");
    if (modal) {
        modal.style.opacity = "0";
        if (card) card.style.transform = "scale(0.95)";
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }
}

function confirmLogout() {
    window.location.href = "login.html";
}