// ==================== 效果类 ====================
/**
 * 效果类 - 管理所有技能效果的显示和逻辑
 */
class Effect {
    /**
     * 创建效果实例
     * @param {string} type - 效果类型（flying_sword/talisman/ultimate/jin_zhong_zhao/lei_guang_dun/wan_jian_jue/tian_huo_liu_xing/long_juan_feng/yan_shuang_fei/geng_jin_jian_zhen/hit）
     * @param {number} x - 效果 X 坐标
     * @param {number} y - 效果 Y 坐标
     * @param {Object} data - 效果数据对象
     */
    constructor(type, x, y, data = {}) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.data = data;
        this.timer = 0;
        this.lifetime = data.lifetime || 0.3;
        this.angle = data.angle !== undefined ? data.angle : 0;
        this.speed = data.speed || 400;
        this.damage = data.damage || 0;
        this.width = data.width || 20;
        this.maxRange = data.maxRange || 350;
        this.traveled = 0;
        this.hasHit = new Set();
        
        // For flying sword
        if (type === 'flying_sword') {
            this.targetX = data.targetX || x;
            this.targetY = data.targetY || y;
            // Use custom angle if provided, otherwise calculate from target
            if (data.angle === undefined || data.angle === null) {
                this.angle = Math.atan2(this.targetY - y, this.targetX - x);
            }
            this.lifetime = 0.5;
        }

        // For stone (used by yan_shuang_fei)
        if (type === 'stone') {
            this.targetX = data.targetX || x;
            this.targetY = data.targetY || y;
            if (data.angle === undefined || data.angle === null) {
                this.angle = Math.atan2(this.targetY - y, this.targetX - x);
            }
            this.lifetime = 0.5;
            this.size = data.size || 4;
        }
        
        // For ultimate
        if (type === 'ultimate') {
            this.radius = data.radius || 150;
            this.maxRadius = this.radius;
            this.lifetime = 0.5;
        }
        
        // For jin_zhong_zhao (golden shield)
        if (type === 'jin_zhong_zhao') {
            this.radius = data.radius || 50;
            this.lifetime = data.duration || 10;
        }
        
        // For lei_guang_dun (lightning shield)
        if (type === 'lei_guang_dun') {
            this.radius = data.radius || 80;
            this.lifetime = data.duration || 5;
            this.damage = data.damage || 15;
        }
        
        // For wan_jian_jue (10,000 swords return to sect)
        if (type === 'wan_jian_jue') {
            this.radius = data.radius || 200;
            this.lifetime = 1.5;
            this.damage = data.damage || 80;
            this.swordCount = data.swordCount || 20;
        }
        
        // For tian_huo_liu_xing (heaven fire meteor)
        if (type === 'tian_huo_liu_xing') {
            this.radius = data.radius || 80;
            this.burnDuration = data.duration || 3;
            this.fallDuration = data.fallDuration || 0.6;
            // 总存活时间 = 坠落时间 + 地面燃烧时间
            this.lifetime = this.fallDuration + this.burnDuration;
            this.damage = data.damage || 60;
            this.burnDamage = 10;
            // 陨石坠落阶段
            this.startX = data.startX || x;
            this.startY = data.startY || y - 600;
            this.targetX = data.targetX || x;
            this.targetY = data.targetY || y;
            this.hasLanded = false;
            this.landHitDone = false;
            this.particles = [];
        }
        
        // For long_juan_feng (tornado)
        if (type === 'long_juan_feng') {
            this.radius = data.radius || 60;
            this.lifetime = data.duration || 3;
            this.damage = data.damage || 30;
            this.blowDistance = data.blowDistance || 0.3;
            // 龙卷风移动方向（弧度）
            this.direction = data.direction || 0;
            // 龙卷风移动速度（像素/秒）
            this.speed = data.speed || DEFINE.LONG_JUAN_FENG.SPEED;
            // 龙卷风自身旋转角度
            this.spin = 0;
            this.spinSpeed = data.spinSpeed || 8;
            // 上一次伤害/吹飞时间
            this.lastHitTime = 0;
        }
        
        // For yan_shuang_fei (swallow pair)
        if (type === 'yan_shuang_fei') {
            this.radius = data.radius || 12;
            this.damage = data.damage || 40;
            this.attackRange = data.attackRange || 200;
            // 燕子的环绕基准角度
            this.angle = data.angle || 0;
            // 对称偏移（0 或 PI）
            this.angleOffset = data.angleOffset || 0;
            this.orbitSpeed = data.orbitSpeed || 2.5;
            this.distance = data.distance || 80;
            // 读取 config 中的持续时间
            this.lifetime = data.duration || DEFINE.YAN_SHUANG_FEI.LIFETIME;
            // 攻击冷却
            this.attackCooldown = 0;
            this.attackInterval = data.attackInterval || 0.6;
        }
        
