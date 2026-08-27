// ==================== 防御塔箱子类 ====================
class TowerBox {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 25;
        this.bobTimer = Math.random() * Math.PI * 2;
        this.bobOffset = 0;
        this.glowTimer = 0;
    }
    
    update(dt) {
        this.bobTimer += dt * 3;
        this.bobOffset = Math.sin(this.bobTimer) * 5;
        this.glowTimer += dt;
    }
    
    getBobOffset() {
        return this.bobOffset;
    }
    
    canPickup(playerX, playerY) {
        const dist = distance(this.x, this.y, playerX, playerY);
        return dist < this.size + 20;
    }
}

// ==================== 防御塔箱子管理器 ====================
class TowerBoxManager {
    constructor() {
        this.boxes = [];
        this.spawnTimer = 0;
        this.spawnInterval = 20;
    }
    
    reset() {
        this.boxes = [];
        this.spawnTimer = 0;
    }
    
    update(dt, playerX, playerY, canvasWidth, canvasHeight) {
        this.spawnTimer += dt;
        
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnTimer = 0;
            this.spawnBox(playerX, playerY, canvasWidth, canvasHeight);
        }
        
        for (const box of this.boxes) {
            box.update(dt);
        }
    }
    
    spawnBox(playerX, playerY, canvasWidth, canvasHeight) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 150 + Math.random() * 200;
        const x = playerX + Math.cos(angle) * dist;
        const y = playerY + Math.sin(angle) * dist;
        
        this.boxes.push(new TowerBox(x, y));
        console.log(`Tower box spawned at (${x.toFixed(0)}, ${y.toFixed(0)})`);
    }
    
    checkPickup(playerX, playerY) {
        for (let i = this.boxes.length - 1; i >= 0; i--) {
            if (this.boxes[i].canPickup(playerX, playerY)) {
                const box = this.boxes.splice(i, 1)[0];
                console.log('Tower box collected!');
                return box;
            }
        }
        return null;
    }
    
    getCount() {
        return this.boxes.length;
    }
}

// ==================== 防御塔类 ====================
class Tower {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.level = 1;
        this.attackTimer = 0;
        this.attackWindupTimer = 0;
        this.target = null;
        this.size = 30;
        this.maxHp = 80;
        this.hp = this.maxHp;
        this.destroyed = false;
        this.destroyAnimTimer = 0;
        
        // Base stats
        const baseRange = DEFINE.CAMERA.VIEW_RADIUS * 0.3;
        const baseDamage = this.getBaseDamage();
        
        this.damage = baseDamage;
        this.range = baseRange;
        this.attackInterval = this.getAttackInterval();
        this.windupDuration = 0.2;
    }
    
    getBaseDamage() {
        switch (this.type) {
            case 'arrow': return 15;
            case 'fire': return 20;
            case 'lightning': return 30;
            default: return 10;
        }
    }
    
    getAttackInterval() {
        switch (this.type) {
            case 'arrow': return 1.0;
            case 'fire': return 1.5;
            case 'lightning': return 2.0;
            default: return 1.0;
        }
    }
    
    takeDamage(damage) {
        if (this.destroyed) return;
        this.hp -= damage;
        if (this.hp <= 0) {
            this.hp = 0;
            this.destroyed = true;
            this.destroyAnimTimer = 0.5;
        }
    }
    
    getHpPercent() {
        return this.hp / this.maxHp;
    }
    
    upgrade() {
        this.level++;
        this.damage = Math.floor(this.getBaseDamage() * (1 + 0.25 * (this.level - 1)));
        this.range = DEFINE.CAMERA.VIEW_RADIUS * 0.3 * (1 + 0.3 * (this.level - 1));
        this.maxHp += 20;
        this.hp = Math.min(this.hp + 20, this.maxHp);
        console.log(`Tower ${this.type} upgraded to level ${this.level}, damage: ${this.damage}, range: ${this.range.toFixed(0)}, hp: ${this.hp}/${this.maxHp}`);
    }
    
    update(dt, monsters, game) {
        if (this.destroyed) {
            this.destroyAnimTimer -= dt;
            return this.destroyAnimTimer > 0;
        }
        
        if (this.attackWindupTimer > 0) {
            this.attackWindupTimer -= dt;
            if (this.attackWindupTimer <= 0) {
                this.attack(game, monsters);
            }
            return true;
        }
        
        // Find target
        this.target = null;
        let nearestDist = this.range;
        
        for (const monster of monsters) {
            const dist = distance(this.x, this.y, monster.x, monster.y);
            if (dist < nearestDist) {
                nearestDist = dist;
                this.target = monster;
            }
        }
        
        // Attack
        if (this.attackTimer >= this.attackInterval && this.target) {
            this.attackTimer = 0;
            this.attackWindupTimer = this.windupDuration;
        }
        
        return true;
    }
    
    attack(game, monsters) {
        if (!this.target) return;
        
        switch (this.type) {
            case 'arrow':
                game.effectManager.createSmallSword(this.x, this.y, this.target.x, this.target.y, this.damage);
                break;
            case 'fire':
                game.effectManager.createFireball(this.x, this.y, this.target.x, this.target.y, this.damage);
                break;
            case 'lightning':
                game.effectManager.createLightningStrike(this.x, this.y, this.range, this.damage, monsters, game);
                break;
        }
    }
    
    getAttackProgress() {
        if (this.attackWindupTimer > 0) {
            return 1 - (this.attackWindupTimer / this.windupDuration);
        }
        return 0;
    }
}

// ==================== 防御塔管理器 ====================
class TowerManager {
    constructor() {
        this.towers = [];
    }
    
    reset() {
        this.towers = [];
    }
    
    spawnTower(x, y, type) {
        const tower = new Tower(x, y, type);
        this.towers.push(tower);
        console.log(`Tower spawned at (${x.toFixed(0)}, ${y.toFixed(0)}), type: ${type}`);
        return tower;
    }
    
    upgradeAll() {
        for (const tower of this.towers) {
            tower.upgrade();
        }
    }
    
    update(dt, monsters, game) {
        for (let i = this.towers.length - 1; i >= 0; i--) {
            const alive = this.towers[i].update(dt, monsters, game);
            if (!alive) {
                console.log(`Tower destroyed at (${this.towers[i].x.toFixed(0)}, ${this.towers[i].y.toFixed(0)})`);
                this.towers.splice(i, 1);
            }
        }
    }
    
    getCount() {
        return this.towers.length;
    }
    
    getAliveTowers() {
        return this.towers.filter(t => !t.destroyed);
    }
}
