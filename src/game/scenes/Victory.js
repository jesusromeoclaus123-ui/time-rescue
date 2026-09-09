import { Scene } from 'phaser';

export class Victory extends Scene
{
    constructor ()
    {
        super('Victory');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x004400);

        const gameState = this.registry.get('finalGameState') || { confirmedScore: 0 };

        this.add.text(512, 200, '¡VICTORIA!', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 300, '¡Has completado los 4 niveles!', {
            fontFamily: 'Arial', fontSize: 32, color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 380, 'Score Final: ' + (gameState.confirmedScore || 0), {
            fontFamily: 'Arial', fontSize: 28, color: '#ffd700',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 480, 'Presiona SPACE para volver al menú', {
            fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.spaceKey = this.input.keyboard.addKey(32);
        this.spaceJustPressed = false;
    }

    update ()
    {
        if (this.spaceKey.isDown && !this.spaceJustPressed) {
            this.spaceJustPressed = true;
            this.scene.start('MainMenu');
        }

        if (!this.spaceKey.isDown) {
            this.spaceJustPressed = false;
        }
    }
}