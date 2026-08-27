
//----------
/**
 * SaveData 模型
 * @typedef {Object} SaveDataModel
 * @property {roleModel} roleData - 角色数据模型
 * @property {propModel[]} inventory - 物品数组模型
 * @property {number} version - 版本号
 */
export class SaveDataModel {
    constructor(roleData, inventory) {
        this.roleData = roleData;
        this.inventory = inventory;
        this.version = 0;
    }
}
/**
 * 属性模型
 * @typedef {attTableModel} attTableModel
 * @description 属性模型
 * @property {string} type - 类型 都是 “att”
 * @property {string} id - 属性id
 * @property {string} name - 属性名称
 * @property {string} description - 属性描述
 * @property {number} level - 属性等级
 */
/**
 * 技能模型
 * @typedef {Object} skillModel
 * @property {string} id - 技能id
 * @property {string} name - 技能名称
 * @property {string} description - 技能描述
 * @property {number} level - 技能等级
 * @property {boolean} maxLevel - 是否最大等级
 * @property {number} damage - 伤害值
 * @property {number} cooldown - 冷却时间
 * @property {number} mpCost - 法力消耗
 */

/**
 * 游戏配置模型
 * @typedef {Object} configModel
 * @property {itemModel[]} items - 物品数组模型
 * @property {{[key: string]: dungeonModel}} dungeon - 地牢模型映射 dungeonModel
 * @property {mallModel[]} mall - 商店模型数组
 * @property {{[key: string]: monsterModel}} monster - 怪物模型映射 monsterModel
 * @property {{[key: string]: skillModel}} skills - 技能模型映射 skillModel
 * @property {attTableModel[]} attribute - 属性模型数组 attTableModel
 */

/**
 * @typedef {Object} DefineConfig
 * @property {propModel[]} ITEMS - 材料数据数组
 * @property {function(string): propModel[]} getItemsByType - 按类型过滤材料
 */

/**
 * @typedef {Object} ElementAttribute
 * @property {number} ele - 元素类型编号
 * @property {number} value - 属性值
 */

/**
 * @typedef {Object} propModel
 * @property {string} id - 唯一标识
 * @property {number} count - 数量
 * @property {string} type - 类型分类
 * @property {ElementAttribute[]} att - 属性数组
 * @property {ElementAttribute[]} broken? - 破坏属性数组
 */
export class propModel {
    constructor(id, count, type, att = null, broken = null) {
        this.id = id;
        this.count = count;
        this.type = type;
        this.att = att;
        this.broken = broken;
    }
    getName(){
        return dataMgr.getPropName(this.id);
    }
}
/**
 * 角色属性模型
 * @typedef {Object} attributeModel
 * @property {number} maxHp - 最大生命值
 * @property {number} maxMp - 最大法力值
 * @property {number} attack - 攻击力
 * @property {number} defense - 防御力
 * @property {number} mpRegen - 法力回复
 * @property {number} critRate - 暴击率
 * @property {number} critDamage - 暴击伤害
 * @property {number} dodgeRate - 闪避率
 * @property {number} hpRegen - 生命回复
 * @property {number} luck - 幸运值
 * @property {number} immune - 免疫伤害
 * @property {number} damageReduction - 伤害减免
 */
/**
 * 已学技能模型
 * @typedef {Object} skillLearnModel
 * @property {number} level - 技能等级
 * @property {boolean} beActive - 是否已激活
 * @property {number} cdSecond - 当前冷却时间(秒)
 */
/**
 * 角色模型
 * @typedef {Object} roleModel
 * @property {string} name - 姓名
 * @property {number} level - 等级
 * @property {number} exp - 经验值
 * @property {number} gold - 金币
 * @property {number} talentPoint - 天赋点
 * @property {attributeModel} attribute - 属性模型
 * @property {[key: string]: skillLearnModel} skills - 技能模型对象，键为技能ID，值为技能对象
 */
export class roleModel {
    name = '未命名';
    level = 1;//等级
    exp = 0; // 经验值
    
