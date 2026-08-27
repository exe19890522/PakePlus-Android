// ==================== 怪物类 ====================
class Monster {
    constructor(type, x, y, stats) {
        this.type = type; // 'normal', 'elite', 'boss', 'assassin', 'tank', 'mage'
        this.x = x;
        this.y = y;
        this.hp = stats.maxHp;
        this.maxHp = stats.maxHp;
        this.attack = stats.attack;
        this.speed = stats.speed;
        this.expReward = stats.expReward;
        this.attackTimer = 0;
        this.attackInterval = stats.attackInterval || 1;
        this.size = stats.size || 30;
        
        // Buffs
        this.buffs = {};
        
        // Boss special
        if (type === 'boss') {
            this.specialAttackTimer = 0;
            this.specialCooldown = 5;
        }
        
        // Mage projectile timer
        if (type === 'mage') {
            this.projectileTimer = 0;
            this.projectileCooldown = 2;
        }
    }
    
    applyBuff(buffType, duration, value) {
        this.buffs[buffType] = {
            timer: duration,
            value: value
        };
    }
    
    hasBuff(buffType) {
        return this.buffs[buffType] && this.buffs[buffType].timer > 0;
    }
    
    update(dt, playerX, playerY, towers = []) {
        // Update buffs
        for (const buffType in this.buffs) {
            if (this.buffs[buffType].timer > 0) {
                this.buffs[buffType].timer -= dt;
                
                // Burn damage
                if (buffType === 'burn' && this.buffs[buffType].timer > 0) {
                    const burnDamage = this.buffs[buffType].value * dt;
                    this.hp -= burnDamage;
                    if (this.hp <= 0) this.hp = 0;
                }
            }
        }
        
        // Paralysis prevents movement
        if (this.hasBuff('paralysis')) {
            return;
        }
        
        // Move towards player
        const dx = playerX - this.x;
        const dy = playerY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > this.size + 20) {
            this.x += (dx / dist) * this.speed * dt;
            this.y += (dy / dist) * this.speed * dt;
        }
        
        // Attack timer
        this.attackTimer += dt;
        
        // Boss special attack
        if (this.type === 'boss') {
            this.specialAttackTimer += dt;
        }
        
        // Mage projectile timer
        if (this.type === 'mage') {
            this.projectileTimer += dt;
        }
    }
    
    canAttack() {
        if (this.hasBuff('paralysis')) return false;
        return this.attackTimer >= this.attackInterval;
    }
    
    resetAttackTimer() {
        this.attackTimer = 0;
    }
    
    canSpecialAttack() {
        return this.type === 'boss' && this.specialAttackTimer >= this.specialCooldown;
    }
    
    resetSpecialAttackTimer() {
        this.specialAttackTimer = 0;
    }
    
    canShootProjectile() {
        return this.type === 'mage' && this.projectileTimer >= this.projectileCooldown && !this.hasBuff('paralysis');
    }
    
    resetProjectileTimer() {
        this.projectileTimer = 0;
    }
    
    takeDamage(damage) {
        if (this.hp <= 0) return true; // Already dead
        this.hp -= damage;
        if (this.hp < 0) this.hp = 0;
        return this.hp <= 0;
    }
    
    isAlive() {
        return this.hp > 0;
    }
    
    getHpPercent() {
        if (this.hp <= 0) return 0;
        return this.hp / this.maxHp;
    }
}

// ==================== 怪物工厂 ====================
class MonsterFactory {
    static createMonster(type, wave, canvasWidth, canvasHeight, hpMult = 1, atkMult = 1) {
        const angle = Math.random() * Math.PI * 2;
        const dist = DEFINE.MAP_RADIUS + 50;
        const x = canvasWidth / 2 + Math.cos(angle) * dist;
        const y = canvasHeight / 2 + Math.sin(angle) * dist;
        
        // 波次基础成长: 每波额外增长 30%血量, 20%攻击力
        const waveGrowth = wave > 1 ? Math.pow(1.3, wave - 1) : 1;
        const waveAtkGrowth = wave > 1 ? Math.pow(1.2, wave - 1) : 1;
        const finalHpMult = hpMult * waveGrowth;
        const finalAtkMult = atkMult * waveAtkGrowth;
        
        let stats;
        
        switch (type) {
            case 'elite':
                stats = {
                    maxHp: Math.floor(30 * 5 * finalHpMult),
                    attack: Math.floor(5 * 2 * finalAtkMult),
                    speed: randomRange(50, 70),
                    expReward: (10 + wave * 2) * 3,
                    attackInterval: 1.2,
                    size: 40
                };
                break;
            case 'boss':
                stats = {
                    maxHp: Math.floor(30 * 5 * 3 * finalHpMult),
                    attack: Math.floor(5 * 2 * 1.5 * finalAtkMult),
                    speed: randomRange(30, 50),
                    expReward: (10 + wave * 2) * 5,
                    attackInterval: 1.5,
                    size: 60
                };
                break;
            case 'assassin':
                stats = {
                    maxHp: Math.floor(20 * finalHpMult),
                    attack: Math.floor(10 * finalAtkMult),
                    speed: randomRange(150, 200),
                    expReward: 8 + wave * 2,
                    attackInterval: 0.8,
                    size: 20
                };
                break;
            case 'tank':
                stats = {
                    maxHp: Math.floor(80 * finalHpMult),
                    attack: Math.floor(3 * finalAtkMult),
                    speed: randomRange(30, 50),
                    expReward: 15 + wave * 2,
                    attackInterval: 1.5,
                    size: 45
                };
                break;
            case 'mage':
                stats = {
                    maxHp: Math.floor(40 * finalHpMult),
                    attack: Math.floor(6 * finalAtkMult),
                    speed: randomRange(40, 60),
                    expReward: 12 + wave * 2,
                    attackInterval: 2,
                    size: 35
                };
                break;
            default: // normal
                stats = {
                    maxHp: Math.floor(30 * finalHpMult),
                    attack: Math.floor(5 * finalAtkMult),
                    speed: randomRange(60, 100),
                    expReward: 10 + wave * 2,
                    attackInterval: 1,
                    size: 30
                };
        }
        
        return new Monster(type, x, y, stats);
    }
}