        // For geng_jin_jian_zhen (golding sword array)
        if (type === 'geng_jin_jian_zhen') {
            this.swordCount = data.swordCount || DEFINE.GENG_JIN_JIAN_ZHEN.SWORD_COUNT;
            this.longAxisRadius = data.longAxisRadius || DEFINE.GENG_JIN_JIAN_ZHEN.LONG_AXIS_RADIUS;
            this.shortAxisRadius = data.shortAxisRadius || DEFINE.GENG_JIN_JIAN_ZHEN.SHORT_AXIS_RADIUS;
            this.spawnHeightOffset = data.spawnHeightOffset || DEFINE.GENG_JIN_JIAN_ZHEN.SPAWN_HEIGHT_OFFSET;
            this.fallDuration = data.fallDuration || DEFINE.GENG_JIN_JIAN_ZHEN.FALL_DURATION;
            this.landedDuration = data.landedDuration || DEFINE.GENG_JIN_JIAN_ZHEN.LIFETIME;
            // 总存活时间 = 降落时间 + 落地后持续时间
            this.lifetime = this.fallDuration + this.landedDuration;
            this.damage = data.damage || DEFINE.GENG_JIN_JIAN_ZHEN.BASE_DAMAGE;
            this.paralyzeDuration = data.paralyzeDuration || DEFINE.GENG_JIN_JIAN_ZHEN.PARALYZE_DURATION;
            this.rotationSpeed = (data.rotationSpeed || DEFINE.GENG_JIN_JIAN_ZHEN.ROTATION_SPEED) * (Math.PI / 180);
            this.attackInterval = data.attackInterval || DEFINE.GENG_JIN_JIAN_ZHEN.ATTACK_INTERVAL;
            this.attackCooldown = 0;
            this.lastHitTime = 0;
            this.landed = false;
            this.rotation = 0;
            this.centerX = this.x;
            this.centerY = this.y - this.spawnHeightOffset;
            this.targetCenterY = this.y;
            // 初始化每把剑
            this.swords = [];
            for (let i = 0; i < this.swordCount; i++) {
                const angle = (i / this.swordCount) * Math.PI * 2;
                this.swords.push({ angle });
            }
        }
    }
    
    /**
     * 更新效果状态
     * @param {number} dt - 距离上次更新的时间间隔（秒）
     * @param {Array} monsters - 怪物数组
     * @param {Game} game - 游戏实例
     * @returns {boolean} 效果是否仍然存活
     */
    update(dt, monsters, game) {
        this.timer += dt;
        
        switch (this.type) {
            case 'flying_sword':
            case 'stone':
                this.updateFlyingSword(dt, monsters, game);
                break;
            case 'talisman':
                this.updateTalisman(dt, monsters, game);
                break;
            case 'ultimate':
                this.updateUltimate(dt, monsters, game);
                break;
            case 'jin_zhong_zhao':
                // Golden shield follows player
                this.x = game.player.x;
                this.y = game.player.y;
                break;
            case 'lei_guang_dun':
                this.updateLeiGuang(dt, monsters, game);
                break;
            case 'wan_jian_jue':
                this.updateWanJianGuiZong(dt, monsters, game);
                break;
            case 'tian_huo_liu_xing':
                this.updateTianHuoLiuXing(dt, monsters, game);
                break;
            case 'long_juan_feng':
                this.updateLongJuanFeng(dt, monsters, game);
                break;
            case 'yan_shuang_fei':
                this.updateYanShuangFei(dt, monsters, game);
                break;
            case 'geng_jin_jian_zhen':
                this.updateGengJinJianZhen(dt, monsters, game);
                break;
            case 'hit':
                // Just a hit effect
                break;
        }
        
        return this.timer < this.lifetime;
    }
    
    /**
     * 更新飞剑效果
     * @param {number} dt - 时间间隔
     * @param {Array} monsters - 怪物数组
     * @param {Game} game - 游戏实例
     */
    updateFlyingSword(dt, monsters, game) {
        // Move towards target
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 10) {
            this.x += (dx / dist) * this.speed * dt;
            this.y += (dy / dist) * this.speed * dt;
        }
        
        // Check collision (non-piercing - hit only one monster)
        for (const monster of monsters) {
            const d = distance(this.x, this.y, monster.x, monster.y);
            if (d < 20) {
                const dead = monster.takeDamage(this.damage);
                
                // Create hit effect
                game.effectManager.effects.push(new Effect('hit', monster.x, monster.y, { lifetime: 0.15 }));
                
                // 添加红色扣血飘字
                game.addFloatingText(monster.x, monster.y - monster.size, `-${this.damage}`, '#ff4444');
                
                if (dead) {
                    game.onMonsterKilled(monster);
                }
                
                // Non-piercing: mark lifetime to expire immediately
                this.lifetime = 0;
                break;
            }
        }
    }
    
    /**
     * 更新符箓效果
     * @param {number} dt - 时间间隔
     * @param {Array} monsters - 怪物数组
     * @param {Game} game - 游戏实例
     */
    updateTalisman(dt, monsters, game) {
        this.x += Math.cos(this.angle) * this.speed * dt;
        this.y += Math.sin(this.angle) * this.speed * dt;
        this.traveled += this.speed * dt;
        
        // Check collision
        for (const monster of monsters) {
            if (this.hasHit.has(monster)) continue;
            
            const d = distance(this.x, this.y, monster.x, monster.y);
            
            if (d < 20 + monster.size) {
                const dead = monster.takeDamage(this.damage);
                this.hasHit.add(monster);
                
                game.effectManager.effects.push(new Effect('hit', monster.x, monster.y, { lifetime: 0.15 }));
                
                // 添加红色扣血飘字
                game.addFloatingText(monster.x, monster.y - monster.size, `-${this.damage}`, '#ff4444');
                
                if (dead) {
                    game.onMonsterKilled(monster);
                }
            }
        }
        
        // Expire if traveled max range
        if (this.traveled >= this.maxRange) {
            this.timer = this.lifetime; // Mark for removal
        }
    }
    
    /**
     * 更新绝招效果
     * @param {number} dt - 时间间隔
     * @param {Array} monsters - 怪物数组
     * @param {Game} game - 游戏实例
     */
    updateUltimate(dt, monsters, game) {
        // Deal damage to all monsters in range at the start
        if (this.timer < dt * 2) { // Only on first few frames
            const currentRadius = this.radius * (this.timer / this.lifetime);
            for (const monster of monsters) {
                if (this.hasHit.has(monster)) continue;
                
                const dist = distance(this.x, this.y, monster.x, monster.y);
                if (dist <= currentRadius + monster.size) {
                    const dead = monster.takeDamage(this.damage);
                    this.hasHit.add(monster);
                    
                    game.effectManager.effects.push(new Effect('hit', monster.x, monster.y, { lifetime: 0.15 }));
                    
                    // 添加红色扣血飘字
                    game.addFloatingText(monster.x, monster.y - monster.size, `-${this.damage}`, '#ff69b4');
                    
                    if (dead) {
                        game.onMonsterKilled(monster);
                    }
                }
            }
        }
    }
    
    /**
     * 更新雷光盾效果
     * @param {number} dt - 时间间隔
     * @param {Array} monsters - 怪物数组
     * @param {Game} game - 游戏实例
     */
    updateLeiGuang(dt, monsters, game) {
        // Update position to follow player
        this.x = game.player.x;
        this.y = game.player.y;
        
        // Damage timer - deal damage every 1 second
        this.damageTimer = (this.damageTimer || 0) + dt;
        if (this.damageTimer >= 1) {
            this.damageTimer = 0;
            this.hasHit.clear(); // Reset so same monster can be hit again
        }
        
        // Continuous damage to monsters touching the shield
        for (const monster of monsters) {
            const dist = distance(this.x, this.y, monster.x, monster.y);
            if (dist <= this.radius + monster.size) {
                if (!this.hasHit.has(monster)) {
                    const dead = monster.takeDamage(this.damage);
                    this.hasHit.add(monster);
                    
                    game.effectManager.effects.push(new Effect('hit', monster.x, monster.y, { lifetime: 0.15 }));
                    game.addFloatingText(monster.x, monster.y - monster.size, `-${this.damage}`, '#ffffff');
                    
                    if (dead) {
                        game.onMonsterKilled(monster);
                    }
                }
            }
        }
    }
    
    /**
     * 更新万剑归宗效果
     * @param {number} dt - 时间间隔
     * @param {Array} monsters - 怪物数组
     * @param {Game} game - 游戏实例
     */
    updateWanJianGuiZong(dt, monsters, game) {
        // 万剑归宗：向周围发射 20 把飞剑
        if (this.timer < 0.5 && !this.spawned) {
            const angleStep = (Math.PI * 2) / DEFINE.WAN_JIAN_GUI_ZONG.SWORD_COUNT;
            for (let i = 0; i < this.radius; i++) {
                const angle = i * angleStep;
                const targetX = this.x + Math.cos(angle) * this.radius;
                const targetY = this.y + Math.sin(angle) * this.radius;
                game.effectManager.createFlyingSword(this.x, this.y, targetX, targetY, this.damage, angle);
            }
            this.spawned = true;
        }
    }
    
    /**
     * 更新天火流星效果
     * @param {number} dt - 时间间隔
     * @param {Array} monsters - 怪物数组
     * @param {Game} game - 游戏实例
     */
    updateTianHuoLiuXing(dt, monsters, game) {
        // 陨石坠落阶段
        if (!this.hasLanded) {
            const t = Math.min(1, this.timer / this.fallDuration);
            // 使用 easeInQuad 加速坠落
            const p = t * t;
            this.x = this.startX + (this.targetX - this.startX) * p;
            this.y = this.startY + (this.targetY - this.startY) * p;

            // 生成火焰尾迹粒子
            if (Math.random() < 0.4) {
                this.particles.push({
                    x: this.x + (Math.random() - 0.5) * 20,
                    y: this.y + (Math.random() - 0.5) * 20,
                    life: 0.3 + Math.random() * 0.3,
                    maxLife: 0.3 + Math.random() * 0.3,
                    size: 5 + Math.random() * 10
                });
            }

            // 落地瞬间
            if (t >= 1) {
                this.hasLanded = true;
                this.x = this.targetX;
                this.y = this.targetY;
                // 落地爆炸伤害
                for (const monster of monsters) {
                    const dist = distance(this.x, this.y, monster.x, monster.y);
                    if (dist < this.radius + monster.size) {
                        const dead = monster.takeDamage(this.damage);
                        game.addFloatingText(monster.x, monster.y - monster.size, `-${this.damage}`, '#ff4500');
                        if (dead) game.onMonsterKilled(monster);
                    }
                }
                game.addFloatingText(this.x, this.y - 30, '天火流星!', '#ff8c00');
            }
            return;
        }

        // 燃烧阶段：持续伤害（每秒一次）
        this.damageTimer = (this.damageTimer || 0) + dt;
        if (this.damageTimer >= 1) {
            this.damageTimer = 0;
            for (const monster of monsters) {
                const dist = distance(this.x, this.y, monster.x, monster.y);
                if (dist < this.radius + monster.size) {
                    const dead = monster.takeDamage(this.burnDamage);
                    game.addFloatingText(monster.x, monster.y - monster.size, `-${this.burnDamage}`, '#ff0000');
                    if (dead) game.onMonsterKilled(monster);
                }
            }
        }

        // 更新尾迹粒子
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.life -= dt;
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    /**
     * 更新龙卷风效果
     * @param {number} dt - 时间间隔
     * @param {Array} monsters - 怪物数组
     * @param {Game} game - 游戏实例
     */
    updateLongJuanFeng(dt, monsters, game) {
        // 龙卷风沿初始方向向外移动
        this.x += Math.cos(this.direction) * this.speed * dt;
        this.y += Math.sin(this.direction) * this.speed * dt;
        this.spin += this.spinSpeed * dt;

        // 每 0.5 秒对范围内怪物造成伤害并吹飞
        this.lastHitTime += dt;
        if (this.lastHitTime >= 0.5) {
            this.lastHitTime = 0;
            for (const monster of monsters) {
                const dist = distance(this.x, this.y, monster.x, monster.y);
                if (dist < this.radius + monster.size) {
                    // 吹飞怪物：沿龙卷风移动方向吹离
                    const blowDist = DEFINE.CAMERA.VIEW_RADIUS * this.blowDistance;
                    monster.x = this.x + Math.cos(this.direction) * blowDist;
                    monster.y = this.y + Math.sin(this.direction) * blowDist;
                    const dead = monster.takeDamage(this.damage);
                    game.addFloatingText(monster.x, monster.y - monster.size, `-${this.damage}`, '#87ceeb');
                    if (dead) game.onMonsterKilled(monster);
                }
            }
        }
    }
    
    /**
     * 更新燕双飞效果
     * @param {number} dt - 时间间隔
     * @param {Array} monsters - 怪物数组
     * @param {Game} game - 游戏实例
     */
    updateYanShuangFei(dt, monsters, game) {
        // 燕双飞：两只燕子以玩家为中心对称环绕飞行
        this.angle += this.orbitSpeed * dt;
        const currentAngle = this.angle + this.angleOffset;
        this.x = game.player.x + Math.cos(currentAngle) * this.distance;
        this.y = game.player.y + Math.sin(currentAngle) * this.distance;

        // 攻击冷却
        this.attackCooldown -= dt;
        if (this.attackCooldown > 0) return;

        // 寻找攻击范围内最近的怪物
        let nearestMonster = null;
        let nearestDist = this.attackRange;
        for (const monster of monsters) {
            const dist = distance(game.player.x, game.player.y, monster.x, monster.y);
            if (dist < nearestDist) {
                nearestDist = dist;
                nearestMonster = monster;
            }
        }

        if (nearestMonster) {
            // 从燕子处射出小石子
            game.effectManager.createStone(this.x, this.y, nearestMonster.x, nearestMonster.y, this.damage);
            this.attackCooldown = this.attackInterval;
        }
    }
    
    /**
     * 更新庚金剑阵效果
     * @param {number} dt - 时间间隔
     * @param {Array} monsters - 怪物数组
     * @param {Game} game - 游戏实例
     */
    updateGengJinJianZhen(dt, monsters, game) {
        // 剑阵整体旋转
        this.rotation += this.rotationSpeed * dt;

        // 降落阶段：剑阵中心从上方落到玩家位置
        if (this.timer < this.fallDuration) {
            const fallProgress = this.timer / this.fallDuration;
            // 使用 easeInQuad 让降落有加速感
            const ease = fallProgress * fallProgress;
            this.centerY = this.y - this.spawnHeightOffset * (1 - ease);
            if (fallProgress >= 1) {
                this.centerY = this.y;
                this.landed = true;
            }
        } else {
            this.centerY = this.y;
            this.landed = true;
        }

        // 更新每把剑的世界坐标（椭圆分布）
        for (const sword of this.swords) {
            const currentAngle = sword.angle + this.rotation;
            sword.x = this.centerX + Math.cos(currentAngle) * this.longAxisRadius;
            sword.y = this.centerY + Math.sin(currentAngle) * this.shortAxisRadius;
        }

        // 落地后才造成伤害和麻痹
        if (!this.landed) return;

        this.lastHitTime += dt;
        if (this.lastHitTime >= this.attackInterval) {
            this.lastHitTime = 0;
            for (const monster of monsters) {
                // 判断怪物是否进入椭圆范围
                const dx = monster.x - this.centerX;
                const dy = monster.y - this.centerY;
                // 椭圆内判定：(dx/a)^2 + (dy/b)^2 <= 1，加上怪物体型容差
                const normalizedDist = (dx * dx) / (this.longAxisRadius * this.longAxisRadius) +
                                       (dy * dy) / (this.shortAxisRadius * this.shortAxisRadius);
                if (normalizedDist <= 1.2) {
                    const dead = monster.takeDamage(this.damage);
                    game.addFloatingText(monster.x, monster.y - monster.size, `-${this.damage}`, '#ffd700');
                    // 添加麻痹效果
                    monster.paralyzed = true;
                    monster.paralyzeTimer = this.paralyzeDuration;
                    if (dead) game.onMonsterKilled(monster);
                }
            }
        }
    }
    
    /**
     * 获取效果进度
     * @returns {number} 效果进度（0-1）
     */
    getProgress() {
        if (this.type === 'flying_sword') {
            return Math.min(1, this.timer / this.lifetime);
        }
        if (this.type === 'talisman') {
            return Math.min(1, this.traveled / this.maxRange);
        }
        if (this.type === 'ultimate') {
            return Math.min(1, this.timer / this.lifetime);
        }
        if (this.type === 'jin_zhong_zhao') {
            return Math.min(1, this.timer / this.lifetime);
        }
        if (this.type === 'lei_guang_dun') {
            return Math.min(1, this.timer / this.lifetime);
        }
        if (this.type === 'hit') {
            return this.timer / this.lifetime;
        }
        return 0;
    }
    
    /**
     * 检查效果是否已过期
     * @returns {boolean} 是否已过期
     */
    isExpired() {
        return this.timer >= this.lifetime;
    }
}

