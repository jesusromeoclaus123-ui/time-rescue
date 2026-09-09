import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    preload ()
    {
        this.load.image('protagonista', 'assets/protagonista.png');
        this.load.image('npc1', 'assets/NPC1.png');
        this.load.image('npc2', 'assets/NPC2.png');
        this.load.image('plataforma', 'assets/plataforma.png');
        this.load.image('meta', 'assets/meta.png');
        this.load.image('enemigo', 'assets/enemigo.png');
        this.load.image('fondo', 'assets/fondo.jpg');
    }

    create ()
    {
        this.scene.start('MainMenu');
    }
}
