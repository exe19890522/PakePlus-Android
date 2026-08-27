// ==================== 掉落类 ====================
class Drop {
    constructor(type, x, y, value) {
        this.type = type; // 'exp', 'hp', 'mp', 'qi', 'skillBook'
        this.x = x + randomRange(-10, 10);
        this.y = y + randomRange(-10, 10);
        this.value = value;
        this.bobTimer = Math.random() * Math.PI * 2;
        this.attracted = false;
    }
    
    update(dt, playerX, playerY) {
        this.bobTimer += dt * 3;
        
        if (this.type === 'equipment' || this.type === 'rune' || this.type === 'skillBook') return;
        
        const dist = distance(this.x, this.y, playerX, playerY);
        
        if (dist < DEFINE.DROP.ATTRACT_RADIUS) {
            this.attracted = true;
        }
        
        if (this.attracted) {
            const dx = playerX - this.x;
            const dy = playerY - this.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            
            if (d > 0) {
                this.x += (dx / d) * DEFINE.DROP.ATTRACT_SPEED * dt;
                this.y += (dy / d) * DEFINE.DROP.ATTRACT_SPEED * dt;
            }
        }
    }
    
    canPickup(playerX, playerY) {
        if (this.type === 'equipment' || this.type === 'rune' || this.type === 'skillBook') return false;
        return distance(this.x, this.y, playerX, playerY) < 20;
    }
    
    getBobOffset() {
        return Math.sin(this.bobTimer) * 3;
    }
}

// ==================== 掉落管理器 ====================
class DropManager {
    constructor() {
        this.drops = [];
    }
    
    reset() {
        this.drops = [];
    }
    
    spawnDrop(x, y, type, value) {
        this.drops.push(new Drop(type, x, y, value));
    }
    
    spawnExpDrop(x, y, value) {
        this.spawnDrop(x, y, 'exp', value);
    }
    
    spawnMonsterDrops(monster, wave, materialDropManager) {
        // Always spawn exp
        this.spawnExpDrop(monster.x, monster.y, monster.expReward);
        
        // Random drops
        if (Math.random() < DEFINE.DROP.HEALTH_RATE) {
            this.spawnDrop(monster.x + randomRange(-20, 20), monster.y + randomRange(-20, 20), 'hp', 20);
        }
        
        if (Math.random() < DEFINE.DROP.MANA_RATE) {
            this.spawnDrop(monster.x + randomRange(-20, 20), monster.y + randomRange(-20, 20), 'mp', 15);
        }
        
        if (Math.random() < DEFINE.DROP.QI_PILL_RATE) {
            this.spawnDrop(monster.x, monster.y, 'qi', 1);
        }
        
        // Material drops (20% for normal monsters)
        if (Math.random() < DEFINE.DROP.ALCHEMY_MATERIAL_RATE) {
            materialDropManager.spawnRandomMaterial(monster.x, monster.y, 'alchemy');
        }
        if (Math.random() < DEFINE.DROP.FORGE_MATERIAL_RATE) {
            materialDropManager.spawnRandomMaterial(monster.x, monster.y, 'forge');
        }
    }
    
    spawnEliteDrops(monster, materialDropManager) {
        for (let i = 0; i < 2; i++) {
            this.spawnExpDrop(
                monster.x + randomRange(-30, 30),
                monster.y + randomRange(-30, 30),
                30
            );
        }
        
        if (Math.random() < 0.5) {
            this.spawnDrop(monster.x, monster.y, 'hp', 20);
        }
        if (Math.random() < 0.5) {
            this.spawnDrop(monster.x, monster.y, 'mp', 15);
        }
        
        // Material drops (40% for elite monsters)
        if (Math.random() < 0.4) {
            materialDropManager.spawnRandomMaterial(monster.x, monster.y, 'alchemy');
        }
        if (Math.random() < 0.4) {
            materialDropManager.spawnRandomMaterial(monster.x, monster.y, 'forge');
        }
        
        // 技能书掉落（精英怪 20% 几率掉落 1-2 本）
        if (Math.random() < 0.2) {
            const bookCount = Math.floor(Math.random() * 2) + 1; // 1-2 本
            for (let i = 0; i < bookCount; i++) {
                this.spawnDrop(
                    monster.x + randomRange(-30, 30),
                    monster.y + randomRange(-30, 30),
                    'skillBook',
                    1
                );
            }
            console.log(`精英怪掉落技能书 x${bookCount}`);
        }
    }
    