// ==================== 箭头投射物类（穿透）====================
/**
 * 箭头投射物类 - 穿透型投射物
 */
class ArrowProjectile {
    /**
     * 创建箭头投射物
     * @param {number} x - 起始 X 坐标
     * @param {number} y - 起始 Y 坐标
     * @param {number} targetX - 目标 X 坐标
     * @param {number} targetY - 目标 Y 坐标
     * @param {number} damage - 伤害值
     */
    constructor(x, y, targetX, targetY, damage) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.damage = damage;
        this.speed = 600;
        this.size = 10;
        this.lifetime = 3;
        this.timer = 0;
        this.angle = Math.atan2(targetY - y, targetX - x);
        this.hasHit = new Set();
        this.piercing = true;
    }
    
    /**
     * 更新投射物状态
     * @param {number} dt - 时间间隔
     * @param {Array} monsters - 怪物数组
     * @param {Game} game - 游戏实例
     * @returns {boolean} 是否仍然存活
     */
    update(dt, monsters, game) {
        this.timer += dt;
        this.lifetime -= dt;
        
        this.x += Math.cos(this.angle) * this.speed * dt;
        this.y += Math.sin(this.angle) * this.speed * dt;
        
        for (const monster of monsters) {
            const dist = distance(this.x, this.y, monster.x, monster.y);
            if (dist < this.size + monster.size) {
                if (!this.hasHit.has(monster)) {
                    const dead = monster.takeDamage(this.damage);
                    this.hasHit.add(monster);
                    game.addFloatingText(monster.x, monster.y - monster.size, `-${this.damage}`, '#8b4513');
                    game.effectManager.createHit(monster.x, monster.y);
                    if (dead) game.onMonsterKilled(monster);
                }
            }
        }
        
        return this.lifetime > 0;
    }
}

