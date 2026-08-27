// ==================== 玩家类 ====================
import { dataMgr } from '../core/dataMgr.js';
import { roleModel } from '../core/models.js';   
import { uiMgr } from '../ui/uiMgr.js';
/**
 * 玩家类 - 管理玩家的所有属性和行为
 */
export default class Player {
    /**
     * 创建玩家实例
     * @param {number} x - 初始 X 坐标
     * @param {number} y - 初始 Y 坐标
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.name = '战斗中的角色';
        this.hp = 0;
        this.maxHp = 0;
        this.mp = 0;
        this.maxMp = 0;
        this.level = 1;
        this.exp = 0;
        this.expToNext = (this.level - 1) * 200 + 50 + 100 * Math.floor(this.level / 5);
        this.attack = 0;
        this.defense = 0;
        this.mpRegen = 0;
        this.critRate = 0; // 暴击率（0-35%）
        this.critDamage = 0; // 暴伤率（150-400%）
        this.dodgeRate = 0; // 闪避率（0-20%）
        this.hpRegen = 0; // 气血回复值（0-50）
        this.luck = 0; // 幸运值（0-20，影响战斗中宝箱掉落几率）
        this.immune = 0; // 免疫（0-20，影响被控制或者debuff影响的几率）
        this.damageReduction = 0; // 免伤（0-50，抵消原本受到的伤害值）
        this.qiPills = 0;
        this.gold = 0; // 金币
        this.talentPoint = 0; // 天赋点
        this.invincibleTimer = 0;
        this.mpRegenTimer = 0;//法力恢复计时器
        this.hpRegenTimer = 0; // 气血恢复计时器
        this.flyingSwordTimer = 0;//飞行剑攻击计时器
        this.jinZhongZhaoActive = false;//金钟罩是否激活
        
        
        // Animation
        this.direction = { x: 1, y: 0 };
        this.isMoving = false;
        this.isAttacking = false;
        this.attackAnimTimer = 0;//攻击动画计时器
        this.walkAnimTimer = 0;//行走动画计时器
        this.armAngle = 0;//手臂角度


        /**@type {Object.<string, skillLearnModel>} */
        //技能状态
        this.skills = {};
        //属性加成，仅作加成记录
        /** @type {Object.<string, attTableModel>} */
        this.attRecord = {};
    }
    /**
     * 初始化角色属性
     * @param {roleModel} roleData - 角色数据对象，包含属性和技能信息
     */
    init(roleData){
        for(let key in roleData.attribute){
            this[key] = roleData.attribute[key];
        }
        this.hp = roleData.attribute.maxHp;
        this.mp = roleData.attribute.maxMp;
        this.name = roleData.name;
        for(let key in roleData.skills){
            if(!roleData.skills[key].beActive){continue;}
            this.skills[key] = {
                level:roleData.skills[key].level,
                beActive:true,
                cdSecond:0,
            };
        }
    }
    /**
     * 重置玩家状态
     * @param {number} x - 重置后的 X 坐标
     * @param {number} y - 重置后的 Y 坐标
     */
    reset(x, y) {
        this.x = x;
        this.y = y;
        this.hp = DEFINE.PLAYER.MAX_HP;
        this.maxHp = DEFINE.PLAYER.MAX_HP;
        this.mp = DEFINE.PLAYER.MAX_MP;
        this.maxMp = DEFINE.PLAYER.MAX_MP;
        this.level = 1;
        this.exp = 0;
        this.expToNext = 50;
        this.attack = DEFINE.PLAYER.ATTACK;
        this.defense = DEFINE.PLAYER.DEFENSE;
        this.mpRegen = DEFINE.PLAYER.MP_REGEN;
        this.critRate = DEFINE.PLAYER.CRIT_RATE; // 暴击率（0-35%）
        this.critDamage = DEFINE.PLAYER.CRIT_DAMAGE; // 暴伤率（150-400%）
        this.dodgeRate = DEFINE.PLAYER.DODGE_RATE; // 闪避率（0-20%）
        this.hpRegen = DEFINE.PLAYER.HP_REGEN; // 气血回复值（0-50）
        this.luck = DEFINE.PLAYER.LUCK; // 幸运值（0-20，影响战斗中宝箱掉落几率）
        this.immune = DEFINE.PLAYER.IMMUNE; // 免疫（0-20，影响被控制或者debuff影响的几率）
        this.damageReduction = DEFINE.PLAYER.DAMAGE_REDUCTION; // 免伤（0-50，抵消原本受到的伤害值）
        this.qiPills = 0;
        this.gold = 0;
        this.talentPoint = 0;
        this.invincibleTimer = 0;
        this.mpRegenTimer = 0;
        this.hpRegenTimer = 0; // 气血回复计时器
        this.flyingSwordTimer = 0;

        
        // 重置炼丹术和炼器术
        this.alchemySkill = {
            level: 1,
            exp: 0,
            expToNext: 100,
            successfulCrafts: 0
        };
        
        this.forgingSkill = {
            level: 1,
            exp: 0,
            expToNext: 100,
            successfulCrafts: 0,
            highQualityCrafts: {}
        };
        
        this.direction = { x: 1, y: 0 };
        this.isMoving = false;
        this.isAttacking = false;
        this.attackAnimTimer = 0;
        this.walkAnimTimer = 0;
        this.armAngle = 0;
    }
    
    /**
     * 移动玩家
     * @param {number} dx - X 方向移动量
     * @param {number} dy - Y 方向移动量
     * @param {number} dt - 时间间隔（秒）
     */
    move(dx, dy, dt) {
        if (dx !== 0 || dy !== 0) {
            const len = Math.sqrt(dx * dx + dy * dy);
            dx /= len;
            dy /= len;
            
            this.x += dx * DEFINE.PLAYER.MOVE_SPEED * dt;
            this.y += dy * DEFINE.PLAYER.MOVE_SPEED * dt;
            
            // No map bounds restriction - free movement
            
            this.direction = { x: dx, y: dy };
            this.isMoving = true;
            this.walkAnimTimer += dt;
        } else {
            this.isMoving = false;
        }
    }
    
    /**
     * 更新玩家状态
     * @param {number} dt - 时间间隔（秒）
     */
    update(dt) {
        // MP Regen
        this.mpRegenTimer += dt;
        //console.log('-----------mpRegenTimer:',this.mpRegenTimer);
        if (this.mpRegenTimer >= 1) {
            this.mpRegenTimer = 0;
            this.mp = Math.min(this.maxMp, this.mp + this.mpRegen);
            console.log(`MP regenerated: +${this.mpRegen}, current MP: ${this.mp}/${this.maxMp}`);
        }
        
        // HP Regen
        if (this.hpRegen > 0 && this.hp < this.maxHp) {
            this.hpRegenTimer += dt;
            if (this.hpRegenTimer >= 1) {
                this.hpRegenTimer = 0;
                const hpRecovered = this.hpRegen;
                this.hp = Math.min(this.maxHp, this.hp + hpRecovered);
                console.log(`HP regenerated: +${hpRecovered}, current HP: ${this.hp}/${this.maxHp}`);
            }
        }
        // 更新状态栏
        uiMgr.updateStateBar(this);
        // Invincibility
        if (this.invincibleTimer > 0) {
            this.invincibleTimer -= dt;
        }
        
        // Attack animation
        if (this.attackAnimTimer > 0) {
            this.attackAnimTimer -= dt;
            this.armAngle = Math.sin((0.2 - this.attackAnimTimer) * Math.PI * 5) * 0.5;
            if (this.attackAnimTimer <= 0) {
                this.isAttacking = false;
                this.armAngle = 0;
            }
        }
    }
    
    /**
     * 玩家受到伤害
     * @param {number} damage - 原始伤害值
     * @returns {number} 实际受到的伤害值
     */
    takeDamage(damage) {
        if (this.invincibleTimer > 0 || this.jinZhongZhaoActive) return 0;
        
        const actualDamage = Math.max(1, damage - this.defense);
        this.hp -= actualDamage;
        if (this.hp < 0) this.hp = 0;
        this.invincibleTimer = DEFINE.PLAYER.INVINCIBLE_TIME;
        
        // 记录受伤日志并在头顶显示飘字
        if (window.uiMgr) {
            if (this.hp / this.maxHp < 0.5) {
                window.uiMgr.addBattleLog(`受到 ${actualDamage} 点伤害，剩余气血 ${this.hp}/${this.maxHp}`, 'damage');
            }
            if (this.x !== undefined && this.y !== undefined) {
                window.uiMgr.showPlayerFloatingText(`-${actualDamage}`, this.x, this.y);
            }
        }
        
        return actualDamage;
    }
    
    /**
     * 恢复气血
     * @param {number} amount - 恢复量
     */
    heal(amount) {
        if (this.hp < 1) return;
        this.hp = Math.min(this.maxHp, this.hp + amount);
    }
    
    /**
     * 恢复法力
     * @param {number} amount - 恢复量
     */
    restoreMp(amount) {
        this.mp = Math.min(this.maxMp, this.mp + amount);
    }
    
    /**
     * 消耗法力
     * @param {number} amount - 消耗量
     * @returns {boolean} 是否成功消耗
     */
    consumeMp(amount) {
        if (this.mp >= amount) {
            this.mp -= amount;
            window.uiMgr.updateStateBar(this);
            return true;
        }
        return false;
    }
    
    /**
     * 获得经验值
     * @param {number} amount - 经验值数量
     * @returns {boolean} 是否升级
     */
    gainExp(amount) {
        this.exp += amount;
        let didLevelUp = false;
        
        // 记录获得经验日志
        if (window.uiMgr && amount > 0) {
            window.uiMgr.addBattleLog(`获得经验 +${amount}`, 'exp');
        }
        
        while (this.exp >= this.expToNext) {
            this.exp -= this.expToNext;
            this.levelUp();
            didLevelUp = true;
        }
        
        return didLevelUp;
    }
    
    /**
     * 升级处理
     */
    levelUp() {
        if (this.hp < 1) return;
        this.level++;
        this.expToNext = (this.level - 1) * 200 + 50 + 100 * Math.floor(this.level / 5);
        this.maxHp += 10;
        this.hp = this.maxHp;
        this.maxMp += 5;
        this.mp = this.maxMp;
        this.attack += 2;
        
        // 记录升级日志
        if (window.uiMgr) {
            window.uiMgr.addBattleLog(`恭喜！角色升级至 Lv.${this.level}，气血上限 +10，法力上限 +5，攻击 +2`, 'level');
        }
        
        // 检查天赋树解锁（达到 8 级时）
        if (window.dataManager) {
            window.dataManager.checkTalentTreeUnlock(this.level);
        }
    }
    
    /**
     * 获得气丸
     */
    gainQiPill() {
        this.qiPills = Math.min(3, this.qiPills + 1);
    }
    
    /**
     * 使用气丸
     * @returns {number} 使用的气丸数量
     */
    useQiPills() {
        const used = this.qiPills;
        this.qiPills = 0;
        return used;
    }
    
    /**
     * 获得金币
     * @param {number} amount - 获得的金币数量
     */
    gainGold(amount) {
        // 金币变化时立即保存数据
        dataMgr.addGold(amount);
        uiMgr.showGoldToast(`获得金币 x${amount}`);
        if (window.uiMgr && amount > 0) {
            window.uiMgr.addBattleLog(`获得金币 +${amount}`, 'item');
        }
    }
    
    /**
     * 消耗金币
     * @param {number} amount - 消耗的金币数量
     * @returns {boolean} 是否成功消耗
     */
    consumeGold(amount) {
        if (this.gold >= amount) {
            this.gold -= amount;
            // 金币变化时立即保存数据
            dataMgr.addGold(-amount);
            uiMgr.showGoldToast(`消耗金币 x${amount}`);
            return true;
        }
        return false;
    }
    
    /**
     * 触发攻击动画
     */
    triggerAttackAnim() {
        this.isAttacking = true;
        this.attackAnimTimer = 0.2;
    }
    
    /**
     * 检查玩家是否存活
     * @returns {boolean} 是否存活
     */
    isAlive() {
        return this.hp > 0;
    }
    
    /**
     * 获取气血百分比
     * @returns {number} 气血百分比（0-1）
     */
    getHpPercent() {
        return this.hp / this.maxHp;
    }
    
    /**
     * 获取法力百分比
     * @returns {number} 法力百分比（0-1）
     */
    getMpPercent() {
        return this.mp / this.maxMp;
    }
    
    /**
     * 获取经验百分比
     * @returns {number} 经验百分比（0-1）
     */
    getExpPercent() {
        return this.exp / this.expToNext;
    }
    /**
     * 检测是否学过某个技能
     * @param {string} skillId - 技能ID
     * @returns {boolean} 是否学过
     */
    isSkillLearned(skillId){
        return this.skills[skillId];
    }
    /**
     * 检测已有的属性加成类
     */
    isAttBonus(attId){
        return this.attRecord[attId];
    }

    /**
     * 生成 4 个随机升级选项
     * @returns {Array<skillLearnModel>} 包含 4 个选项的数组（技能升级或属性提升）
     */
    generateOptions() {
        const allOptions = [];
        //获取所有的技能配置表
        let allSkillsT = dataMgr.getAllSkills();
        //根据已有的技能，生成技能选项
        for (let skillId in allSkillsT) {
            let skillT = allSkillsT[skillId],skillD = this.skills[skillId];
            skillT.type = 'skill';
            //console.warn('skillId:',skillId,skillD,'maxlv:',skillT.maxLevel);
            if (!skillD) {
                allOptions.push(skillT);
            }else if (skillD.level < skillT.maxLevel) {
                skillT.level = skillD.level;
                allOptions.push(skillT);
            }
        }
        //获取所有的属性配置表
        /** @type {attTableModel[]} allAtt */
        let allAttT = dataMgr.getAllAttributes();
        //console.warn('----this.attRecord:',this.attRecord);
        //根据已有的属性加成类，生成属性选项
        for (let attModel of allAttT) {
            let attLv = this.attRecord[attModel.id];
            if(attLv){//已有的属性加成类
                attModel.level = attLv;
            }else{//未有的属性加成类
                attModel.level = 1;
            }
            allOptions.push(attModel);
        }
        
        // while (options.length < 4 && allOptions.length > 0) {
        //     const index = Math.floor(Math.random() * allOptions.length);
        //     options.push(allOptions.splice(index, 1)[0]);
        // }
        //随机乱序
        this.shuffleArray(allOptions); 
        allOptions.length = 4;
        //----临时代码
        console.warn('----allOptions:',allOptions);
        // let skillKey = 'yan_shuang_fei';
        // let skillD = this.skills[skillKey],skillT = allSkillsT[skillKey];
        // if (!skillD) {
        //     allOptions.push(skillT);
        // }else if (skillD.level < skillT.maxLevel) {
        //     skillT.level = skillD.level;
        //     allOptions.push(skillT);
        // }

        // let attKey ='duan_lian';
        // let newAtt = allAttT.find(attModel => attModel.id === attKey);
        // if(this.attRecord[attKey]){
        //     newAtt.level = this.attRecord[attKey];
        // }else{
        //     newAtt.level = 1;
        // }
        // allOptions.push(newAtt);
        return allOptions;
    }
    //随机乱序数组
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    /**
     * 更新所有技能的冷却时间
     * @param {number} dt - 距离上次更新的时间间隔（秒）
     */
    updateSkillsCooldown(dt) {
        for (const skill of Object.values(this.skills)) {
            if (skill.cdSecond > 0) {
                skill.cdSecond -= dt;
            }
        }
    }
    /**
     * 检测某个技能是否可以释放
     * @param {string} skillId - 技能ID
     * @returns {boolean} 是否可以释放
     */
    isSkillUsable(skillId){
        let skillD = this.skills[skillId];
        if (!skillD) {
            return false;
        }
        if(skillD.beActive && skillD.cdSecond <= 0){
            return true;
        }
        return false;
    }
    /**
     * 获取某个技能的最大冷却时间
     * @param {string} skillId - 技能ID
     * @returns {number} 最大冷却时间（秒）
     */
    getSkillMaxCooldown(skillId){
        let cdSkill = this.skills['cooldown'],dSecond=0;
        if (cdSkill) {
            dSecond = cdSkill.level*0.2;
        }
        /** @type {skillModel} skillT */
        let skillT = dataMgr.getSkillInfo(skillId);
        return skillT.cooldown-dSecond;
    }
    /**
     * 重置某个技能的冷却时间
     * @param {string} skillId - 技能ID
     */
    resetSkillCooldown(skillId){
        let skillD = this.skills[skillId];
        if (!skillD) {
            return;
        }
        skillD.cdSecond = this.getSkillMaxCooldown(skillId);
    }
    
    /**
     * 获取飞剑攻击间隔
     * @returns {number} 飞剑攻击间隔（秒）
     */
    getFlyingSwordInterval() {
        return 1.0 / (1 + this.skills.flying_sword.level * 0.1);
    }
    /**
     * 计算飞剑技能的伤害值
     * @returns {number} 飞剑的伤害值
     */
    getFlyingSwordDamage(playerAttack = null) {
        const level = this.skills.flying_sword.level;
        const baseAttack = playerAttack ||this.attack;
        console.warn('飞剑伤害值:',playerAttack,level,',atk:',this.attack, baseAttack + (level - 1) * 5);
        return baseAttack + (level - 1) * 5;
    }
    
    /**
     * 获取飞剑数量（偶数等级额外增加一把）
     * @returns {number} 飞剑数量
     */
    getFlyingSwordCount() {
        const level = this.skills.flying_sword.level;
        return Math.floor((level + 1) / 2);
    }
    
    /**
     * 计算符箓技能的伤害值
     * @returns {number} 符箓的伤害值
     */
    getTalismanDamage() {
        const level = this.skills.talisman.level;
        if (level <= 0) {
            return DEFINE.TALISMAN.BASE_DAMAGE;
        }
        return DEFINE.TALISMAN.BASE_DAMAGE + (level - 1) * DEFINE.TALISMAN.DAMAGE_PER_LEVEL;
    }

    /**
     * 计算绝招技能的影响半径
     * @returns {number} 绝招的影响半径
     */
    getUltimateRadius() {
        const level = this.skills.ultimate.level;
        const baseRadius = DEFINE.CAMERA.VIEW_RADIUS * DEFINE.ULTIMATE.BASE_RADIUS_SCALE;
        const evenLevelBonus = Math.floor(level / 2) * DEFINE.ULTIMATE.RADIUS_SCALE;
        return baseRadius * (1 + evenLevelBonus);
    }
    
    /**
     * 计算绝招技能的伤害值
     * @returns {number} 绝招的伤害值
     */
    getUltimateDamage() {
        const level = this.skills.ultimate.level;
        if (level <= 0) {
            return DEFINE.ULTIMATE.BASE_DAMAGE;
        }
        const baseDamage = DEFINE.ULTIMATE.BASE_DAMAGE;
        const oddLevelBonus = Math.floor(level / 2) * DEFINE.ULTIMATE.DAMAGE_SCALE;
        return baseDamage * (1 + oddLevelBonus);
    }


}
