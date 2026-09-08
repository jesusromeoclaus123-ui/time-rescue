export const LEVELS = Object.freeze([
    {
        id: 1,
        name: 'Nivel 1',
        playerStart: { x: 100, y: 400 },
        exit: { x: 900, y: 400 },
        platforms: [
            { x: 512, y: 500, width: 1024, height: 50 }
        ],
        enemies: [
            { id: 1, x: 600, y: 400 }
        ],
        npcs: [
            { id: 1, x: 200, y: 400 },
            { id: 2, x: 350, y: 400 }
        ]
    },
    {
        id: 2,
        name: 'Nivel 2',
        playerStart: { x: 100, y: 400 },
        exit: { x: 900, y: 400 },
        platforms: [
            { x: 512, y: 500, width: 1024, height: 50 }
        ],
        enemies: [
            { id: 2, x: 700, y: 400 }
        ],
        npcs: [
            { id: 3, x: 200, y: 400 },
            { id: 4, x: 700, y: 400 }
        ]
    },
    {
        id: 3,
        name: 'Nivel 3',
        playerStart: { x: 100, y: 400 },
        exit: { x: 900, y: 400 },
        platforms: [
            { x: 512, y: 500, width: 1024, height: 50 }
        ],
        enemies: [
            { id: 3, x: 500, y: 400 }
        ],
        npcs: [
            { id: 5, x: 300, y: 400 }
        ]
    },
    {
        id: 4,
        name: 'Nivel 4',
        playerStart: { x: 100, y: 400 },
        exit: { x: 900, y: 400 },
        platforms: [
            { x: 512, y: 500, width: 1024, height: 50 }
        ],
        enemies: [
            { id: 4, x: 300, y: 400 },
            { id: 5, x: 800, y: 400 }
        ],
        npcs: [
            { id: 6, x: 400, y: 400 },
            { id: 7, x: 800, y: 400 }
        ]
    }
]);