// ==================== 小飞剑投射物（非穿透）====================
/**
 * 小飞剑投射物类 - 非穿透型投射物
 */
class SmallSword {
    /**
     * 创建小飞剑投射物
     * @param {number} x - 起始 X 坐标
     * @param {number} y - 起始 Y 坐标
     * @param {number} targetX - 目标 X 坐标
     * @param {number} targetY - 目标 Y 坐标
     * @param {number} damage - 伤害值
     */
    constructor(x, y, targetX, targetY, damage) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.damage = damage;
        this.speed = 500;
        this.size = 8;
        this.lifetime = 2;
        this.timer = 0;
        this.angle = Math.atan2(targetY - y, targetX - x);
        this.hitMonster = null;
    }
    
    /**
     * 更新投射物状态
     * @param {number} dt - 时间间隔
     * @param {Array} monsters - 怪物数组
     * @param {Game} game - 游戏实例
     * @returns {boolean} 是否仍然存活
     */
    update(dt, monsters, game) {
        this.timer += dt;
        this.lifetime -= dt;
        
        this.x += Math.cos(this.angle) * this.speed * dt;
        this.y += Math.sin(this.angle) * this.speed * dt;
        
        for (const monster of monsters) {
            if (this.hitMonster === monster) continue;
            const dist = distance(this.x, this.y, monster.x, monster.y);
            if (dist < this.size + monster.size) {
                const dead = monster.takeDamage(this.damage);
                this.hitMonster = monster;
                game.addFloatingText(monster.x, monster.y - monster.size, `-${this.damage}`, '#ff0000', true);
                game.effectManager.createHit(monster.x, monster.y);
                if (dead) game.onMonsterKilled(monster);
                break;
            }
        }
        
        return this.lifetime > 0 && this.hitMonster === null;
    }
}

