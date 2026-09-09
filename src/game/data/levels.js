export const LEVELS = Object.freeze([
    {
        id: 1,
        name: 'Nivel 1',
        playerStart: { x: 100, y: 400 },
        exit: { x: 900, y: 400 },
        platforms: [
            { x: 512, y: 550, width: 1024, height: 50 },
            { x: 200, y: 450, width: 200, height: 30 },
            { x: 400, y: 380, width: 150, height: 30 },
            { x: 650, y: 380, width: 150, height: 30 },
            { x: 850, y: 420, width: 200, height: 30 }
        ],
        enemies: [
            { id: 1, x: 550, y: 420 },
            { id: 2, x: 750, y: 300 }
        ],
        npcs: [
            { id: 1, x: 200, y: 400 },
            { id: 2, x: 400, y: 330 }
        ]
    },
    {
        id: 2,
        name: 'Nivel 2',
        playerStart: { x: 100, y: 480 },
        exit: { x: 900, y: 200 },
        platforms: [
            { x: 512, y: 550, width: 1024, height: 50 },
            { x: 150, y: 450, width: 180, height: 30 },
            { x: 350, y: 380, width: 180, height: 30 },
            { x: 550, y: 300, width: 180, height: 30 },
            { x: 750, y: 250, width: 180, height: 30 },
            { x: 900, y: 180, width: 200, height: 30 }
        ],
        enemies: [
            { id: 3, x: 200, y: 370 },
            { id: 4, x: 420, y: 300 },
            { id: 5, x: 620, y: 220 }
        ],
        npcs: [
            { id: 3, x: 150, y: 400 },
            { id: 4, x: 550, y: 250 }
        ]
    },
    {
        id: 3,
        name: 'Nivel 3',
        playerStart: { x: 100, y: 480 },
        exit: { x: 900, y: 150 },
        platforms: [
            { x: 512, y: 550, width: 1024, height: 50 },
            { x: 180, y: 480, width: 160, height: 30 },
            { x: 380, y: 400, width: 160, height: 30 },
            { x: 580, y: 320, width: 160, height: 30 },
            { x: 780, y: 240, width: 160, height: 30 },
            { x: 950, y: 160, width: 160, height: 30 },
            { x: 400, y: 500, width: 120, height: 30 },
            { x: 600, y: 420, width: 120, height: 30 },
            { x: 800, y: 340, width: 120, height: 30 }
        ],
        enemies: [
            { id: 6, x: 220, y: 400 },
            { id: 7, x: 420, y: 320 },
            { id: 8, x: 620, y: 240 },
            { id: 9, x: 820, y: 160 }
        ],
        npcs: [
            { id: 5, x: 380, y: 350 },
            { id: 6, x: 780, y: 190 }
        ]
    },
    {
        id: 4,
        name: 'Nivel 4',
        playerStart: { x: 100, y: 480 },
        exit: { x: 900, y: 120 },
        platforms: [
            { x: 512, y: 550, width: 1024, height: 50 },
            { x: 150, y: 470, width: 180, height: 30 },
            { x: 350, y: 400, width: 180, height: 30 },
            { x: 550, y: 330, width: 180, height: 30 },
            { x: 750, y: 260, width: 180, height: 30 },
            { x: 900, y: 190, width: 180, height: 30 },
            { x: 200, y: 320, width: 120, height: 30 },
            { x: 400, y: 250, width: 120, height: 30 },
            { x: 600, y: 180, width: 120, height: 30 },
            { x: 800, y: 110, width: 120, height: 30 }
        ],
        enemies: [
            { id: 10, x: 200, y: 390 },
            { id: 11, x: 400, y: 320 },
            { id: 12, x: 600, y: 250 },
            { id: 13, x: 800, y: 180 },
            { id: 14, x: 500, y: 420 }
        ],
        npcs: [
            { id: 7, x: 350, y: 350 },
            { id: 8, x: 750, y: 210 }
        ]
    }
]);