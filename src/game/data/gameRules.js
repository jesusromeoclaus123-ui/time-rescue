export const GAME_RULES = Object.freeze({
    totalLevels: 4,
    initialLives: 3,
    levelDurationSeconds: 30,
    rescuedNpcPoints: 20,
    defeatedEnemyPoints: 30,
    unrescuedNpcPenalty: 10,
    completedLevelPoints: 50
});

export const createLevelAttempt = () => ({
    lives: GAME_RULES.initialLives,
    timeRemaining: GAME_RULES.levelDurationSeconds,
    levelScore: 0
});

export const createNewGameState = () => ({
    levelIndex: 0,
    confirmedScore: 0,
    ...createLevelAttempt()
});

export const resolveDamage = (gameState) => {
    const lives = gameState.lives - 1;

    if (lives > 0)
    {
        return {
            action: 'respawn',
            gameState: {
                ...gameState,
                lives
            }
        };
    }

    return {
        action: 'restart-level',
        gameState: {
            ...gameState,
            ...createLevelAttempt()
        }
    };
};

export const calculateCompletedLevelScore = (levelScore, unrescuedNpcCount) => {
    return levelScore + GAME_RULES.completedLevelPoints -
        (unrescuedNpcCount * GAME_RULES.unrescuedNpcPenalty);
};