// ==================== 火球投射物 =====================
/**
 * 火球投射物类
 */
class Fireball {
    /**
     * 创建火球投射物
     * @param {number} x - 起始 X 坐标
     * @param {number} y - 起始 Y 坐标
     * @param {number} targetX - 目标 X 坐标
     * @param {number} targetY - 目标 Y 坐标
     * @param {number} damage - 伤害值
     */
    constructor(x, y, targetX, targetY, damage) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.damage = damage;
        this.speed = 400;
        this.size = 12;
        this.lifetime = 2;
        this.timer = 0;
        this.angle = Math.atan2(targetY - y, targetX - x);
        this.hitMonster = null;
    }
    
    /**
     * 更新投射物状态
     * @param {number} dt - 时间间隔
     * @param {Array} monsters - 怪物数组
     * @param {Game} game - 游戏实例
     * @returns {boolean} 是否仍然存活
     */
    update(dt, monsters, game) {
        this.timer += dt;
        this.lifetime -= dt;
        
        this.x += Math.cos(this.angle) * this.speed * dt;
        this.y += Math.sin(this.angle) * this.speed * dt;
        
        for (const monster of monsters) {
            if (this.hitMonster === monster) continue;
            const dist = distance(this.x, this.y, monster.x, monster.y);
            if (dist < this.size + monster.size) {
                const dead = monster.takeDamage(this.damage);
                this.hitMonster = monster;
                game.addFloatingText(monster.x, monster.y - monster.size, `-${this.damage}`, '#ff0000', true);
                game.effectManager.createHit(monster.x, monster.y);
                if (dead) game.onMonsterKilled(monster);
                break;
            }
        }
        
        return this.lifetime > 0 && this.hitMonster === null;
    }
}

