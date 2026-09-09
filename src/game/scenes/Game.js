import { Scene } from 'phaser';
import { LEVELS } from '../data/levels.js';
import { getGameState, updateGameState } from '../data/gameState.js';
import { resolveDamage } from '../data/gameRules.js';
import { restartLevelAttempt } from '../data/gameState.js';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
        this.jumpsUsed = 0;
        this.playerStart = null;
        this.npcs = [];
        this.enemies = [];
        this.groundSprites = [];
        this.playerBody = null;
    }

    create ()
    {
        const currentLevel = LEVELS[this.registry.get('currentLevelIndex') || 0];
        this.cameras.main.setBackgroundColor(0x00ff00);

        const { playerStart, exit, platforms } = currentLevel;

        this.playerStart = playerStart;

        this.player = this.add.rectangle(playerStart.x, playerStart.y, 30, 30, 0x0000ff);
        this.physics.world.enable(this.player);
        this.playerBody = this.player.body;
        
        if (this.playerBody) {
            this.playerBody.setCollideWorldBounds(true);
        }

        this.speed = 200;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(65);
        this.keyD = this.input.keyboard.addKey(68);
        this.spaceKey = this.input.keyboard.addKey(32);
        this.keyF = this.input.keyboard.addKey(70);

        this.groundSprites = [];
        platforms.forEach(plat => {
            const sprite = this.add.rectangle(plat.x, plat.y, plat.width, plat.height, 0x00ff00);
            this.physics.world.enable(sprite);
            if (sprite.body) {
                sprite.body.allowGravity = false;
                sprite.body.immovable = true;
            }
            this.groundSprites.push(sprite);
        });
        this.physics.add.collider(this.player, this.groundSprites, () => {
            this.canJump = true;
            this.canDoubleJump = false;
        });

        const levelNpcs = currentLevel.npcs;
        this.npcs = [];
        this.npcGraphics = [];

        levelNpcs.forEach(npcData => {
            const rescuedIds = getGameState().levelEntities.rescuedNpcIds;
            const alreadyRescued = rescuedIds.includes(npcData.id);

            const graphic = this.add.graphics();
            if (alreadyRescued) {
                graphic.fillStyle(0x888888, 1);
                graphic.fillRect(npcData.x - 15, npcData.y - 15, 30, 30);
            } else {
                graphic.fillStyle(0xffd700, 1);
                graphic.fillRect(npcData.x - 15, npcData.y - 15, 30, 30);
            }

            this.npcGraphics.push(graphic);

            this.npcs.push({
                id: npcData.id,
                x: npcData.x,
                y: npcData.y
            });
        });

        const levelEnemies = currentLevel.enemies;
        this.enemies = [];

        levelEnemies.forEach(enemyData => {
            const alreadyDefeated = getGameState().levelEntities.defeatedEnemyIds.includes(enemyData.id);

            const enemy = this.add.rectangle(enemyData.x, enemyData.y, 30, 30,
                alreadyDefeated ? 0x888888 : 0xff0000);
            enemy.defeated = alreadyDefeated;
            this.physics.world.enable(enemy);
            if (enemy.body) {
                enemy.body.setCollideWorldBounds(true);
            }

            this.enemies.push(enemy);
        });

        this.physics.add.collider(this.player, this.enemies, (player, enemy) => {
            this.handleEnemyCollision(enemy);
        });

        this.physics.add.collider(this.enemies, this.groundSprites);

        this.exit = this.add.rectangle(currentLevel.exit.x, currentLevel.exit.y, 40, 80, 0xffd700);
        this.physics.world.enable(this.exit);
        if (this.exit.body) {
            this.exit.body.allowGravity = false;
            this.exit.body.immovable = true;
        }
        this.physics.add.overlap(this.player, this.exit, () => {
            this.handleExitReached();
        });

        this.timerText = this.add.text(16, 16, '', {
            fontFamily: 'Arial', fontSize: 16, color: '#ffffff'
        });

        this.scoreText = this.add.text(16, 38, '', {
            fontFamily: 'Arial', fontSize: 16, color: '#ffffff'
        });

        this.livesText = this.add.text(this.cameras.main.width - 150, 16, '', {
            fontFamily: 'Arial', fontSize: 16, color: '#ffffff'
        });

        this.levelText = this.add.text(this.cameras.main.width - 150, 38, '', {
            fontFamily: 'Arial', fontSize: 16, color: '#ffffff'
        });

        this.spaceJustReleased = true;
        this.fJustReleased = true;
    }

    handleEnemyCollision (enemy)
    {
        const defeatedIds = getGameState().levelEntities.defeatedEnemyIds;
        if (defeatedIds.includes(enemy.id)) {
            return;
        }

        const isDefeat = this.playerBody.touching.down && this.playerBody.velocityY > 0 && enemy.body.touching.up;

        if (isDefeat) {
            this.defeatEnemy(enemy.id);
        } else {
            this.takeDamage();
        }
    }

    defeatEnemy (enemyId)
    {
        const currentState = getGameState();
        const defeatedIds = currentState.levelEntities.defeatedEnemyIds;
        defeatedIds.push(enemyId);
        
        updateGameState({
            levelEntities: {
                ...currentState.levelEntities,
                defeatedEnemyIds: defeatedIds
            },
            levelScore: (currentState.levelScore || 0) + 30
        });

        this.enemies.forEach(enemy => {
            if (enemy.id === enemyId) {
                this.time.delayedCall(0, () => {
                    if (enemy && enemy.active) {
                        enemy.visible = false;
                        if (enemy.body) {
                            enemy.body.enable = false;
                        }
                    }
                });
            }
        });
    }

    rescueNpc (npcId)
    {
        const currentState = getGameState();
        const rescuedIds = currentState.levelEntities.rescuedNpcIds;
        if (!rescuedIds.includes(npcId)) {
            rescuedIds.push(npcId);
            updateGameState({
                levelEntities: {
                    ...currentState.levelEntities,
                    rescuedNpcIds: rescuedIds
                },
                levelScore: (currentState.levelScore || 0) + 20
            });
        }
    }

