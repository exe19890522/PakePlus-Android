// ==================== 主游戏类 ====================
import {dataMgr} from './core/dataMgr.js';
import {uiMgr} from './ui/uiMgr.js';
import {MaterialDropManager} from './core/models.js';
import Player from './entity/player.js';

/**
 * 主游戏类 - 管理游戏的核心逻辑、渲染和状态
 */
class Game {
    /**
     * 创建游戏实例
     */
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        this.state = GameState.MENU;
        this.lastTime = 0;// 上次更新时间戳
        this.accumTime = 0;// 累计时间
        this.updateInterval = 0.1;// 更新间隔
        
        // 定时存档相关
        this.autoSaveInterval = 5 * 60 * 1000; // 5分钟
        this.lastSaveTime = Date.now();
        
        // 疲劳点恢复相关
        this.fatigueRecoverInterval = 60 * 60 * 1000; // 1小时
        this.lastFatigueRecoverTime = Date.now();
        
        // 检查是否需要重置疲劳点（每天24点）
        this.checkFatigueReset();
        
        // 摄像机偏移，跟随主角
        this.cameraX = 0;
        this.cameraY = 0;
        
        // 角色名称
        this.playerName = '未命名';
        
        // Managers
        this.initManagers();

        this.waveManager = new WaveManager();
        this.dropManager = new DropManager();
        this.effectManager = new EffectManager();
        this.renderer = new Renderer(this.ctx, this.canvas);
        this.skillBoxManager = new SkillBoxManager();
        this.towerBoxManager = new TowerBoxManager();
        this.towerManager = new TowerManager();
        this.materialDropManager = new MaterialDropManager();
        this.petManager = new PetManager();
        
        // 飘字效果
        this.floatingTexts = [];
        
        // 副本地图中的实例
        this.player = null;
        this.monsters = [];
        
        // Bind UI
        uiMgr.bindElements();
        this.bindUIEvents();
        
        // Joystick
        this.joystick = new JoystickController(
            document.getElementById('joystick-base'),
            document.getElementById('joystick-thumb')
        );
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    /**
     * 初始化管理器
     */
    async initManagers() {
        await dataMgr.init();
        uiMgr.init();
        // 加载商城商品列表
        uiMgr.loadShopItems();
    }
    
    /**
     * 调整画布大小
     */
    resizeCanvas() {
        const container = document.getElementById('game-container');
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
    }
    
    /**
     * 绑定 UI 事件
     */
    bindUIEvents() {
        // Ad button
        uiMgr.elements.adBtn.addEventListener('click', () => this.watchAd());
    }
    
    /**
     * 检查并重置疲劳点（每天24点）
     */
    checkFatigueReset() {
        const roleData = dataMgr.getRoleData();
        if (!roleData) return;
        
        const now = new Date();
        const lastResetDate = roleData.fatigueResetDate;
        const todayStr = now.toDateString();
        
        if (lastResetDate !== todayStr) {
            roleData.fatigue = 120;
            roleData.fatigueResetDate = todayStr;
            dataMgr.saveLocal();
            console.log('疲劳点已重置为120');
        }
    }
    
    /**
     * 恢复疲劳点（每小时+20）
     */
    recoverFatigue() {
        const currentTime = Date.now();
        if (currentTime - this.lastFatigueRecoverTime >= this.fatigueRecoverInterval) {
            const roleData = dataMgr.getRoleData();
            if (roleData && roleData.fatigue < 120) {
                roleData.fatigue = Math.min(120, roleData.fatigue + 20);
                dataMgr.saveLocal();
                console.log(`疲劳点恢复: ${roleData.fatigue}`);
            }
            this.lastFatigueRecoverTime = currentTime;
        }
    }
    
    /**
     * 消耗疲劳点进入副本
     * @param {string} difficulty - 难度：easy(轻松), normal(普通), hard(困难)
     * @returns {boolean} - 是否消耗成功
     */
    consumeFatigue(difficulty) {
        const costMap = {
            easy: 2,
            normal: 3,
            hard: 4
        };
        
        const cost = costMap[difficulty] || 2;
        const roleData = dataMgr.getRoleData();
        
        if (!roleData || roleData.fatigue < cost) {
            return false;
        }
        
        roleData.fatigue -= cost;
        dataMgr.saveLocal();
        return true;
    }
    
    /**
     * 获取当前疲劳点
     * @returns {number} - 当前疲劳点数值
     */
    getFatigue() {
        const roleData = dataMgr.getRoleData();
        return roleData ? roleData.fatigue : 0;
    }
    