    gold = 0; // 金币
    talentPoint = 0; // 天赋点
    /**@type {attributeModel} */
    attribute = {
        maxHp : 100,
        maxMp : 50,
        attack : 10,//攻击力
        defense : 0,//防御力
        mpRegen : 1,//法力回复
        critRate:0,//暴击率
        critDamage:150,//暴击伤害
        dodgeRate:0,//闪避率
        hpRegen:0,//生命回复
        luck:0,//幸运值
        immune:0,//免疫伤害
        damageReduction:0,//伤害减免
    };
    //已学技能
    /**@type {Object.<string, skillLearnModel>} */
    skills = {
        flying_sword: { level: 1, beActive: true },
    };
    //已穿戴装备
    equips = {
        weapon: null,//武器
        armor: null,//铠甲
        ring: null,//戒指
        necklace: null,//项链
        helmet: null,//头盔
        wrist: null,//腕部
    };
    //inventory = [];//仓库物品列表
    recipes = {};//已经学会的丹方信息
    talent = {
        att : [0], // 天赋属性数据数组
        spec:{}//天赋功能按钮激活状态
    };
    pets = [];//宠物列表
    materialProps = this.materialProps;
    createTime = new Date().getTime();//创建时间
    totalReward = 0; // 月签到累签总奖励
    monthReward = 0; // 月签每日奖励
    sevenDayReward = 0; // 新人7天签到奖励
    //炼丹术
    alchemySkill = { level: 1,max:10, exp:0,expToNext:100 };
    //炼器术
    forgingSkill = { level: 1,max:10, exp:0,expToNext:100,highQualityCrafts:{} };
    //灵植术
    cultivationSkill = { level: 1,max:10, exp:0,expToNext:100 };
    //生活技能
    lifeSkill = { level: 1,max:5, exp:0,expToNext:100,highEyes:0 };


    //副本进度
    stage = {
        curId: 1, // 当前最新进度解锁可战斗的关卡ID
        clearArr: [], // 已通过的关卡ID数组
        rewardArr: [] // 已领取首通奖励的关卡ID数组
    };
    
    fatigue = 120; // 副本所需的疲劳点数值，默认120点
    fatigueDate="";//疲劳值更新时间
}

/**
 * 材料模板
 * @typedef {Object} Material
 * @deprecated 请使用 propModel 替代 Material
 */
export class Material {
    constructor(type, materialId, count, attributes = null, quality = null) {
        this.type = type; // 'alchemy' or 'forge'
        this.materialId = materialId;
        this.count = count;
        this.att = attributes; // 装备属性，只有装备类型才有
        this.quality = quality; // 装备品质
    }
    
    getName() {
        if (this.type === 'alchemy') {//炼丹材料
            /** @type {propModel} */
            let mat = DEFINE.getAlchemyMaterial(this.materialId);
            return mat ? mat.name : this.materialId;
        } else if(this.type === 'forge'){//炼器材料
            /** @type {propModel} */
            let mat = DEFINE.getForgeMaterial(this.materialId);
            return mat ? mat.name : this.materialId;
        }else if(this.type === 'equipment'){//装备
            /** @type {propModel} */
            let mat = dataMgr.getEquipInTable(this.materialId);
            return mat ? mat.name : this.materialId;
        }else if(this.type === 'dan' || this.type === 'pill'){//成丹
            let mat = dataMgr.getItemInTable(this.materialId);
            return mat ? mat.name : this.materialId;
        }else{
            let mat = dataMgr.getItemInTable(this.materialId);
            return mat ? mat.name : this.materialId;
        }
    }
}
export class MaterialDropManager {
    constructor() {
        this.drops = [];
    }
    