// ==================== 闪电下劈特效 =====================
/**
 * 闪电下劈特效类
 */
class LightningStrike {
    /**
     * 创建闪电下劈特效
     * @param {number} x - 中心 X 坐标
     * @param {number} y - 中心 Y 坐标
     * @param {number} radius - 影响半径
     * @param {number} damage - 伤害值
     * @param {Array} monsters - 怪物数组
     * @param {Game} game - 游戏实例
     */
    constructor(x, y, radius, damage, monsters, game) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.damage = damage;
        this.lifetime = 0.3;
        this.timer = 0;
        this.hasHit = new Set();
        
        for (const monster of monsters) {
            const dist = distance(this.x, this.y, monster.x, monster.y);
            if (dist <= this.radius + monster.size) {
                const dead = monster.takeDamage(this.damage);
                this.hasHit.add(monster);
                game.addFloatingText(monster.x, monster.y - monster.size, `-${this.damage}`, '#ff0000', true);
                game.effectManager.createHit(monster.x, monster.y);
                if (dead) game.onMonsterKilled(monster);
            }
        }
    }
    
    /**
     * 更新特效状态
     * @param {number} dt - 时间间隔
     * @returns {boolean} 是否仍然存活
     */
    update(dt) {
        this.timer += dt;
        return this.timer < this.lifetime;
    }
    
    /**
     * 获取特效进度
     * @returns {number} 特效进度（0-1）
     */
    getProgress() {
        return this.timer / this.lifetime;
    }
}

// ==================== 效果管理器 ====================
/**
 * 效果管理器 - 管理所有技能效果和投射物
 */
class EffectManager {
    /**
     * 创建效果管理器实例
     */
    constructor() {
        this.effects = [];
        this.projectiles = [];
    }
    
    /**
     * 重置效果管理器
     */
    reset() {
        this.effects = [];
        this.projectiles = [];
    }
    
