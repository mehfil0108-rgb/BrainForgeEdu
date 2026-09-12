// ============================================
// BRAINFORGE - COMPLETE HARDCODED ACHIEVEMENTS SYNC ENGINE
// ============================================

document.addEventListener("DOMContentLoaded", function () {
    // 1. Fetch user progress metrics from localStorage
    const currentXp = Number(localStorage.getItem("brainforgeXP")) || 0;
    const currentCoins = Number(localStorage.getItem("brainforgeCoins")) || 0;
    
    let currentLevel = 1;
    if (typeof window.getCurrentLevel === "function") {
        currentLevel = window.getCurrentLevel().level;
    } else {
        currentLevel = Number(localStorage.getItem("brainforgeLevel")) || 1;
    }

    let unlockedCount = 0;

    // Helper function to unlock a card element by ID
    function evaluateBadge(elementId, isUnlocked) {
        const card = document.getElementById(elementId);
        if (card) {
            if (isUnlocked) {
                card.classList.remove("locked");
                const statusEl = card.querySelector(".badge-status");
                if (statusEl) {
                    statusEl.textContent = "🔓 COMPLETED";
                    statusEl.style.color = "#20a36a";
                }
                unlockedCount++;
            }
        }
    }

    // 2. Evaluate Milestone Tier Badges (Levels 1 to 20)
    for (let i = 1; i <= 20; i++) {
        evaluateBadge(`badge-level-${i}`, currentLevel >= i);
    }

    // 3. Evaluate XP Overlord Badges (Tiers 1 to 20)
    const xpStep = 2500;
    const xpBase = 1000;
    for (let i = 1; i <= 20; i++) {
        const targetXP = xpBase + ((i - 1) * xpStep);
        evaluateBadge(`badge-xp-${i}`, currentXp >= targetXP);
    }

    // 4. Evaluate Gold Hoarder Badges (Tiers 1 to 20)
    const coinStep = 1000;
    const coinBase = 500;
    for (let i = 1; i <= 20; i++) {
        const targetCoins = coinBase + ((i - 1) * coinStep);
        evaluateBadge(`badge-coins-${i}`, currentCoins >= targetCoins);
    }

    // 5. Evaluate Subject Badges (Math, Science, History, Geography - 10 tiers each)
    // Assuming subject completions are tracked via localStorage (e.g., "brainforge_math_tier")
    const mathTier = Number(localStorage.getItem("brainforge_math_tier")) || currentLevel;
    for (let i = 1; i <= 10; i++) {
        evaluateBadge(`badge-math-${i}`, mathTier >= i);
    }

    const scienceTier = Number(localStorage.getItem("brainforge_science_tier")) || currentLevel;
    for (let i = 1; i <= 10; i++) {
        evaluateBadge(`badge-science-${i}`, scienceTier >= i);
    }

    const historyTier = Number(localStorage.getItem("brainforge_history_tier")) || currentLevel;
    for (let i = 1; i <= 10; i++) {
        evaluateBadge(`badge-history-${i}`, historyTier >= i);
    }

    const geoTier = Number(localStorage.getItem("brainforge_geo_tier")) || currentLevel;
    for (let i = 1; i <= 10; i++) {
        evaluateBadge(`badge-geography-${i}`, geoTier >= i);
    }

    // 6. Update the top counter display dynamically
    const counterEl = document.getElementById("unlockedCount");
    if (counterEl) {
        counterEl.textContent = unlockedCount;
    }
});