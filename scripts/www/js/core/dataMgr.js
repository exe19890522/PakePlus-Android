import { uiMgr } from '../ui/uiMgr.js';
import { roleModel, placeModel, propModel, SaveDataModel, itemModel } from './models.js';

/**
 * 数据管理器，负责管理游戏中的所有数据获取和存档读取功能
 */
class DataMgr {
    constructor() {
        this.SAVE_VERSION = 2;
        this.saveKey = 'XCHnet-rougeXiuXian';
        this.backupKey = 'XCHnet-rougeXiuXian-backup';
        /** @type {SaveDataModel|undefined} */
        this.saveData = {};// 存档数据模型
        /** @type {configModel} */
        this.config = {};// 游戏配置表

        this.propNames = {};//道具id -> 道具名称的映射
    }
    //===== 读写存档方法 ======
    /**
     * 保存本地数据
     */
    saveLocal() {
        try {
            const currentData = localStorage.getItem(this.saveKey);
            if (currentData) {
                localStorage.setItem(this.backupKey, currentData);
            }
            this.saveData.version = this.SAVE_VERSION;
            localStorage.setItem(this.saveKey, JSON.stringify(this.saveData));
            console.warn(`Local data saved successfully, version: ${this.SAVE_VERSION}`);
        } catch (error) {
            console.error(`Failed to save local data:`, error); 
        }
    }
    /**
     * 加载本地数据
     */
    loadLocal() {
        try {
            const data = localStorage.getItem(this.saveKey);
            if (!data) {
                console.warn(`Not found in localStorage`);
                return null;
            }
            
            const parsedData = JSON.parse(data);
            
            if (!parsedData.version) {
                parsedData.version = 1;
            }
            
            if (parsedData.version > this.SAVE_VERSION) {
                console.error(`存档版本不兼容，存档版本: ${parsedData.version}，当前版本: ${this.SAVE_VERSION}`);
                return { error: 'version_incompatible', message: '存档版本过高，无法加载' };
            }
            
            return parsedData;
        } catch (error) {
            console.error(`Failed to load local data:`, error);
            return { error: 'corrupted', message: '存档数据损坏' };
        }
    }
    
    loadBackup() {
        try {
            const data = localStorage.getItem(this.backupKey);
            if (!data) {
                console.warn(`Backup not found in localStorage`);
                return null;
            }
            
            const parsedData = JSON.parse(data);
            return parsedData;
        } catch (error) {
            console.error(`Failed to load backup data:`, error);
            return null;
        }
    }
    