    spawnBossDrops(monster, materialDropManager) {
        for (let i = 0; i < 3; i++) {
            this.spawnExpDrop(
                monster.x + randomRange(-50, 50),
                monster.y + randomRange(-50, 50),
                50
            );
        }
        
        for (let i = 0; i < 3; i++) {
            this.spawnDrop(
                monster.x + randomRange(-40, 40),
                monster.y + randomRange(-40, 40),
                'hp', 20
            );
            this.spawnDrop(
                monster.x + randomRange(-40, 40),
                monster.y + randomRange(-40, 40),
                'mp', 15
            );
        }
        
        // Material drops (60% for boss monsters)
        if (Math.random() < 0.6) {
            materialDropManager.spawnRandomMaterial(monster.x, monster.y, 'alchemy');
            materialDropManager.spawnRandomMaterial(monster.x, monster.y, 'alchemy');
        }
        if (Math.random() < 0.6) {
            materialDropManager.spawnRandomMaterial(monster.x, monster.y, 'forge');
            materialDropManager.spawnRandomMaterial(monster.x, monster.y, 'forge');
        }
        
        // 技能书掉落（BOSS 怪 35% 几率掉落 2-4 本）
        if (Math.random() < 0.35) {
            const bookCount = Math.floor(Math.random() * 3) + 2; // 2-4 本
            for (let i = 0; i < bookCount; i++) {
                this.spawnDrop(
                    monster.x + randomRange(-50, 50),
                    monster.y + randomRange(-50, 50),
                    'skillBook',
                    1
                );
            }
            console.log(`BOSS 怪掉落技能书 x${bookCount}`);
        }
    }
    
    update(dt, player) {
        let leveledUp = false;
        
        for (let i = this.drops.length - 1; i >= 0; i--) {
            const drop = this.drops[i];
            drop.update(dt, player.x, player.y);
            
            if (drop.canPickup(player.x, player.y)) {
                const result = this.applyDrop(drop, player);
                if (result === 'levelup') leveledUp = true;
                this.drops.splice(i, 1);
            }
        }
        
        return leveledUp;
    }
    //掉落物的处理
    applyDrop(drop, player) {
        switch (drop.type) {
            case 'exp'://经验值
                const didLevelUp = player.gainExp(drop.value);
                console.log(`+${drop.value} EXP`);
                return didLevelUp ? 'levelup' : null;
            case 'hp'://补血
                player.heal(drop.value);
                console.log(`+${drop.value} HP`);
                if (window.uiMgr) {
                    window.uiMgr.addBattleLog(`拾取气血丹 +${drop.value}`, 'item');
                }
                break;
            case 'mp'://补蓝
                player.restoreMp(drop.value);
                console.log(`+${drop.value} MP`);
                if (window.uiMgr) {
                    window.uiMgr.addBattleLog(`拾取法力丹 +${drop.value}`, 'item');
                }
                break;
            case 'qi'://补气
                player.gainQiPill();
                console.log('+1 Qi Pill');
                if (window.uiMgr) {
                    window.uiMgr.addBattleLog(`拾取气丸 +1`, 'item');
                }
                break;
            case 'alchemy'://炼丹材料
            case 'forge'://锻造材料
                if (window.uiMgr && drop.materialName) {
                    window.uiMgr.addBattleLog(`拾取材料【${drop.materialName}】x${drop.value || 1}`, 'item');
                }
                break;
            case 'skillBook'://技能书
                // 技能书需要玩家手动拾取，在 game.js 中处理
                console.log('技能书掉落在地上');
                if (window.uiMgr) {
                    window.uiMgr.addBattleLog(`掉落技能书 x${drop.value || 1}`, 'item');
                }
                break;
        }
    }
    
    getDropCount() {
        return this.drops.length;
    }
}
