import { Scene } from 'phaser';
import { restartLevelAttempt } from '../data/gameState.js';

export class PauseScene extends Scene
{
    constructor ()
    {
        super('Pause');
    }

    create ()
    {
        this.add.rectangle(512, 384, 1024, 768, 0x000000, 0.7);

        this.add.text(512, 160, 'PAUSA', {
            fontFamily: 'Arial Black', fontSize: 56, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6
        }).setOrigin(0.5);

        const buttonStyle = {
            fontFamily: 'Arial', fontSize: 26, color: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 20, y: 12 },
            align: 'center'
        };

        const buttons = [
            { text: 'Reanudar',        y: 280, callback: () => this.resumeGame() },
            { text: 'Reiniciar Nivel',  y: 360, callback: () => this.restartLevel() },
            { text: 'Tutorial',         y: 440, callback: () => this.showTutorial() },
            { text: 'Menú Principal',   y: 520, callback: () => this.goToMainMenu() }
        ];

        buttons.forEach(btn => {
            const text = this.add.text(512, btn.y, btn.text, buttonStyle)
                .setOrigin(0.5)
                .setInteractive({ useHandCursor: true });

            text.on('pointerover', () => {
                text.setStyle({ backgroundColor: '#555555' });
            });

            text.on('pointerout', () => {
                text.setStyle({ backgroundColor: '#333333' });
            });

            text.on('pointerdown', btn.callback);
        });

        this.escKey = this.input.keyboard.addKey(27);
        this.escJustReleased = true;
    }

    update ()
    {
        if (this.escKey.isDown && this.escJustReleased) {
            this.escJustReleased = false;
            this.resumeGame();
        }

        if (!this.escKey.isDown) {
            this.escJustReleased = true;
        }
    }

    resumeGame ()
    {
        this.scene.stop('Pause');
        this.scene.resume('Game');
    }

    restartLevel ()
    {
        this.scene.stop('Pause');
        restartLevelAttempt();
        this.scene.stop('Game');
        this.scene.start('Game');
    }

    goToMainMenu ()
    {
        this.scene.stop('Pause');
        this.scene.stop('Game');
        this.scene.start('MainMenu');
    }

    showTutorial ()
    {
        this.registry.set('tutorialFrom', 'Pause');
        this.scene.start('Tutorial');
    }
}
