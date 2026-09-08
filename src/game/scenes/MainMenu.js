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

        this.add.text(512, 320, 'Time Rescue', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 470, 'Press SPACE to start', {
            fontFamily: 'Arial', fontSize: 28, color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            startNewGame();
            this.scene.start('Game');
        });
    }
}
