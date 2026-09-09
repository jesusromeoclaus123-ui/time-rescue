import { Scene } from 'phaser';

export class TutorialScene extends Scene
{
    constructor ()
    {
        super('Tutorial');
    }

    create ()
    {
        const returnTo = this.registry.get('tutorialFrom') || 'MainMenu';

        this.add.rectangle(512, 384, 1024, 768, 0x10243a, 0.95);

        this.add.text(512, 60, 'TUTORIAL', {
            fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6
        }).setOrigin(0.5);

        const sections = [
            { title: 'MOVIMIENTO',       text: 'Flechas ← →  o  A / D' },
            { title: 'SALTAR',           text: 'ESPACIO  (doble salto disponible)' },
            { title: 'RESCATAR NPC',     text: 'Tecla F cuando estés cerca de un NPC' },
            { title: 'OBJETIVO',         text: 'Rescatá los NPCs, derrotá enemigos\ny llegá a la meta antes de que\nse acabe el tiempo (30 seg)' },
            { title: 'PUNTUACIÓN',       text: '+20 NPC rescatado  |  +30 enemigo derrotado\n+50 completar nivel  |  -10 NPC no rescatado' }
        ];

        let yPos = 130;
        sections.forEach(section => {
            this.add.text(120, yPos, section.title, {
                fontFamily: 'Arial Black', fontSize: 20, color: '#ffd700'
            });

            this.add.text(120, yPos + 28, section.text, {
                fontFamily: 'Arial', fontSize: 18, color: '#ffffff',
                lineSpacing: 4
            });

            yPos += (section.text.split('\n').length > 1 ? 100 : 70);
        });

        const backText = this.add.text(512, 700, 'Volver', {
            fontFamily: 'Arial', fontSize: 26, color: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 20, y: 12 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        backText.on('pointerover', () => backText.setStyle({ backgroundColor: '#555555' }));
        backText.on('pointerout', () => backText.setStyle({ backgroundColor: '#333333' }));
        backText.on('pointerdown', () => {
            this.goBack(returnTo);
        });

        this.escKey = this.input.keyboard.addKey(27);
        this.escJustReleased = true;

        this.returnTo = returnTo;
    }

    goBack (returnTo)
    {
        if (returnTo === 'Pause') {
            this.scene.start('Pause');
        } else {
            this.scene.start('MainMenu');
        }
    }

    update ()
    {
        if (this.escKey.isDown && this.escJustReleased) {
            this.escJustReleased = false;
            this.goBack(this.returnTo);
        }

        if (!this.escKey.isDown) {
            this.escJustReleased = true;
        }
    }
}