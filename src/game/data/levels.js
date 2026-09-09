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
        playerStart: { x: 100, y: 600 },
        exit: { x: 900, y: 120 },
        platforms: [
            { x: 150, y: 650, width: 250, height: 40 },
            { x: 850, y: 650, width: 250, height: 40 },
            { x: 350, y: 560, width: 140, height: 28 },
            { x: 600, y: 500, width: 160, height: 28 },
            { x: 200, y: 440, width: 140, height: 28 },
            { x: 450, y: 380, width: 160, height: 28 },
            { x: 750, y: 420, width: 140, height: 28 },
            { x: 550, y: 300, width: 140, height: 28 },
            { x: 850, y: 260, width: 160, height: 28 },
            { x: 350, y: 240, width: 140, height: 28 },
            { x: 700, y: 180, width: 120, height: 28 }
        ],
        enemies: [
            { id: 6, x: 350, y: 530 },
            { id: 7, x: 750, y: 390 },
            { id: 8, x: 450, y: 350 },
            { id: 9, x: 850, y: 230 }
        ],
        npcs: [
            { id: 5, x: 600, y: 460 },
            { id: 6, x: 350, y: 200 }
        ]
    },
    {
        id: 4,
        name: 'Nivel 4',
        playerStart: { x: 500, y: 650 },
        exit: { x: 500, y: 60 },
        platforms: [
            { x: 500, y: 700, width: 180, height: 35 },
            { x: 350, y: 610, width: 130, height: 28 },
            { x: 650, y: 550, width: 130, height: 28 },
            { x: 200, y: 490, width: 140, height: 28 },
            { x: 500, y: 460, width: 130, height: 28 },
            { x: 800, y: 430, width: 130, height: 28 },
            { x: 350, y: 370, width: 140, height: 28 },
            { x: 650, y: 320, width: 130, height: 28 },
            { x: 500, y: 230, width: 140, height: 28 },
            { x: 300, y: 160, width: 130, height: 28 },
            { x: 700, y: 160, width: 130, height: 28 }
        ],
        enemies: [
            { id: 10, x: 350, y: 580 },
            { id: 11, x: 800, y: 400 },
            { id: 12, x: 350, y: 340 },
            { id: 13, x: 650, y: 290 },
            { id: 14, x: 500, y: 200 }
        ],
        npcs: [
            { id: 7, x: 200, y: 450 },
            { id: 8, x: 700, y: 120 }
        ]
    }
]);