    reset() {
        this.drops = [];
    }
    /**
     * 随机掉落材料
     * @param {number} x - 材料掉落物 X 坐标
     * @param {number} y - 材料掉落物 Y 坐标
     * @param {string} type - 材料类型
     * @returns {void}
     */
    spawnMaterial(x, y, type, materialId, count) {
        console.warn(`随机掉落材料 ${type} ${materialId} x${count} at ${x}, ${y}`);
        this.drops.push(new MaterialDrop(x, y, type, materialId, count));
    }
    /**
     * 随机掉落材料
     * @param {number} x - 材料掉落物 X 坐标
     * @param {number} y - 材料掉落物 Y 坐标
     * @param {string} type - 材料类型: 'alchemy'（炼丹材料） 或 'forge'（炼器材料）
     * @returns {void}
     */
    spawnRandomMaterial(x, y, type) {
        let materialId, count;
        //获取指定类型的材料数组
        console.warn(`随机掉落材料 ${type}`);
        console.warn(`仓库：材料数组:`, dataMgr.getAllProps());

        const materials = dataMgr.getPropsByTypeInTable(type);
        if (materials.length === 0) {
            console.error(`No ${type} materials found in config`);
            return;
        }
        //随机选择一个材料
        if (type === 'alchemy') {
            /** @type {propModel} */
            const herb = randomFromArray(materials);
            materialId = herb.id;
            count = randomInt(3, 6);
        } else {
            /** @type {propModel} */
            const ore = randomFromArray(materials);
            materialId = ore.id;
            count = randomInt(2, 7);
        }
        this.spawnMaterial(x, y, type, materialId, count);
    }
    
    update(dt, playerX, playerY) {
        for (const drop of this.drops) {
            drop.update(dt);
        }
    }
    /**
     * 检查玩家是否拾取到材料
     * @param {number} playerX - 玩家 X 坐标
     * @param {number} playerY - 玩家 Y 坐标
     * @returns {boolean} - 是否拾取到材料
     */
    checkPickup(playerX, playerY) {
        for (let i = this.drops.length - 1; i >= 0; i--) {
            if (this.drops[i].canPickup(playerX, playerY)) {
                const drop = this.drops[i];
                dataMgr.addMaterial(drop.type, drop.materialId, drop.count);
                console.log(`Picked up ${drop.materialId} x ${drop.count}`);
                this.drops.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    
    getCount() {
        return this.drops.length;
    }
}


//材料掉落模板
export class MaterialDrop {
    constructor(x, y, type, materialId, count) {
        this.x = x;
        this.y = y;
        this.type = type; // 'alchemy' or 'forge'
        this.materialId = materialId;
        this.count = count;
        this.size = 12;
        this.bobTimer = Math.random() * Math.PI * 2;
        this.bobOffset = 0;
    }
    
    update(dt) {
        this.bobTimer += dt * 3;
        this.bobOffset = Math.sin(this.bobTimer) * 3;
    }
    
    getBobOffset() {
        return this.bobOffset;
    }
    
    canPickup(playerX, playerY) {
        const dist = distance(this.x, this.y, playerX, playerY);
        return dist < this.size + 25;
    }
    
    getName() {
        if (this.type === 'alchemy') {
            let mat = DEFINE.getAlchemyMaterial(this.materialId);
            return mat ? mat.name : this.materialId;
        } else {
            let mat = DEFINE.getForgeMaterial(this.materialId);
            return mat ? mat.name : this.materialId;
        }
    }
}

/**
 * @typedef {Object} placeModel
 * @property {string} id - 唯一标识
 * @property {string} name - 
 * @property {string} type - 类型分类
 * @property {number} x - x坐标
 * @property {number} y - y坐标
 * @property {string[]} connectedTo 连接到哪些地点
 * @property {number} level? 主城等级
 * @property {string} terrain? 地形
 */
export class placeModel {
    constructor(id, name, type, x,y,connectedTo,level,terrain) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.x = x;
        this.y = y;
        this.connectedTo = connectedTo;
        this.level = level;
        this.terrain = terrain;
    }
    getName(){
        return dataMgr.getWorldInTable(this.id).name;
    }
}

//配置表数据结构：物品模板
export class itemModel {
    constructor(id, name, type, att, quality, description) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.att = att;
        this.quality = quality;
        this.description = description;
    }
}
//配置表数据结构：商城商品模板
export class mallModel {
    constructor(id, price) {
        this.id = id;
        this.price = price;
    }
}
//配置表数据结构：怪物模板
export class monsterModel {
    constructor(id, name, type, att, quality, description) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.att = att;
        this.quality = quality;
        this.description = description;
    }
}
//配置表数据结构：副本模板
export class dungeonModel {
    constructor(id, name, type, att, quality, description) {
        this.id = id;
        this.name = name;//副本名称
        this.description = description;//副本描述
        this.quality = quality;//副本等级
        this.monsters = monsters;//副本怪物列表
        this.gold = gold;//通关奖励金币
        this.reward = reward;//首次通关奖励物品
    }
}