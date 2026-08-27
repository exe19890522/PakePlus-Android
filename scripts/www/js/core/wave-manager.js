// ==================== 波次管理器 ====================
class WaveManager {
    constructor() {
        this.currentWave = 0;
        this.waveTimer = 0;
        this.isWaveActive = false;
        this.monstersToSpawn = 0;
        this.spawnTimer = 0;
        
        // 怪物属性成长倍率
        // 每波额外增长: 血量+30%, 攻击力+20%
        this.hpMultiplier = 1;
        this.attackMultiplier = 1;
    }
    
    reset() {
        this.currentWave = 0;
        this.waveTimer = 0;
        this.isWaveActive = false;
        this.monstersToSpawn = 0;
        this.spawnTimer = 0;
        this.hpMultiplier = 1;
        this.attackMultiplier = 1;
    }
    
    startWave() {
        if (this.currentWave >= DEFINE.WAVE.MAX_WAVES) {
            return false;
        }
        
        this.currentWave++;
        this.isWaveActive = true;
        this.waveTimer = 0;
        this.spawnTimer = 0;
        
        // 每波额外增长: 血量*1.3, 攻击力*1.2
        this.hpMultiplier = Math.pow(1.3, this.currentWave - 1);
        this.attackMultiplier = Math.pow(1.2, this.currentWave - 1);
        
        const monsterCount = this.getMonsterCountForWave();
        this.monstersToSpawn = monsterCount;
        
        console.log(`Wave ${this.currentWave} started with ${monsterCount} monsters, HP*x${this.hpMultiplier.toFixed(2)}, ATK*x${this.attackMultiplier.toFixed(2)}`);
        
        return true;
    }
    
    getMonsterCountForWave() {
        return Math.floor(DEFINE.WAVE.BASE_MONSTERS * Math.pow(1.1, this.currentWave - 1));
    }
    
    // 获取当前波次的怪物属性倍率
    getHpMultiplier() {
        return this.hpMultiplier;
    }
    
    getAttackMultiplier() {
        return this.attackMultiplier;
    }
    
    shouldSpawnElite() {
        return this.currentWave % DEFINE.WAVE.ELITE_INTERVAL === 0;
    }
    
    shouldSpawnBoss() {
        return this.currentWave % DEFINE.WAVE.BOSS_INTERVAL === 0 && this.currentWave > 0;
    }
    
    update(dt, canvasWidth, canvasHeight, monsterSpawnCallback) {
        if (!this.isWaveActive) return;
        
        this.waveTimer += dt;
        
        if (this.monstersToSpawn > 0) {
            this.spawnTimer += dt;
            if (this.spawnTimer >= 0.5) {
                this.spawnTimer = 0;
                
                // Random monster type selection
                const rand = Math.random();
                let monsterType;
                if (rand < 0.2 && this.currentWave >= 3) {
                    monsterType = 'assassin';
                } else if (rand < 0.35 && this.currentWave >= 5) {
                    monsterType = 'tank';
                } else if (rand < 0.45 && this.currentWave >= 7) {
                    monsterType = 'mage';
                } else {
                    monsterType = 'normal';
                }
                
                const monster = MonsterFactory.createMonster(monsterType, this.currentWave, canvasWidth, canvasHeight, this.hpMultiplier, this.attackMultiplier);
                monsterSpawnCallback(monster);
                this.monstersToSpawn--;
            }
        }
    }
    
    onMonstersCleared() {
        this.isWaveActive = false;
        console.log(`Wave ${this.currentWave} completed`);
    }
    
    isComplete() {
        return this.currentWave >= DEFINE.WAVE.MAX_WAVES && !this.isWaveActive;
    }
    
    getProgress() {
        return this.currentWave / DEFINE.WAVE.MAX_WAVES;
    }
}
