// ==================== 技能箱子类 ====================
class SkillBox {
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

// ==================== 技能箱子管理器 ====================
class SkillBoxManager {
    constructor() {
        this.boxes = [];
        this.spawnTimer = 0;
        this.spawnInterval = 15;
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
        const dist = 200 + Math.random() * 200;
        const x = playerX + Math.cos(angle) * dist;
        const y = playerY + Math.sin(angle) * dist;
        
        this.boxes.push(new SkillBox(x, y));
        console.log(`Skill box spawned at (${x.toFixed(0)}, ${y.toFixed(0)})`);
    }
    
    checkPickup(playerX, playerY) {
        for (let i = this.boxes.length - 1; i >= 0; i--) {
            if (this.boxes[i].canPickup(playerX, playerY)) {
                const box = this.boxes.splice(i, 1)[0];
                console.log('Skill box collected!');
                return true;
            }
        }
        return false;
    }
    
    getCount() {
        return this.boxes.length;
    }
}