updateNpcGraphics ()
    {
        const rescuedIds = getGameState().levelEntities.rescuedNpcIds;

        this.npcs.forEach((npc, index) => {
            const isRescued = rescuedIds.includes(npc.id);
            const graphic = this.npcGraphics[index];

            this.time.delayedCall(0, () => {
                if (graphic && graphic.active) {
                    graphic.clear();
                    graphic.fillStyle(isRescued ? 0x888888 : 0xffd700, 1);
                    graphic.fillRect(npc.x - 15, npc.y - 15, 30, 30);
                }
            });
        });
    }

    handleExitReached ()
    {
        const currentState = getGameState();
        const currentLevel = LEVELS[currentState.levelIndex];
        
        const unrescuedNpcs = currentLevel.npcs.filter(npc => 
            !currentState.levelEntities.rescuedNpcIds.includes(npc.id)
        );
        
        const penalty = unrescuedNpcs.length * 10;
        const bonus = 50;
        const netScore = currentState.levelScore + 50 - (unrescuedNpcs.length * 10);
        
        updateGameState({ 
            confirmedScore: currentState.confirmedScore + netScore,
            levelScore: 0,
            timeRemaining: 30,
            lives: 3,
            levelEntities: { rescuedNpcIds: [], defeatedEnemyIds: [] }
        });

        if (currentState.levelIndex >= 3) {
            this.registry.set('finalGameState', getGameState());
            this.scene.start('Victory');
        } else {
            updateGameState({ 
                levelIndex: currentState.levelIndex + 1 
            });
            this.scene.restart();
        }
    }

    takeDamage ()
    {
        const currentState = getGameState();

        if (currentState.lives <= 1) {
            this.scene.start('GameOver');
            return;
        }

        const result = resolveDamage(currentState);
        updateGameState(result.gameState);

        if (result.action === 'respawn') {
            this.player.setPosition(this.playerStart.x, this.playerStart.y);
            this.playerBody.setVelocity(0, 0);
        }

        this.updateEnemyGraphics();
    }

    updateEnemyGraphics ()
    {
        const defeatedIds = getGameState().levelEntities.defeatedEnemyIds;

        this.enemies.forEach(enemy => {
            const isDefeated = defeatedIds.includes(enemy.id);

            this.time.delayedCall(0, () => {
                if (enemy && enemy.active) {
                    if (isDefeated) {
                        enemy.visible = false;
                        if (enemy.body) {
                            enemy.body.enable = false;
                        }
                    } else {
                        enemy.visible = true;
                        if (enemy.body) {
                            enemy.body.enable = true;
                        }
                    }
                }
            });
        });
    }

    update ()
    {
        if (!this.playerBody) {
            console.error('ERROR: playerBody is null in update()');
            return;
        }

        this.playerBody.setVelocityX(0);

        if (this.cursors.left.isDown || this.keyA.isDown) {
            this.playerBody.setVelocityX(-this.speed);
        } else if (this.cursors.right.isDown || this.keyD.isDown) {
            this.playerBody.setVelocityX(this.speed);
        }

        if (this.spaceKey.isDown && this.spaceJustReleased) {
            this.spaceJustReleased = false;

            if (this.jumpsUsed < 2) {
                this.playerBody.setVelocityY(-300);
                this.jumpsUsed++;
            }
        }

        if (!this.spaceKey.isDown) {
            this.spaceJustReleased = true;
        }

        const wasOnGround = this.wasOnGround ?? false;
        const isOnGround = this.playerBody.touching.down;
        if (isOnGround && !wasOnGround) {
            this.jumpsUsed = 0;
        }
        this.wasOnGround = isOnGround;

        const gs = getGameState();
        if (gs.timeRemaining <= 0) {
            this.scene.start('GameOver');
            return;
        }

        if (this.keyF.isDown && this.fJustReleased) {
            this.fJustReleased = false;

            this.npcs.forEach(npc => {
                const dx = this.player.x - npc.x;
                const dy = this.player.y - npc.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.rescueNpc(npc.id);
                }
            });
        }

        if (!this.keyF.isDown) {
            this.fJustReleased = true;
        }

        this.updateNpcGraphics();
        this.updateEnemyGraphics();

        if (gs.timeRemaining > 0) {
            gs.timeRemaining -= 1 / 60;
            if (gs.timeRemaining < 0) {
                gs.timeRemaining = 0;
            }
            updateGameState({ timeRemaining: gs.timeRemaining });
        }

        this.updateHUD();
    }

    updateHUD ()
    {
        const gameState = getGameState();

        const seconds = Math.floor(gameState.timeRemaining);
        this.timerText.setText('Tiempo: ' + seconds);

        this.scoreText.setText('Score: ' + (gameState.levelScore || 0));

        this.livesText.setText('Vidas: ' + (gameState.lives || 0));

        this.levelText.setText('Nivel: ' + (gameState.levelIndex + 1));
    }
}