    /**
     * 开始游戏
     */
    startGame(dungeonId) {
        this.state = GameState.PLAYING;
        uiMgr.showGameScreen();
        uiMgr.hideGameOver();
        uiMgr.hideLevelUpPanel();
        uiMgr.clearBattleLog();
        console.warn('===开始游戏：',dungeonId);
        this.initGame();
        let roleD = dataMgr.getRoleData();
        // 记录进入战场时的等级
        this.entryLevel = roleD.level;
        
        // 初始化玩家等级和经验
        this.player.level = roleD.level;
        this.player.exp = 0;
        this.player.expToNext = (this.player.level - 1) * 200 + 50 + 100 * Math.floor(this.player.level / 5);
    
        
        // 设置当前副本ID，用于后续结算
        this.currentDungeonId = dungeonId;
        
        this.waveManager.startWave();
        
        // Spawn elite if needed
        if (this.waveManager.shouldSpawnElite()) {
            this.spawnEliteMonster();
        }
        
        // Spawn boss if needed
        if (this.waveManager.shouldSpawnBoss()) {
            this.spawnBossMonster();
        }
        
        // 创建宠物实例
        if (this.petManager) {
            this.petManager.createPet(this.player);
        }
        // 初始化游戏循环:设置当前时间戳
        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.gameLoop(t));
    }
    
    /**
     * 初始化游戏状态
     */
    initGame() {
        //初始化战斗角色：复制属性和已激活技能
        this.player = new Player(0, 0);
        this.player.init(dataMgr.getRoleData());
        console.warn('===战斗角色：',this.player);
        //重置相关管理器
        this.monsters = [];
        this.waveManager.reset();
        this.dropManager.reset();
        this.effectManager.reset();
        this.skillBoxManager.reset();
        this.towerBoxManager.reset();
        this.towerManager.reset();
        this.materialDropManager.reset();
  
        // 战斗开局：立即激活已激活的持续型技能
        this.activateInitialSkills();
        
        // 刷新技能栏：显示已激活的技能图标
        if (window.uiMgr && window.uiMgr.updatePlayer) {
            window.uiMgr.updatePlayer(this.player);
        }
    }
    
    /**
     * 在战斗开始时立即激活所有已激活的持续型技能
     */
    activateInitialSkills() {
        const skills = this.player.skills;
        // 角色存档中的技能必然是已学习的，此处无需再检查 isLearned
        // 金钟罩：立即开启护盾
        if (skills.jin_zhong_zhao) {
            this.useJinZhang();
        }

        // 雷光盾：立即开启电光圈
        if (skills.lei_guang_dun) {
            this.useLeiGuang();
        }
        
        // 瞬发型技能（飞剑、符箓、绝招、万剑归宗等）由 update 循环自动触发

        let activeNames = '';
        for(let key in skills){
            let skillT = dataMgr.getSkillInfo(key);
            activeNames += skillT.name + ', ';
        }
        if (activeNames) {
            console.log('=== 战斗开局已激活技能:', activeNames);
        }
    }
    
    /**
     * 游戏主循环
     * @param {number} timestamp - 当前时间戳
     */
    gameLoop(timestamp) {
        if (this.state !== GameState.PLAYING) return;
        
        const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
        this.lastTime = timestamp;
        
        // 检查定时存档
        const currentTime = Date.now();
        if (currentTime - this.lastSaveTime >= this.autoSaveInterval) {
            this.lastSaveTime = currentTime;
            dataMgr.saveLocal();
            console.log('定时存档完成');
        }
        
        // 检查疲劳点恢复
        this.recoverFatigue();
        
        this.accumTime += dt;
        if (this.accumTime >= this.updateInterval) {
            this.accumTime = 0;
            this.update(this.updateInterval);
        }
        
        this.render();
        requestAnimationFrame((t) => this.gameLoop(t));
    }
    
    /**
     * 更新游戏状态
     * @param {number} dt - 时间间隔（秒）
     */
    update(dt) {
        // Player
        const dir = this.joystick.getDirection();
        this.player.move(dir.x, dir.y, dt);
        this.player.update(dt);
        
        // 更新摄像机跟随主角
        this.cameraX = this.player.x - this.canvas.width / 2;
        this.cameraY = this.player.y - this.canvas.height / 2;
        
        // 飞剑自动攻击
        this.player.flyingSwordTimer += dt;
        const attackInterval = this.player.getFlyingSwordInterval();
        if (this.player.flyingSwordTimer >= attackInterval) {
            this.player.flyingSwordTimer = 0;
            this.useFlyingSword();
        }
        //console.warn('=== 自动使用符箓:', this.monsters.length, this.player.skills, this.player.isSkillUsable('talisman'));
        // 自动使用符箓
        if (this.monsters.length > 0 && this.player.isSkillUsable('talisman')) {
            this.useTalisman();
        }
        
        // 自动使用绝招，需要有爆气丸
        if (this.monsters.length > 0 && this.player.qiPills > 0 && this.player.isSkillUsable('ultimate')) {
            this.useUltimate();
        }
        
        // 自动使用金钟罩
        if (this.monsters.length > 0 && this.player.isSkillUsable('jin_zhong_zhao')) {
            this.useJinZhang();
        }
        
        // 自动使用雷光盾
        if (this.monsters.length > 0 && this.player.isSkillUsable('lei_guang_dun')) {
            this.useLeiGuang();
        }
        
        // 自动使用万剑归宗
        if (this.monsters.length > 0 && this.player.isSkillUsable('wan_jian_jue')) {
            this.useWanJianGuiZong();
        }
        
        // 自动使用天火流星
        if (this.monsters.length > 0 && this.player.isSkillUsable('tian_huo_liu_xing')) {
            this.useTianHuoLiuXing();
        }

        // 自动使用龙卷风
        if (this.monsters.length > 0 && this.player.isSkillUsable('long_juan_feng')) {
            this.useLongJuanFeng();
        }

        // 自动使用燕双飞
        if (this.monsters.length > 0 && this.player.isSkillUsable('yan_shuang_fei')) {
            this.useYanShuangFei();
        }

        // 自动使用庚金剑阵
        if (this.monsters.length > 0 && this.player.isSkillUsable('geng_jin_jian_zhen')) {
            this.useGengJinJianZhen();
        }
        
        // 更新技能冷却时间
        this.player.updateSkillsCooldown(dt);
        
        // 更新玩家金钟罩状态
        this.player.jinZhongZhaoActive = false;
        for (const effect of this.effectManager.effects) {
            if (effect.type === 'jin_zhong_zhao') {
                this.player.jinZhongZhaoActive = true;
                break;
            }
        }
        
        // 计算怪物消失距离
        const despawnDist = DEFINE.CAMERA.VIEW_RADIUS * DEFINE.CAMERA.DESPAWN_MULTIPLIER;
        const aliveTowers = this.towerManager.getAliveTowers();
        
        // 更新怪物状态
        for (let i = this.monsters.length - 1; i >= 0; i--) {
            const monster = this.monsters[i];
            monster.update(dt, this.player.x, this.player.y, aliveTowers);
            
            // 检查是否离开视野
            const distToPlayer = distance(monster.x, monster.y, this.player.x, this.player.y);
            if (distToPlayer > despawnDist) {
                console.log(`Monster ${monster.type} left view and despawned`);
                this.monsters.splice(i, 1);
                continue;
            }
            
            // 找到攻击目标（优先考虑塔）
            let attackTarget = null;
            let attackDist = Infinity;
            
            // 检查塔是否在攻击范围内
            for (const tower of aliveTowers) {
                const dist = distance(monster.x, monster.y, tower.x, tower.y);
                if (dist < monster.size + tower.size + 30 && dist < attackDist) {
                    attackDist = dist;
                    attackTarget = tower;
                }
            }
            
            // 如果没有塔在攻击范围内，攻击玩家
            if (!attackTarget && distToPlayer < monster.size + 25 && monster.canAttack()) {
                monster.resetAttackTimer();
                const damage = this.player.takeDamage(monster.attack);
                console.log(`Monster attacked player for ${damage}`);
            }
            
            // 攻击塔
            if (attackTarget && monster.canAttack()) {
                monster.resetAttackTimer();
                attackTarget.takeDamage(monster.attack);
                console.log(`Monster attacked tower for ${monster.attack}`);
            }
            
            // 复oss特殊攻击（仅对玩家生效）
            if (monster.type === 'boss' && monster.canSpecialAttack()) {
                monster.resetSpecialAttackTimer();
                const specialDamage = this.player.takeDamage(Math.floor(monster.attack * 1.5));
                console.log(`Boss special attack for ${specialDamage}`);
            }
        }
        
        // 更新掉落物状态
        const didLevelUp = this.dropManager.update(dt, this.player);
        if (didLevelUp) {
            this.showSelectPanel();
        }
        
        // 更新材料掉落
        this.materialDropManager.update(dt, this.player.x, this.player.y);
        this.materialDropManager.checkPickup(this.player.x, this.player.y);
        
        // 更新技能书拾取
        this.checkSkillBookPickup();
        
        // 更新技能箱子状态
        this.skillBoxManager.update(dt, this.player.x, this.player.y, this.canvas.width, this.canvas.height);
        if (this.skillBoxManager.checkPickup(this.player.x, this.player.y)) {
            this.showSelectPanel();
        }
        
        // 更新塔箱子状态
        this.towerBoxManager.update(dt, this.player.x, this.player.y, this.canvas.width, this.canvas.height);
        const towerBox = this.towerBoxManager.checkPickup(this.player.x, this.player.y);
        if (towerBox) {
            const types = ['arrow', 'fire', 'lightning'];
            const type = types[Math.floor(Math.random() * types.length)];
            this.towerManager.spawnTower(towerBox.x, towerBox.y, type);
        }
        
        // 更新塔状态
        this.towerManager.update(dt, this.monsters, this);
        
        // 更新效果状态
        this.effectManager.update(dt, this.monsters, this);
        
        // 更新宠物状态
        if (this.petManager && this.petManager.pet) {
            const pet = this.petManager.pet;
            pet.update(this.player, dt * 1000);
            
            const currentTime = Date.now();
            pet.attack(this.monsters, currentTime);
            pet.support(this.player, this.monsters, currentTime);
            pet.heal(this.player, currentTime);
        }
        
        // 移除死亡怪物
        for (let i = this.monsters.length - 1; i >= 0; i--) {
            if (!this.monsters[i].isAlive()) {
                this.monsters.splice(i, 1);
            }
        }
        
        // 更新怪物波状态
        this.waveManager.update(dt, this.canvas.width, this.canvas.height, (monster) => {
            this.monsters.push(monster);
        });
        
        // 检查怪物波是否完成
        if (this.waveManager.isWaveActive && 
            this.waveManager.monstersToSpawn === 0 && 
            this.monsters.length === 0) {
            this.waveManager.onMonstersCleared();
            
            if (this.waveManager.isComplete()) {
                this.gameOver(true);
            } else {
                setTimeout(() => {
                    if (this.state === GameState.PLAYING) {
                        this.waveManager.startWave();
                        
                        if (this.waveManager.shouldSpawnElite()) {
                            this.spawnEliteMonster();
                        }
                        if (this.waveManager.shouldSpawnBoss()) {
                            this.spawnBossMonster();
                        }
                    }
                }, DEFINE.WAVE.INTERVAL * 1000);
            }
        }
        
        // UI
        //uiMgr.updatePlayer(this.player);
        uiMgr.updateSkillCooldowns(this.player);
        const hasBoss = this.monsters.some(m => m.type === 'boss');
        uiMgr.updateWave(this.waveManager, hasBoss);
        
        // 检查玩家是否死亡（在UI更新之后）
        if (!this.player.isAlive()) {
            this.gameOver(false);
            return;
        }
    }
    
    /**
     * 使用飞剑技能 默认不耗蓝
     */
    useFlyingSword() {
        if (this.monsters.length === 0) return;
        // 触发攻击动画
        this.player.triggerAttackAnim();
        // 查找最近的怪物
        let nearest = null;
        let nearestDist = Infinity;
        
        for (const monster of this.monsters) {
            const dist = distance(this.player.x, this.player.y, monster.x, monster.y);
            if (dist < nearestDist) {
                nearestDist = dist;
                nearest = monster;
            }
        }
        
        if (!nearest) return;
        // 计算伤害
        let att = dataMgr.getRoleData().attribute;
        console.warn('属性攻击值:',att.attack,',p属性:',this.player.attack);
        const damage = this.player.getFlyingSwordDamage();
        // 计算飞剑数量
        const count = this.player.getFlyingSwordCount();
        const baseAngle = Math.atan2(nearest.y - this.player.y, nearest.x - this.player.x);
        
        // 使用配置的角度间隔：CONFIG.FLYING_SWORD.ANGLE_INTERVAL
        const angleInterval = DEFINE.FLYING_SWORD.ANGLE_INTERVAL * Math.PI / 180;
        
        for (let i = 0; i < count; i++) {
            let angle;
            if (count === 1) {
                angle = baseAngle;
            } else {
                const offset = (i - (count - 1) / 2) * angleInterval;
                angle = baseAngle + offset;
            }
            
            this.effectManager.createFlyingSword(
                this.player.x,
                this.player.y,
                nearest.x,
                nearest.y,
                damage,
                angle
            );
        }
        
        console.log(`飞剑攻击：数量=${count}, 目标角度=${(baseAngle * 180 / Math.PI).toFixed(1)}°`);
    }
    
    /**
     * 使用符箓技能 耗蓝
     */
    useTalisman() {
        if (!this.player.isSkillUsable('talisman')) return;
        if (this.monsters.length === 0) return;
    
        // 查找最近的怪物
        let nearest = null;
        let nearestDist = DEFINE.CAMERA.VIEW_RADIUS;
        for (const monster of this.monsters) {
            const dist = distance(this.player.x, this.player.y, monster.x, monster.y);
            if (dist < nearestDist) {
                nearestDist = dist;
                nearest = monster;
                break;// 找到最近的怪物后，跳出循环
            }
        }
        console.warn('符稿攻击,nearest:',nearest);
        if (!nearest) return;//攻击距离内无怪物,则不攻击

        let skillT = dataMgr.getSkillInfo('talisman');
        if (!this.player.consumeMp(skillT.mpCost||0)) return;

        const damage = this.player.getTalismanDamage();
        const count = DEFINE.TALISMAN.COUNT;
        const baseAngle = Math.atan2(nearest.y - this.player.y, nearest.x - this.player.x);
        
        // 使用配置的角度偏移：CONFIG.TALISMAN.ANGLE_OFFSET
        const offsets = [];
        const angleOffset = DEFINE.TALISMAN.ANGLE_OFFSET;
        for (let i = 0; i < count; i++) {
            const offsetAngle = baseAngle + (i - (count - 1) / 2) * angleOffset * Math.PI / 180;
            offsets.push(offsetAngle);
        }
        
        for (let i = 0; i < count; i++) {
            this.effectManager.createTalisman(
                this.player.x,
                this.player.y,
                offsets[i],
                damage
            );
        }
        //重置冷却时间
        this.player.resetSkillCooldown('talisman');
        console.log(`符箓攻击：数量=${count}, 目标角度=${(baseAngle * 180 / Math.PI).toFixed(1)}°`);
        
        // 触发攻击动画
        this.player.triggerAttackAnim();
    }
    
    /**
     * 使用绝招技能,不消耗法力 只消耗爆气丸的技能
     */
    useUltimate() {
        if (!this.player.isSkillUsable('ultimate')) return;
        if (this.player.qiPills === 0) return;
        
        const qiPills = this.player.useQiPills();
        // 使用 player 的伤害和半径计算
        const baseRadius = this.player.getUltimateRadius();
        const baseDamage = this.player.getUltimateDamage();
        // 爆气丸增强：1 颗=130%, 2 颗=160%, 3 颗=200%
        const damageMultiplier = qiPills === 1 ? 1.3 : qiPills === 2 ? 1.6 : 2.0;
        const radius = baseRadius * (1 + (qiPills - 1) * 0.15);
        const damage = baseDamage * damageMultiplier;
        
        console.log(`绝招释放：半径=${radius.toFixed(1)}, 伤害=${damage.toFixed(1)}, 爆气丸=${qiPills}`);
        //重置冷却时间
        this.player.resetSkillCooldown('ultimate');
        this.effectManager.createUltimate(this.player.x, this.player.y, radius, damage);
    }
    
    /**
     * 使用金钟罩技能
     */
    useJinZhang() {
        if (!this.player.isSkillUsable('jin_zhong_zhao')) return;
        const duration = this.player.getSkillMaxCooldown('jin_zhong_zhao');
        const radius = DEFINE.JIN_ZHONG_ZHAO.RADIUS;
        //重置冷却时间
        this.player.resetSkillCooldown('jin_zhong_zhao');

        this.effectManager.createJinZhang(this.player.x, this.player.y, radius, duration);
        console.log(`金钟罩激活：持续${duration}秒`);
    }
    
    /**
     * 使用雷光盾技能
     */
    useLeiGuang() {
        if (!this.player.isSkillUsable('lei_guang_dun')) return;
        let skillL = dataMgr.getSkillInfo('lei_guang_dun');
        if (!this.player.consumeMp(skillL.mpCost||0)) return;
        
        const skill = this.player.skills.lei_guang_dun;
        const damage = skill.damage + (skill.level - 1) * 5;
        const radius = skill.radius;
        const duration = 5;
        
        //重置冷却时间
        this.player.resetSkillCooldown('lei_guang_dun');
        
        this.effectManager.createLeiGuang(this.player.x, this.player.y, radius, damage, duration);
        console.log(`雷光盾激活：伤害=${damage}, 半径=${radius}`);
    }
    /**
     * 使用万剑归宗技能
     * 以角色为中心一次性向周围发射多把飞剑
     */
    useWanJianGuiZong() {
        if (!this.player.isSkillUsable('wan_jian_jue')) return;
        let skillW = dataMgr.getSkillInfo('wan_jian_jue');
        if (!this.player.consumeMp(skillW.mpCost||0)) return;
        
        // 从 DEFINE 读取配置
        const config = DEFINE.WAN_JIAN_GUI_ZONG;
        const skill = this.player.skills.wan_jian_jue;
        const level = skill.level || 1;
        const damage = config.BASE_DAMAGE + (level - 1) * config.DAMAGE_PER_LEVEL;
        const count = config.SWORD_COUNT;
        const radius = config.CIRCLE_RADIUS;
        
        // 重置冷却时间
        this.player.resetSkillCooldown('wan_jian_jue');
        
        // 触发攻击动画
        this.player.triggerAttackAnim();
        
        // 沿圆周均匀分布生成飞剑
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;  // 均匀分布
            // 飞剑从中心位置开始发射，沿着 angle 方向飞向远端
            const targetX = this.player.x + Math.cos(angle) * radius;
            const targetY = this.player.y + Math.sin(angle) * radius;
            this.effectManager.createFlyingSword(
                this.player.x,
                this.player.y,
                targetX,
                targetY,
                damage,
                angle
            );
        }
        
        // 添加日志
        if (window.uiMgr && window.uiMgr.addBattleLog) {
            window.uiMgr.addBattleLog(`万剑归宗：发射 ${count} 把飞剑`, 'skill');
        }
        
        console.log(`万剑归宗：数量=${count}, 伤害=${damage}, 半径=${radius}, 等级=${level}`);
    }
    
    /**
     * 使用天火流星技能
     * 从屏幕外召唤多颗陨石坠落到玩家周围，落地后形成持续燃烧区域
     */
    useTianHuoLiuXing() {
        if (!this.player.isSkillUsable('tian_huo_liu_xing')) return;
        let skillT = dataMgr.getSkillInfo('tian_huo_liu_xing');
        if (!this.player.consumeMp(skillT.mpCost || 0)) return;
        
        const skill = this.player.skills.tian_huo_liu_xing;
        const level = skill.level || 1;
        const damage = DEFINE.TIAN_HUO_LIU_XING.BASE_DAMAGE + (level - 1) * DEFINE.TIAN_HUO_LIU_XING.DAMAGE_PER_LEVEL;
        const count = DEFINE.TIAN_HUO_LIU_XING.COUNT;
        const duration = DEFINE.TIAN_HUO_LIU_XING.LIFETIME;
        
        // 重置冷却时间
        this.player.resetSkillCooldown('tian_huo_liu_xing');
        
        // 触发攻击动画
        this.player.triggerAttackAnim();
        
        // 创建陨石坠落效果，以玩家为中心
        this.effectManager.createTianHuoLiuXing(
            this.player.x,
            this.player.y,
            damage,
            duration,
            count,
            DEFINE.CAMERA.VIEW_RADIUS * 0.8
        );
        
        // 添加日志
        if (window.uiMgr && window.uiMgr.addBattleLog) {
            window.uiMgr.addBattleLog(`天火流星：召唤 ${count} 颗陨石`, 'skill');
        }
        
        console.log(`天火流星：数量=${count}, 伤害=${damage}, 燃烧=${duration}秒, 等级=${level}`);
    }

    /**
     * 使用龙卷风技能
     * 以主角为中心召唤 3 股龙卷风，持续 3 秒，吹飞附近怪物
     */
    useLongJuanFeng() {
        if (!this.player.isSkillUsable('long_juan_feng')) return;
        let skillT = dataMgr.getSkillInfo('long_juan_feng');
        if (!this.player.consumeMp(skillT.mpCost || 0)) return;

        const skill = this.player.skills.long_juan_feng;
        const level = skill.level || 1;
        const damage = DEFINE.LONG_JUAN_FENG.BASE_DAMAGE + (level - 1) * DEFINE.LONG_JUAN_FENG.DAMAGE_PER_LEVEL;
        const duration = DEFINE.LONG_JUAN_FENG.LIFETIME;
        const blowDistance = DEFINE.LONG_JUAN_FENG.BLLOW_DISTANCE;
        const count = DEFINE.LONG_JUAN_FENG.SUB_COUNT;

        // 重置冷却时间
        this.player.resetSkillCooldown('long_juan_feng');

        // 触发攻击动画
        this.player.triggerAttackAnim();

        // 创建龙卷风效果，以玩家为中心
        this.effectManager.createLongJuanFeng(
            this.player.x,
            this.player.y,
            damage,
            duration,
            blowDistance,
            count
        );

        // 添加日志
        if (window.uiMgr && window.uiMgr.addBattleLog) {
            window.uiMgr.addBattleLog(`龙卷风：召唤 ${count} 股旋风`, 'skill');
        }

        console.log(`龙卷风：数量=${count}, 伤害=${damage}, 持续=${duration}秒, 等级=${level}`);
    }

    /**
     * 使用燕双飞技能
     * 在角色周围生成两只对称环绕飞行的燕子，持续一段时间后消失
     */
    useYanShuangFei() {
        if (!this.player.isSkillUsable('yan_shuang_fei')) return;
        let skillT = dataMgr.getSkillInfo('yan_shuang_fei');
        if (!this.player.consumeMp(skillT.mpCost || 0)) return;

        const skill = this.player.skills.yan_shuang_fei;
        const level = skill.level || 1;
        const damage = DEFINE.YAN_SHUANG_FEI.BASE_DAMAGE + (level - 1) * DEFINE.YAN_SHUANG_FEI.DAMAGE_PER_LEVEL;
        const duration = DEFINE.YAN_SHUANG_FEI.LIFETIME;
        const distance = DEFINE.YAN_SHUANG_FEI.DISTANCE || 80;

        // 重置冷却时间
        this.player.resetSkillCooldown('yan_shuang_fei');

        // 触发攻击动画
        this.player.triggerAttackAnim();

        // 创建两只对称环绕的燕子
        this.effectManager.createYanShuangFei(
            0,
            distance,
            damage,
            duration
        );

        // 添加日志
        if (window.uiMgr && window.uiMgr.addBattleLog) {
            window.uiMgr.addBattleLog(`燕双飞：召唤两只燕子环绕 ${duration} 秒`, 'skill');
        }

        console.log(`燕双飞：伤害=${damage}, 持续=${duration}秒, 等级=${level}`);
    }

    /**
     * 使用庚金剑阵技能
     * 在主角位置为中心生成椭圆剑阵，剑阵从上方降落后对范围内怪物造成伤害和麻痹
     */
    useGengJinJianZhen() {
        if (!this.player.isSkillUsable('geng_jin_jian_zhen')) return;
        let skillT = dataMgr.getSkillInfo('geng_jin_jian_zhen');
        if (!this.player.consumeMp(skillT.mpCost || 0)) return;

        const skill = this.player.skills.geng_jin_jian_zhen;
        const level = skill.level || 1;
        const damage = DEFINE.GENG_JIN_JIAN_ZHEN.BASE_DAMAGE + (level - 1) * DEFINE.GENG_JIN_JIAN_ZHEN.DAMAGE_PER_LEVEL;
        const paralyzeDuration = DEFINE.GENG_JIN_JIAN_ZHEN.PARALYZE_DURATION;

        // 重置冷却时间
        this.player.resetSkillCooldown('geng_jin_jian_zhen');

        // 触发攻击动画
        this.player.triggerAttackAnim();

        // 在主角位置创建庚金剑阵
        this.effectManager.createGengJinJianZhen(
            this.player.x,
            this.player.y,
            damage,
            paralyzeDuration
        );

        // 添加日志
        if (window.uiMgr && window.uiMgr.addBattleLog) {
            window.uiMgr.addBattleLog(`庚金剑阵：召唤庚金剑阵落下`, 'skill');
        }

        console.log(`庚金剑阵：伤害=${damage}, 麻痹=${paralyzeDuration}秒, 等级=${level}`);
    }

    
    /**
     * 生成精英怪物
     */
    spawnEliteMonster() {
        const monster = MonsterFactory.createMonster('elite', this.waveManager.currentWave, this.canvas.width, this.canvas.height);
        this.monsters.push(monster);
        console.log('Elite monster spawned!');
    }
    
    /**
     * 生成 BOSS 怪物
     */
    spawnBossMonster() {
        const monster = MonsterFactory.createMonster('boss', this.waveManager.currentWave, this.canvas.width, this.canvas.height);
        this.monsters.push(monster);
        console.log('Boss spawned!');
    }
    
    /**
     * 怪物被击杀时的处理
     * @param {Monster} monster - 被击杀的怪物
     */
    onMonsterKilled(monster) {
        // Drops
        if (monster.type === 'boss') {
            this.dropManager.spawnBossDrops(monster, this.materialDropManager);
            // BOSS 额外掉落金币 12-20
            dataMgr.addGold(Math.floor(Math.random() * 9) + 12);
        } else if (monster.type === 'elite') {
            this.dropManager.spawnEliteDrops(monster, this.materialDropManager);
            // 精英怪额外掉落金币 8-15
            dataMgr.addGold(Math.floor(Math.random() * 8) + 8);
        } else {
            this.dropManager.spawnMonsterDrops(monster, this.waveManager.currentWave, this.materialDropManager);
            // 普通怪物额外掉落金币 5-8
            dataMgr.addGold(Math.floor(Math.random() * 4) + 5);
        }
        
        console.log(`Monster killed, exp reward: ${monster.expReward}`);
    }
    
    /**
     * 检查技能书拾取
     */
    checkSkillBookPickup() {
        const drops = this.dropManager.drops;
        for (let i = drops.length - 1; i >= 0; i--) {
            const drop = drops[i];
            if (drop.type === 'skillBook') {
                const dist = distance(drop.x, drop.y, this.player.x, this.player.y);
                if (dist < 30) { // 拾取范围
                    // 拾取技能书
                    dataMgr.addMaterial('skillBook', 'skillBook', drop.value);
                    drops.splice(i, 1);
                    console.log(`拾取技能书 x${drop.value}`);
                    if (window.uiMgr) {
                        window.uiMgr.addBattleLog(`拾取技能书 +${drop.value}`, 'item');
                    }
                }
            }
        }
    }
    
    /**
     * 显示升级选择面板
     */
    showSelectPanel() {
        console.warn('===显示升级面板：',this.player.level);
        this.state = GameState.LEVEL_UP;
        
        let options = uiMgr.showLevelUpPanel();
        console.warn('===显示升级面板,options：',options);
        // Rebind skill option events
        const optionsContainer = uiMgr.elements.skillOptions;
        optionsContainer.querySelectorAll('.skill-option').forEach((el, index) => {
            el.addEventListener('click', () => {
                if (index < options.length) {
                    this.selectSkill(options[index]);
                }
            });
        });
    }
    
    /**
     * 选择升级技能或属性
     * @param {skillModel} option - 升级选项对象
     */
    selectSkill(option) {
        // 先记录日志（在 applyOption 修改属性前记录）
        console.warn('----选择升级技能:',option);
        let logText = '',oldLevel = option.level,newLevel = 1;
        if(option.type =='skill'){
            if(option.level > 0){
                logText = `升级了技能【${option.name}】：Lv.${oldLevel} → Lv.${oldLevel + 1}`;
                if(!this.player.skills[option.id]){
                    this.player.skills[option.id] ={
                        level: 1,
                        beActive: true,
                        cdSecond: 0,
                    }
                }
                this.player.skills[option.id].level = oldLevel + 1;
                newLevel = this.player.skills[option.id].level;
            } else {
                logText = `学习了新技能【${option.name}】`;
                this.player.skills[option.id] ={
                    level: 1,
                    beActive: true,
                    cdSecond: 0,
                }
            }
        }else if(option.type =='att'){
            //写入属性记录
            if(!this.player.attRecord[option.id]){
                this.player.attRecord[option.id] = 1;
            }else{
                this.player.attRecord[option.id] = option.level+1;
                newLevel = this.player.attRecord[option.id];
            }
            if (option.id === 'jian_ti') {
                logText = `选择了【${option.name}】：气血上限 +10，防御 +5`;
                this.player.maxHp += 10;
                this.player.defense += 5;
            } else if (option.id === 'duan_lian') {
                logText = `选择了【${option.name}】：攻击 +5`;
                this.player.attack += 5;
            } else if (option.id === 'hu_jia') {
                logText = `选择了【${option.name}】：防御 +2`;
                this.player.defense += 2;
            } else if (option.id === 'ming_xiang') {
                logText = `选择了【${option.name}】：法力回复 +1/秒`;
                this.player.mpRegen += 1;
            } else if (option.id === 'tower_upgrade') {
                logText = `选择了【${option.name}】：所有防御塔升级`;
                this.towerManager.upgradeAll();
                console.log('All towers upgraded!');
            }
            logText += `，当前等级：${newLevel}`;
        }      
        console.warn('选择升级选项之后的技能：',this.player.skills)  
        uiMgr.updatePlayer(this.player);
        uiMgr.addBattleLog(logText, 'skill');
        uiMgr.hideLevelUpPanel();
        //修改当前游戏状态
        this.state = GameState.PLAYING;
        //开始下一轮刷怪波数
        if (!this.waveManager.isWaveActive && 
            this.waveManager.currentWave < DEFINE.WAVE.MAX_WAVES) {
            this.waveManager.startWave();
            if (this.waveManager.shouldSpawnElite()) {
                this.spawnEliteMonster();
            }
            if (this.waveManager.shouldSpawnBoss()) {
                this.spawnBossMonster();
            }
        }
        //锚定时间，确保游戏循环在固定时间间隔内
        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.gameLoop(t));
    }
    
    /**
     * 观看广告
     */
    watchAd() {
        console.log('Ad watched, restoring HP and MP');
        this.player.heal(50);
        this.player.restoreMp(30);
        
        uiMgr.hideLevelUpPanel();
        this.state = GameState.PLAYING;
        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.gameLoop(t));
    }
    
    /**
     * 退出战斗
     */
    exitBattle() {
        this.state = GameState.MENU;
        uiMgr.showMainMenu();
        uiMgr.clearBattleLog();
        dataMgr.saveLocal();
    }

    /**
     * 游戏结束
     * @param {boolean} isVictory - 是否胜利
     */
    gameOver(isVictory) {
        this.state = isVictory ? GameState.VICTORY : GameState.GAME_OVER;
        const roleData = dataMgr.getRoleData();
        // 折算可升级经验到角色数据
        if(!roleData.exp){
            roleData.exp = 0;
        }
        if(!roleData.talentPoint){
            roleData.talentPoint = 0;
        }   
        roleData.exp += this.player.exp;
        // 计算天赋点：等级差
        const levelDiff = this.player.level - this.entryLevel;
        if (levelDiff > 0) {
            roleData.talentPoint += levelDiff;
            console.log(`获得天赋点 x${levelDiff}，总天赋点：${this.player.talentPoint}`);
        }
        
        // 清除宠物实例
        if (this.petManager) {
            this.petManager.clearPet();
        }
        
        // 胜利时处理副本结算
        if (isVictory && this.currentDungeonId) {
            const dungeon = dataMgr.getDungeonInfo(this.currentDungeonId);
            
            if (dungeon && roleData && roleData.stage) {
                // 增加副本金币奖励
                if (dungeon.gold && dungeon.gold > 0) {
                    roleData.gold += dungeon.gold;
                }
                
                // 首次通关奖励
                const dungeonIdStr = String(this.currentDungeonId);
                if (!roleData.stage.clearArr.includes(dungeonIdStr)) {
                    roleData.stage.clearArr.push(dungeonIdStr);
                    
                    // 解锁下一个副本
                    const nextId = Number(this.currentDungeonId) + 1;
                    if (nextId > roleData.stage.curId) {
                        roleData.stage.curId = nextId;
                    }
                    
                    // 发放首次通关奖励
                    if (dungeon.reward && dungeon.reward.length > 0) {
                        for (const item of dungeon.reward) {
                            if (item.id === 'gold') {
                                roleData.gold += item.num;
                            }else{
                                let propInfo = dataMgr.getPropInTable(item.id);
                                dataMgr.addMaterial(propInfo.type,propInfo.id,item.num);
                            }
                        }
                        roleData.stage.rewardArr.push(dungeonIdStr);
                    }
                }
            }
        }
        
        
        
        // 保存角色数据（包括金币和天赋点）
        dataMgr.saveLocal();
        
        uiMgr.showGameOver(isVictory, this.waveManager.currentWave, this.player.level);
    }
    
    /**
     * 渲染游戏画面
     */
    render() {
        this.renderer.clear();
        this.renderer.drawBackground(this.cameraX, this.cameraY);
        
        // 渲染掉落物
        for (const drop of this.dropManager.drops) {
            this.renderer.drawDrop(drop, this.cameraX, this.cameraY);
        }
        
        // 渲染材料掉落物
        for (const drop of this.materialDropManager.drops) {
            this.renderer.drawMaterialDrop(drop, this.cameraX, this.cameraY);
        }
        
        // 渲染技能框
        for (const box of this.skillBoxManager.boxes) {
            this.renderer.drawSkillBox(box, this.cameraX, this.cameraY);
        }
        
        // 渲染塔框
        for (const box of this.towerBoxManager.boxes) {
            this.renderer.drawTowerBox(box, this.cameraX, this.cameraY);
        }
        
        // 渲染塔
        for (const tower of this.towerManager.towers) {
            this.renderer.drawTower(tower, this.cameraX, this.cameraY);
        }
        
        // 渲染怪物
        for (const monster of this.monsters) {
            this.renderer.drawMonster(monster, this.cameraX, this.cameraY);
        }
        
        // Player (渲染在世界原点，不受摄像机影响以保持居中)
        if (this.player) {
            this.renderer.drawPlayer(this.player, this.canvas.width / 2, this.canvas.height / 2);
        }
        
        // 渲染宠物
        if (this.petManager && this.petManager.pet) {
            const pet = this.petManager.pet;
            // 计算宠物相对于玩家的位置（因为玩家在屏幕中心）
            const petScreenX = this.canvas.width / 2 + (pet.x - this.player.x);
            const petScreenY = this.canvas.height / 2 + (pet.y - this.player.y);
            
            // 保存当前上下文
            this.ctx.save();
            
            // 绘制宠物
            const petConfig = DEFINE.PETS.TYPES[pet.type];
            const appearance = DEFINE.PETS.APPEARANCES[pet.type];
            if (appearance) {
                const gridSize = 8;
                const petSize = appearance[0].length * gridSize;
                const offsetX = petScreenX - petSize / 2;
                const offsetY = petScreenY - petSize / 2;
                
                for (let y = 0; y < appearance.length; y++) {
                    for (let x = 0; x < appearance[y].length; x++) {
                        const char = appearance[y][x];
                        if (char === 'X' || char === 'O') {
                            this.ctx.fillStyle = char === 'O' ? '#ffff00' : petConfig.color;
                            this.ctx.fillRect(offsetX + x * gridSize, offsetY + y * gridSize, gridSize, gridSize);
                        }
                    }
                }
            }
            
            // 恢复上下文
            this.ctx.restore();
        }
        
        // 特效
        for (const effect of this.effectManager.effects) {
            if (effect instanceof LightningStrike) {
                this.renderer.drawLightningStrike(effect, this.cameraX, this.cameraY);
            } else {
                this.renderer.drawEffect(effect, this.cameraX, this.cameraY);
            }
        }
        
        // 渲染粒子效果
        for (const proj of this.effectManager.projectiles) {
            if (proj instanceof SmallSword) {
                this.renderer.drawSmallSword(proj, this.cameraX, this.cameraY);
            } else if (proj instanceof Fireball) {
                this.renderer.drawFireball(proj, this.cameraX, this.cameraY);
            } else {
                this.renderer.drawArrowProjectile(proj, this.cameraX, this.cameraY);
            }
        }
        
        // 飘字效果
        this.renderFloatingTexts();
    }
    
    /**
     * 添加飘字效果
     * @param {number} x - X 坐标
     * @param {number} y - Y 坐标
     * @param {string} text - 飘字文本
     * @param {string} color - 颜色值
     * @param {boolean} hasStroke - 是否有描边
     */
    addFloatingText(x, y, text, color = '#ff4444', hasStroke = false) {
        this.floatingTexts.push({
            x, y,
            text,
            color,
            hasStroke,
            timer: 1.0,
            maxTimer: 1.0
        });
    }
    
    /**
     * 渲染并更新飘字效果
     */
    renderFloatingTexts() {
        for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
            const ft = this.floatingTexts[i];
            ft.timer -= 0.016;
            
            if (ft.timer <= 0) {
                this.floatingTexts.splice(i, 1);
                continue;
            }
            
            // 渲染飘字
            const screenX = ft.x - this.cameraX;
            const screenY = ft.y - this.cameraY - (ft.maxTimer - ft.timer) * 30;
            const alpha = ft.timer / ft.maxTimer;
            
            this.ctx.save();
            this.ctx.globalAlpha = alpha;
            this.ctx.font = 'bold 16px sans-serif';
            this.ctx.textAlign = 'center';
            if (ft.hasStroke) {
                this.ctx.strokeStyle = '#ffffff';
                this.ctx.lineWidth = 2;
                this.ctx.strokeText(ft.text, screenX, screenY);
            }
            this.ctx.fillStyle = ft.color;
            this.ctx.fillText(ft.text, screenX, screenY);
            this.ctx.restore();
        }
    }
    
    /**
     * 炼丹
     * @param {string} materialId - 材料 ID
     */
    alchemy(materialId) {
        const item = dataMgr.getPropInBagByID(materialId);
        if (!item || item.count < 3) {
            alert('需要至少 3 个同种草药才能炼丹！');
            return;
        }
        
        dataMgr.costProp(materialId, 3);
        
        const bonus = Math.floor(Math.random() * 10) + 5;
        this.player.maxHp += bonus;
        this.player.hp = Math.min(this.player.hp + bonus, this.player.maxHp);
        alert(`炼丹成功！气血上限+${bonus}`);
        
        // 材料消耗后立即保存数据
        dataMgr.saveLocal();
        
        uiMgr.updateCharacterInfo();
        uiMgr.updateAlchemyRecipes();
    }
    
    /**
     * 初始化炼器页面
     */
    initForgingPanel() {
        // 更新等级显示
        this.updateSkillLevelDisplay();
        
        // 初始化融合剂显示
        this.updateFluxDisplay();
        
        // 初始化催化剂显示
        this.updateCatalystDisplay();
        
        // 绑定装备类型选择事件
        document.getElementById('equipment-type-select').addEventListener('change', (e) => {
            this.onEquipmentTypeChange(e.target.value);
        });
        
        // 绑定开始炼器按钮事件
        document.getElementById('start-forging-btn').addEventListener('click', () => {
            this.startForging();
        });
        // 绑定催化剂按钮事件
        document.getElementById('catalyst-slot').addEventListener('click', () => {
            this.openCatalystSelectModal();
        });
    }
    
    /**
     * 初始化工坊面板
     */
    initWorkshopPanel(equipData) {
        // 更新等级显示
        this.updateSkillLevelDisplay();
        
        // 更新工坊等级显示
        this.updateWorkshopLevelDisplay();
        
        // 初始化装备选择
        this.initWorkshopEquipmentSelect(equipData);
        
        // 绑定装备选择事件
        document.getElementById('workshop-equipment-select').addEventListener('change', (e) => {
            this.onWorkshopEquipmentChange(e.target.value);
        });
        
        // 绑定开始强化按钮事件
        document.getElementById('start-enhance-btn').addEventListener('click', () => {
            this.startWorkshop();//------开始强化
        });
    }
    
    /**
     * 初始化工坊装备选择
     */
    initWorkshopEquipmentSelect(equipData) {
        const select = document.getElementById('workshop-equipment-select');
        if (!select) return;
        
        // 清空现有选项
        select.innerHTML = '<option value="">未选择</option>';
        
        // 获取仓库中的装备
        const equipmentItems = dataMgr.getItemsByType('equipment');
        
        let selectedId = '';
        
        // 添加装备选项
        equipmentItems.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            
            const equipTableItem = dataMgr.getEquipInTable(item.oid);
            const equipName = equipTableItem.name;
            const qualityColor = uiMgr.getEquipmentQualityColor(item);
            
            option.textContent = equipName;
            option.style.color = qualityColor;
            select.appendChild(option);
            
            // 如果传入了equipData且匹配，则选中该装备
            if (equipData && item.id === equipData.id) {
                selectedId = item.id;
            }
        });
        
        // 如果有选中装备
        if (selectedId) {
            select.value = selectedId;
            // 设置选中项的颜色
            const selectedOption = select.options[select.selectedIndex];
            if (selectedOption && selectedOption.style.color) {
                select.style.color = selectedOption.style.color;
            }
            // 显示装备属性和成功率
            this.showWorkshopEquipmentInfo(selectedId);
        }
        
        // 更新工坊等级显示
        this.updateWorkshopLevelDisplay();
    }
    
    /**
     * 更新工坊等级显示
     */
    updateWorkshopLevelDisplay() {
        const levelElement = document.getElementById('workshop-level');
        if (!levelElement) return;
        
        // 获取炼器术等级从roleData.forgingSkill
        const roleData = dataMgr.getRoleData();
        const forgingLevel = roleData && roleData.forgingSkill ? roleData.forgingSkill.level : 1;
        
        levelElement.textContent = `Lv.${forgingLevel}`;
    }
    
    /**
     * 工坊装备选择变化
     * @param {string} equipmentId - 装备 ID
     */
    onWorkshopEquipmentChange(equipmentId) {
        const select = document.getElementById('workshop-equipment-select');
        
        if (!equipmentId) {
            // 隐藏装备属性信息区
            const equipInfo = document.getElementById('workshop-equipment-info');
            if (equipInfo) equipInfo.classList.add('hidden');
            // 隐藏强化所需材料
            const enhanceCost = document.getElementById('enhance-cost');
            if (enhanceCost) enhanceCost.classList.add('hidden');
            
            if (select) {
                select.style.color = '#fff';
            }
            return;
        }
        
        // 更新选中项的颜色
        if (select) {
            const selectedOption = select.options[select.selectedIndex];
            if (selectedOption && selectedOption.style.color) {
                select.style.color = selectedOption.style.color;
            }
        }
        
        // 显示装备属性信息区
        this.showWorkshopEquipmentInfo(equipmentId);
    }
    
    /**
     * 显示工坊装备属性信息
     * @param {string} equipmentId - 装备 ID
     */
    showWorkshopEquipmentInfo(equipmentId) {
        const equipInfo = document.getElementById('workshop-equipment-info');
        if (!equipInfo) return;
        
        // 获取装备信息
        const allItems = dataMgr.getAllProps();
        const equipment = allItems.find(i => i.id === equipmentId && i.type === 'equipment');
        if (!equipment) return;
        
        // 从配置表获取装备信息
        const config = dataMgr.getEquipInTable(equipment.oid);
        if (!config) return;
        
        // 生成属性HTML
        const attrsDiv = equipInfo.querySelector('.equipment-attrs');
        if (!attrsDiv) return;
        
        let html = '';
        const attributes = equipment.att || config.att || [];
        if (Array.isArray(attributes) && attributes.length > 0) {
            for (const attr of attributes) {
                const attrName = uiMgr.getAttributeDisplayName(attr.key);
                const formattedValue = uiMgr.formatAttributeValue(attr.key, attr.value);
                html += `<div class="attr-row">
                    <span class="attr-name">${attrName}</span>
                    <span class="attr-value">+${formattedValue}</span>
                </div>`;
            }
        } else {
            html = '<div class="attr-row"><span class="attr-name">无附加属性</span></div>';
        }
        attrsDiv.innerHTML = html;
        
        // 显示装备信息区
        equipInfo.classList.remove('hidden');
        
        // 更新成功率
        this.updateWorkshopSuccessRate(config.quality || 1);
        
        // 显示强化所需材料
        this.updateEnhanceCost();
    }
    
    /**
     * 更新强化所需材料显示
     */
    updateEnhanceCost() {
        const enhanceCost = document.getElementById('enhance-cost');
        const goldCost = document.getElementById('enhance-gold-cost');
        const stoneCost = document.getElementById('enhance-stone-cost');
        
        if (enhanceCost) enhanceCost.classList.remove('hidden');
        
        // 获取玩家金币和强化石数量
        const roleData = dataMgr.getRoleData();
        const gold = roleData ? roleData.gold : 0;
        const stoneCount = dataMgr.getItemCount('enhance_stone');
        
        const goldEnough = gold >= 100;
        const stoneEnough = stoneCount >= 1;
        
        // 强化所需：100金币 + 1强化石
        if (goldCost) {
            goldCost.textContent = `金币：${gold}/100`;
            goldCost.style.color = goldEnough ? '#4caf50' : '#ff4444';
        }
        if (stoneCost) {
            stoneCost.textContent = `强化石：${stoneCount}/1`;
            stoneCost.style.color = stoneEnough ? '#4caf50' : '#ff4444';
        }
    }
    
    /**
     * 更新工坊成功率
     * @param {number} quality - 装备品质
     */
    updateWorkshopSuccessRate(quality = 1) {
        const rateValue = document.getElementById('success-rate-value');
        if (!rateValue) return;
        
        // 获取炼器术等级
        const roleData = dataMgr.getRoleData();
        const forgingLevel = roleData && roleData.forgingSkill ? roleData.forgingSkill.level : 1;
        
        // 计算成功率：35% + 炼器术等级*20% - (品质-1)*25%
        let successRate = 35 + forgingLevel * 20 - (quality - 1) * 25;
        // 限制在5%-95%之间
        successRate = Math.max(5, Math.min(95, successRate));
        
        if (rateValue) rateValue.textContent = `${successRate}%`;
    }
    
    
    /**
     * 开始强化
     */
    startWorkshop() {
        const select = document.getElementById('workshop-equipment-select');
        const equipmentId = select.value;
        
        if (!equipmentId) {
            alert('请选择要强化的装备');
            return;
        }
        
        // 检查金币和强化石是否足够
        const roleData = dataMgr.getRoleData();
        const gold = roleData ? roleData.gold : 0;
        const stoneCount = dataMgr.getItemCount('enhance_stone');
        
        if (gold < 100) {
            alert('金币不足！需要100金币');
            return;
        }
        
        if (stoneCount < 1) {
            alert('强化石不足！需要1个强化石');
            return;
        }
        
        // 扣除金币和强化石
        roleData.gold -= 100;
        dataMgr.costProp('enhance_stone', 1);
        dataMgr.saveLocal();
        
        // 隐藏开始强化按钮，显示进度条
        const startBtn = document.getElementById('start-enhance-btn');
        const progress = document.getElementById('enhance-progress');
        const progressFill = document.getElementById('enhance-progress-fill');
        const progressText = document.getElementById('enhance-progress-text');
        
        if (startBtn) startBtn.classList.add('hidden');
        if (progress) progress.classList.remove('hidden');
        if (progressFill) progressFill.style.width = '0%';
        if (progressText) progressText.textContent = '3s';
        
        // 模拟强化过程
        let timeLeft = 3;
        const interval = setInterval(() => {
            timeLeft--;
            if (progressText) progressText.textContent = `${timeLeft}s`;
            if (progressFill) progressFill.style.width = `${(3 - timeLeft) / 3 * 100}%`;
            
            if (timeLeft <= 0) {
                clearInterval(interval);
                if (progress) progress.classList.add('hidden');
                
                // 随机判定成功/失败（基于成功率）
                const rateText = document.getElementById('success-rate-value');
                const rate = rateText ? parseInt(rateText.textContent) || 50 : 50;
                const isSuccess = Math.random() * 100 < rate;
                
                if (isSuccess) {
                    // 强化成功，显示属性变化
                    this.showEnhanceResult(equipmentId);
                } else {
                    alert('强化失败！');
                }
                
                // 重新显示强化按钮
                if (startBtn) startBtn.classList.remove('hidden');
                
                // 刷新装备选择
                this.initWorkshopEquipmentSelect();
                
                // 刷新强化所需材料显示（更新金币和强化石数量）
                this.updateEnhanceCost();
                
                // 刷新金币显示
                if (window.uiMgr) {
                    window.uiMgr.updateGoldDisplay();
                }
            }
        }, 1000);
    }
    
    /**
     * 显示强化结果
     * @param {string} equipmentId - 装备 ID
     */
    showEnhanceResult(equipmentId) {
        const equipInfo = document.getElementById('workshop-equipment-info');
        if (!equipInfo) return;
        
        // 获取装备信息
        const allItems = dataMgr.getAllProps();
        const equipment = allItems.find(i => i.id === equipmentId && i.type === 'equipment');
        if (!equipment) return;
        
        // 生成属性HTML，添加强化加成显示
        const attrsDiv = equipInfo.querySelector('.equipment-attrs');
        if (!attrsDiv) return;
        
        let html = '';
        const attributes = equipment.att || [];
        if (Array.isArray(attributes) && attributes.length > 0) {
            for (const attr of attributes) {
                const attrName = uiMgr.getAttributeDisplayName(attr.key);
                const formattedValue = uiMgr.formatAttributeValue(attr.key, attr.value);
                // 随机增加1-10点属性
                const increase = Math.floor(Math.random() * 10) + 1;
                html += `<div class="attr-row">
                    <span class="attr-name">${attrName}</span>
                    <span class="attr-value">+${formattedValue}<span class="attr-increase">+${increase}</span></span>
                </div>`;
            }
        } else {
            html = '<div class="attr-row"><span class="attr-name">无附加属性</span></div>';
        }
        attrsDiv.innerHTML = html;
        
        alert('强化成功！');
    }
    
    /**
     * 清除炼器槽位信息
     */
    clearForgingSlots() {
        // 清除材料槽位
        const materialSlots = document.getElementById('forging-material-slots');
        if (materialSlots) {
            materialSlots.innerHTML = '';
        }
        
        // 清除融合剂槽位
        const fluxIcon = document.getElementById('flux-icon');
        const fluxCount = document.getElementById('flux-count');
        if (fluxIcon) {
            fluxIcon.style.background = 'rgba(255, 215, 0, 0.2)';
        }
        if (fluxCount) {
            fluxCount.textContent = '0';
        }
        
        // 清除催化剂槽位
        const catalystIcon = document.getElementById('catalyst-icon');
        const catalystCount = document.getElementById('catalyst-count');
        if (catalystIcon) {
            catalystIcon.style.background = 'rgba(255, 215, 0, 0.2)';
        }
        if (catalystCount) {
            catalystCount.textContent = '';
        }
        
        // 清除选择的催化剂
        this.selectedCatalyst = null;
    }
    
    /**
     * 更新技能等级显示
     */
    updateSkillLevelDisplay() {
        let roleD = dataMgr.getRoleData();
        // 更新炼丹术等级
        if (document.getElementById('alchemy-level')) {
            document.getElementById('alchemy-level').textContent = `Lv.${roleD.alchemySkill.level}`;
        }
        
        // 更新炼器术等级
        if (document.getElementById('forging-level')) {
            document.getElementById('forging-level').textContent = `Lv.${roleD.forgingSkill.level}`;
        }
    }
    
    /**
     * 更新融合剂显示
     */
    updateFluxDisplay() {
        const fluxCount = dataMgr.getItemCount('quartz_sand');
        document.getElementById('flux-count').textContent = fluxCount;
        
        // 更新融合剂图标
        const fluxIcon = document.getElementById('flux-icon');
        if (fluxCount > 0) {
            fluxIcon.style.background = 'linear-gradient(135deg, #ffd700, #ffaa00)';
        } else {
            fluxIcon.style.background = 'rgba(255, 215, 0, 0.2)';
        }
    }
    
    /**
     * 更新催化剂显示
     */
    updateCatalystDisplay() {
        const catalystIcon = document.getElementById('catalyst-icon');
        const catalystCount = document.getElementById('catalyst-count');
        
        // 暂时清空，等待用户选择
        catalystIcon.style.background = 'rgba(255, 215, 0, 0.2)';
        catalystCount.textContent = '';
        this.selectedCatalyst = null;
        console.warn(`selectedCatalyst: ${this.selectedCatalyst}`);
    }
    
    /**
     * 打开催化剂选择弹窗
     */
    openCatalystSelectModal() {
        const catalystList = document.getElementById('catalyst-list');
        catalystList.innerHTML = '';
        
        // 获取仓库中的催化剂
        const catalysts = dataMgr.getItemsByType('catalyst');
        
        if (catalysts.length === 0) {
            catalystList.innerHTML = '<p style="color:#666;text-align:center;">暂无催化剂</p>';
        } else {
            catalysts.forEach(catalyst => {
                console.log('---catalyst:',catalyst); 
                const catalystItem = document.createElement('div');
                catalystItem.className = 'catalyst-item';
                catalystItem.innerHTML = `
                    <span class="catalyst-name">${catalyst.getName()}</span>
                    <span class="catalyst-count">x${catalyst.count}</span>
                `;
                catalystItem.onclick = () => {
                    this.selectCatalyst(catalyst.id);
                    closeCatalystSelectModal();
                };
                catalystList.appendChild(catalystItem);
            });
        }
        
        document.getElementById('catalyst-select-modal').classList.remove('hidden');
    }
    
    /**
     * 选择催化剂
     * @param {string} catalystId - 催化剂 ID
     */
    selectCatalyst(catalystId) {
        this.selectedCatalyst = catalystId;
        this.updateCatalystDisplay();
        
        // 更新催化剂显示
        const catalystCount = dataMgr.getItemCount(catalystId);
        if (catalystCount > 0) {
            const catalystIcon = document.getElementById('catalyst-icon');
            const catalystCount = document.getElementById('catalyst-count');
            catalystIcon.style.background = 'linear-gradient(135deg, #9c27b0, #4a148c)';
            catalystCount.textContent = catalystCount;
        }
    }
    
    /**
     * 关闭催化剂选择弹窗
     */
    closeCatalystSelectModal() {
        document.getElementById('catalyst-select-modal').classList.add('hidden');
    }
    
    /**
     * 装备类型选择变化
     * @param {string} equipmentType - 装备类型
     */
    onEquipmentTypeChange(equipmentType) {
        if (!equipmentType) {
            // 清空材料槽位
            document.getElementById('forging-material-slots').innerHTML = '';
            return;
        }
        
        // 获取炼器公式
        const forgeConfig = DEFINE.FORGES[equipmentType];
        if (!forgeConfig) return;
        
        // 生成材料槽位
        this.generateMaterialSlots(forgeConfig.materials);
        
        // 计算并显示成功率
        this.calculateForgeSuccessRate(equipmentType);
    }
    
    /**
     * 生成材料槽位
     * @param {Array} materials - 材料列表
     */
    generateMaterialSlots(materials) {
        const slotsContainer = document.getElementById('forging-material-slots');
        slotsContainer.innerHTML = '';
        
        materials.forEach((material, index) => {
            const availableCount = dataMgr.getItemCount(material.id);
            const isEnough = availableCount >= material.quantity;
            
            const slot = document.createElement('div');
            slot.className = 'material-slot';
            slot.innerHTML = `
                <div class="slot-label">${material.name}</div>
                <div class="item-slot ${!isEnough ? 'insufficient' : 'sufficient'}">
                    <div class="item-icon"></div>
                    <div class="item-count">${material.quantity}/${availableCount}</div>
                </div>
            `;
            slotsContainer.appendChild(slot);
        });
    }
        
    /**
     * 显示装备要求
     * @param {Array} materials - 材料列表
     */
    displayEquipmentRequirements(materials) {
        const requirementsList = document.getElementById('forging-requirements-list');
        requirementsList.innerHTML = '';
        
        materials.forEach(material => {
            const requirementItem = document.createElement('div');
            requirementItem.className = 'requirement-item';
            
            const requiredCount = material.quantity;
            const availableCount = dataMgr.getItemCount(material.id);
            
            requirementItem.innerHTML = `
                <span class="requirement-name">${material.name}</span>
                <span class="requirement-count">${requiredCount}/${availableCount}</span>
            `;
            requirementsList.appendChild(requirementItem);
        });
    }
    
    /**
     * 计算成功率
     * @param {string} equipmentType - 装备类型
     */
    calculateForgeSuccessRate(equipmentType) {
        let roleD = dataMgr.getRoleData();
        const forgingLevel = roleD.forgingSkill.level;       
        // 计算各品质的基础成功率
        let legendaryRate = 3 + forgingLevel * 0.8;
        let epicRate = 10 + forgingLevel * 0.9;
        let rareRate = 20 + forgingLevel;
        let goodRate = 30 + forgingLevel * 1.2;
        console.warn(`legendaryRate: ${legendaryRate}, epicRate: ${epicRate}, rareRate: ${rareRate}, goodRate: ${goodRate}`);
        // 催化剂加成 - 只有在槽位中放入了催化剂之后才能对成功率有影响
        if (this.selectedCatalyst) {
            legendaryRate += 2;
            epicRate += 15;
            rareRate += 20;
        }
        console.warn(`hasCatalyst: ${this.selectedCatalyst}`);
        
        // 计算普通品质的概率
        const totalRate = legendaryRate + epicRate + rareRate + goodRate;
        const commonRate = Math.max(0, 100 - totalRate);
        console.warn(`commonRate: ${commonRate}, totalRate: ${totalRate}`);
        
        // 计算各品质的成功率
        const rates = {
            common: commonRate,
            good: goodRate,
            rare: rareRate,
            epic: epicRate,
            legendary: legendaryRate
        };
        
        // 更新成功率显示
        document.querySelectorAll('.quality-rate').forEach((rateElement, index) => {
            const quality = ['common', 'good', 'rare', 'epic', 'legendary'][index];
            const rateValue = Math.floor(rates[quality]);
            const progressFill = rateElement.querySelector('.progress-fill');
            const rateText = rateElement.querySelector('.rate-value');
            
            progressFill.style.width = `${rateValue}%`;
            rateText.textContent = `${rateValue}%`;
        });
    }
    
    /**
     * 开始炼器
     */
    startForging() {
        const equipmentType = document.getElementById('equipment-type-select').value;
        if (!equipmentType) {
            alert('请选择装备类型');
            return;
        }
        
        // 检查融合剂
        let fluxCount = dataMgr.getItemCount('quartz_sand');
        if (fluxCount < 1) {
            alert('缺少融合剂');
            return;
        }
        
        // 检查材料
        const forgeConfig = DEFINE.FORGES[equipmentType];
        for (const material of forgeConfig.materials) {
            const availableCount = dataMgr.getItemCount(material.id);
            if (availableCount < material.quantity) {
                alert(`缺少材料：${material.name}`);
                return;
            }
        }
        
        const startBtn = document.getElementById('start-forging-btn');
        
        // 第一步：点击反馈 - 缩小到 90%
        if (startBtn && !startBtn.disabled) {
            startBtn.classList.add('clicked');
            // 0.1s 后还原
            setTimeout(() => {
                if (startBtn) startBtn.classList.remove('clicked');
            }, 100);
        }
        
        // 0.2s 后开始倒计时（让点击动画完整播放）
        setTimeout(() => {
            if (startBtn) startBtn.disabled = true;
            this._runForgingCountdown(equipmentType, startBtn);
        }, 200);
    }
    
    /**
     * 执行炼器倒计时
     */
    _runForgingCountdown(equipmentType, startBtn) {
        // 显示进度条
        const progressContainer = document.getElementById('forging-progress');
        const progressFill = document.getElementById('forging-progress-fill');
        const progressText = document.getElementById('forging-progress-text');
        
        progressContainer.classList.remove('hidden');
        progressFill.style.width = '0%';
        
        // 3秒倒计时
        let timeLeft = 3;
        progressText.textContent = `${timeLeft}s`;
        
        const interval = setInterval(() => {
            timeLeft--;
            progressText.textContent = `${timeLeft}s`;
            progressFill.style.width = `${((3 - timeLeft) / 3) * 100}%`;
            
            if (timeLeft <= 0) {
                clearInterval(interval);
                this.finishForging(equipmentType);
                // 恢复按钮
                if (startBtn) startBtn.disabled = false;
            }
        }, 1000);
    }
    
    /**
     * 完成炼器
     * @param {string} equipmentType - 装备类型
     */
    finishForging(equipmentType) {
        // 隐藏进度条
        document.getElementById('forging-progress').classList.add('hidden');
        
        // 消耗融合剂
        dataMgr.costProp('quartz_sand', 1);
        
        // 消耗材料
        const forgeConfig = DEFINE.FORGES[equipmentType];
        for (const material of forgeConfig.materials) {
            dataMgr.costProp(material.id, material.quantity);
        }
        
        // 消耗催化剂（如果有）
        if (this.selectedCatalyst) {
            dataMgr.costProp(this.selectedCatalyst, 1);
            this.selectedCatalyst = null;
        }
        
        // 生成装备
        const equipment = this.generateEquipment(equipmentType);
        console.warn(`生成装备 ${JSON.stringify(equipment)}`);
        // 将装备添加到玩家背包中
        dataMgr.addEquip(equipment);
        console.warn(`装备 ${equipment.name} 已添加到仓库，品质: ${DEFINE.QUALITIES[equipment.quality]}`);
        
        // 更新炼器术经验和统计
        this.updateForgingSkill(equipmentType, equipment.quality);
        
        // 显示炼器结果
        this.showForgingResult(equipment);
        
        // 更新显示
        this.updateFluxDisplay();
        this.updateCatalystDisplay();
        this.onEquipmentTypeChange(equipmentType);
        this.updateSkillLevelDisplay();
        
        // 刷新仓库页面的道具列表显示
        uiMgr.updateInventoryList();
        
        // 保存数据
        dataMgr.saveLocal();
    }
    
    /**
     * 更新炼器术技能
     * @param {string} equipmentType - 装备类型
     * @param {number} qualityIndex - 装备品质索引
     */
    updateForgingSkill(equipmentType, qualityIndex) {
        // 增加炼器术经验
        const expGain = 10 + qualityIndex * 5;
        let roleD = dataMgr.getRoleData();
        roleD.forgingSkill.exp += expGain;
        if(!roleD.forgingSkill.successfulCrafts){
            roleD.forgingSkill.successfulCrafts = 0;
        }
        roleD.forgingSkill.successfulCrafts++;
        
        // 检查是否升级
        while (roleD.forgingSkill.exp >= roleD.forgingSkill.expToNext) {
            roleD.forgingSkill.exp -= roleD.forgingSkill.expToNext;
            roleD.forgingSkill.level++;
            roleD.forgingSkill.expToNext = Math.floor(100 * Math.pow(1.2, roleD.forgingSkill.level - 1));
        }
        
        // 更新精良及以上品质的炼制次数
        if (qualityIndex >= 2) { // 精良及以上
            if (!roleD.forgingSkill.highQualityCrafts) {
                roleD.forgingSkill.highQualityCrafts = {};
            }
            if (!roleD.forgingSkill.highQualityCrafts[equipmentType]) {
                roleD.forgingSkill.highQualityCrafts[equipmentType] = 0;
            }
            roleD.forgingSkill.highQualityCrafts[equipmentType]++;
        }
    }
    
    /**
     * 生成装备
     * @param {string} equipmentType - 装备类型
     * @returns {Object} 装备对象
     */
    generateEquipment(equipmentType) {
        let roleD = dataMgr.getRoleData();
        const forgingLevel = roleD.forgingSkill.level;
        console.log('炼器术等级:', forgingLevel,roleD.forgingSkill);
        if(!roleD.forgingSkill.highQualityCrafts){
            roleD.forgingSkill.highQualityCrafts = {};
        }
        if(!roleD.forgingSkill.highQualityCrafts[equipmentType]){
            roleD.forgingSkill.highQualityCrafts[equipmentType] = 0;
        }
        // 精良及以上品质的炼制次数
        const highQualityCrafts =  roleD.forgingSkill.highQualityCrafts[equipmentType];
        // 是否放入了催化剂
        const hasCatalyst = this.selectedCatalyst !== null;
                
        // 计算各品质的权重
        let weights = [
            100, // 普通
            50,  // 优秀
            30 + forgingLevel + highQualityCrafts * 0.5, // 精良
            20 + forgingLevel * 0.8 + highQualityCrafts * 0.8, // 史诗
            10 + forgingLevel * 0.5 + highQualityCrafts * 1.2 // 传说
        ];
        
        // 催化剂加成 - 只有在槽位中放入了催化剂之后才能对装备品质有影响
        if (hasCatalyst) {
            weights[2] += 20; // 精良
            weights[3] += 15; // 史诗
            weights[4] += 2;  // 传说
        }
        
        // 随机选择品质
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        let random = Math.random() * totalWeight;
        let qualityIndex = 0;
        
        for (let i = 0; i < weights.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                qualityIndex = i + 1;
                break;
            }
        }
        
        // 从配置表中获取装备模板
        const equipmentTemplates = dataMgr.getEquipBySlotInTable(equipmentType);
        
        // 随机选择一个装备模板
        const randomTemplate = equipmentTemplates[Math.floor(Math.random() * equipmentTemplates.length)];
        
        // 品质对应的数值总和和条数上限
        const qualitySettings = [
            { totalValue: 0, maxAttributes: 0 },   // 未鉴定--读不到这一行，qualityIndex从1开始
            { totalValue: 10, maxAttributes: 1 },   // 品质1
            { totalValue: 20, maxAttributes: 2 },   // 品质2
            { totalValue: 26, maxAttributes: 2 },   // 品质3
            { totalValue: 34, maxAttributes: 3 },   // 品质4
            { totalValue: 44, maxAttributes: 3 },   // 品质5
            { totalValue: 56, maxAttributes: 4 }    // 品质6
        ];
        
        const setting = qualitySettings[qualityIndex];
        
        // 可能的属性字段
        const possibleAttributes = [
            { key: 'attack', name: '攻击' },
            { key: 'defense', name: '防御' },
            { key: 'maxHp', name: '气血' },
            { key: 'maxMp', name: '法力' },
            { key: 'mpRegen', name: '法力回复' },//回蓝
            { key: 'hpRegen', name: '气血回复' },
            { key: 'critRate', name: '暴击率' },
            { key: 'critDamage', name: '暴伤率' },
            { key: 'dodgeRate', name: '闪避率' },
            { key: 'luck', name: '幸运值' },
            { key: 'immune', name: '免疫' },
            { key: 'damageReduction', name: '免伤' }
        ];
        
        // 生成随机属性
        const attributes = [];
        let remainingValue = setting.totalValue;
        let attributeCount = Math.floor(Math.random() * setting.maxAttributes) + 1; // 至少1条属性
        
        // 随机选择属性
        const availableAttributes = [...possibleAttributes];
        for (let i = 0; i < attributeCount; i++) {
            if (availableAttributes.length === 0) break;
            
            // 随机选择一个属性
            const randomIndex = Math.floor(Math.random() * availableAttributes.length);
            const selectedAttr = availableAttributes[randomIndex];
            availableAttributes.splice(randomIndex, 1);
            
            // 计算该属性的数值
            let value;
            if (i === attributeCount - 1) {
                // 最后一条属性，使用剩余所有值
                value = remainingValue;
            } else {
                // 随机分配部分值
                const maxValue = Math.floor(remainingValue / (attributeCount - i));
                value = Math.floor(Math.random() * maxValue) + 1;
                remainingValue -= value;
            }
            
            // 根据属性类型调整数值
            let adjustedValue = this.adjustAttributeValue(selectedAttr.key, value);
            
            attributes.push({
                key: selectedAttr.key,
                name: selectedAttr.name,
                value: adjustedValue
            });
        }
        
        return {
            id: this.getEquipUID(),
            oid: randomTemplate.id,
            name: randomTemplate.name,
            type: 'equipment',
            slot: randomTemplate.slot,
            att: attributes.map(attr => ({ key: attr.key, value: attr.value })),
            quality: qualityIndex,
            count:1
        };
    }
    // 生成一个唯一的装备ID
    getEquipUID(){
        // 生成一个唯一的装备ID 6位随机数
        const uid = 'eq-'+Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        let isExist = dataMgr.getPropInBagByID(uid);
        if(isExist){
            return this.getEquipUID();
        }
        return uid;
    }
    /**
     * 根据属性类型调整数值
     * @param {string} key - 属性键名
     * @param {number} value - 原始数值
     * @returns {number} 调整后的数值
     */
    adjustAttributeValue(key, value) {
        switch (key) {
            case 'critRate':
                return Math.min(35, Math.floor(value / 2)); // 暴击率上限35%
            case 'critDamage':
                return Math.min(400, 150 + value * 5); // 暴伤率基础150%，上限400%
            case 'dodgeRate':
                return Math.min(20, Math.floor(value / 3)); // 闪避率上限20%
            case 'hpRegen':
                return Math.min(50, Math.floor(value / 2)); // 气血回复上限50
            case 'mpRegen':
                return Math.min(40, Math.floor(value / 3)); // MP回复上限40
            case 'luck':
                return Math.min(20, Math.floor(value / 3)); // 幸运值上限20
            case 'immune':
                return Math.min(20, Math.floor(value / 3)); // 免疫上限20
            case 'damageReduction':
                return Math.min(50, Math.floor(value / 2)); // 免伤上限50%
            case 'maxHp':
                return value * 5; // 气血值放大5倍
            case 'maxMp':
                return value * 3; // 法力值放大3倍
            default:
                return value; // 攻击、防御等保持原值
        }
    }
    
    
    /**
     * 显示炼器结果
     * @param {Object} equipment - 装备对象
     */
    showForgingResult(equipment) {
        const equipmentNameElement = document.getElementById('result-equipment-name');
        equipmentNameElement.textContent = equipment.name;
        
        // 根据品质设置装备名称颜色
        equipmentNameElement.className = 'result-equipment-name';
        switch (equipment.quality) {
            case 1:
                equipmentNameElement.classList.add('common');
                break;
            case 2:
                equipmentNameElement.classList.add('good');
                break;
            case 3:
                equipmentNameElement.classList.add('rare');
                break;
            case 4:
                equipmentNameElement.classList.add('epic');
                break;
            case 5:
                equipmentNameElement.classList.add('legendary');
                break;
        }
        
        document.getElementById('result-equipment-quality').textContent = `品质：${DEFINE.QUALITIES[equipment.quality]}`;
        
        // 显示多个属性
        const attributeElement = document.getElementById('result-equipment-attribute');
        if (equipment.att && equipment.att.length > 0) {
            let attributeText = '属性加成：';
            equipment.att.forEach((attr, index) => {
                const attrName = uiMgr.getAttributeDisplayName(attr.key);
                attributeText += `${attrName} +${attr.value}`;
                if (index < equipment.att.length - 1) {
                    attributeText += '，';
                }
            });
            attributeElement.textContent = attributeText;
        } else {
            attributeElement.textContent = '属性加成：无';
        }
        
        document.getElementById('forging-result-modal').classList.remove('hidden');
        //炼器结果弹窗中的确定按钮点击事件
        document.getElementById('forging-result-confirm').addEventListener('click', () => {
            //关闭炼器结果弹窗
            document.getElementById('forging-result-modal').classList.add('hidden');
        });
    }
}


// ==================== 启动游戏 ====================
window.addEventListener('load', () => {
    window.game = new Game();
});
