import { createLevelAttempt, createNewGameState } from './gameRules.js';

export const createLevelEntityState = () => ({
    rescuedNpcIds: [],
    defeatedEnemyIds: []
});

export const createInitialGameState = () => ({
    ...createNewGameState(),
    levelEntities: createLevelEntityState()
});

let gameState = createInitialGameState();

const cloneGameState = (state) => ({
    ...state,
    levelEntities: {
        rescuedNpcIds: [...state.levelEntities.rescuedNpcIds],
        defeatedEnemyIds: [...state.levelEntities.defeatedEnemyIds]
    }
});

export const getGameState = () => cloneGameState(gameState);

export const updateGameState = (changes) => {
    gameState = {
        ...gameState,
        ...changes,
        levelEntities: changes.levelEntities ? {
            ...gameState.levelEntities,
            ...changes.levelEntities,
            rescuedNpcIds: changes.levelEntities.rescuedNpcIds ?
                [...changes.levelEntities.rescuedNpcIds] : gameState.levelEntities.rescuedNpcIds,
            defeatedEnemyIds: changes.levelEntities.defeatedEnemyIds ?
                [...changes.levelEntities.defeatedEnemyIds] : gameState.levelEntities.defeatedEnemyIds
        } : gameState.levelEntities
    };

    return getGameState();
};

export const startNewGame = () => {
    gameState = createInitialGameState();

    return getGameState();
};

export const restartLevelAttempt = () => {
    gameState = {
        ...gameState,
        ...createLevelAttempt(),
        levelEntities: createLevelEntityState()
    };

    return getGameState();
};