    /**
     * 创建飞剑效果
     * @param {number} x - 起始 X 坐标
     * @param {number} y - 起始 Y 坐标
     * @param {number} targetX - 目标 X 坐标
     * @param {number} targetY - 目标 Y 坐标
     * @param {number} damage - 伤害值
     * @param {number|null} customAngle - 自定义角度（可选）
     */
    createFlyingSword(x, y, targetX, targetY, damage, customAngle = null) {
        const angle = customAngle !== null ? customAngle : Math.atan2(targetY - y, targetX - x);
        this.effects.push(new Effect('flying_sword', x, y, {
            targetX, targetY, damage, angle,
            lifetime: DEFINE.FLYING_SWORD.LIFETIME,
            speed: DEFINE.FLYING_SWORD.SPEED
        }));
    }

    /**
     * 创建小石子效果（燕双飞使用）
     * @param {number} x - 起始 X 坐标
     * @param {number} y - 起始 Y 坐标
     * @param {number} targetX - 目标 X 坐标
     * @param {number} targetY - 目标 Y 坐标
     * @param {number} damage - 伤害值
     */
    createStone(x, y, targetX, targetY, damage) {
        const angle = Math.atan2(targetY - y, targetX - x);
        this.effects.push(new Effect('stone', x, y, {
            targetX, targetY, damage, angle,
            lifetime: DEFINE.FLYING_SWORD.LIFETIME,
            speed: DEFINE.FLYING_SWORD.SPEED,
            size: 5
        }));
    }
    
    /**
     * 创建符箓效果
     * @param {number} x - 起始 X 坐标
     * @param {number} y - 起始 Y 坐标
     * @param {number} angle - 飞行角度
     * @param {number} damage - 伤害值
     */
    createTalisman(x, y, angle, damage) {
        this.effects.push(new Effect('talisman', x, y, {
            angle, damage,
            lifetime: DEFINE.TALISMAN.LIFETIME,
            speed: DEFINE.TALISMAN.SPEED,
            width: 30,
            maxRange: DEFINE.TALISMAN.MAX_RANGE
        }));
    }
    
    /**
     * 创建绝招效果
     * @param {number} x - 中心 X 坐标
     * @param {number} y - 中心 Y 坐标
     * @param {number} radius - 影响半径
     * @param {number} damage - 伤害值
     */
    createUltimate(x, y, radius, damage) {
        this.effects.push(new Effect('ultimate', x, y, {
            radius, damage,
            lifetime: 0.5
        }));
    }
    
    /**
     * 创建命中特效
     * @param {number} x - X 坐标
     * @param {number} y - Y 坐标
     */
    createHit(x, y) {
        this.effects.push(new Effect('hit', x, y, { lifetime: 0.15 }));
    }
    
    /**
     * 创建金钟罩效果
     * @param {number} x - 中心 X 坐标
     * @param {number} y - 中心 Y 坐标
     * @param {number} radius - 半径
     * @param {number} duration - 持续时间
     */
    createJinZhang(x, y, radius, duration) {
        this.effects.push(new Effect('jin_zhong_zhao', x, y, {
            radius, duration,
            lifetime: duration
        }));
    }
    
    /**
     * 创建雷光盾效果
     * @param {number} x - 中心 X 坐标
     * @param {number} y - 中心 Y 坐标
     * @param {number} radius - 半径
     * @param {number} damage - 伤害值
     * @param {number} duration - 持续时间
     */
    createLeiGuang(x, y, radius, damage, duration) {
        this.effects.push(new Effect('lei_guang_dun', x, y, {
            radius, damage, duration,
            lifetime: duration
        }));
    }
    
    /**
     * 创建箭头投射物
     * @param {number} x - 起始 X 坐标
     * @param {number} y - 起始 Y 坐标
     * @param {number} targetX - 目标 X 坐标
     * @param {number} targetY - 目标 Y 坐标
     * @param {number} damage - 伤害值
     */
    createArrowProjectile(x, y, targetX, targetY, damage) {
        this.projectiles.push(new ArrowProjectile(x, y, targetX, targetY, damage));
    }
    
    /**
     * 创建小飞剑投射物
     * @param {number} x - 起始 X 坐标
     * @param {number} y - 起始 Y 坐标
     * @param {number} targetX - 目标 X 坐标
     * @param {number} targetY - 目标 Y 坐标
     * @param {number} damage - 伤害值
     */
    createSmallSword(x, y, targetX, targetY, damage) {
        this.projectiles.push(new SmallSword(x, y, targetX, targetY, damage));
    }
    
    /**
     * 创建火球投射物
     * @param {number} x - 起始 X 坐标
     * @param {number} y - 起始 Y 坐标
     * @param {number} targetX - 目标 X 坐标
     * @param {number} targetY - 目标 Y 坐标
     * @param {number} damage - 伤害值
     */
    createFireball(x, y, targetX, targetY, damage) {
        this.projectiles.push(new Fireball(x, y, targetX, targetY, damage));
    }
    
