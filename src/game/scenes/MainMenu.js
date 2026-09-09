import { Scene } from 'phaser';
import { startNewGame } from '../data/gameState.js';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x10243a);

        this.add.text(512, 280, 'Time Rescue', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 400, 'Press SPACE to start', {
            fontFamily: 'Arial', fontSize: 28, color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        const tutorialText = this.add.text(512, 480, 'Tutorial', {
            fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        tutorialText.on('pointerover', () => tutorialText.setStyle({ backgroundColor: '#555555' }));
        tutorialText.on('pointerout', () => tutorialText.setStyle({ backgroundColor: '#333333' }));
        tutorialText.on('pointerdown', () => {
            this.registry.set('tutorialFrom', 'MainMenu');
            this.scene.start('Tutorial');
        });

        this.spaceKey = this.input.keyboard.addKey(32);
        this.spaceJustPressed = false;
    }

    update ()
    {
        if (this.spaceKey.isDown && !this.spaceJustPressed) {
            this.spaceJustPressed = true;
            startNewGame();
            this.scene.start('Game');
        }

        if (!this.spaceKey.isDown) {
            this.spaceJustPressed = false;
        }
    }
}