    hasBackup() {
        return localStorage.getItem(this.backupKey) !== null;
    }
    /**
     * 删除游戏存档
     */
    deleteLocal() {
        try {
            localStorage.removeItem(this.saveKey);
            localStorage.removeItem(this.backupKey);
            console.log(`Local data and backup deleted successfully`);
        } catch (error) {
            console.error(`Failed to delete local data:`, error);
        }
    }
    /**
     * 保存游戏设置
     * @param {Object} settings 设置数据
     */
    saveSettings(settings) {
        try {
            localStorage.setItem('gameSettings', JSON.stringify(settings));
            console.log('Settings saved successfully');
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    }

    /**
     * 加载游戏设置
     * @returns {Object|null} 设置数据或null
     */
    loadSettings() {
        try {
            const settings = localStorage.getItem('gameSettings');
            return settings ? JSON.parse(settings) : null;
        } catch (error) {
            console.error('Failed to load settings:', error);
            return null;
        }
    }
    printSaveData(needStr = false){
        if(needStr){
            console.warn(JSON.stringify(this.saveData));
        }else{
            console.warn(this.saveData);
        }
    }
    //=====

    /**
     * 初始化数据管理器 加载配置文件
     */
    async init() {
        console.warn('-- 数据管理器初始化DataMgr init --');
        // 从config.json加载配置数据
        try {
            const response = await fetch(`resources/config.json?v=${Date.now()}`);
            this.config = await response.json();
            console.warn('Config loaded successfully:', this.config);
            for(let prop of this.config.items){
                this.propNames[prop.id] = prop.name;
            }
            
            
        } catch (error) {
            console.error('Failed to load config:', error);
            this.config = {};
        }
    }
    /**
     * 初始化游戏存档数据
     */
    initSaveData(nickname) {
        this.saveData.roleData = new roleModel();
        this.saveData.roleData.name = nickname;
        this.saveData.inventory = [];
        this.saveLocal();
    }
    /**
     * 加载本地存档到数据管理器
     */
    loadToGame() {
        const loadedData = this.loadLocal();
        
        if (loadedData === null) {
            this.saveData = {};
            return { success: false, reason: 'no_save' };
        }
        
        if (loadedData.error) {
            this.saveData = {};
            return { success: false, reason: loadedData.error, message: loadedData.message };
        }
        
        this.saveData = loadedData;
        return { success: true };
    }

    /**
     * 获取道具的名称
     * @param {string} propId 道具ID
     * @returns {string} 道具名称或ID
     */
    getPropName(propId){
        return this.propNames[propId] || propId;
    }
    /**
     * 根据ID获取配置表中的道具信息
     * @param {string} id 道具ID
     * @returns {Object|null} 道具对象或null
     */
    getPropInTable(id) {
        return this.config.items.find(item => item.id === id) || null;
    }

    /**
     * 根据类型获取配置表中道具信息
     * @param {string} type 道具类型
     * @returns {propModel[]} 道具信息数组
     */
    getPropsByTypeInTable(type) {
        return this.config.items.filter(item => item.type === type);
    }

    /**
     * 根据装备槽位获取配置表中的装备数组
     * @param {string} slot 装备槽位
     * @returns {Array} 装备信息数组
     */
    getEquipBySlotInTable(slot) {
        return this.config.items.filter(item => item.type === 'equipment' && item.slot === slot);
    }

    /**
     * 根据ID获取配置表中的装备信息
     * @param {string} id 装备ID
     * @returns {itemModel|null} 装备信息对象或null
     */
    getEquipInTable(id) {
        return this.config.items.find(item => item.type === 'equipment' && item.id === id) || null;
    }
    /**
     * 获取 世界 所有地点信息
     * @returns {placeModel[]}
     */
    getWorldInTable() {
        return JSON.parse(JSON.stringify(this.config.world));
    }
    /**
     * 根据ID获取配置表中的 世界-城市 信息
     * @param {string} placeKey 地名key
     * @returns {string} 地名
     */
    getCityInTable(placeKey) {
        return this.config.world.find(item => item.id === placeKey);
    }
    /**
     * 获取技能信息
     * @param {string} skillId 技能ID
     * @returns {skillModel|null} 技能对象或null
     */
    getSkillInfo(skillId){
        return this.config.skills[skillId];
    }
    /**
     * 获取所有技能信息
     * @returns {{[key: string]: skillModel}} 技能对象，key为技能ID，value为技能信息
     */
    getAllSkills(){
        return this.config.skills;
    }
    /**
     * 获取所有属性信息
     * @returns {attTableModel[]} attTableModel[] 属性对象数组
     */
    getAllAttributes(){
        return this.config.attribute;
    }
    /**
     * 获取角色数据
     * @returns {roleModel|null} 角色数据对象或null
     */
    getRoleData() {
        return this.saveData.roleData || null;
    }
    /**
     * 学会一种新丹方
     * @param {string} recipeId 丹方id  recipe_health
     */
    learnRecipe(recipeId) {
        this.saveData.roleData.recipes[recipeId] = [];
        this.saveLocal();
    }
    /**
     * 固化丹方的材料配比
     * @param {string} recipeId 丹方id  recipe_health
     */
    formulateRecipe(recipeId, materials) {
        this.saveData.roleData.recipes[recipeId] = materials;
        this.saveLocal();
    }

    /**
     * 获取已学丹方列表
     * @returns {{[key: string]: Array<{id: string, count: number}>}} 已学丹方对象，key为丹方id，value为材料配比数组
     */
    getLearnedRecipes() {
        return this.saveData.roleData.recipes || {};
    }
    /**
     * 获取某个丹方的信息
     * @param {string} recipeId 丹方id
     * @returns {Array<{id: string, count: number}>} 材料配比数组或null
     */
    getRecipeMaterials(recipeId) {
        return this.saveData.roleData.recipes[recipeId] || null;
    }
    
    /**
     * 获取所有装备的加成属性
     */
    getEquipAtts(){
        let equipAtts = {};
        for(let slot in this.saveData.roleData.equips){
            let equip = this.saveData.roleData.equips[slot];
            if(!equip){continue;}
            for(let i=0;i < equip.att.length;i++){
                equipAtts[equip.att[i].key] = equip.att[i].value;
            }
        }
        return equipAtts;
    }
    /**
     * 获取所有属性加成
     * @returns {Object} 属性加成对象 {attack, defense, maxHp, maxMp, mpRegen}
     */
    getTotalBonus() {
        // return {
        //     attack: this.getAttributeBonus(0),
        //     defense: this.getAttributeBonus(1),
        //     maxHp: this.getAttributeBonus(2) * 10,
        //     maxMp: this.getAttributeBonus(3) * 5,
        //     mpRegen: Math.floor(this.getAttributeBonus(3) / 2)
        // };
        let equipAtts = this.getEquipAtts();
        for(let key in this.saveData.roleData.attribute){
            if(equipAtts[key]){
                equipAtts[key] += this.saveData.roleData.attribute[key];
            }else{
                equipAtts[key] = this.saveData.roleData.attribute[key];
            }
        }
        return equipAtts;
    }

    
    /**
     * 检查是否可以解锁天赋树（需要角色等级达到 8 级）
     * @param {number} level - 玩家等级
     * @returns {boolean} 是否成功解锁
     */
    checkTalentTreeUnlock(level) {
        if (level >= 8 && this.att[0] === 0) {
            this.att[0] = 1; // 解锁天赋树，可以激活第一个天赋
            return true;
        }
        return false;
    }
    
    /**
     * 获取天赋的属性类型（0=攻击，1=防御，2=气血，3=法力）
     * @param {number} talentIndex - 天赋序号
     * @returns {number} 属性类型索引
     */
    getTalentAttribute(talentIndex) {
        return talentIndex % 4;
    }
    
    /**
     * 获取天赋的基础加成数值
     * 每 5 组（20 个天赋）为一个阶段，数值翻倍
     * @param {number} talentIndex - 天赋序号
     * @returns {number} 基础加成数值
     */
    getBaseBonus(talentIndex) {
        const multiplier = Math.floor((talentIndex-1)/20)+1;//获取天赋所在的组倍率（每 20 个天赋为一组）
        // 基础数值：攻击=2，防御=1，气血=10，法力=8
        const baseValues = [2, 1, 10, 8];
        return baseValues[(talentIndex-1)%baseValues.length] * multiplier;
    }
    
    /**
     * 激活天赋
     * @param {number} talentIndex - 天赋序号（1-80），每个天赋组有 4 个天赋为一组
     * @returns {Object} 激活结果对象 {success: boolean, message: string}
     */
    unlockTalent(talentIndex) {
        console.log('激活天赋',talentIndex,this.att);
        // 检查天赋树是否已解锁
        if (talentIndex < 1 || this.att[0] < 1) return { success: false, message: '天赋树未解锁，需要在战斗中达到 8 级' };
        
        // 获取当前天赋点数
        const playerData = this.getRoleData();
        const talentPoint = playerData ? (playerData.talentPoint || 0) : 0;
        
        // 检查天赋点数是否足够
        if (talentPoint < 1) return { success: false, message: '天赋点数不足！需要 1 点天赋点，当前拥有 ' + talentPoint + ' 点' };
        
        //检查当前天赋是否已激活
        if (this.att[0]  < talentIndex) {
            return { success: false, message: '需要先激活前一个天赋' };
        }else if(this.att[0]  > talentIndex){
            return { success: false, message: '该天赋已激活过了' };
        }
        // 激活天赋--当可解锁序号跟点击序号一致时，才能激活成功
        const bonus = this.getBaseBonus(talentIndex);
        this.att[talentIndex] = bonus;
        this.att[0] = talentIndex + 1;
        
        // 消耗天赋点数
        playerData.talentPoint = talentPoint - 1;
        this.saveLocal();
        
        return { success: true, message: '天赋激活成功' };
    }
    
    /**
     * 解锁功能
     * @param {number} row - 行号
     * @param {Object} unlock - 解锁配置对象
     * @returns {Object} 解锁结果对象 {success: boolean, message: string}
     */
    unlockUnlock(row, unlock) {
        // 检查该功能是否已解锁
        if (this.spec[row] && !this.spec[row].locked) {
            return { success: false, message: '该功能已解锁' };
        }
        
        // 保存功能解锁数据
        // 根据行号确定对应的功能 key
        const unlockConfigs = {
            2: { key: 'MP_REGEN', value: 1 },
            5: { key: 'CRIT_RATE', value: 5 },
            8: { key: 'DODGE', value: 5 },
            11: { key: 'HP_REGEN', value: 3 },
            14: { key: 'IMMUNE', value: 10 },
            17: { key: 'PET', value: 1 }
        };
        
        const config = unlockConfigs[row];
        if (config) {
            this.spec[row] = {
                locked: false,
                key: config.key,
                value: config.value
            };
        }
        
        return { success: true, message: `${unlock.name}解锁成功！` };
    }
    
    /**
     * 检查天赋是否已激活
     * @param {number} talentIndex - 天赋序号
     * @returns {boolean} 是否已激活
     */
    isTalentUnlocked(talentIndex) {
        const dataIndex = talentIndex + 1;
        return this.att[dataIndex] !== undefined && this.att[dataIndex] > 0;
    }
    
    /**
     * 获取天赋的加成数值
     * @param {number} talentIndex - 天赋序号
     * @returns {number} 加成数值
     */
    getTalentBonus(talentIndex) {
        const dataIndex = talentIndex + 1;
        return this.att[dataIndex] || 0;
    }
    /**
     * 获取仓库全部道具数据
     */
    getAllProps() {
        return this.saveData.inventory;
    }

    /**
     * 获取仓库中的所有的丹方
     */
    getRecipesInBag() {
        return this.saveData.inventory.filter(i => i.type === 'alchemy');
    }
    /**
     * 获取背包中某个道具数据
     * @param {string} id - 道具ID
     * @returns {propModel} 道具对象
     */
    getPropInBagByID(id){
        return this.saveData.inventory.find(i => i.id === id);
    }
    /**
     * 增加金币
     * @param {number} amount - 金币数量
     */
    addGold(amount) {
        const roleData = this.getRoleData();
        if (roleData) {
            roleData.gold = (roleData.gold || 0) + amount;
            console.log(`获得金币 x${amount}, 总金币：${roleData.gold}`);
            this.saveLocal();
        }
    }

    /**
     * 添加炼丹经验
     * @param {number} exp - 经验值
     */
    addAlchemyExp(exp) {
        if (!this.saveData.roleData.alchemySkill) return;
        let alchemySkill = this.saveData.roleData.alchemySkill;
        alchemySkill.exp += exp;
        
        // 检查是否升级
        while (alchemySkill.exp >= alchemySkill.expToNext) {
            alchemySkill.exp -= alchemySkill.expToNext;
            alchemySkill.level++;
            alchemySkill.expToNext = Math.floor(alchemySkill.expToNext * 1.6);
            uiMgr.showAlchemyToast(`炼丹术升级到 Lv.${alchemySkill.level}！`);
        }
        
        // 保存数据
        this.saveLocal();
    }
    /**
     * 添加材料到背包
     * @param {string} type - 材料类型
     * @param {string} materialId - 材料ID
     * @param {number} count - 数量
     */
    addMaterial(type, materialId, count) {
        const prop = this.saveData.inventory.find(i => i.type === type && i.id === materialId);
        if (prop) {
            prop.count += count;
        } else {
            this.saveData.inventory.push(new propModel(materialId, count,type));
        }
        // 道具增加时立即保存数据
        this.saveLocal();
    }
    /**
     * 添加道具到背包
     * @param {propModel} propObj - 道具对象
     */
    addProp(propObj){
        this.saveData.inventory.push(propObj);
        // 道具增加时立即保存数据
        this.saveLocal();
    }
    /**
     * 消耗掉仓库中的道具
     * @param {string} propId - 道具ID
     * @param {number} count - 数量
     * @returns 
     */
    costProp(propId,count=1){
        const prop = this.getPropInBagByID(propId);
        if (prop && prop.count >= count) {
            prop.count -= count;
            
            if(prop.count <= 0){
                this.saveData.inventory.splice(this.saveData.inventory.indexOf(prop), 1);
            }
            // 道具减少时立即保存数据
            this.saveLocal();
            return true;
        } else{
            console.error(`${propId} 不存在或数量不足`);
            return false;
        }
    }
    /**
     * 添加装备到背包
     */
    addEquip(equipObj){
        this.saveData.inventory.push(equipObj);
        // 道具增加时立即保存数据
        this.saveLocal();
    }
    /**
     * 添加物品
     * @param {string} type - 物品类型
     * @param {string} itemId - 物品ID
     * @param {number} count - 添加数量
     * @param {Array} attributes - 物品属性
     * @param {number} quality - 物品品质
     * @param {Array} broken - 物品破坏属性
     */
    addItem(type, itemId, count, attributes = null, quality = null, broken = null) {
        const existing = this.saveData.inventory.find(i => i.type === type && i.id === itemId);
        if (existing) {
            existing.count += count;
        } else {
            let newProp = new propModel(itemId, count,type,  attributes, broken);
            if(quality){
                newProp.quality = quality;
            }
            this.saveData.inventory.push(newProp);
        }
        // 道具增加时立即保存数据
        this.saveLocal();
    }
    /**
     * 添加丹药到仓库
     * @param {string} itemId - 丹药ID
     * @param {number} count - 添加数量
     */
    addDrug(drugInfo) {
        this.saveData.inventory.push(drugInfo);
        // 道具增加时立即保存数据
        this.saveLocal();
    }

    /**
     * 获取仓库中某个类型的道具数组
     * @param {string} type - 道具类型
     * @returns {propModel[]} 道具数组
     */
    getItemsByType(type) {
        return this.saveData.inventory.filter(i => i.type === type);
    }
    /**
     * 获取仓库中某个道具ID的道具数量
     * @param {string} propId - 道具ID
     * @returns {number} 道具数量
     */
    getItemCount(propId) {
        return this.saveData.inventory.filter(i => i.id === propId).reduce((sum, i) => sum + i.count, 0);
    }

    /**
     * 获取仓库中的装备数组
     * @returns {propModel[]} 装备数组
     */
    getInventoryEquips() {
        return this.saveData.inventory.filter(item => item.type === 'equipment');
    }

    //获取已穿戴的装备列表
    getWearedEquips(){
        let equips =  this.saveData.roleData.equips;
        if(!equips||!Object.keys(equips).length){
            this.saveData.roleData.equips = {
                weapon: null,//武器
                armor: null,//铠甲
                ring: null,//戒指
                necklace: null,//项链
                helmet: null,//头盔
                wrist: null,//腕部
            };
        }
        return this.saveData.roleData.equips;
    }

    //获取某个副本的信息
    getDungeonInfo(dungeonId){
        if (!this.config.dungeon) return null;
        return this.config.dungeon[''+dungeonId];
    }
    //获取某个怪物的信息
    getMonsterInfo(monsterId){
        if (!this.config.monster) return null;
        return this.config.monster[''+monsterId];
    }

    //激活主角色的技能
    activateSkill(skillId){
        if(!skillId) return false;
        if(!this.config.skills || !this.config.skills[skillId]) return false;
        let roleData = this.saveData.roleData;
        if(!roleData.skills){
            roleData.skills = {};
        }
        if(!roleData.skills[skillId]){
            roleData.skills[skillId] = {
                level: 1,
                beActive: true
            }
        }else{
            roleData.skills[skillId].beActive = true;
        }
        // 激活技能时立即保存数据
        this.saveLocal();
        return true;
    }
    /**
     * 取消激活技能
     * @param {string} skillId - 技能ID
     * @returns {boolean} 是否取消成功
     */
    deactivateSkill(skillId) {
        if(!skillId) return false;
        if(!this.config.skills || !this.config.skills[skillId]) return false;
        let roleData = this.saveData.roleData;
        if(!roleData.skills){
            //提示技能不存在
            uiMgr.showTipText('角色技能数据不存在');
            return false;
        }
        if(!roleData.skills[skillId]){
            //提示技能不存在
            uiMgr.showTipText('技能不存在');
            return false;
        }else{
            roleData.skills[skillId].beActive = false;
        }
        // 持久化
        // if (window.dataMgr && window.dataMgr.saveData && window.dataMgr.saveData.roleData) {
        //     if (window.dataMgr.saveData.roleData.skills[skillId]) {
        //         window.dataMgr.saveData.roleData.skills[skillId].beActive = false;
        //     }
        //     window.dataMgr.saveLocal();
        // }
        this.saveLocal();
        return true;
    }
    /**
     * 获取当前已激活的技能列表
     * @returns {Array} 已激活技能数组
     */
    getActiveSkills() {
        if(!this.config.skills) return false;
        let roleData = this.saveData.roleData;
        const activeSkills = [];
        for (let k in roleData.skills) {
            if (roleData.skills[k].beActive) {
                activeSkills.push(k);
            }
        }
        return activeSkills;
    }
    /**
     * 获取已激活技能数量
     * @returns {number}
     */
    getActiveSkillCount() {
        return this.getActiveSkills().length;
    }
    /**
     * 检查是否达到激活上限（最多 5 个：飞剑 + 4 个其它技能）
     * @returns {boolean}
     */
    isActiveFull() {
        return this.getActiveSkillCount() >= 5;
    }
}

// 导出单例实例 
export const dataMgr = new DataMgr();
window.dataMgr = dataMgr;
