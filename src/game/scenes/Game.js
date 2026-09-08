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
        this.canJump = true;
        this.canDoubleJump = false;
        this.playerStart = null;
        this.npcs = [];
        this.enemies = [];
    }

    create ()
    {
        const currentLevel = LEVELS[0];
        this.cameras.main.setBackgroundColor(0x00ff00);

        const { playerStart, exit, platforms } = currentLevel;

        this.playerStart = playerStart;

        const ground = this.physics.add.staticGroup();
        platforms.forEach(plat => {
            ground.create(plat.x, plat.y).setSize(plat.width, plat.height).refreshBody();
        });

        this.player = this.physics.add.rectangle(
            playerStart.x, playerStart.y, 30, 30, 0x0000ff
        );

        this.player.setCollideWorldBounds(true);

        this.speed = 200;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(65); // A
        this.keyD = this.input.keyboard.addKey(68); // D
        this.spaceKey = this.input.keyboard.addKey(32);
        this.keyF = this.input.keyboard.addKey(70); // F

        this.physics.add.collider(this.player, ground, () => {
            this.canJump = true;
            this.canDoubleJump = false;
        });

        // Create NPCs from level data
        const levelNpcs = currentLevel.npcs;
        this.npcs = [];
        this.npcGraphics = [];

        levelNpcs.forEach(npcData => {
            // Always derive rescued state from current game state
            const rescuedIds = getGameState().levelEntities.rescuedNpcIds;
            const alreadyRescued = rescuedIds.includes(npcData.id);

            // Create NPC graphics
            const graphic = this.add.graphics();
            if (alreadyRescued) {
                graphic.fillStyle(0x888888, 1);
                graphic.fillRect(npcData.x - 15, npcData.y - 15, 30, 30);
            } else {
                graphic.fillStyle(0xffd700, 1);
                graphic.fillRect(npcData.x - 15, npcData.y - 15, 30, 30);
            }
            graphic.refreshBody();

            this.npcGraphics.push(graphic);

            this.npcs.push({
                id: npcData.id,
                x: npcData.x,
                y: npcData.y
            });
        });

        // Create enemies from level data
        const levelEnemies = currentLevel.enemies;
        this.enemies = [];

        levelEnemies.forEach(enemyData => {
            // Check if enemy was already defeated
            const alreadyDefeated = getGameState().levelEntities.defeatedEnemyIds.includes(enemyData.id);

            // Create physics sprite for enemy
            const enemy = this.physics.add.rectangle(
                enemyData.x, enemyData.y, 30, 30,
                alreadyDefeated ? 0x888888 : 0xff0000
            );
            enemy.defeated = alreadyDefeated; // custom property

            this.enemies.push(enemy);
        });

        this.physics.add.collider(this.player, this.enemies, (player, enemy) => {
            this.handleEnemyCollision(enemy);
        });

        this.spaceJustReleased = true;
        this.fJustReleased = true;
    }

    handleEnemyCollision (enemy)
    {
        // Cannot collide with already defeated enemy
        const defeatedIds = getGameState().levelEntities.defeatedEnemyIds;
        if (defeatedIds.includes(enemy.id)) {
            return;
        }

        // Check if defeated by jumping on top:
        // Player is falling (velocityY > 0) and touching the enemy from above
        const isDefeat = this.player.body.touching.down && this.player.velocityY > 0;

        if (isDefeat) {
            // Defeat the enemy
            this.defeatEnemy(enemy.id);
        } else {
            // Take damage (touched side or bottom without jumping)
            this.takeDamage();
        }
    }

    defeatEnemy (enemyId)
    {
        // Record defeat in game state
        const currentState = getGameState();
        const defeatedIds = currentState.levelEntities.defeatedEnemyIds;
        defeatedIds.push(enemyId);
        updateGameState({ gameState: { ...currentState, levelEntities: { ...currentState.levelEntities, defeatedEnemyIds: defeatedIds } } });

        // Add +30 points to levelScore using existing rule (GAME_RULES.defeatedEnemyPoints = 30)
        const scoreState = getGameState();
        const newLevelScore = (scoreState.levelScore || 0) + 30;
        updateGameState({ gameState: { ...scoreState, levelScore: newLevelScore } });

        // Update enemy tint to show defeated state
        this.enemies.forEach(enemy => {
            if (enemy.id === enemyId) {
                enemy.setTint(0x888888);
                enemy.defeated = true;
            }
        });
    }

    updateEnemyGraphics ()
    {
        const defeatedIds = getGameState().levelEntities.defeatedEnemyIds;

        this.enemies.forEach(enemy => {
            const isDefeated = defeatedIds.includes(enemy.id);

            if (isDefeated) {
                // Mark as defeated with tint
                enemy.setTint(0x888888);
            } else {
                // Mark as active (remove tint, show red)
                enemy.clearTint();
            }
        });
    }

    takeDamage ()
    {
        const currentState = getGameState();
        const result = resolveDamage(currentState);
        updateGameState({ gameState: result.gameState });

        if (result.action === 'respawn') {
            this.player.setPosition(this.playerStart.x, this.playerStart.y);
            this.player.setVelocity(0, 0);
        } else if (result.action === 'restart-level') {
            restartLevelAttempt();
            this.player.setPosition(this.playerStart.x, this.playerStart.y);
            this.player.setVelocity(0, 0);
        }

        // Update enemy graphics to reflect current game state
        this.updateEnemyGraphics();
    }

    rescueNpc (npcId)
    {
        // Check if NPC already rescued using game state
        const currentState = getGameState();
        const rescuedIds = currentState.levelEntities.rescuedNpcIds;

        // Cannot rescue if already rescued
        if (rescuedIds.includes(npcId)) {
            return;
        }

        // Add to rescued IDs
        rescuedIds.push(npcId);
        updateGameState({ gameState: { ...currentState, levelEntities: { ...currentState.levelEntities, rescuedNpcIds: rescuedIds } } });

        // Add +20 points to levelScore using existing rules (GAME_RULES.rescuedNpcPoints = 20)
        const scoreState = getGameState();
        const newLevelScore = (scoreState.levelScore || 0) + 20;
        updateGameState({ gameState: { ...scoreState, levelScore: newLevelScore } });

        // Update NPC graphics - mark as rescued
        this.updateNpcGraphics(npcId);
    }

    updateNpcGraphics (rescuedId = null)
    {
        const rescuedIds = getGameState().levelEntities.rescuedNpcIds;

        this.npcGraphics.forEach((entry, index) => {
            const npc = this.npcs[index];
            const isRescued = rescuedIds.includes(npc.id);

            entry.clear();

            if (isRescued) {
                // Draw as rescued (gray)
                entry.fillStyle(0x888888, 1);
                entry.fillRect(npc.x - 15, npc.y - 15, 30, 30);
            } else {
                // Draw as normal (gold)
                entry.fillStyle(0xffd700, 1);
                entry.fillRect(npc.x - 15, npc.y - 15, 30, 30);
            }
        });
    }

    update ()
    {
        this.player.setVelocityX(0);

        if (this.cursors.left.isDown || this.keyA.isDown) {
            this.player.setVelocityX(-this.speed);
        } else if (this.cursors.right.isDown || this.keyD.isDown) {
            this.player.setVelocityX(this.speed);
        }

        if (this.spaceKey.isDown && this.spaceJustReleased) {
            this.spaceJustReleased = false;

            if (this.canJump) {
                this.player.setVelocityY(-300);
                this.canJump = false;
                this.canDoubleJump = true;
            } else if (this.canDoubleJump) {
                this.player.setVelocityY(-300);
                this.canDoubleJump = false;
            }
        }

        if (!this.spaceKey.isDown) {
            this.spaceJustReleased = true;
        }

        if (this.player.body.touching.down) {
            this.canJump = true;
            this.canDoubleJump = false;
        }

        // F key rescue interaction
        if (this.keyF.isDown && this.fJustReleased) {
            this.fJustReleased = false;

            // Check each NPC for rescue
            this.npcs.forEach(npc => {
                // Simple distance check - if NPC is within ~100 pixels
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

        // NPC rescue state update graphics
        this.updateNpcGraphics();

        // Enemy graphics update
        this.updateEnemyGraphics();
    }
}