    /**
     * 创建闪电下劈特效
     * @param {number} x - 中心 X 坐标
     * @param {number} y - 中心 Y 坐标
     * @param {number} radius - 影响半径
     * @param {number} damage - 伤害值
     * @param {Array} monsters - 怪物数组
     * @param {Game} game - 游戏实例
     */
    createLightningStrike(x, y, radius, damage, monsters, game) {
        this.effects.push(new LightningStrike(x, y, radius, damage, monsters, game));
    }
    
    /**
     * 创建万剑归宗效果
     * @param {number} x - 中心 X 坐标
     * @param {number} y - 中心 Y 坐标
     * @param {number} damage - 伤害值
     * @param {number} swordCount - 飞剑数量
     */
    createWanJianGuiZong(x, y, damage, swordCount) {
        this.effects.push(new Effect('wan_jian_jue', x, y, {
            damage, swordCount, radius: 200
        }));
    }
    
    /**
     * 创建天火流星效果
     * @param {number} x - 中心 X 坐标（玩家位置）
     * @param {number} y - 中心 Y 坐标（玩家位置）
     * @param {number} damage - 伤害值
     * @param {number} duration - 燃烧持续时间
     * @param {number} count - 陨石数量
     * @param {number} radius - 坠落范围半径
     */
    createTianHuoLiuXing(x, y, damage, duration, count = 8, radius = 350) {
        for (let i = 0; i < count; i++) {
            // 在目标范围内随机选择落点
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * radius;
            const targetX = x + Math.cos(angle) * dist;
            const targetY = y + Math.sin(angle) * dist;
            // 陨石从屏幕上方外开始，x 方向带一点随机偏移
            const startX = targetX + (Math.random() - 0.5) * 200;
            const startY = y - DEFINE.CANVAS_HEIGHT * 0.8 - Math.random() * 200;
            this.effects.push(new Effect('tian_huo_liu_xing', targetX, targetY, {
                damage,
                duration,
                radius: 80,
                fallDuration: 0.5 + Math.random() * 0.4,
                startX,
                startY,
                targetX,
                targetY
            }));
        }
    }
    
    /**
     * 创建龙卷风效果
     * @param {number} x - 玩家 X 坐标
     * @param {number} y - 玩家 Y 坐标
     * @param {number} damage - 伤害值
     * @param {number} duration - 持续时间
     * @param {number} blowDistance - 吹飞距离比例
     * @param {number} count - 龙卷风数量
     */
    createLongJuanFeng(x, y, damage, duration, blowDistance, count = 3) {
        for (let i = 0; i < count; i++) {
            // 随机 3 个方向，彼此之间至少间隔 60 度，避免过于集中
            const direction = Math.random() * Math.PI * 2;
            this.effects.push(new Effect('long_juan_feng', x, y, {
                damage,
                duration,
                blowDistance,
                radius: 60,
                direction,
                speed: DEFINE.LONG_JUAN_FENG.SPEED,
                spinSpeed: 8
            }));
        }
    }
    
    /**
     * 创建燕双飞效果
     * @param {number} angle - 初始角度
     * @param {number} distance - 环绕距离
     * @param {number} damage - 伤害值
     * @param {number} duration - 持续时间（秒）
     */
    createYanShuangFei(angle, distance, damage, duration) {
        // 创建两只对称环绕的燕子
        this.effects.push(new Effect('yan_shuang_fei', 0, 0, {
            angle, distance, damage, duration,
            angleOffset: 0,
            orbitSpeed: 2.5
        }));
        this.effects.push(new Effect('yan_shuang_fei', 0, 0, {
            angle, distance, damage, duration,
            angleOffset: Math.PI,
            orbitSpeed: 2.5
        }));
    }
    
    /**
     * 创建庚金剑阵效果
     * @param {number} x - 中心 X 坐标
     * @param {number} y - 中心 Y 坐标
     * @param {number} damage - 伤害值
     * @param {number} paralyzeDuration - 麻痹持续时间
     */
    createGengJinJianZhen(x, y, damage, paralyzeDuration) {
        this.effects.push(new Effect('geng_jin_jian_zhen', x, y, {
            damage, paralyzeDuration
        }));
    }
    
    /**
     * 更新所有效果和投射物
     * @param {number} dt - 时间间隔
     * @param {Array} monsters - 怪物数组
     * @param {Game} game - 游戏实例
     */
    update(dt, monsters, game) {
        for (let i = this.effects.length - 1; i >= 0; i--) {
            const effect = this.effects[i];
            let alive;
            if (effect instanceof LightningStrike) {
                alive = effect.update(dt);
            } else {
                alive = effect.update(dt, monsters, game);
            }
            
            if (!alive || effect.isExpired()) {
                this.effects.splice(i, 1);
            }
        }
        
        // Update projectiles
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const proj = this.projectiles[i];
            const alive = proj.update(dt, monsters, game);
            
            if (!alive) {
                this.projectiles.splice(i, 1);
            }
        }
    }
    
    /**
     * 获取效果数量
     * @returns {number} 效果数量
     */
    getEffectCount() {
        return this.effects.length;
    }
}
