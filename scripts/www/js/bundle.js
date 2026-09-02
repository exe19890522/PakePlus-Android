

// ====== js\core\config.js ======
// ==================== 游戏定义配置 ====================
/**
 * @type {DefineConfig}
 */
const DEFINE = {
    DEV_VERSION: "1.0.0",
    CANVAS_WIDTH: 720,
    CANVAS_HEIGHT: 1280,
    MAP_RADIUS: 280,
    
    // 摄像机视野配置
    CAMERA: {
        // 视野半径，怪物离开此范围的2倍时自动消失
        VIEW_RADIUS: 400,
        // 怪物消失距离 = VIEW_RADIUS * DESPAWN_MULTIPLIER
        DESPAWN_MULTIPLIER: 2
    },
    
    PLAYER: {
        MAX_HP: 100,//最大血量
        MAX_MP: 50,//最大MP
        MOVE_SPEED: 200,//移动速度（像素/秒）
        ATTACK: 10,//攻击值
        DEFENSE: 0,//防御值
        MP_REGEN: 1,//MP回复值（0-40）
        CRIT_RATE: 0, // 暴击率（0-35%）
        CRIT_DAMAGE: 150, // 暴伤率（150-400%）
        DODGE_RATE: 0, // 闪避率（0-20%）
        HP_REGEN: 0, // 气血回复值（0-50）
        LUCK: 0, // 幸运值（0-20，影响战斗中宝箱掉落几率）
        IMMUNE: 0, // 免疫（0-20，影响被控制或者debuff影响的几率）
        DAMAGE_REDUCTION: 0, // 免伤（0-50，抵消原本受到的伤害值）
        INVINCIBLE_TIME: 0.5,//无敌时间（秒）
    },
    
    WAVE: {
        MAX_WAVES: 30,//最大波数
        BASE_MONSTERS: 10,//基础怪物数
        INTERVAL: 5,//波数间隔
        ELITE_INTERVAL: 5,//精英波间隔
        BOSS_INTERVAL: 15,//boss波间隔
    },
    
    // ==================== 飞剑数量与发射角度配置 ====================
    // 飞剑数量: 等级1=1把, 等级2=2把, 等级3=2把, 等级4=3把...
    FLYING_SWORD: {
        // 基础攻击(1级)
        BASE_DAMAGE: 10,
        // 每级攻击增长
        DAMAGE_PER_LEVEL: 15,
        // 角度间隔(度)，多把飞剑时，相邻飞剑间的角度差
        ANGLE_INTERVAL: 20,
        // 发射角度范围(度)，以朝向为中心的两侧最大角度
        MAX_ANGLE_SPREAD: 60,
        // 基础速度(像素/秒)
        BASE_SPEED: 500,
        // 每级速度增长
        SPEED_PER_LEVEL: 20,
        // 基础持续时间(秒)
        BASE_LIFETIME: 0.3,
        // 每级持续时间增长(秒)
        LIFETIME_PER_LEVEL: 0.1
    },
    
    // ==================== 符箓数量与发射角度配置 ====================
    // 符箓数量: 固定3个
    // 发射角度: ±15°分布，即朝向-15°, 朝向, 朝向+15°
    TALISMAN: {
        // 符箓数量(固定)
        COUNT: 3,
        // 基础攻击(1级)
        BASE_DAMAGE: 18,
        // 每级攻击增长
        DAMAGE_PER_LEVEL: 20,
        // 角度间隔(度)
        ANGLE_OFFSET: 15,
        // 速度(像素/秒)
        SPEED: 400,
        // 最大飞行距离(像素)
        MAX_RANGE: 350,
        // 持续时间(秒)
        LIFETIME: 1.0,
        // 冷却时间(秒)
        COOLDOWN: 2
    },
    
    // ==================== 绝招范围伤害配置 ====================
    // 绝招: 以角色为中心的范围伤害
    // 初始: 半径=视野50%, 伤害=30
    // 偶数级: 半径+15%
    // 奇数级: 伤害+20%
    ULTIMATE: {
        // 基础伤害(1级)
        BASE_DAMAGE: 30,
        // 每级伤害增长(奇数级触发)
        DAMAGE_PER_LEVEL: 20,
        // 伤害增长比例(奇数级触发)
        DAMAGE_SCALE: 0.20,
        // 基础半径比例(相对于视野)
        BASE_RADIUS_SCALE: 0.5,
        // 半径增长比例(偶数级触发)
        RADIUS_SCALE: 0.15
    },
    // ==================== 金钟罩配置 ====================
    // 金钟罩: 以角色为中心的范围伤害
    // 初始: 半径=视野50%, 伤害=30
    JIN_ZHONG_ZHAO: {
        // 基础半径(像素)
        RADIUS:50,
        //持续时间增长(秒)，每提升一级增加的秒数
        LIFETIME_PER_LEVEL: 1
    },

    // ==================== 火眼配置 ====================
    // 火眼: 增大 20% 视野和掉落物吸引范围
    HUO_YAN: {
        // 基础视野(相对于视野)
        BASE_RADIUS_SCALE: 0.5,
        RADIUS_PER_LEVEL: 0.2,// 每级增大视野比例
    },

    // ==================== 雷光盾范围伤害配置 ====================
    LEI_GUANG_DUN:{
        // 基础半径(像素)
        BASE_RADIUS: 80,
        // 半径增长比例(偶数级触发)
        RADIUS_SCALE: 0.15,
        // 基础半径比例(相对于视野)
        BASE_RADIUS_SCALE: 0.5,
        // 半径增长比例(奇数级触发)
        RADIUS_SCALE: 0.20,
        // 基础伤害(1级)
        BASE_DAMAGE: 30,
        // 每级伤害增长(奇数级触发)
        DAMAGE_PER_LEVEL: 20,
        // 伤害增长比例(奇数级触发)
        DAMAGE_SCALE: 0.20,
    },
    
    // ==================== 万剑归宗配置 ====================
    // 万剑诀: 以角色为中心向圆周发射飞剑
    WAN_JIAN_GUI_ZONG: {
        // 飞剑数量
        SWORD_COUNT: 20,
        // 圆周半径(像素)
        CIRCLE_RADIUS: 280,
        // 基础伤害(1级)
        BASE_DAMAGE: 50,
        // 每级伤害增长
        DAMAGE_PER_LEVEL: 30,
        // 飞剑速度(像素/秒)
        SWORD_SPEED: 500,
        // 飞剑持续时间(秒)
        LIFETIME: 2.5
    },
    
    // ==================== 天火流星配置 ====================
    TIAN_HUO_LIU_XING: {
        // 流星数量
        COUNT: 8,
        // 基础伤害(1级)
        BASE_DAMAGE: 40,
        // 每级伤害增长
        DAMAGE_PER_LEVEL: 25,
        // 爆炸半径(像素)
        EXPLOSION_RADIUS: 80,
        // 速度(像素/秒)
        SPEED: 300,
        // 持续时间(秒)
        LIFETIME: 5,
        //燃烧伤害固定为10点/秒，不随等级变化
        BURN_DAMAGE: 10,
    },
    
    // ==================== 龙卷风配置 ====================
    LONG_JUAN_FENG: {
        // 持续时间(秒)
        LIFETIME: 3,
        // 基础伤害(1级)
        BASE_DAMAGE: 30,
        // 每级伤害增长
        DAMAGE_PER_LEVEL: 20,
        // 影响半径(像素)
        RADIUS: 120,
        // 移动速度(像素/秒)
        SPEED: 450,
        // 攻击间隔(秒)
        ATTACK_INTERVAL: 0.5,
        // 子龙卷风数量
        SUB_COUNT: 3,
        // 怪被吹飞的后退距离比例
        BLLOW_DISTANCE: 0.3,
    },
    
    // ==================== 燕双飞配置 ====================
    YAN_SHUANG_FEI: {
        // 燕子数量(固定2个)
        COUNT: 2,
        // 基础伤害(1级)
        BASE_DAMAGE: 35,
        // 每级伤害增长
        DAMAGE_PER_LEVEL: 22,
        // 角度偏移(度)
        ANGLE_OFFSET: 15,
        // 速度(像素/秒)
        SPEED: 600,
        // 环绕距离(像素)
        DISTANCE: 80,
        // 持续时间(秒)
        LIFETIME: 8,
        // 冷却时间(秒)
        COOLDOWN: 1.5
    },
    
    // ==================== 庚金剑阵配置 ====================
    GENG_JIN_JIAN_ZHEN: {
        // 飞剑数量
        SWORD_COUNT: 8,
        // 椭圆长轴半径(像素)
        LONG_AXIS_RADIUS: 200,
        // 椭圆短轴半径(像素)
        SHORT_AXIS_RADIUS: 100,
        // 剑阵生成时中心点上方高度偏移(像素)
        SPAWN_HEIGHT_OFFSET: 200,
        // 降落时间(秒)
        FALL_DURATION: 0.8,
        // 落地后持续时间(秒)
        LIFETIME: 15,
        // 基础伤害(1级)
        BASE_DAMAGE: 25,
        // 每级伤害增长
        DAMAGE_PER_LEVEL: 15,
        // 旋转速度(度/秒)
        ROTATION_SPEED: 90,
        // 攻击间隔(秒)
        ATTACK_INTERVAL: 0.3,
        // 冷却时间(秒)
        COOLDOWN: 8,
        //麻痹效果持续时间(秒)
        PARALYZE_DURATION: 5
    },
    
    DROP: {
        ATTRACT_RADIUS: 100,//吸引半径
        ATTRACT_SPEED: 400,//吸引速度
        HEALTH_RATE: 0.3,//补血包掉落率
        MANA_RATE: 0.25,//补气包掉落率
        EQUIPMENT_RATE: 0.05,//装备掉落率
        RUNE_RATE: 0.03,//技能书掉落率
        QI_PILL_RATE: 0.1,//气丹掉落率
        ALCHEMY_MATERIAL_RATE: 0.2,//炼丹材料掉落率
        FORGE_MATERIAL_RATE: 0.2//炼器材料掉落率
    },
            
    // 阴阳五行属性 实际的数值是 金 -1, 木 -2, 水 -3, 火 -4, 土 -5, 阴 -6, 阳 -7, 混沌 -8
    ELEMENTS: ['无','金', '木', '水', '火', '土','阴', '阳','混沌'],
    // 装备品质
    QUALITIES: ['未鉴定','普通', '优秀', '精良', '史诗', '传说'],
    // 需要显示百分比的属性字段
    PERCENT_ATTRIBUTES: ['critRate', 'critDamage', 'dodgeRate', 'immune', 'damageReduction'],
    // 五行属性颜色
    ELEMENT_COLORS: {
        '金': '#ffd700',
        '木': '#4caf50',
        '水': '#5bb0f7ff',
        '火': '#f44336',
        '土': '#8f6454ff'
    },
    // 阴阳属性颜色
    YINYANG_COLORS: {
        '阴': '#e4ddddff',
        '阳': '#ff4827f6',
        '混沌': '#a9a9a9'
    },
    //品质颜色
    QUALITY_COLORS: {
        1: '#ffffff',
        2: '#4caf50',
        3: '#2196f3',
        4: '#9c27b0',
        5: '#ff9800',
        6: '#f44336',
        0: '#000000'
    },
    //丹药品级，浮动参数,下标对应的就是丹药的品级
    DRUG_LVArg:[
        0,0.5,0.7,0.9,1,1.3,1.7,
    ],
    //丹药品级名称
    DRUG_QualityName: {
        6: '完美',
        5: '上上品',
        4: '上品',
        3: '中品',
        2: '下品',
        1: '下下品',
    },
    //成丹品级经验
    DRUG_ExpPoint: [
        0,1,2,3,4,5,6
    ],

    //炼器公式
    FORGES:{
        // 头盔 - 需要2个槽位
        helmet: {
            slots: 2,
            materials: [
                { id: 'ore_1', name: '玄铁石', type: 'forge', quantity: 1 },
                { id: 'ore_3', name: '秘银石', type: 'forge', quantity: 1 }
            ]
        },
        // 铠甲 - 需要3个槽位
        armor: {
            slots: 3,
            materials: [
                { id: 'ore_1', name: '玄铁石', type: 'forge', quantity: 2 },
                { id: 'ore_3', name: '秘银石', type: 'forge', quantity: 1 },
                { id: 'ore_5', name: '陨铁', type: 'forge', quantity: 1 }
            ]
        },
        // 项链 - 需要2个槽位
        necklace: {
            slots: 2,
            materials: [
                { id: 'ore_2', name: '赤铜石', type: 'forge', quantity: 1 },
                { id: 'ore_4', name: '紫金石', type: 'forge', quantity: 1 }
            ]
        },
        // 手镯 - 需要2个槽位
        wrist: {
            slots: 2,
            materials: [
                { id: 'ore_1', name: '玄铁石', type: 'forge', quantity: 1 },
                { id: 'ore_2', name: '赤铜石', type: 'forge', quantity: 1 }
            ]
        },
        // 戒指 - 需要1个槽位
        ring: {
            slots: 1,
            materials: [
                { id: 'ore_4', name: '紫金石', type: 'forge', quantity: 1 }
            ]
        },
        // 武器 - 需要3个槽位
        weapon: {
            slots: 3,
            materials: [
                { id: 'ore_5', name: '陨铁', type: 'forge', quantity: 1 },
                { id: 'ore_7', name: '万年寒玉', type: 'forge', quantity: 1 },
                { id: 'ore_8', name: '凤凰血晶', type: 'forge', quantity: 1 }
            ]
        }
    },
    
    // 宠物配置
    PETS: {
        // 宠物类型
        TYPES: {
            attack: {
                name: '攻击型',
                description: '主动攻击怪物，初始攻击力较低',
                icon: '⚔️',
                color: '#ff4444',
                attackPower: 5, // 初始攻击力
                attackRange: 150, // 攻击范围
                attackInterval: 1000 // 攻击间隔（毫秒）
            },
            support: {
                name: '辅助型',
                description: '给怪物加 debuff，给主角加增益 buff',
                icon: '🛡️',
                color: '#4caf50',
                buffInterval: 3000 // 增益间隔（毫秒）
            },
            healer: {
                name: '治疗型',
                description: '当主角血量或法力低于阈值时提供治疗',
                icon: '❤️',
                color: '#2196f3',
                healInterval: 2000, // 治疗间隔（毫秒）
                healAmount: 10, // 治疗量
                hpThreshold: 0.3, // 血量阈值（30%）
                mpThreshold: 0.2 // 法力阈值（20%）
            }
        },
        
        // 宠物跟随配置
        FOLLOW: {
            distance: 50, // 跟随距离
            speed: 250 // 移动速度
        },
        
        // 宠物外观（像素格子组成的头像）
        APPEARANCES: {
            attack: [
                'XXXXX',
                'X   X',
                'X O X',
                'X   X',
                'XXXXX'
            ],
            support: [
                ' X X ',
                'X   X',
                'X O X',
                'X   X',
                ' X X '
            ],
            healer: [
                '  X  ',
                ' X X ',
                'X O X',
                ' X X ',
                '  X  '
            ]
        }
    },
    
    //-------配置表的相关函数----------------
    //获取炼丹材料
    // getAlchemyMaterial(id) {
    //     return dataMgr.getItemById(id);
    // },
    //获取炼器材料
    // getForgeMaterial(id) {
    //     return dataMgr.getItemById(id);
    // },
    // /**
    //  * 获取指定类型的材料数组
    //  * @param {string} type - 材料类型: 'alchemy'（炼丹材料） 或 'forge'（炼器材料）
    //  * @returns {propModel[]}  - 材料数组
    //  */
    // getItemsByType(type) {
    //     return dataMgr.getItemsByType(type);
    // },
    /**
     * 获取某个道具的信息
     * @param {string} id - 道具 ID
     * @returns {propModel} - 道具对象
     */
    // getPropInfo(id) {
    //     return dataMgr.getPropInTable(id);
    // },
    /**
     * 根据装备槽位获取装备模板
     * @param {string} slot - 装备槽位
     * @returns {Array} - 装备模板数组
     */
    // getEquipmentBySlot(slot) {
    //     return dataMgr.getEquipmentBySlot(slot);
    // },
    // getEquipmentById(id) {
    //     return dataMgr.getEquipmentById(id);
    // }
};

// ==================== 游戏状态 ====================
const GameState = {
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    LEVEL_UP: 'levelUp',
    GAME_OVER: 'gameOver',
    VICTORY: 'victory'
};

// ==================== 工具函数 ====================
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
    return Math.floor(randomRange(min, max + 1));
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
/**
 * 从数组中随机选择一个元素
 * @param {*}[] arr - 输入数组
 * @returns {*} - 随机选择的元素
 */
function randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

// ====== js\core\models.js ======

//----------
/**
 * SaveData 模型
 * @typedef {Object} SaveDataModel
 * @property {roleModel} roleData - 角色数据模型
 * @property {propModel[]} inventory - 物品数组模型
 * @property {number} version - 版本号
 */
class SaveDataModel {
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
class propModel {
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
class roleModel {
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
class Material {
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
class MaterialDropManager {
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
class MaterialDrop {
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
class placeModel {
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
class itemModel {
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
class mallModel {
    constructor(id, price) {
        this.id = id;
        this.price = price;
    }
}
//配置表数据结构：怪物模板
class monsterModel {
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
class dungeonModel {
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

// ====== js\core\dataMgr.js ======
// [BUNDLE] removed import
// [BUNDLE] removed import

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
const dataMgr = new DataMgr();
window.dataMgr = dataMgr;

// ====== js\entity\player.js ======
// ==================== 玩家类 ====================
// [BUNDLE] removed import
// [BUNDLE] removed import
// [BUNDLE] removed import
/**
 * 玩家类 - 管理玩家的所有属性和行为
 */
class Player {
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

// ====== js\core\wave-manager.js ======
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

// ====== js\core\renderer.js ======
// ==================== 渲染器 ====================
class Renderer {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
    }
    
    clear() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawBackground(cameraX, cameraY) {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        
        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
        
        // Grid (根据摄像机偏移绘制，形成滚动效果)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        const gridSize = 60;
        const offsetX = -cameraX % gridSize;
        const offsetY = -cameraY % gridSize;
        
        for (let i = -1; i < 20; i++) {
            ctx.beginPath();
            ctx.moveTo(i * gridSize + offsetX, 0);
            ctx.lineTo(i * gridSize + offsetX, h);
            ctx.stroke();
        }
        for (let i = -1; i < 25; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * gridSize + offsetY);
            ctx.lineTo(w, i * gridSize + offsetY);
            ctx.stroke();
        }
        
        // Map boundary (以世界原点为中心)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(-cameraX, -cameraY, DEFINE.MAP_RADIUS, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // 将世界坐标转换为屏幕坐标
    worldToScreen(worldX, worldY, cameraX, cameraY) {
        return {
            x: worldX - cameraX,
            y: worldY - cameraY
        };
    }
    
    drawPlayer(player, screenX, screenY) {
        const ctx = this.ctx;
        // screenX, screenY 是玩家在屏幕上的位置(居中)
        const scaleX = this.canvas.width / DEFINE.CANVAS_WIDTH;
        const scaleY = this.canvas.height / DEFINE.CANVAS_HEIGHT;
        
        ctx.save();
        ctx.translate(screenX, screenY);
        
        // Invincibility flash
        if (player.invincibleTimer > 0 && Math.floor(player.invincibleTimer * 10) % 2 === 0) {
            ctx.globalAlpha = 0.5;
        }
        
        // Body bob animation
        const walkBob = player.isMoving ? Math.sin(player.walkAnimTimer * 10) * 2 : 0;
        
        // Body
        const bodyGradient = ctx.createLinearGradient(0, -20, 0, 25);
        bodyGradient.addColorStop(0, '#ffd700');
        bodyGradient.addColorStop(1, '#daa520');
        ctx.fillStyle = bodyGradient;
        ctx.beginPath();
        ctx.roundRect(-15, -10 + walkBob, 30, 40, 5);
        ctx.fill();
        
        // Head
        ctx.fillStyle = '#8b4513';
        ctx.beginPath();
        ctx.arc(0, -20 + walkBob, 12, 0, Math.PI * 2);
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = '#000';
        const eyeOffsetX = player.direction.x > 0 ? 3 : -3;
        ctx.beginPath();
        ctx.arc(-4 + eyeOffsetX, -22 + walkBob, 2, 0, Math.PI * 2);
        ctx.arc(4 + eyeOffsetX, -22 + walkBob, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Arm with sword (follows direction or attack animation)
        ctx.save();
        const armX = 10;
        const armY = -5 + walkBob;
        
        // Calculate arm angle
        let armAngle = Math.atan2(player.direction.y, player.direction.x);
        if (player.isAttacking) {
            armAngle = player.armAngle;
        }
        
        ctx.translate(armX, armY);
        ctx.rotate(armAngle);
        
        // Arm
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(0, -3, 12, 6);
        
        // Sword
        ctx.fillStyle = '#deb887';
        ctx.fillRect(12, -3, 20, 6);
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(10, -5, 4, 10);
        
        ctx.restore();
        
        ctx.restore();
    }
    
    drawMonster(monster, cameraX, cameraY) {
        const ctx = this.ctx;
        const pos = this.worldToScreen(monster.x, monster.y, cameraX, cameraY);
        const scaleX = this.canvas.width / DEFINE.CANVAS_WIDTH;
        const scaleY = this.canvas.height / DEFINE.CANVAS_HEIGHT;
        const scale = (scaleX + scaleY) / 2;
        
        ctx.save();
        ctx.translate(pos.x, pos.y);
        
        // Body gradient based on type
        let color1, color2;
        switch (monster.type) {
            case 'elite':
                color1 = '#933';
                color2 = '#611';
                break;
            case 'boss':
                color1 = '#631';
                color2 = '#310';
                break;
            case 'assassin':
                color1 = '#0f0';
                color2 = '#080';
                break;
            case 'tank':
                color1 = '#666';
                color2 = '#333';
                break;
            case 'mage':
                color1 = '#90f';
                color2 = '#50a';
                break;
            default:
                color1 = '#555';
                color2 = '#333';
        }
        
        const size = monster.size * scale;
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        ctx.fillStyle = gradient;
        
        ctx.shadowBlur = 0;
        if (monster.type === 'elite' || monster.type === 'boss') {
            ctx.shadowColor = monster.type === 'boss' ? '#ff0000' : '#ff6666';
            ctx.shadowBlur = monster.type === 'boss' ? 20 : 10;
        }
        
        // Draw shape based on type
        ctx.beginPath();
        switch (monster.type) {
            case 'assassin':
                // Triangle
                ctx.moveTo(0, -size);
                ctx.lineTo(size * 0.866, size * 0.5);
                ctx.lineTo(-size * 0.866, size * 0.5);
                break;
            case 'tank':
                // Rectangle
                ctx.rect(-size, -size * 0.7, size * 2, size * 1.4);
                break;
            case 'mage':
                // Pentagon
                for (let i = 0; i < 5; i++) {
                    const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
                    const x = Math.cos(angle) * size;
                    const y = Math.sin(angle) * size;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                break;
            default:
                // Circle
                ctx.arc(0, 0, size, 0, Math.PI * 2);
        }
        ctx.closePath();
        ctx.fill();
        
        ctx.shadowBlur = 0;
        
        // Eyes
        ctx.fillStyle = '#ff0000';
        const eyeSize = size * 0.15;
        if (monster.type === 'assassin') {
            ctx.beginPath();
            ctx.arc(-size * 0.2, -size * 0.1, eyeSize, 0, Math.PI * 2);
            ctx.arc(size * 0.2, -size * 0.1, eyeSize, 0, Math.PI * 2);
            ctx.fill();
        } else if (monster.type === 'tank') {
            ctx.beginPath();
            ctx.arc(-size * 0.4, -size * 0.2, eyeSize, 0, Math.PI * 2);
            ctx.arc(size * 0.4, -size * 0.2, eyeSize, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(-size * 0.3, -size * 0.2, eyeSize, 0, Math.PI * 2);
            ctx.arc(size * 0.3, -size * 0.2, eyeSize, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // HP bar
        const hpWidth = monster.size * scale * 1.5;
        const hpHeight = 4 * scale;
        ctx.fillStyle = '#333';
        ctx.fillRect(-hpWidth / 2, -monster.size * scale - 12 * scale, hpWidth, hpHeight);
        ctx.fillStyle = '#ff4444';
        ctx.fillRect(-hpWidth / 2, -monster.size * scale - 12 * scale, hpWidth * monster.getHpPercent(), hpHeight);
        
        ctx.restore();
    }
    
    drawDrop(drop, cameraX, cameraY) {
        const ctx = this.ctx;
        const pos = this.worldToScreen(drop.x, drop.y, cameraX, cameraY);
        const bobY = drop.getBobOffset();
        const scale = this.canvas.height / DEFINE.CANVAS_HEIGHT;
        
        ctx.save();
        ctx.translate(pos.x, pos.y + bobY);
        
        let color, text;
        switch (drop.type) {
            case 'exp':
                color = '#44ff44';
                text = `+${drop.value}`;
                break;
            case 'hp':
                color = '#ff4444';
                text = `+${drop.value}`;
                break;
            case 'mp':
                color = '#4444ff';
                text = `+${drop.value}`;
                break;
            case 'qi':
                color = '#ff69b4';
                text = '气';
                break;
            case 'skillBook':
                color = '#ffd700';
                text = '📕';
                break;
            default:
                color = '#ffffff';
                text = '?';
        }
        
        // Draw glow
        ctx.shadowColor = color;
        ctx.shadowBlur = 15;
        
        if (drop.type === 'skillBook') {
            // 绘制技能书图标（emoji）
            ctx.font = `${24 * scale}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, 0, 0);
        } else {
            // Draw circle background
            ctx.beginPath();
            ctx.arc(0, 0, 12 * scale, 0, Math.PI * 2);
            ctx.fillStyle = color + '40'; // 25% opacity
            ctx.fill();
            
            // Draw text
            ctx.font = `bold ${14 * scale}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = color;
            ctx.shadowBlur = 0;
            ctx.fillText(text, 0, 0);
        }
        
        ctx.restore();
    }
    
    drawMaterialDrop(drop, cameraX, cameraY) {
        const ctx = this.ctx;
        const pos = this.worldToScreen(drop.x, drop.y, cameraX, cameraY);
        const bobY = drop.getBobOffset();
        const scale = this.canvas.height / DEFINE.CANVAS_HEIGHT;
        const size = drop.size * scale;
        
        ctx.save();
        ctx.translate(pos.x, pos.y + bobY);
        
        let color1, color2, text;
        if (drop.type === 'alchemy') {
            color1 = '#00fa9a';
            color2 = '#008b8b';
            text = '草';
        } else {
            color1 = '#ff6347';
            color2 = '#daa520';
            text = '矿';
        }
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${8 * scale}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 0, 0);
        
        ctx.restore();
    }
    
    drawEffect(effect, cameraX, cameraY) {
        const ctx = this.ctx;
        const pos = this.worldToScreen(effect.x, effect.y, cameraX, cameraY);
        const scale = this.canvas.height / DEFINE.CANVAS_HEIGHT;
        
        ctx.save();
        ctx.translate(pos.x, pos.y);
        
        switch (effect.type) {
            case 'flying_sword':
                this.drawFlyingSword(effect);
                break;
            case 'stone':
                this.drawStone(effect);
                break;
            case 'talisman':
                this.drawTalisman(effect);
                break;
            case 'ultimate':
                this.drawUltimate(effect);
                break;
            case 'jin_zhong_zhao':
                this.drawJinZhang(effect);
                break;
            case 'lei_guang_dun':
                this.drawLeiGuang(effect);
                break;
            case 'tian_huo_liu_xing':
                this.drawTianHuoLiuXing(effect);
                break;
            case 'long_juan_feng':
                this.drawLongJuanFeng(effect);
                break;
            case 'yan_shuang_fei':
                this.drawYanShuangFei(effect);
                break;
            case 'geng_jin_jian_zhen':
                this.drawGengJinJianZhen(effect);
                break;
            case 'hit':
                this.drawHit(effect);
                break;
        }
        
        ctx.restore();
    }
    
    drawFlyingSword(effect) {
        const ctx = this.ctx;
        const progress = effect.getProgress();
        
        // Trail
        ctx.strokeStyle = `rgba(135, 206, 235, ${1 - progress})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        const trailLen = 20;
        ctx.moveTo(-Math.cos(effect.angle) * trailLen, -Math.sin(effect.angle) * trailLen);
        ctx.lineTo(0, 0);
        ctx.stroke();
        
        // Sword
        ctx.save();
        ctx.rotate(effect.angle);
        
        const gradient = ctx.createLinearGradient(-15, 0, 15, 0);
        gradient.addColorStop(0, '#87ceeb');
        gradient.addColorStop(0.5, '#ffffff');
        gradient.addColorStop(1, '#5fa8d3');
        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        ctx.moveTo(15, 0);
        ctx.lineTo(-10, -6);
        ctx.lineTo(-10, 6);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }

    drawStone(effect) {
        const ctx = this.ctx;
        const progress = effect.getProgress();
        const remaining = 1 - progress;
        const size = effect.size || 3.5;

        ctx.save();
        // 石子朝目标飞行，头部朝前
        ctx.rotate(effect.angle);

        // 白色小圆球，带轻微阴影营造体积感
        ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
        ctx.shadowBlur = 4 * remaining;

        ctx.fillStyle = `rgba(245, 245, 240, ${0.95 * remaining})`;
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();

        // 小高光
        ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * remaining})`;
        ctx.beginPath();
        ctx.arc(-size * 0.3, -size * 0.3, size * 0.35, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
    
    drawTalisman(effect) {
        const ctx = this.ctx;
        const progress = effect.getProgress();
        
        ctx.save();
        ctx.rotate(effect.angle);
        
        // Glow
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 10;
        
        // Paper
        const gradient = ctx.createLinearGradient(-20, 0, 20, 0);
        gradient.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
        gradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0.3)');
        ctx.fillStyle = gradient;
        
        ctx.fillRect(-20, -8, 40, 16);
        
        // Pattern
        ctx.strokeStyle = '#8b4513';
        ctx.lineWidth = 1;
        ctx.strokeRect(-18, -6, 36, 12);
        
        ctx.restore();
    }
    
    drawUltimate(effect) {
        const ctx = this.ctx;
        const progress = effect.getProgress();
        const radius = effect.radius * progress;
        
        ctx.strokeStyle = `rgba(255, 105, 180, ${1 - progress})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Inner glow
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
        gradient.addColorStop(0, `rgba(255, 105, 180, ${(1 - progress) * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 105, 180, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    drawHit(effect) {
        const ctx = this.ctx;
        const progress = effect.getProgress();
        const size = 15 * (1 - progress);
        
        ctx.fillStyle = `rgba(255, 255, 255, ${1 - progress})`;
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    drawSkillBox(box, cameraX, cameraY) {
        const ctx = this.ctx;
        const pos = this.worldToScreen(box.x, box.y, cameraX, cameraY);
        const bobY = box.getBobOffset();
        const scale = this.canvas.height / DEFINE.CANVAS_HEIGHT;
        const size = box.size * scale;
        
        ctx.save();
        ctx.translate(pos.x, pos.y + bobY);
        
        const glow = Math.sin(box.glowTimer * 3) * 0.3 + 0.7;
        
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 15 * glow;
        
        const gradient = ctx.createLinearGradient(-size, -size, size, size);
        gradient.addColorStop(0, '#ffd700');
        gradient.addColorStop(0.5, '#ffec8b');
        gradient.addColorStop(1, '#daa520');
        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(-size, 0);
        ctx.closePath();
        ctx.fill();
        
        ctx.strokeStyle = '#8b4513';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.fillStyle = '#8b4513';
        ctx.font = `bold ${12 * scale}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('?', 0, 0);
        
        ctx.restore();
    }
    
    drawJinZhang(effect) {
        const ctx = this.ctx;
        const progress = effect.getProgress();
        const remaining = 1 - progress;
        const radius = effect.radius * (1 + progress * 0.3);
        
        ctx.strokeStyle = `rgba(255, 215, 0, ${remaining * 0.8})`;
        ctx.lineWidth = 4 + progress * 2;
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.fillStyle = `rgba(255, 215, 0, ${remaining * 0.15})`;
        ctx.fill();
    }
    
    drawLeiGuang(effect) {
        const ctx = this.ctx;
        const progress = effect.getProgress();
        const remaining = 1 - progress;
        const radius = effect.radius;
        const pulse = Math.sin(effect.timer * 10) * 0.2 + 0.8;
        
        ctx.strokeStyle = `rgba(0, 191, 255, ${remaining * 0.9})`;
        ctx.lineWidth = 3;
        ctx.shadowColor = '#00bfff';
        ctx.shadowBlur = 15 * pulse;
        
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 + effect.timer * 3;
            const x1 = Math.cos(angle) * radius * 0.6;
            const y1 = Math.sin(angle) * radius * 0.6;
            const x2 = Math.cos(angle) * radius;
            const y2 = Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
        
        ctx.fillStyle = `rgba(0, 191, 255, ${remaining * 0.1})`;
        ctx.fill();
    }
    
    drawTianHuoLiuXing(effect) {
        const ctx = this.ctx;
        
        // 绘制尾迹粒子
        for (const p of effect.particles) {
            const progress = 1 - p.life / p.maxLife;
            const alpha = p.life / p.maxLife;
            const size = p.size * (1 - progress * 0.5);
            ctx.fillStyle = `rgba(255, ${100 + progress * 80}, 0, ${alpha})`;
            ctx.beginPath();
            ctx.arc(p.x - effect.x, p.y - effect.y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        if (!effect.hasLanded) {
            // 陨石坠落阶段
            const fallProgress = Math.min(1, effect.timer / effect.fallDuration);
            const glow = 15 + fallProgress * 20;
            
            ctx.shadowColor = '#ff4500';
            ctx.shadowBlur = glow;
            
            // 陨石主体
            const gradient = ctx.createRadialGradient(0, 0, 2, 0, 0, 18);
            gradient.addColorStop(0, '#fff5e6');
            gradient.addColorStop(0.3, '#ff8c00');
            gradient.addColorStop(0.7, '#ff4500');
            gradient.addColorStop(1, 'rgba(139, 0, 0, 0.8)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, 0, 18, 0, Math.PI * 2);
            ctx.fill();
            
            // 火焰尾迹主条
            const trailLen = 60 + fallProgress * 40;
            const angle = Math.atan2(effect.targetY - effect.startY, effect.targetX - effect.startX) + Math.PI;
            const gradient2 = ctx.createLinearGradient(0, 0, Math.cos(angle) * trailLen, Math.sin(angle) * trailLen);
            gradient2.addColorStop(0, 'rgba(255, 69, 0, 0.9)');
            gradient2.addColorStop(0.5, 'rgba(255, 140, 0, 0.5)');
            gradient2.addColorStop(1, 'rgba(255, 69, 0, 0)');
            ctx.strokeStyle = gradient2;
            ctx.lineWidth = 14;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(angle) * trailLen, Math.sin(angle) * trailLen);
            ctx.stroke();
            
            ctx.shadowBlur = 0;
        } else {
            // 燃烧阶段：绘制地面燃烧区域
            const progress = (effect.timer - effect.fallDuration) / effect.burnDuration;
            const remaining = 1 - Math.min(1, progress);
            const pulse = Math.sin(effect.timer * 8) * 0.15 + 0.85;
            const radius = effect.radius * (0.9 + 0.1 * pulse);
            
            // 外圈火光
            ctx.shadowColor = '#ff4500';
            ctx.shadowBlur = 20 * remaining;
            const outerGradient = ctx.createRadialGradient(0, 0, radius * 0.3, 0, 0, radius);
            outerGradient.addColorStop(0, `rgba(255, 100, 0, ${0.5 * remaining})`);
            outerGradient.addColorStop(0.6, `rgba(255, 69, 0, ${0.25 * remaining})`);
            outerGradient.addColorStop(1, 'rgba(139, 0, 0, 0)');
            ctx.fillStyle = outerGradient;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.fill();
            
            // 内部火焰碎点
            ctx.shadowBlur = 0;
            const sparkCount = 8;
            for (let i = 0; i < sparkCount; i++) {
                const angle = (i / sparkCount) * Math.PI * 2 + effect.timer * 2;
                const dist = radius * (0.3 + Math.random() * 0.5);
                const sx = Math.cos(angle) * dist;
                const sy = Math.sin(angle) * dist;
                const size = 3 + Math.random() * 5;
                ctx.fillStyle = `rgba(255, ${120 + Math.random() * 80}, 0, ${remaining})`;
                ctx.beginPath();
                ctx.arc(sx, sy, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
    
    drawLongJuanFeng(effect) {
        const ctx = this.ctx;
        const progress = Math.min(1, effect.timer / effect.lifetime);
        const remaining = 1 - progress;
        const radius = effect.radius * (0.8 + 0.2 * Math.sin(effect.timer * 6));
        const spin = effect.spin || 0;

        // 龙卷风外圈光晕
        ctx.shadowColor = '#87ceeb';
        ctx.shadowBlur = 20 * remaining;
        const gradient = ctx.createRadialGradient(0, 0, radius * 0.2, 0, 0, radius);
        gradient.addColorStop(0, `rgba(135, 206, 235, ${0.3 * remaining})`);
        gradient.addColorStop(0.6, `rgba(70, 130, 180, ${0.2 * remaining})`);
        gradient.addColorStop(1, 'rgba(70, 130, 180, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();

        // 龙卷风螺旋风刃
        ctx.shadowBlur = 10 * remaining;
        ctx.strokeStyle = `rgba(200, 230, 255, ${0.8 * remaining})`;
        ctx.lineWidth = 3;
        for (let i = 0; i < 3; i++) {
            const angleOffset = spin + (i / 3) * Math.PI * 2;
            ctx.beginPath();
            for (let r = radius * 0.2; r <= radius; r += 6) {
                const angle = angleOffset + r * 0.25;
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r * 0.7;
                if (r === radius * 0.2) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }

        // 龙卷风气旋碎屑
        ctx.shadowBlur = 0;
        for (let i = 0; i < 6; i++) {
            const angle = spin * 1.5 + (i / 6) * Math.PI * 2;
            const dist = radius * (0.4 + 0.5 * Math.random());
            const size = 2 + Math.random() * 4;
            ctx.fillStyle = `rgba(220, 240, 255, ${remaining})`;
            ctx.beginPath();
            ctx.arc(Math.cos(angle) * dist, Math.sin(angle) * dist * 0.7, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawYanShuangFei(effect) {
        const ctx = this.ctx;
        const progress = Math.min(1, effect.timer / effect.lifetime);
        const remaining = 1 - progress;
        const wingFlap = Math.sin(effect.timer * 12) * 0.4;

        ctx.save();
        // 燕子朝向飞行方向（切线方向），头部朝右
        const facingAngle = effect.angle + effect.angleOffset + Math.PI / 2;
        ctx.rotate(facingAngle);

        ctx.shadowColor = '#00ced1';
        ctx.shadowBlur = 10 * remaining;

        // 燕子经典配色
        const backColor = `rgba(25, 60, 80, ${0.95 * remaining})`;       // 背部钢蓝黑
        const wingColor = `rgba(35, 90, 120, ${0.9 * remaining})`;       // 翅膀钢蓝
        const wingTipColor = `rgba(15, 40, 55, ${0.95 * remaining})`;    // 翼尖深色
        const bellyColor = `rgba(250, 250, 245, ${0.92 * remaining})`;   // 腹部洁白
        const throatColor = `rgba(200, 80, 60, ${0.9 * remaining})`;     // 红褐喉咙
        const tailColor = `rgba(15, 40, 55, ${0.95 * remaining})`;       // 尾羽深色
        const eyeStripeColor = `rgba(15, 20, 25, ${0.95 * remaining})`;  // 黑色眼纹

        const w = wingFlap;

        // ===== 长尾羽（深叉剪刀尾，燕子最显著标志） =====
        ctx.fillStyle = tailColor;
        // 上尾羽
        ctx.beginPath();
        ctx.moveTo(-14, -1);
        ctx.quadraticCurveTo(-26, -8, -38, -18 - w * 3);
        ctx.quadraticCurveTo(-42, -22 - w * 4, -48, -20 - w * 3);
        ctx.quadraticCurveTo(-44, -16 - w * 3, -32, -8);
        ctx.quadraticCurveTo(-22, -3, -14, 0);
        ctx.closePath();
        ctx.fill();
        // 下尾羽
        ctx.beginPath();
        ctx.moveTo(-14, 1);
        ctx.quadraticCurveTo(-26, 8, -38, 18 + w * 3);
        ctx.quadraticCurveTo(-42, 22 + w * 4, -48, 20 + w * 3);
        ctx.quadraticCurveTo(-44, 16 + w * 3, -32, 8);
        ctx.quadraticCurveTo(-22, 3, -14, 0);
        ctx.closePath();
        ctx.fill();

        // 尾羽末端白斑
        ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * remaining})`;
        ctx.beginPath();
        ctx.ellipse(-45, -18 - w * 3, 3, 2, -0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(-45, 18 + w * 3, 3, 2, 0.4, 0, Math.PI * 2);
        ctx.fill();

        // ===== 翅膀（长而尖，向后掠，带翼尖深色） =====
        // 上翅膀
        ctx.fillStyle = wingColor;
        ctx.beginPath();
        ctx.moveTo(6, -6);
        ctx.quadraticCurveTo(-4, -28 - w * 22, -28, -24 - w * 16);
        ctx.quadraticCurveTo(-34, -20 - w * 12, -30, -14 - w * 8);
        ctx.quadraticCurveTo(-16, -10 - w * 5, -2, -4);
        ctx.closePath();
        ctx.fill();
        // 下翅膀
        ctx.beginPath();
        ctx.moveTo(6, 6);
        ctx.quadraticCurveTo(-4, 28 + w * 22, -28, 24 + w * 16);
        ctx.quadraticCurveTo(-34, 20 + w * 12, -30, 14 + w * 8);
        ctx.quadraticCurveTo(-16, 10 + w * 5, -2, 4);
        ctx.closePath();
        ctx.fill();

        // 翼尖深色
        ctx.fillStyle = wingTipColor;
        ctx.beginPath();
        ctx.moveTo(-20, -18 - w * 14);
        ctx.quadraticCurveTo(-28, -24 - w * 16, -32, -22 - w * 14);
        ctx.quadraticCurveTo(-28, -16 - w * 10, -18, -12 - w * 7);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-20, 18 + w * 14);
        ctx.quadraticCurveTo(-28, 24 + w * 16, -32, 22 + w * 14);
        ctx.quadraticCurveTo(-28, 16 + w * 10, -18, 12 + w * 7);
        ctx.closePath();
        ctx.fill();

        // 翅膀羽脉
        ctx.strokeStyle = `rgba(180, 220, 235, ${0.35 * remaining})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(2, -4);
        ctx.quadraticCurveTo(-10, -16 - w * 12, -24, -14 - w * 10);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(2, 4);
        ctx.quadraticCurveTo(-10, 16 + w * 12, -24, 14 + w * 10);
        ctx.stroke();

        // ===== 身体（流线型，背部深色、腹部白色） =====
        // 背部轮廓
        ctx.fillStyle = backColor;
        ctx.beginPath();
        ctx.moveTo(24, 0);                          // 喙基部
        ctx.quadraticCurveTo(22, -8, 14, -9);       // 头顶
        ctx.quadraticCurveTo(4, -9, -6, -7);        // 背部
        ctx.quadraticCurveTo(-18, -5, -24, -1);     // 尾根上
        ctx.lineTo(-24, 1);
        ctx.quadraticCurveTo(-18, 5, -6, 7);        // 尾根下
        ctx.quadraticCurveTo(4, 9, 14, 6);          // 胸腹交界
        ctx.quadraticCurveTo(22, 4, 24, 0);
        ctx.closePath();
        ctx.fill();

        // 腹部白色区域
        ctx.fillStyle = bellyColor;
        ctx.beginPath();
        ctx.moveTo(16, 1);
        ctx.quadraticCurveTo(10, -5, -2, -5);
        ctx.quadraticCurveTo(-14, -4, -20, 0);
        ctx.quadraticCurveTo(-14, 5, -2, 5);
        ctx.quadraticCurveTo(10, 5, 16, 1);
        ctx.closePath();
        ctx.fill();

        // 红色喉咙/前额（家燕标志）
        ctx.fillStyle = throatColor;
        ctx.beginPath();
        ctx.moveTo(20, -2);
        ctx.quadraticCurveTo(16, -4, 13, -1);
        ctx.quadraticCurveTo(13, 4, 18, 5);
        ctx.quadraticCurveTo(22, 4, 22, 1);
        ctx.quadraticCurveTo(22, -1, 20, -2);
        ctx.closePath();
        ctx.fill();

        // ===== 头部细节 =====
        // 黑色眼纹（从喙经眼到耳羽）
        ctx.fillStyle = eyeStripeColor;
        ctx.beginPath();
        ctx.moveTo(23, -3);
        ctx.quadraticCurveTo(19, -4, 15, -3);
        ctx.quadraticCurveTo(15, -1, 17, 0);
        ctx.quadraticCurveTo(20, -1, 23, -1);
        ctx.closePath();
        ctx.fill();

        // 眼睛
        ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * remaining})`;
        ctx.beginPath();
        ctx.arc(19, -2, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(0, 0, 0, ${0.9 * remaining})`;
        ctx.beginPath();
        ctx.arc(19.5, -2, 0.9, 0, Math.PI * 2);
        ctx.fill();

        // 喙（短小而尖）
        ctx.fillStyle = `rgba(30, 25, 20, ${0.95 * remaining})`;
        ctx.beginPath();
        ctx.moveTo(24, -1.2);
        ctx.lineTo(29, 0);
        ctx.lineTo(24, 1.2);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    drawGengJinJianZhen(effect) {
        const ctx = this.ctx;
        const progress = Math.min(1, effect.timer / effect.lifetime);
        const remaining = 1 - progress;
        const landed = effect.landed;
        const centerX = effect.centerX;
        const centerY = effect.centerY;
        const a = effect.longAxisRadius;
        const b = effect.shortAxisRadius;

        ctx.save();
        ctx.translate(centerX - effect.x, centerY - effect.y);

        // 椭圆范围内的金色光晕
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = landed ? 20 * remaining : 15;
        const areaGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(a, b));
        areaGradient.addColorStop(0, `rgba(255, 215, 0, ${0.15 * remaining})`);
        areaGradient.addColorStop(0.7, `rgba(255, 215, 0, ${0.08 * remaining})`);
        areaGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = areaGradient;
        ctx.beginPath();
        ctx.ellipse(0, 0, a, b, 0, 0, Math.PI * 2);
        ctx.fill();

        // 椭圆边界
        ctx.shadowBlur = 0;
        ctx.strokeStyle = `rgba(255, 215, 0, ${0.5 * remaining})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(0, 0, a, b, 0, 0, Math.PI * 2);
        ctx.stroke();

        // 绘制每把剑
        for (const sword of effect.swords) {
            const sx = sword.x - centerX;
            const sy = sword.y - centerY;
            // 剑刃竖直朝下，不随椭圆旋转
            const swordAngle = Math.PI;

            ctx.save();
            ctx.translate(sx, sy);
            ctx.rotate(swordAngle);

            // 剑身金色渐变
            const bladeGradient = ctx.createLinearGradient(0, -4, 0, 28);
            bladeGradient.addColorStop(0, '#fffacd');
            bladeGradient.addColorStop(0.3, '#ffd700');
            bladeGradient.addColorStop(1, '#b8860b');
            ctx.fillStyle = bladeGradient;

            // 剑刃
            ctx.beginPath();
            ctx.moveTo(0, -22);
            ctx.lineTo(4, 18);
            ctx.lineTo(0, 26);
            ctx.lineTo(-4, 18);
            ctx.closePath();
            ctx.fill();

            // 剑柄
            ctx.fillStyle = `rgba(80, 50, 20, ${0.9 * remaining})`;
            ctx.fillRect(-2, 18, 4, 10);

            // 剑格
            ctx.fillStyle = `rgba(255, 215, 0, ${0.95 * remaining})`;
            ctx.fillRect(-6, 16, 12, 3);

            // 剑身电光
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 * remaining})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, -18);
            ctx.lineTo(0, 16);
            ctx.stroke();

            ctx.restore();
        }

        ctx.restore();
    }

    drawTowerBox(box, cameraX, cameraY) {
        const ctx = this.ctx;
        const pos = this.worldToScreen(box.x, box.y, cameraX, cameraY);
        const bobY = box.getBobOffset();
        const scale = this.canvas.height / DEFINE.CANVAS_HEIGHT;
        const size = box.size * scale;
        
        ctx.save();
        ctx.translate(pos.x, pos.y + bobY);
        
        const glow = Math.sin(box.glowTimer * 3) * 0.3 + 0.7;
        
        ctx.shadowColor = '#9400d3';
        ctx.shadowBlur = 15 * glow;
        
        const gradient = ctx.createLinearGradient(-size, -size, size, size);
        gradient.addColorStop(0, '#9400d3');
        gradient.addColorStop(0.5, '#da70d6');
        gradient.addColorStop(1, '#4b0082');
        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        ctx.rect(-size, -size, size * 2, size * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#4b0082';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${14 * scale}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('T', 0, 0);
        
        ctx.restore();
    }
    
    drawTower(tower, cameraX, cameraY) {
        const ctx = this.ctx;
        const pos = this.worldToScreen(tower.x, tower.y, cameraX, cameraY);
        const scale = this.canvas.height / DEFINE.CANVAS_HEIGHT;
        const size = tower.size * scale;
        
        ctx.save();
        ctx.translate(pos.x, pos.y);
        
        // Draw destroy animation
        if (tower.destroyed) {
            const progress = 1 - (tower.destroyAnimTimer / 0.5);
            ctx.globalAlpha = 1 - progress;
            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(0, 0, size * (1 + progress * 0.5), 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            return;
        }
        
        let color1, color2;
        switch (tower.type) {
            case 'arrow':
                color1 = '#8b4513';
                color2 = '#654321';
                break;
            case 'fire':
                color1 = '#ff4500';
                color2 = '#8b0000';
                break;
            case 'lightning':
                color1 = '#ffff00';
                color2 = '#daa520';
                break;
            default:
                color1 = '#888';
                color2 = '#444';
        }
        
        const gradient = ctx.createLinearGradient(0, -size, 0, size);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${10 * scale}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`Lv${tower.level}`, 0, 0);
        
        // Draw attack windup animation (flash white)
        if (tower.attackWindupTimer > 0) {
            const windupProgress = tower.getAttackProgress();
            const flashIntensity = Math.sin(windupProgress * Math.PI);
            
            ctx.fillStyle = `rgba(255, 255, 255, ${flashIntensity * 0.8})`;
            ctx.beginPath();
            ctx.arc(0, 0, size * 1.3, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw range indicator (faint circle)
        if (tower.target) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(0, 0, tower.range * scale, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Draw HP bar (pink circle progress)
        const hpPercent = tower.getHpPercent();
        if (hpPercent < 1) {
            const hpBarRadius = size + 5;
            ctx.strokeStyle = 'rgba(255, 100, 150, 0.3)';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(0, 0, hpBarRadius, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.strokeStyle = '#ff69b4';
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.arc(0, 0, hpBarRadius, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * hpPercent));
            ctx.stroke();
            ctx.lineCap = 'butt';
        }
        
        ctx.restore();
    }
    
    drawArrowProjectile(proj, cameraX, cameraY) {
        const ctx = this.ctx;
        const pos = this.worldToScreen(proj.x, proj.y, cameraX, cameraY);
        
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(proj.angle);
        
        ctx.fillStyle = '#8b4513';
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-5, -4);
        ctx.lineTo(-5, 4);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }
    
    drawSmallSword(proj, cameraX, cameraY) {
        const ctx = this.ctx;
        const pos = this.worldToScreen(proj.x, proj.y, cameraX, cameraY);
        
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(proj.angle);
        
        const gradient = ctx.createLinearGradient(-10, 0, 10, 0);
        gradient.addColorStop(0, '#87ceeb');
        gradient.addColorStop(0.5, '#ffffff');
        gradient.addColorStop(1, '#5fa8d3');
        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-6, -4);
        ctx.lineTo(-6, 4);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }
    
    drawFireball(proj, cameraX, cameraY) {
        const ctx = this.ctx;
        const pos = this.worldToScreen(proj.x, proj.y, cameraX, cameraY);
        
        ctx.save();
        ctx.translate(pos.x, pos.y);
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, proj.size);
        gradient.addColorStop(0, '#ffff00');
        gradient.addColorStop(0.5, '#ff4500');
        gradient.addColorStop(1, '#8b0000');
        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        ctx.arc(0, 0, proj.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowColor = '#ff4500';
        ctx.shadowBlur = 10;
        ctx.fill();
        
        ctx.restore();
    }
    
    drawLightningStrike(effect, cameraX, cameraY) {
        const ctx = this.ctx;
        const pos = this.worldToScreen(effect.x, effect.y, cameraX, cameraY);
        const progress = effect.getProgress();
        
        ctx.save();
        ctx.translate(pos.x, pos.y);
        
        const alpha = 1 - progress;
        const radius = effect.radius * progress * 2;
        
        // Draw lightning bolt
        ctx.strokeStyle = `rgba(180, 130, 255, ${alpha})`;
        ctx.lineWidth = 4;
        ctx.shadowColor = '#9400d3';
        ctx.shadowBlur = 20;
        
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            const startX = (Math.random() - 0.5) * radius;
            const startY = -radius;
            ctx.moveTo(startX, startY);
            
            let currentY = startY;
            while (currentY < radius) {
                currentY += 20 + Math.random() * 20;
                const offsetX = (Math.random() - 0.5) * 30;
                ctx.lineTo(offsetX, currentY);
            }
            ctx.stroke();
        }
        
        // Draw flash circle
        ctx.fillStyle = `rgba(200, 180, 255, ${alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// ====== js\entity\monster.js ======
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

// ====== js\entity\drop.js ======
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

// ====== js\entity\skill-box.js ======
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

// ====== js\entity\tower.js ======
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

// ====== js\entity\pet.js ======
/**
 * 宠物管理器
 * 管理宠物系统的所有功能
 */
class PetManager {
    constructor() {
        this.currentPetType = null; // 当前选中的宠物类型
        this.isActive = false; // 宠物是否处于出战状态
        this.pet = null; // 宠物实例
        this.pets = []; // 宠物数据数组
        this.initPets();
    }
    
    /**
     * 初始化宠物数据
     */
    initPets() {
        // 首先尝试从角色数据中获取宠物列表
        if (window.dataManager && window.dataManager.data && window.dataManager.data.pets) {
            this.loadPetsArray(window.dataManager.data.pets);
        }
    }
    
    /**
     * 选择宠物（保留方法以保持兼容性）
     * @param {string} petType - 宠物类型（attack/support/healer）
     */
    selectPet(petType) {
        this.selectPetForBattle(petType);
    }

    /**
     * 仅选择宠物类型（不出战）
     * @param {string} petType - 宠物类型（attack/support/healer）
     */
    selectPetType(petType) {
        if (DEFINE.PETS.TYPES[petType]) {
            this.currentPetType = petType;
            this.updatePetInfo();
            this.renderPetList();
        }
    }
    
    /**
     * 切换宠物出战状态（保留方法以保持兼容性）
     */
    togglePet() {
        // 切换当前宠物的出战状态
        if (this.currentPetType) {
            const currentPet = this.pets.find(pet => pet.type === this.currentPetType);
            if (currentPet && currentPet.isActive) {
                // 如果当前宠物已出战，则取消出战
                this.pets.forEach(pet => pet.isActive = false);
                this.isActive = false;
            } else {
                // 否则出战当前宠物
                this.selectPetForBattle(this.currentPetType);
            }
            this.updateActivePetInfo();
        }
    }
    
    /**
     * 渲染宠物列表
     */
    renderPetList() {
        const petList = document.getElementById('pet-list');
        if (!petList) return;
        
        petList.innerHTML = '';
        
        if (this.pets.length === 0) {
            petList.innerHTML = '<p style="color:#666;text-align:center;padding:40px;">暂无宠物</p>';
            return;
        }
        
        // 渲染每个宠物项
        this.pets.forEach(pet => {
            const petConfig = DEFINE.PETS.TYPES[pet.type];
            if (!petConfig) return;
            
            const isActive = pet.isActive || pet.free === 0;
            const isSelected = this.currentPetType === pet.type;
            
            const petItem = document.createElement('div');
            petItem.className = `pet-item ${pet.type} ${isActive ? 'active' : ''} ${isSelected ? 'selected' : ''}`;
            petItem.onclick = () => this.selectPetType(pet.type);
            
            petItem.innerHTML = `
                <div class="pet-item-icon ${pet.type}">${petConfig.icon}</div>
                <div class="pet-item-info">
                    <h5 class="pet-item-name">${petConfig.name}</h5>
                    <p class="pet-item-level">等级：${pet.level}</p>
                    <p class="pet-item-desc">${petConfig.description}</p>
                </div>
                <div class="pet-item-actions">
                    <button class="pet-action-btn ${isActive ? 'rest-btn' : 'battle-btn'}" onclick="event.stopPropagation(); ${isActive ? 'togglePetRest(\'' + pet.type + '\')' : 'togglePetBattle(\'' + pet.type + '\')'}">
                        ${isActive ? '休息' : '出战'}
                    </button>
                </div>
            `;
            
            petList.appendChild(petItem);
        });
        
        // 默认选择第一个宠物
        if (!this.currentPetType && this.pets.length > 0) {
            this.selectPetType(this.pets[0].type);
        }
    }
    
    /**
     * 更新宠物信息显示
     */
    updatePetInfo() {
        const petDetailInfo = document.getElementById('pet-detail-info');
        const petToggleBtn = document.getElementById('pet-toggle-btn');
        
        if (!petDetailInfo || !petToggleBtn) return;
        
        if (this.currentPetType) {
            const petConfig = DEFINE.PETS.TYPES[this.currentPetType];
            const petData = this.pets.find(pet => pet.type === this.currentPetType);
            if (!petData) return;
            
            const isActive = petData.isActive;
            
            petDetailInfo.innerHTML = `
                <p class="pet-detail-name">${petConfig.name}</p>
                <p class="pet-detail-type">类型：${petConfig.name}</p>
                <p class="pet-detail-level">等级：${petData.level}</p>
                <p class="pet-detail-desc">${petConfig.description}</p>
            `;
            
            petToggleBtn.textContent = isActive ? '休息' : '出战';
        } else {
            petDetailInfo.innerHTML = `
                <p class="pet-detail-name">未选择宠物</p>
                <p class="pet-detail-type">类型：-</p>
                <p class="pet-detail-level">等级：-</p>
                <p class="pet-detail-desc">请选择一个宠物查看详情</p>
            `;
            petToggleBtn.textContent = '出战';
        }
    }
    
    /**
     * 检查宠物系统是否已解锁
     * @returns {boolean} 是否解锁
     */
    isPetSystemUnlocked() {
        // 假设宠物系统需要在天赋系统中解锁
        // 这里简单判断天赋树是否已解锁
        if (window.dataManager) {
            return window.dataManager.att[0] > 0;
        }
        return false;
    }
    
    /**
     * 创建宠物实例（用于战斗）
     * @param {Player} player - 玩家实例
     * @returns {Pet|null} 宠物实例
     */
    createPet(player) {
        if (!this.currentPetType || !this.isActive) return null;
        
        const petData = this.pets.find(pet => pet.type === this.currentPetType);
        if (!petData) return null;
        
        this.pet = new Pet(
            player.x,
            player.y,
            this.currentPetType,
            petData.level // 使用宠物自身的等级
        );
        return this.pet;
    }
    
    /**
     * 清除宠物实例
     */
    clearPet() {
        this.pet = null;
    }
    
    /**
     * 获取宠物数组（用于保存）
     * @returns {Array} 宠物数组
     */
    getPetsArray() {
        return this.pets;
    }
    
    /**
     * 加载宠物数组
     * @param {Array} petsArray - 宠物数组
     */
    loadPetsArray(petsArray) {
        if (!Array.isArray(petsArray) || petsArray.length === 0) {return;}
        this.pets = petsArray;
        // 找到激活的宠物
        const activePet = this.pets.find(pet => pet.isActive);
        if (activePet) {
            this.currentPetType = activePet.type;
            this.isActive = true;
        } else {
            this.currentPetType = null;
            this.isActive = false;
        }
    }
    
    /**
     * 保存宠物数据
     * @returns {Object} 宠物数据
     */
    save() {
        return {
            type: this.currentPetType,
            isActive: this.isActive,
            pets: this.pets
        };
    }
    
    /**
     * 加载宠物数据
     * @param {Object} data - 宠物数据
     */
    load(data) {
        if (data) {
            this.currentPetType = data.type || null;
            this.isActive = data.isActive || false;
            if (data.pets) {
                if (Array.isArray(data.pets)) {
                    this.pets = data.pets;
                } else {
                    // 兼容旧格式
                    this.pets = [];
                    Object.keys(data.pets).forEach(type => {
                        this.pets.push({
                            type: type,
                            ...data.pets[type]
                        });
                    });
                }
            } else {
                this.initPets();
            }
        }
    }
    
    /**
     * 升级宠物
     * @param {string} petType - 宠物类型
     * @param {number} levels - 升级数量
     */
    levelUpPet(petType, levels = 1) {
        const pet = this.pets.find(pet => pet.type === petType);
        if (pet) {
            pet.level += levels;
            this.updateActivePetInfo();
        }
    }
    
    /**
     * 更新当前出战宠物信息
     */
    updateActivePetInfo() {
        const petStatusName = document.getElementById('pet-status-name');
        const petStatusLevel = document.getElementById('pet-status-level');
        
        // 找到当前出战的宠物（考虑free字段）
        const activePet = this.pets.find(pet => pet.isActive || pet.free === 0);
        
        if (activePet) {
            const petConfig = DEFINE.PETS.TYPES[activePet.type];
            if (petConfig) {
                // 更新顶部状态栏
                if (petStatusName) {
                    petStatusName.textContent = petConfig.name;
                    petStatusName.classList.remove('no-pet');
                }
                if (petStatusLevel) {
                    petStatusLevel.textContent = `Lv.${activePet.level}`;
                }
            }
        } else {
            // 更新顶部状态栏为无出战宠物
            if (petStatusName) {
                petStatusName.textContent = '无出战宠物';
                petStatusName.classList.add('no-pet');
            }
            if (petStatusLevel) {
                petStatusLevel.textContent = '';
            }
        }
    }
    
    /**
     * 打开宠物选择模态框
     */
    openPetSelectionModal() {
        const modal = document.getElementById('pet-selection-modal');
        const selectionList = document.getElementById('pet-selection-list');
        
        if (!modal || !selectionList) return;
        
        // 清空列表
        selectionList.innerHTML = '';
        
        // 渲染宠物选择项
        this.pets.forEach(pet => {
            const petConfig = DEFINE.PETS.TYPES[pet.type];
            if (!petConfig) return;
            
            const isActive = pet.isActive;
            
            const petItem = document.createElement('div');
            petItem.className = `pet-selection-item ${pet.type}`;
            
            petItem.innerHTML = `
                <div class="pet-selection-icon ${pet.type}">${petConfig.icon}</div>
                <div class="pet-selection-info">
                    <h5 class="pet-selection-name">${petConfig.name}</h5>
                    <p class="pet-selection-level">等级：${pet.level}</p>
                    <p class="pet-selection-desc">${petConfig.description}</p>
                </div>
                <button class="pet-selection-btn" onclick="selectPetForBattle('${pet.type}')">
                    ${isActive ? '已出战' : '选择'}
                </button>
            `;
            
            selectionList.appendChild(petItem);
        });
        
        // 显示模态框
        modal.classList.remove('hidden');
    }
    
    /**
     * 关闭宠物选择模态框
     */
    closePetSelectionModal() {
        const modal = document.getElementById('pet-selection-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }
    
    /**
     * 选择宠物出战
     * @param {string} petType - 宠物类型
     */
    selectPetForBattle(petType) {
        // 先将所有宠物设置为非激活状态
        this.pets.forEach(pet => {
            pet.isActive = false;
            pet.free = 1;
        });
        
        // 激活选中的宠物
        const selectedPet = this.pets.find(pet => pet.type === petType);
        if (selectedPet) {
            selectedPet.isActive = true;
            selectedPet.free = 0;
            this.currentPetType = petType;
            this.isActive = true;
        }
        
        // 更新当前宠物信息
        this.updateActivePetInfo();
        this.renderPetList();
        
        // 关闭模态框
        this.closePetSelectionModal();
    }
    
    /**
     * 让宠物休息
     * @param {string} petType - 宠物类型
     */
    togglePetRest(petType) {
        const pet = this.pets.find(pet => pet.type === petType);
        if (pet && (pet.isActive || pet.free === 0)) {
            pet.isActive = false;
            pet.free = 1;
            this.isActive = false;
            if (this.currentPetType === petType) {
                this.currentPetType = null;
            }
            
            // 更新当前宠物信息
            this.updateActivePetInfo();
            this.renderPetList();
        }
    }
}

// 全局函数，供 HTML 调用
function openPetSelection() {
    if (window.game && window.game.petManager) {
        window.game.petManager.openPetSelectionModal();
    }
}

function closePetSelectionModal() {
    if (window.game && window.game.petManager) {
        window.game.petManager.closePetSelectionModal();
    }
}

function selectPetForBattle(petType) {
    if (window.game && window.game.petManager) {
        window.game.petManager.selectPetForBattle(petType);
    }
}

function togglePet() {
    if (window.game && window.game.petManager) {
        window.game.petManager.togglePet();
    }
}

function togglePetBattle(petType) {
    if (window.game && window.game.petManager) {
        window.game.petManager.selectPetForBattle(petType);
    }
}

function togglePetRest(petType) {
    if (window.game && window.game.petManager) {
        window.game.petManager.togglePetRest(petType);
    }
}

/**
 * 宠物类
 * 战斗中的宠物实例
 */
class Pet {
    constructor(x, y, type, level) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.level = level;
        this.speed = DEFINE.PETS.FOLLOW.speed;
        this.followDistance = DEFINE.PETS.FOLLOW.distance;
        this.config = DEFINE.PETS.TYPES[type];
        
        // 宠物属性
        this.attackPower = this.config.attackPower + (level * 0.5);
        this.lastAttackTime = 0;
        this.lastBuffTime = 0;
        this.lastHealTime = 0;
        
        // 宠物状态
        this.isInvincible = true; // 宠物无敌
        this.canAttack = type === 'attack';
        this.canBuff = type === 'support';
        this.canHeal = type === 'healer';
    }
    
    /**
     * 更新宠物位置（跟随玩家）
     * @param {Player} player - 玩家实例
     * @param {number} deltaTime - 时间增量
     */
    update(player, deltaTime) {
        if (!player) return;
        
        // 计算到玩家的距离
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // 跟随玩家
        if (distance > this.followDistance) {
            const angle = Math.atan2(dy, dx);
            const moveDistance = this.speed * (deltaTime / 1000);
            this.x += Math.cos(angle) * moveDistance;
            this.y += Math.sin(angle) * moveDistance;
        }
    }
    
    /**
     * 宠物攻击逻辑
     * @param {Array} monsters - 怪物数组
     * @param {number} currentTime - 当前时间
     */
    attack(monsters, currentTime) {
        if (!this.canAttack) return;
        
        // 检查攻击间隔
        if (currentTime - this.lastAttackTime < this.config.attackInterval) return;
        
        // 寻找范围内的怪物
        for (const monster of monsters) {
            const dx = monster.x - this.x;
            const dy = monster.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance <= this.config.attackRange) {
                // 攻击怪物
                monster.takeDamage(this.attackPower, false); // 不吸引仇恨
                this.lastAttackTime = currentTime;
                break;
            }
        }
    }
    
    /**
     * 宠物辅助逻辑
     * @param {Player} player - 玩家实例
     * @param {Array} monsters - 怪物数组
     * @param {number} currentTime - 当前时间
     */
    support(player, monsters, currentTime) {
        if (!this.canBuff) return;
        
        // 检查增益间隔
        if (currentTime - this.lastBuffTime < this.config.buffInterval) return;
        
        // 给玩家加增益 buff（这里简单实现）
        if (player) {
            player.attack += 1; // 临时增益
            setTimeout(() => {
                if (player) player.attack -= 1;
            }, 5000);
        }
        
        // 给怪物加 debuff（这里简单实现）
        for (const monster of monsters) {
            monster.defense -= 1; // 临时减防
            setTimeout(() => {
                monster.defense += 1;
            }, 5000);
        }
        
        this.lastBuffTime = currentTime;
    }
    
    /**
     * 宠物治疗逻辑
     * @param {Player} player - 玩家实例
     * @param {number} currentTime - 当前时间
     */
    heal(player, currentTime) {
        if (!this.canHeal || !player) return;
        
        // 检查治疗间隔
        if (currentTime - this.lastHealTime < this.config.healInterval) return;
        
        // 检查血量阈值
        const hpPercentage = player.hp / player.maxHp;
        const mpPercentage = player.mp / player.maxMp;
        
        if (hpPercentage <= this.config.hpThreshold) {
            // 治疗血量
            player.hp = Math.min(player.hp + this.config.healAmount, player.maxHp);
            this.lastHealTime = currentTime;
        } else if (mpPercentage <= this.config.mpThreshold) {
            // 恢复法力
            player.mp = Math.min(player.mp + this.config.healAmount, player.maxMp);
            this.lastHealTime = currentTime;
        }
    }
    
    /**
     * 渲染宠物
     * @param {CanvasRenderingContext2D} ctx - 画布上下文
     */
    render(ctx) {
        // 绘制宠物外观（像素风格）
        const appearance = DEFINE.PETS.APPEARANCES[this.type];
        if (!appearance) return;
        
        const gridSize = 8; // 每个像素格子的大小
        const petSize = appearance[0].length * gridSize;
        const offsetX = this.x - petSize / 2;
        const offsetY = this.y - petSize / 2;
        
        // 绘制宠物像素外观
        for (let y = 0; y < appearance.length; y++) {
            for (let x = 0; x < appearance[y].length; x++) {
                const char = appearance[y][x];
                if (char === 'X' || char === 'O') {
                    ctx.fillStyle = char === 'O' ? '#ffff00' : this.config.color;
                    ctx.fillRect(offsetX + x * gridSize, offsetY + y * gridSize, gridSize, gridSize);
                }
            }
        }
    }
}

window.PetManager = PetManager;
window.Pet = Pet;

// ====== js\skill\effect.js ======
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

// ====== js\ui\uiMgr.js ======
// ==================== UI 管理器 ====================

// [BUNDLE] removed import
// [BUNDLE] removed import

/**
 * UI 管理器 - 管理所有用户界面元素的显示、更新和交互
 */
class UIManager {
    /**
     * 创建 UI 管理器实例
     */
    constructor() {
        this.elements = {};
        this.currentScreen = 'main';
        this.currentInventoryFilter = 'all';
        this.selectedDungeonId = null;// 征战页面当前选中的副本id
    }
    
    /**
     * 初始化 UI 管理器
     */
    init() {
        //this.showMainMenu();
    }
    
    /**
     * 显示登录界面
     */
    showLoginScreen() {
        if (document.getElementById('login-screen')) {
            document.getElementById('login-screen').classList.remove('hidden');
        }
        if (document.getElementById('main-screen')) {
            document.getElementById('main-screen').classList.add('hidden');
        }
        if (document.getElementById('game-screen')) {
            document.getElementById('game-screen').classList.add('hidden');
        }
        this.currentScreen = 'login';
        this.updateCharacterSection();
    }
    
    /**
     * 显示主菜单界面
     */
    showMainMenu() {
        if (document.getElementById('login-screen')) {
            document.getElementById('login-screen').classList.add('hidden');
        }
        if (document.getElementById('main-screen')) {
            document.getElementById('main-screen').classList.remove('hidden');
        }
        if (document.getElementById('game-screen')) {
            document.getElementById('game-screen').classList.add('hidden');
        }
        this.currentScreen = 'main';
        this.switchTab('character');
        //this.updateEquipmentDisplay();
    }
    
    /**
     * 更新装备显示
     */
    updateEquipmentDisplay() {
        this.updateEquippedSlots();
        this.updateEquipmentList();
    }
    
    /**
     * 更新已装备格子
     */
    updateEquippedSlots(container) {      
        const slots = container ? container.querySelectorAll('.equipment-slot') : document.querySelectorAll('.equipment-slot');
        const equips = dataMgr.getWearedEquips();
        
        slots.forEach(slot => {
            const slotType = slot.dataset.slot;
            const equipment = equips[slotType];
            
            slot.innerHTML = '';
            
            // 始终显示装备槽位名称
            const slotName = document.createElement('div');
            slotName.className = 'equipment-name';
            slotName.textContent = this.getSlotName(slotType);
            slot.appendChild(slotName);
            
            if (equipment) {
                slot.classList.remove('empty');
                slot.classList.add('has-equip');
                // 获取装备名称和品质颜色
                const equipmentName = dataMgr.getEquipInTable(equipment.oid).name || '未知装备';
                const qualityColor = this.getEquipmentQualityColor(equipment);
                
                slot.style.borderColor = qualityColor;
                
                const equipName = document.createElement('div');
                equipName.className = 'equipped-name';
                equipName.style.color = qualityColor;
                equipName.textContent = equipmentName;
                slot.appendChild(equipName);
            } else {
                slot.classList.add('empty');
                slot.classList.remove('has-equip');
                slot.style.borderColor = '';
            }
            
            // 添加点击事件
            slot.onclick = () => {
                this.showEquipmentBySlot(slotType);
            };
        });
    }
    
    /**
     * 根据槽位显示装备
     * @param {string} slotType - 装备槽位类型
     */
    /**
     * 根据槽位显示装备
     * @param {string} slotType - 装备槽位类型
     */
    showEquipmentBySlot(slotType) {
        // 获取已穿戴的装备
        const equips = dataMgr.getWearedEquips();
        const equipment = equips[slotType];
        
        if (equipment) {
            // 显示装备详情弹窗（和仓库中点击装备一样的弹窗）
            this.showEquipmentDetailModal(equipment);
        } else {
            // 显示提示
            this.showEquipmentToast(`该槽位未装备任何装备`);
        }
    }
    
    /**
     * 显示装备提示
     * @param {string} message - 提示信息
     */
    showEquipmentToast(message) {
        const toast = document.getElementById('equipment-toast');
        if (!toast) return;
        // 清除之前的定时器
        if (this.toastTimer) {
            clearTimeout(this.toastTimer);
        }
        
        // 重置状态
        toast.classList.add('hidden');
        setTimeout(() => {
            toast.textContent = message;
            toast.classList.remove('hidden');
            // 2秒后隐藏
            this.toastTimer = setTimeout(() => {
                toast.classList.add('hidden');
            }, 2000);
        }, 100);
    }
    
    /**
     * 更新装备列表显示
     */
    updateEquipmentList(listContainer, listSection, isCharPage) {
        const equipmentList = listContainer || document.getElementById('char-equip-list');
        const section = listSection || document.querySelector('#char-equip-content .equipment-list-section');
        
        if (!equipmentList) return;
        
        const game = window.game;
        if (!game || !dataMgr) {
            equipmentList.innerHTML = '<p style="color:#666;text-align:center;">仓库中没有装备</p>';
            return;
        }
        
        const equipmentItems = dataMgr.getInventoryEquips();
        
        if (!equipmentItems || equipmentItems.length === 0) {
            equipmentList.innerHTML = '<p style="color:#666;text-align:center;">仓库中没有装备</p>';
            return;
        }
        
        if (section && isCharPage) {
            const charPanel = document.querySelector('.character-panel');
            if (charPanel) {
                const panelHeight = charPanel.offsetHeight;
                const slotsHeight = section.previousElementSibling ? section.previousElementSibling.offsetHeight : 100;
                const sectionHeight = panelHeight - slotsHeight - 80;
                section.style.height = `${sectionHeight}px`;
                equipmentList.style.height = `${sectionHeight - 30}px`;
            }
        }
        
        const equips = dataMgr.getWearedEquips();
        
        equipmentList.innerHTML = '';
        
        equipmentItems.forEach(item => {
            const equipmentItem = document.createElement('div');
            equipmentItem.className = 'equipment-item';
            
            const equipmentName = item.name || dataMgr.getEquipInTable(item.oid).name || '未知装备';
            const qualityColor = this.getEquipmentQualityColor(item);
            const score = this.calculateEquipmentScore(item);
            const equipSlot = item.slot || (dataMgr.getEquipInTable(item.oid) ? dataMgr.getEquipInTable(item.oid).slot : 'weapon');
            
            const equippedEquipment = equips[equipSlot];
            let arrowClass = '';
            if (equippedEquipment) {
                const equippedScore = this.calculateEquipmentScore(equippedEquipment);
                if (score > equippedScore) {
                    arrowClass = 'arrow-up';
                } else if (score < equippedScore) {
                    arrowClass = 'arrow-down';
                } else {
                    arrowClass = 'arrow-equal';
                }
            } else {
                arrowClass = 'arrow-up';
            }
            
            let attrsHtml = '';
            if (item.att && item.att.length > 0) {
                for (const attr of item.att) {
                    const attrName = this.getAttributeDisplayName(attr.key);
                    const formattedValue = this.formatAttributeValue(attr.key, attr.value);
                    attrsHtml += `<span class="attr-tag">${attrName}+${formattedValue}</span>`;
                }
            }
            
            equipmentItem.innerHTML = `
                <div class="equipment-info-row">
                    <span class="equipment-title" style="color: ${qualityColor}">${equipmentName}</span>
                    <span class="equipment-score ${arrowClass}">评分: ${score}</span>
                </div>
                <div class="equipment-attrs">${attrsHtml}</div>
            `;
            
            equipmentItem.onclick = () => {
                this.showEquipmentCompareModal(item);
            };
            
            equipmentList.appendChild(equipmentItem);
        });
    }
    
    /**
     * 显示装备详情弹窗
     * @param {Object} equipment - 装备对象
     */
    showEquipmentDetailModal(equipment) {
        const modal = document.getElementById('equipment-detail-modal');
        const infoContainer = document.getElementById('equipment-detail-info');
        
        if (!modal || !infoContainer) return;
        
        // 保存当前装备对象，用于卸下操作
        this.currentDetailEquipment = equipment;
        
        // 获取装备名称和品质颜色
        const equipmentName = equipment.name || dataMgr.getEquipInTable(equipment.oid).name  || '未知装备';
        const qualityColor = this.getEquipmentQualityColor(equipment);
        
        // 生成装备详情
        let html = `
            <div class="equipment-title" style="color: ${qualityColor}">${equipmentName}</div>
            <div class="equipment-divider"></div>
            <div class="equipment-attributes">
        `;
        
        // 显示装备属性
        if (equipment.att && equipment.att.length > 0) {
            for (const attr of equipment.att) {
                const attrName = this.getAttributeDisplayName(attr.key);
                const formattedValue = this.formatAttributeValue(attr.key, attr.value);
                html += `
                    <div class="attribute-item">
                        <span class="attribute-name">${attrName}</span>
                        <span class="attribute-value">+${formattedValue}</span>
                    </div>
                `;
            }
        } else {
            html += `
                <div class="attribute-item">
                    <span class="attribute-name">无属性</span>
                    <span class="attribute-value">-</span>
                </div>
            `;
        }
        
        html += `</div>`;
        infoContainer.innerHTML = html;
        
        // 绑定卸下按钮事件
        const unequipBtn = document.getElementById('unequip-btn');
        if (unequipBtn) {
            unequipBtn.onclick = () => {
                this.unequipEquipment(equipment);
            };
        }
        
        // 添加点击背景关闭弹窗的功能
        modal.onclick = (e) => {
            if (e.target === modal) {
                this.closeEquipmentDetailModal();
            }
        };
        
        // 显示弹窗
        modal.classList.remove('hidden');
    }
    
    /**
     * 显示装备对比弹窗
     * @param {Object} candidateEquipment - 被点击的装备
     */
    showEquipmentCompareModal(candidateEquipment) {
        const modal = document.getElementById('equipment-compare-modal');
        const equippedInfo = document.getElementById('equipped-equipment-info');//已穿戴的装备
        const candidateInfo = document.getElementById('candidate-equipment-info');//候选装备
        
        if (!modal || !equippedInfo || !candidateInfo) return;
        
        // 获取已穿戴的装备
        const equips = dataMgr.getWearedEquips();
        const equipSlot = candidateEquipment.slot || (dataMgr.getEquipInTable(candidateEquipment.oid) ? dataMgr.getEquipInTable(candidateEquipment.oid).slot : 'weapon');
        const equippedEquipment = equips[equipSlot];
        
        // 生成已穿戴装备信息
        if (equippedEquipment) {
            const equippedScore = this.calculateEquipmentScore(equippedEquipment);
            const equippedName = equippedEquipment.name ? equippedEquipment.name : (dataMgr.getEquipInTable(equippedEquipment.oid).name || '未知装备');
            let equippedHtml = `
                <div class="equipment-title">${equippedName}</div>
                <div class="equipment-score">评分: ${equippedScore}</div>
            `;
            
            if (equippedEquipment.att && equippedEquipment.att.length > 0) {
                for (const attr of equippedEquipment.att) {
                    const attrName = this.getAttributeDisplayName(attr.key);
                    const formattedValue = this.formatAttributeValue(attr.key, attr.value);
                    equippedHtml += `
                        <div class="attribute-item">
                            <span class="attribute-name">${attrName}</span>
                            <span class="attribute-value">+${formattedValue}</span>
                        </div>
                    `;
                }
            } else {
                equippedHtml += `
                    <div class="attribute-item">
                        <span class="attribute-name">无属性</span>
                        <span class="attribute-value">-</span>
                    </div>
                `;
            }
            equippedInfo.innerHTML = equippedHtml;
        } else {
            equippedInfo.innerHTML = `<div class="no-equipment">未穿戴装备</div>`;
        }
        
        // 生成被点击装备信息
        const candidateScore = this.calculateEquipmentScore(candidateEquipment);
        let candidateHtml = `
            <div class="equipment-title">${dataMgr.getEquipInTable(candidateEquipment.oid).name}</div>
            <div class="equipment-score">评分: ${candidateScore}</div>
        `;
        
        if (candidateEquipment.att && candidateEquipment.att.length > 0) {
            for (const attr of candidateEquipment.att) {
                const attrName = this.getAttributeDisplayName(attr.key);
                
                // 计算差异
                let diffClass = 'attribute-diff-neutral';
                if (equippedEquipment && equippedEquipment.att) {
                    const equippedAttr = equippedEquipment.att.find(a => a.key === attr.key);
                    if (equippedAttr) {
                        if (attr.value > equippedAttr.value) {
                            diffClass = 'attribute-diff-positive';
                        } else if (attr.value < equippedAttr.value) {
                            diffClass = 'attribute-diff-negative';
                        }
                    } else {
                        diffClass = 'attribute-diff-positive';
                    }
                } else {
                    diffClass = 'attribute-diff-positive';
                }
                
                const formattedValue = this.formatAttributeValue(attr.key, attr.value);
                candidateHtml += `
                    <div class="attribute-item">
                        <span class="attribute-name">${attrName}</span>
                        <span class="attribute-value ${diffClass}">+${formattedValue}</span>
                    </div>
                `;
            }
        } else {
            candidateHtml += `
                <div class="attribute-item">
                    <span class="attribute-name">无属性</span>
                    <span class="attribute-value">-</span>
                </div>
            `;
        }
        candidateInfo.innerHTML = candidateHtml;
        
        // 保存当前对比的装备
        this.currentCandidateEquipment = candidateEquipment;
        
        // 绑定穿戴装备按钮事件
        const equipBtn = document.getElementById('equip-btn');
        if (equipBtn) {
            equipBtn.onclick = () => {
                this.wearEquip(candidateEquipment);
                this.closeEquipmentCompareModal();
                
                const charEquipContent = document.getElementById('char-equip-content');
                const isCharEquipTab = charEquipContent && charEquipContent.classList.contains('active');
                
                if (isCharEquipTab) {
                    const slotsContainer = document.getElementById('char-equip-slots');
                    const listContainer = document.getElementById('char-equip-list');
                    const listSection = charEquipContent.querySelector('.equipment-list-section');
                    
                    this.updateEquippedSlots(slotsContainer);
                    this.updateEquipmentList(listContainer, listSection, true);
                    
                    this.updateCharacterInfo();
                } else {
                    this.updateEquippedSlots();
                    this.updateEquipmentList();
                }
            };
        }
        
        // 绑定强化按钮事件
        const forgeBtn = document.getElementById('forge-btn');
        if (forgeBtn) {
            forgeBtn.onclick = () => {
                this.closeEquipmentCompareModal();
                // 显示工坊页面
                this.showWorkshopPanel(candidateEquipment);
            };
        }
        
        // 添加点击背景关闭弹窗的功能
        modal.onclick = (e) => {
            if (e.target === modal) {
                this.closeEquipmentCompareModal();
            }
        };
        
        // 显示弹窗
        modal.classList.remove('hidden');
    }
    
    /**
     * 关闭装备详情弹窗
     */
    closeEquipmentDetailModal() {
        const modal = document.getElementById('equipment-detail-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.currentDetailEquipment = null;
    }
    
    /**
     * 卸下装备
     * @param {Object} equipment - 装备对象
     */
    unequipEquipment(equipment) {
        if (!equipment || !dataMgr) {
            alert('装备卸下失败');
            return;
        }
        
        const slot = equipment.slot;
        
        // 检查角色数据中是否有该装备
        const equips = dataMgr.getWearedEquips();
        if (!equips[slot]) {
            alert('该装备未穿戴');
            return;
        }
        let roleD = dataMgr.getRoleData();
        
        // 获取已穿戴的装备
        const equipped = equips[slot];
        
        // 默认属性值
        const defaultAttributes = {
            maxHp: 100,
            maxMp: 50,
            attack: 10,
            defense: 0,
            mpRegen: 1,
            hpRegen: 0,
            critRate: 0,
            critDamage: 150,
            dodgeRate: 0,
            luck: 0,
            immune: 0,
            damageReduction: 0
        };
        
        // 减少角色属性值
        if (equipped.att && equipped.att.length > 0) {
            for (const attr of equipped.att) {
                if (attr.key && attr.value && roleD.attribute[attr.key] !== undefined) {
                    const newValue = roleD.attribute[attr.key] - attr.value;
                    const minValue = defaultAttributes[attr.key] !== undefined ? defaultAttributes[attr.key] : 0;
                    roleD.attribute[attr.key] = Math.max(newValue, minValue);
                }
            }
        }
        
        // 将装备添加到仓库
        dataMgr.addEquip(equipped);
        
        // 清除已穿戴装备
        roleD.equips[slot] = null;
        
        // 保存数据
        dataMgr.saveLocal();
        
        // 关闭弹窗
        this.closeEquipmentDetailModal();
        
        // 更新装备槽位显示
        this.updateEquippedSlots();
        
        // 更新仓库列表
        this.updateEquipmentList();
        
        // 更新角色属性显示
        this.updateCharacterInfo();
        
        console.info('装备已卸下');
    }
    
    /**
     * 关闭装备对比弹窗
     */
    closeEquipmentCompareModal() {
        const modal = document.getElementById('equipment-compare-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.currentCandidateEquipment = null;
    }
    //穿戴装备
    wearEquip(item) {
        const game = window.game;
        if (!game || !dataMgr) {
            console.warn('Game or inventory manager not initialized');
            return;
        }
        
        if (!dataMgr) {
            console.warn('Data manager not initialized');
            return;
        }
        
        let roleD = dataMgr.getRoleData();
        
        // 获取装备槽位（从装备对象或配置表中获取）
        const equipSlot = item.slot || (dataMgr.getEquipInTable(item.oid) ? dataMgr.getEquipInTable(item.oid).slot : 'weapon');
        
        // 卸下当前装备（如果有）
        const slot = equipSlot;
        const equips = dataMgr.getWearedEquips();
        
        if (equips[slot]) {
            // 将卸下的装备放回仓库
            const unequippedItem = JSON.parse(JSON.stringify(equips[slot]));
            // 减少旧装备的属性加成
            if (unequippedItem.att && unequippedItem.att.length > 0) {
                for (const attr of unequippedItem.att) {
                    if (attr.key && attr.value && roleD.attribute[attr.key] !== undefined) {
                        roleD.attribute[attr.key] -= attr.value;
                    }
                }
            }
            dataMgr.addEquip(unequippedItem);
        }
        
        // 从仓库中移除该物品
        // 直接在inventory数组中查找并移除（因为装备的id可能与仓库中的不一致）
        const inventory = dataMgr.saveData.inventory;
        const inventoryIndex = inventory.findIndex(i => i.id === item.id);
        if (inventoryIndex !== -1) {
            inventory.splice(inventoryIndex, 1);
        } else {
            // 尝试使用oid查找
            const inventoryByOid = inventory.findIndex(i => i.oid === item.oid);
            if (inventoryByOid !== -1) {
                inventory.splice(inventoryByOid, 1);
            }
        }
        dataMgr.saveLocal();
        
        // 装备新物品 - 添加属性加成
        if (item.att && item.att.length > 0) {
            for (const attr of item.att) {
                if (attr.key && attr.value && roleD.attribute[attr.key] !== undefined) {
                    roleD.attribute[attr.key] += attr.value;
                }
            }
        }
        
        equips[slot] = item;
        
        // 保存数据
        dataMgr.saveLocal();
        
        // 关闭对比弹窗
        this.closeEquipmentCompareModal();
        
        // 更新显示
        this.updateEquippedSlots();
        this.updateEquipmentList();
        this.updateCharacterInfo();
    }
    
    /**
     * 计算装备评分
     * @param {Object} equipment - 装备
     * @returns {number} 评分
     */
    calculateEquipmentScore(equipment) {
        // 属性含金量系数
        const attrCoefficients = {
            'maxHp': 1,           // 血量
            'maxMp': 0.6,           // 法力
            'attack': 1.5,         // 攻击
            'defense': 0.7,        // 防御
            'mpRegen': 0.2,        // mp恢复值
            'critRate': 0.5,       // 暴击率（字面量30对应30%）
            'critDamage': 0.3,     // 暴伤率（字面量150对应150%）
            'dodgeRate': 0.4,      // 闪避率（字面量10对应10%）
            'hpRegen': 1,          // 气血恢复值
            'luck': 2,             // 幸运值
            'immune': 2,           // 免疫
            'damageReduction': 2,  // 免伤
            'invincibleTime': 4    // 无敌时间系数
        };
        
        // 获取装备品质等级
        let qualityLevel = 1;
        // 优先使用存储的品质
        if (equipment.quality !== null && equipment.quality !== undefined) {
            qualityLevel = equipment.quality;
        } else if (equipment.id) {  
            const configItem = dataMgr.getEquipInTable(equipment.id);
            if (configItem && configItem.quality) {
                qualityLevel = configItem.quality;
            } else {
                // 从ID中提取品质等级（如 weapon_1 -> 1）
                const match = equipment.id.match(/_(\d+)$/);
                if (match) {
                    qualityLevel = parseInt(match[1], 10);
                }
            }
        }
        
        // 计算属性评分
        let attrScore = 0;
        if (equipment.att && equipment.att.length > 0) {
            for (const attr of equipment.att) {
                const coefficient = attrCoefficients[attr.key] || 0;
                attrScore += coefficient * (attr.value || 0);
            }
        }
        
        // 公式：品质等级*50 + 属性评分
        const totalScore = qualityLevel * 50 + attrScore;
        
        return Math.round(totalScore);
    }
    
    /**
     * 获取装备的品质颜色
     * @param {{type:string,id:string}} equipment - 装备
     * @returns {string} 颜色值
     */
    getEquipmentQualityColor(equipment) {
        // 获取装备品质等级
        let qualityLevel = 1;
        // 优先使用存储的品质
        if (equipment.quality !== null && equipment.quality !== undefined) {
            qualityLevel = equipment.quality;
        } else if (equipment.id) {  
            const configItem = dataMgr.getEquipInTable(equipment.id);
            if (configItem && configItem.quality) {
                qualityLevel = configItem.quality;
            } else {
                const match = equipment.id.match(/_(\d+)$/);
                if (match) {
                    qualityLevel = parseInt(match[1], 10);
                }
            }
        }
        
        // 品质颜色
        const qualityColors = {
            1: '#ffffff',  // 白色 - 普通
            2: '#4caf50', // 绿色 - 优秀
            3: '#2196f3', // 蓝色 - 稀有
            4: '#9c27b0', // 紫色 - 史诗
            5: '#ff9800'  // 橙色 - 传说
        };
        
        return qualityColors[qualityLevel] || '#ffffff';
    }
    
    /**
     * 获取道具的品质颜色
     * @param {{type:string,id:string}} item - 道具对象，包含 type 和 id
     * @returns {string} 颜色值
     */
    getItemQualityColor(item) {
        // 品质颜色映射
        const qualityColors = {
            1: '#ffffff',  // 白色 - 普通
            2: '#4caf50', // 绿色 - 优秀
            3: '#2196f3', // 蓝色 - 稀有
            4: '#9c27b0', // 紫色 - 史诗
            5: '#ff9800'  // 橙色 - 传说
        };
        
        // 装备使用已有的方法
        if (item.type === 'equipment') {
            return this.getEquipmentQualityColor(item);
        }
        
        // 其他道具从配置表获取品质
        const itemInfo = dataMgr.getPropInTable(item.id);
        if (itemInfo && itemInfo.quality) {
            return qualityColors[itemInfo.quality] || '#ffffff';
        }
        
        // 默认白色
        return '#ffffff';
    }
    
    /**
     * 获取装备槽位名称
     * @param {string} slotType - 槽位类型
     * @returns {string} 槽位名称
     */
    getSlotName(slotType) {
        const slotNames = {
            weapon: '武器',
            armor: '护甲',
            helmet: '头盔',
            ring: '戒指',
            necklace: '项链',
            wrist: '腕部'
        };
        return slotNames[slotType] || slotType;
    }
    
    /**
     * 显示游戏副本内战斗界面
     */
    showGameScreen() {
        if (document.getElementById('login-screen')) {
            document.getElementById('login-screen').classList.add('hidden');
        }
        if (document.getElementById('main-screen')) {
            document.getElementById('main-screen').classList.add('hidden');
        }
        if (document.getElementById('game-screen')) {
            document.getElementById('game-screen').classList.remove('hidden');
        }
        this.currentScreen = 'game';
    }
    
    /**
     * 更新角色区域显示（登录界面）
     */
    updateCharacterSection() {
        if (!this.elements.loginSection) return;
        const data = dataMgr.getRoleData();
        if (data) {
            this.elements.loginSection.classList.remove('hidden');
            this.elements.registerSection.classList.add('hidden');
            this.elements.characterName.textContent = data.name || '未命名';
        } else {
            this.elements.loginSection.classList.add('hidden');
            this.elements.registerSection.classList.remove('hidden');
        }
    }
    
    /**
     * 绑定所有 UI 元素和事件监听器
     */
    bindElements() {
        this.elements = {
            hpBar: document.getElementById('hp-bar'),
            hpText: document.getElementById('hp-text'),
            mpBar: document.getElementById('mp-bar'),
            mpText: document.getElementById('mp-text'),
            expBar: document.getElementById('exp-bar'),
            levelText: document.getElementById('level-text'),
            waveLabel: document.getElementById('wave-label'),
            progressBar: document.getElementById('progress-bar'),
            bossTimer: document.getElementById('boss-timer'),
            skillOptions: document.getElementById('skill-options'),
            adBtn: document.getElementById('ad-btn'),
            gameOverTitle: document.getElementById('game-over-title'),
            finalWave: document.getElementById('final-wave'),
            finalLevel: document.getElementById('final-level'),
            restartBtn: document.getElementById('restart-btn'),
            toMenuBtn: document.getElementById('to-menu-btn'),
            levelUpPanel: document.getElementById('level-up-panel'),
            gameOverPanel: document.getElementById('game-over-panel'),
            mainMenu: document.getElementById('main-screen'),
            gameScreen: document.getElementById('game-screen'),
            charInfo: document.getElementById('char-info'),
            charSkills: document.getElementById('char-skills'),
            inventoryList: document.getElementById('inventory-list'),
            loginSection: document.getElementById('login-section'),
            registerSection: document.getElementById('register-section'),
            characterName: document.getElementById('character-name'),
            characterNameInput: document.getElementById('character-name-input'),
            loginBtn: document.getElementById('login-btn'),
            registerBtn: document.getElementById('register-btn'),
            deleteBtn: document.getElementById('delete-btn'),
            alchemyBtn: document.getElementById('alchemy-btn'),
            forgingBtn: document.getElementById('forging-btn'),
            talentBtn: document.getElementById('talent-btn'),
            skillLearnBtn: document.getElementById('skill-learn-btn'),
            petBtn: document.getElementById('pet-btn'),
            alchemyPanel: document.getElementById('alchemy-panel'),
            forgingPanel: document.getElementById('forging-panel'),
            talentPanel: document.getElementById('talent-panel'),
            skillLearnPanel: document.getElementById('skill-learn-panel'),
            petPanel: document.getElementById('pet-panel'),
            alchemyRecipes: document.getElementById('alchemy-recipes'),
            forgingRecipes: document.getElementById('forging-recipes'),
            talentChain: document.getElementById('talent-chain'),
            alchemyBack: document.getElementById('alchemy-back'),
            forgingBack: document.getElementById('forging-back'),
            talentBack: document.getElementById('talent-back'),
            skillLearnBack: document.getElementById('skill-learn-back'),
            petBack: document.getElementById('pet-back'),
            workshopBack: document.getElementById('workshop-back'),
            workshopPanel: document.getElementById('workshop-panel'),
            challengeBtn: document.getElementById('challenge-btn'),
            fatigueDisplay: document.getElementById('fatigue-display'),
            exitBattleBtn: document.getElementById('exit-battle-btn'),
            exitConfirmModal: document.getElementById('exit-confirm-modal'),
            exitConfirmBtn: document.getElementById('exit-confirm-btn'),
            exitCancelBtn: document.getElementById('exit-cancel-btn'),
            battleLog: document.getElementById('battle-log'),
            saveRecoverModal: document.getElementById('save-recover-modal'),
            recoverErrorMessage: document.getElementById('recover-error-message'),
            recoverFromBackupBtn: document.getElementById('recover-from-backup-btn'),
            newGameBtn: document.getElementById('new-game-btn')
        };
        
        this.bindMainMenuEvents();
        this.bindSaveRecoverEvents();
        this.bindExitBattleEvents();
    }
    
    /**
     * 绑定主菜单事件监听器
     */
    bindMainMenuEvents() {
        //切换悬浮菜单选项
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchTab(btn.dataset.tab);
            });
        });
        
        //角色页面子标签切换
        document.querySelectorAll('.char-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchCharTab(btn.dataset.tab);
            });
        });
        
        //仓库页面的筛选按钮
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.setInventoryFilter(filter);
            });
        });        
        //挑战按钮点击事件
        if (this.elements.challengeBtn) {
            this.elements.challengeBtn.addEventListener('click', () => {
                this.onChallengeBtnClick();
            });
        }
        
        //商店物品点击事件
        document.querySelectorAll('.shop-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const shopItem = e.currentTarget;
                const itemType = shopItem.dataset.item;
                const price = parseInt(shopItem.dataset.price);
                if (itemType && price) {
                    this.openBuyModal(itemType, price);
                }
            });
        });

        //购买数量滑块事件监听器
        const slider = document.getElementById('buy-quantity-slider');
        if (slider) {
            slider.addEventListener('input', (e) => {
                this.syncQuantity(parseInt(e.target.value));
            });
        }
    
        //删除存档按钮点击事件
        if (this.elements.deleteBtn) {
            this.elements.deleteBtn.addEventListener('click', () => {
                if (confirm('确定删除存档？')) {
                    dataMgr.deleteLocal();
                    location.reload();
                }
            });
        }
        
        //副本战败弹窗的 重新开始 按钮
        if (this.elements.restartBtn) {
            this.elements.restartBtn.addEventListener('click', () => {
                //dataMgr.updatePlayerData(window.game);
                //此处需要更新玩家数据
                console.warn('战败弹窗重新开始');
                this.hideGameOver();
                window.game.startGame();//副本战败弹窗的 重新开始
            });
        }
        
        //副本战败弹窗的 返回主页 按钮
        if (this.elements.toMenuBtn) {
            this.elements.toMenuBtn.addEventListener('click', () => {
                //dataMgr.updatePlayerData(window.game);
                //此处需要更新玩家数据
                console.warn('战败弹窗返回主页');
                this.hideGameOver();
                this.showMainMenu();
            });
        }
        
        //炼丹按钮点击事件
        if (this.elements.alchemyBtn) {
            this.elements.alchemyBtn.addEventListener('click', () => {
                this.showAlchemyPanel();
            });
        }
        
        //炼器按钮点击事件
        if (this.elements.forgingBtn) {
            this.elements.forgingBtn.addEventListener('click', () => {
                this.showForgingPanel();
            });
        }
        
        //天赋按钮点击事件
        if (this.elements.talentBtn) {
            this.elements.talentBtn.addEventListener('click', () => {
                this.showTalentPanel();
            });
        }
        
        //技能学习按钮点击事件
        if (this.elements.skillLearnBtn) {
            this.elements.skillLearnBtn.addEventListener('click', () => {
                this.showSkillLearnPanel();
            });
        }
        
        // 宠物按钮点击事件
        if (this.elements.petBtn) {
            this.elements.petBtn.addEventListener('click', () => {
                this.showPetPanel();
            });
        }
        
        // 返回按钮点击事件
        if (this.elements.alchemyBack) {
            this.elements.alchemyBack.addEventListener('click', () => {
                this.hideAlchemyPanel();
            });
        }
        
        // 炼器按钮返回事件
        if (this.elements.forgingBack) {
            this.elements.forgingBack.addEventListener('click', () => {
                this.hideForgingPanel();
            });
        }
        
        // 工作坊返回按钮点击事件
        if (this.elements.workshopBack) {
            this.elements.workshopBack.addEventListener('click', () => {
                this.hideWorkshopPanel();
            });
        }
        
        //天赋面板返回按钮点击事件
        if (this.elements.talentBack) {
            this.elements.talentBack.addEventListener('click', () => {
                this.hideTalentPanel();
            });
        }
        
        // 技能学习返回按钮点击事件
        const skillLearnBack = document.getElementById('skill-learn-back');
        if (skillLearnBack) {
            skillLearnBack.addEventListener('click', () => {
                this.hideSkillLearnPanel();
            });
        }
        
        // 宠物返回按钮点击事件
        const petBack = document.getElementById('pet-back');
        if (petBack) {
            petBack.addEventListener('click', () => {
                this.hidePetPanel();
            });
        }
    }
    // 绑定保存恢复按钮点击事件
    bindSaveRecoverEvents() {
        if (this.elements.recoverFromBackupBtn) {
            this.elements.recoverFromBackupBtn.addEventListener('click', () => {
                this.recoverFromBackup();
            });
        }
        
        if (this.elements.newGameBtn) {
            this.elements.newGameBtn.addEventListener('click', () => {
                this.startNewGame();
            });
        }
    }
    // 显示保存恢复弹窗
    showSaveRecoverModal(errorMessage) {
        if (this.elements.recoverErrorMessage) {
            this.elements.recoverErrorMessage.textContent = errorMessage || '存档数据损坏或版本不兼容';
        }
        if (this.elements.saveRecoverModal) {
            this.elements.saveRecoverModal.classList.remove('hidden');
        }
    }
    // 隐藏保存恢复弹窗
    hideSaveRecoverModal() {
        if (this.elements.saveRecoverModal) {
            this.elements.saveRecoverModal.classList.add('hidden');
        }
    }
    // 恢复备份数据
    recoverFromBackup() {
        const backupData = dataMgr.loadBackup();
        if (backupData) {
            dataMgr.saveData = backupData;
            dataMgr.saveLocal();
            this.hideSaveRecoverModal();
            location.reload();
        } else {
            alert('备份数据不存在，无法恢复');
            this.startNewGame();
        }
    }
    // 开始新一轮游戏
    startNewGame() {
        dataMgr.deleteLocal();
        this.hideSaveRecoverModal();
        location.reload();
    }
    // 绑定退出战斗按钮点击事件
    bindExitBattleEvents() {
        if (this.elements.exitBattleBtn) {
            this.elements.exitBattleBtn.addEventListener('click', () => {
                this.showExitConfirmModal();
            });
        }
        
        if (this.elements.exitConfirmBtn) {
            this.elements.exitConfirmBtn.addEventListener('click', () => {
                this.confirmExitBattle();
            });
        }
        
        if (this.elements.exitCancelBtn) {
            this.elements.exitCancelBtn.addEventListener('click', () => {
                this.hideExitConfirmModal();
            });
        }
    }
    // 显示退出战斗确认弹窗
    showExitConfirmModal() {
        if (this.elements.exitConfirmModal) {
            this.elements.exitConfirmModal.classList.remove('hidden');
            this.state = GameState.PAUSED;
        }
    }
    // 隐藏退出战斗确认弹窗
    hideExitConfirmModal() {
        if (this.elements.exitConfirmModal) {
            this.elements.exitConfirmModal.classList.add('hidden');
            this.state = GameState.PLAYING;
        }
    }
    // 确认退出战斗
    confirmExitBattle() {
        this.hideExitConfirmModal();
        if (window.game) {
            window.game.exitBattle();
        }
        this.state = GameState.PLAYING;
    }
    
    /**
     * 添加战斗日志
     * @param {string} text - 日志内容
     * @param {string} type - 日志类型: 'level' | 'skill' | 'damage'
     */
    addBattleLog(text, type = '') {
        if (!this.elements.battleLog) return;
        
        // 显示日志区
        this.elements.battleLog.classList.remove('hidden');
        
        const logItem = document.createElement('div');
        logItem.className = 'log-item' + (type ? ' log-' + type : '');
        logItem.textContent = text;
        this.elements.battleLog.appendChild(logItem);
        
        // 限制最多显示 20 条日志
        while (this.elements.battleLog.children.length > 20) {
            this.elements.battleLog.removeChild(this.elements.battleLog.firstChild);
        }
        
        // 自动滚动到底部
        this.elements.battleLog.scrollTop = this.elements.battleLog.scrollHeight;
    }
    
    /**
     * 清空战斗日志
     */
    clearBattleLog() {
        if (this.elements.battleLog) {
            this.elements.battleLog.innerHTML = '';
            // 清空时隐藏日志区
            this.elements.battleLog.classList.add('hidden');
        }
    }
    
    /**
     * 在角色头顶显示飘字
     * @param {string} text - 显示文本
     * @param {number} x - 角色X坐标（游戏世界坐标）
     * @param {number} y - 角色Y坐标（游戏世界坐标）
     */
    showPlayerFloatingText(text, x, y) {
        const game = window.game;
        if (!game) return;
        
        const gameScreen = document.getElementById('game-screen');
        if (!gameScreen) return;
        
        const screenRect = gameScreen.getBoundingClientRect();
        
        // 将游戏世界坐标转换为画布像素坐标
        const scaleX = game.canvas.width / DEFINE.CANVAS_WIDTH;
        const scaleY = game.canvas.height / DEFINE.CANVAS_HEIGHT;
        const screenX = game.canvas.width / 2 + (x - game.player.x) * scaleX;
        const screenY = game.canvas.height / 2 + (y - game.player.y) * scaleY;
        
        // 将画布像素坐标转换为 game-screen 容器的 CSS 像素坐标
        const cssX = screenX * (screenRect.width / game.canvas.width);
        const cssY = screenY * (screenRect.height / game.canvas.height);
        
        const div = document.createElement('div');
        div.className = 'player-floating-text';
        div.textContent = text;
        div.style.left = cssX + 'px';
        div.style.top = cssY + 'px';
        
        gameScreen.appendChild(div);
        
        setTimeout(() => {
            if (div.parentNode) {
                div.parentNode.removeChild(div);
            }
        }, 1200);
    }
    
    /**
     * 显示炼丹面板
     */
    showAlchemyPanel() {
        // 清除槽位信息
        this.clearAlchemySlots();
        this.elements.alchemyPanel.classList.remove('hidden');
        this.updateAlchemyRecipes();
    }
    
    /**
     * 清除炼丹槽位信息
     */
    clearAlchemySlots() {
        // 清除材料槽位
        for (let i = 1; i <= 3; i++) {
            const slot = document.getElementById(`material-slot-${i}`);
            if (slot) {
                slot.innerHTML = '';
                slot.classList.remove('has-item');
            }
        }
        
        // 清除中和剂槽位
        const neutralizerSlot = document.getElementById('neutralizer-slot');
        if (neutralizerSlot) {
            neutralizerSlot.innerHTML = '';
            neutralizerSlot.classList.remove('has-item');
        }
        
        // 清除保底符槽位
        const talismanSlot = document.getElementById('talisman-slot');
        if (talismanSlot) {
            talismanSlot.innerHTML = '';
            talismanSlot.classList.remove('has-item');
        }
    }
    
    /**
     * 隐藏炼丹面板
     */
    hideAlchemyPanel() {
        this.elements.alchemyPanel.classList.add('hidden');
    }
    
    /**
     * 显示炼器面板
     */
    showForgingPanel() {
        console.log('炼器页面开始执行');
        // 清除槽位信息
        window.game.clearForgingSlots();
        this.elements.forgingPanel.classList.remove('hidden');
        window.game.initForgingPanel();
    }
    
    /**
     * 隐藏炼器面板
     */
    hideForgingPanel() {
        this.elements.forgingPanel.classList.add('hidden');
    }
    
    /**
     * 显示工坊面板
     */
    showWorkshopPanel(equilData) {
        this.elements.workshopPanel.classList.remove('hidden');
        console.warn('显示工坊面板equilData',equilData,window.game);
        // 初始化工坊面板
        if (window.game) {
            window.game.initWorkshopPanel(equilData);
        }
    }
    
    /**
     * 隐藏工坊面板
     */
    hideWorkshopPanel() {
        this.elements.workshopPanel.classList.add('hidden');
    }
    
    /**
     * 显示天赋面板
     */
    showTalentPanel() {
        this.switchTab('character');
        this.switchCharTab('talent');
    }
    
    /**
     * 更新天赋点显示
     */
    updateTalentPointDisplay() {
        const countElement = document.getElementById('talent-point-count');
        if (!countElement) return;
        
        const roleData = dataMgr.getRoleData();
        const talentPoint = roleData ? (roleData.talentPoint || 0) : 0;
        countElement.textContent = talentPoint;
    }
    
    /**
     * 隐藏天赋面板
     */
    hideTalentPanel() {
        this.elements.talentPanel.classList.add('hidden');
    }
    
    /**
     * 显示技能学习面板
     */
    showSkillLearnPanel() {
        document.getElementById('skill-learn-panel').classList.remove('hidden');
        this.updateSkillLearnPanel();
        this.updateSkillBookCount();
    }
    
    /**
     * 隐藏技能学习面板
     */
    hideSkillLearnPanel() {
        document.getElementById('skill-learn-panel').classList.add('hidden');
    }

    
    /**
     * 检查技能升级
     * @param {Object} skill - 技能对象
     */
    checkSkillLevelUp(skill) {
        // 获取最大等级，有max字段则使用max，否则默认10级
        const maxLevel = skill.max || 10;
        let roleD = dataMgr.getRoleData();
        while (skill.exp >= skill.expToNext && skill.level < maxLevel) {
            skill.exp -= skill.expToNext;
            skill.level += 1;
            
            // 如果是生活技能，使用特殊的升级公式
            if (skill === roleD.lifeSkill) {
                // lifeSkill的升级公式：(当前等级-1) × (200-20×向下取整(highEyes/50)) + 100
                const highEyes = skill.highEyes || 0;
                const bonusTerm = Math.floor(highEyes / 50);
                const baseTerm = 200 - 20 * bonusTerm;
                skill.expToNext = (skill.level - 1) * baseTerm + 100;
            } else {
                // 其他技能使用原来的公式
                skill.expToNext = (skill.level - 1) * 50 + 100;
            }
            
            // 检查是否达到最大等级
            if (skill.level >= maxLevel) {
                skill.level = maxLevel;
                skill.exp = 0;
                skill.expToNext = 99999; // 设置一个很大的数防止继续升级
                break;
            }
            
            // 确定技能名称
            let skillName = '技能';
            if (skill === roleD.lifeSkill) {
                skillName = '生活技能';
            } else if (skill === roleD.cultivationSkill) {
                skillName = '灵植术';
            } else if (skill === roleD.alchemySkill) {
                skillName = '炼丹术';
            } else if (skill === roleD.forgingSkill) {
                skillName = '炼器术';
            }
            
            alert(`${skillName}升级！当前等级：Lv.${skill.level}`);
        }
    }
    
    /**
     * 显示宠物面板
     */
    showPetPanel() {
        this.switchTab('character');
        this.switchCharTab('pet');
    }
    
    /**
     * 隐藏宠物面板
     */
    hidePetPanel() {
        const petPanel = document.getElementById('pet-panel');
        if (petPanel) {
            petPanel.classList.add('hidden');
        }
    }
    
    /**
     * 更新技能书数量显示
     */
    updateSkillBookCount() {
        const countElement = document.getElementById('skill-book-count');
        if (!countElement) return;
        if (!dataMgr) {
            countElement.textContent = '0';
            return;
        }
        countElement.textContent = dataMgr.getItemCount('skill_book');
    }
    
    /**
     * 更新技能学习面板内容
     */
    updateSkillLearnPanel() {
        const skillLearnContent = document.getElementById('skill-learn-content');
        if (!skillLearnContent) return;
        
        const skills = dataMgr.getAllSkills();
        const roleData = dataMgr.getRoleData();
        const learnedSkills = roleData.skills || {};
        
        let html = '';
        
        for (let id in skills) {
            const skill = skills[id];
            const skillData = learnedSkills[id];
            const isLearned = skillData ? true : false;
            const skillLevel = skillData ? skillData.level : 0;
            const className = isLearned ? 'skill-learn-item learned' : 'skill-learn-item locked';
            const buttonAction = isLearned ? 'upgrade' : 'learn';
            const buttonText = isLearned ? '升级' : '学习';
            const buttonDisabled = isLearned ? (skillLevel >= skill.maxLevel) : false;
            
            html += `<div class="${className}" data-skill-id="${id}">`;
            
            // 技能名称和等级
            html += `<div class="skill-learn-header">`;
            html += `<h5 class="skill-learn-name">${skill.name}`;
            if (isLearned) {
                html += `<span class="skill-learn-level">Lv.${skillLevel}/${skill.maxLevel}</span>`;
            } else {
                html += `<span class="skill-learn-level">未学习</span>`;
            }
            html += `</h5>`;
            html += `<button class="skill-action-btn" data-skill-id="${id}" data-action="${buttonAction}" ${buttonDisabled ? 'disabled' : ''}>${buttonText}</button>`;
            html += `</div>`;
            
            // 技能描述
            html += `<p class="skill-desc">${skill.description}</p>`;
            
            // 伤害性技能添加伤害说明
            const damageInfo = this.getSkillDamageInfo(skill, skillLevel);
            if (damageInfo) {
                html += `<p class="skill-damage-info">${damageInfo}</p>`;
            }
            
            // 已学技能的其他信息
            if (isLearned) {
                if (skill.mpCost !== undefined && skill.mpCost > 0) {
                    html += `<p class="skill-mana-cost">法力消耗：${skill.mpCost}</p>`;
                }
                if (skill.cooldown !== undefined && skill.cooldown > 0) {
                    html += `<p class="skill-cooldown">冷却时间：${skill.cooldown}秒</p>`;
                }
            }
            
            html += `</div>`;
        }
        
        skillLearnContent.innerHTML = html;
        
        // 绑定按钮事件
        this.bindSkillActionEvents();
    }
    
    /**
     * 获取技能伤害信息
     * @param {skillModel} skill - 技能对象-配置表模板
     * @param {number} skillLevel - 技能等级（从roleData.skills获取）
     * @returns {string|null} 伤害信息字符串
     */
    getSkillDamageInfo(skill, skillLevel = 0) {
        if (skill.damage === undefined) return null;
        
        let damageText = '';
        let nextDamageText = '';
        
        // 未学习的技能只显示等级 1 时的伤害
        if (!skillLevel || skillLevel === 0) {
            skillLevel = 1;
            // switch (skill.id) {
            //     case 'flying_sword'://小飞剑
            //         damageText = `造成等于角色攻击力的伤害（1 级时），每级+5`;
            //         break;
                    
            //     case 'talisman'://符箓
            //         const baseTalismanDamage = DEFINE.TALISMAN.BASE_DAMAGE;
            //         damageText = `造成 ${baseTalismanDamage} 点伤害（1 级时）`;
            //         break;
                    
            //     case 'ultimate'://绝招
            //         const baseUltimateDamage = DEFINE.ULTIMATE.BASE_DAMAGE;
            //         damageText = `造成 ${baseUltimateDamage} 点伤害（1 级时）`;
            //         break;
                    
            //     case 'lei_guang_dun'://雷光盾
            //         const baseLeiGuangDamage = skill.damage;
            //         damageText = `造成 ${baseLeiGuangDamage} 点伤害（每秒，1 级时）`;
            //         break;
                    
            //     case 'wan_jian_jue'://万剑诀
            //         damageText = `造成 ${skill.damage} 点伤害（每把飞剑，1 级时）`;
            //         break;
                    
            //     case 'tian_huo_liu_xing'://天火流星
            //         damageText = `造成 ${skill.damage} 点伤害（初始）+ ${skill.burnDamage || 10} 点燃烧伤害（每秒，1 级时）`;
            //         break;
                    
            //     case 'long_juan_feng'://龙卷风
            //         damageText = `造成 ${skill.damage} 点伤害并击退（1 级时）`;
            //         break;
                    
            //     case 'yan_shuang_fei'://燕双飞
            //         damageText = `造成 ${skill.damage} 点伤害（1 级时）`;
            //         break;
                    
            //     case 'geng_jin_jian_zhen'://庚金剑阵
            //         damageText = `造成 ${skill.damage} 点伤害并附带麻痹效果（1 级时）`;
            //         break;
                    
            //     default:
            //         return null;
            // }
            // return `<span class="damage-highlight">${damageText}</span>`;
        }
        const bonus = dataMgr.getTotalBonus();
        let skillT = dataMgr.getSkillInfo(skill.id),curDmg = skillT.damage + (skillLevel - 1) * skillT.dmgUpPer;
        // 已学习的技能显示当前伤害和下一级伤害
        switch (skill.id) {
            case 'flying_sword'://小飞剑-自动攻击最近敌人(伤害取决于角色攻击属性)
                curDmg = (bonus.attack || skillT.damage) + (skillLevel - 1) * skillT.dmgUpPer;
                damageText = `造成 ${curDmg} 点浮动伤害`;
                nextDamageText = `下一级：${curDmg + skillT.dmgUpPer} 点浮动伤害`;
                break;
            case 'talisman'://符稿-直线攻击路径上的敌人
                damageText = `造成 ${curDmg} 点固定伤害`;
                nextDamageText = `下一级：${curDmg + skillT.dmgUpPer} 点固定伤害`;
                break;
            case 'ultimate'://绝招-消耗爆气丸释放强力范围伤害
                damageText = `造成 ${curDmg} 点固定伤害`;
                nextDamageText = `下一级：${curDmg + skillT.dmgUpPer} 点固定伤害`;
                break;
            case 'lei_guang_dun'://雷光盾-反击造成伤害（每秒）(伤害取决于角色攻击属性)
                curDmg = (bonus.attack || skillT.damage) + (skillLevel - 1) * skillT.dmgUpPer;
                damageText = `反击造成 ${curDmg} 点浮动伤害（每秒）`;
                nextDamageText = `下一级：${curDmg + skillT.dmgUpPer} 点浮动伤害（每秒）`;
                break;
            case 'wan_jian_jue'://万剑诀-每把飞剑造成伤害（每秒）
                damageText = `造成 ${curDmg} 点固定伤害（每把飞剑）`;
                nextDamageText = `下一级：${curDmg + skillT.dmgUpPer} 点固定伤害（每把飞剑）`;
                break;
            case 'tian_huo_liu_xing'://天火流星-造成伤害（初始）+ 点燃烧伤害（每秒）
                damageText = `造成 ${curDmg} 点固定伤害+ ${DEFINE.TIAN_HUO_LIU_XING.BURN_DAMAGE} 点燃烧伤害（每秒）`;
                nextDamageText = `下一级：${curDmg + skillT.dmgUpPer} 点固定伤害+ ${DEFINE.TIAN_HUO_LIU_XING.BURN_DAMAGE} 点燃烧伤害（每秒）`;
                break;
            case 'long_juan_feng'://龙卷风-造成伤害并击退
                damageText = `造成 ${curDmg} 点固定伤害并击退`;
                nextDamageText = `下一级：${curDmg + skillT.dmgUpPer} 点固定伤害并击退`;
                break;
            case 'yan_shuang_fei'://燕双飞-造成伤害（每秒）
                damageText = `造成 ${curDmg} 点固定伤害`;
                nextDamageText = `下一级：${curDmg + skillT.dmgUpPer} 点固定伤害`;
                break;
            case 'geng_jin_jian_zhen'://庚金剑阵-造成伤害并附带麻痹效果
                damageText = `造成 ${curDmg} 点固定伤害并附带麻痹效果`;
                nextDamageText = `下一级：${curDmg + skillT.dmgUpPer} 点固定伤害并附带麻痹效果`;
                break;
            default:
                return null;
        }
        if(skillLevel >= skillT.maxLevel){
            nextDamageText = '技能等级已至最高了';
        }
        let result = `<span class="damage-highlight">${damageText}</span>`;
        if (nextDamageText && skillLevel < skillT.maxLevel) {
            result += ` | <span class="next-level-info">${nextDamageText}</span>`;
        }
        
        return result;
    }
    
    /**
     * 计算下一级绝招伤害
     * @param {number} level - 等级
     * @returns {number} 伤害值
     */
    calculateNextUltimateDamage(level) {
        const baseDamage = DEFINE.ULTIMATE.BASE_DAMAGE;
        const oddLevelBonus = Math.floor(level / 2) * DEFINE.ULTIMATE.DAMAGE_SCALE;
        return baseDamage * (1 + oddLevelBonus);
    }
    
    /**
     * 绑定技能操作按钮事件
     */
    bindSkillActionEvents() {
        const buttons = document.querySelectorAll('.skill-action-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const skillId = e.target.dataset.skillId;
                const action = e.target.dataset.action;
                
                if (action === 'learn') {
                    this.learnSkill(skillId);
                } else if (action === 'upgrade') {
                    this.upgradeSkill(skillId);
                }
            });
        });
    }
    
    /**
     * 学习技能
     * @param {string} skillId - 技能 ID
     */
    learnSkill(skillId) {
        const game = window.game;
        if (!game || !dataMgr) {
            this.showTipText('游戏未初始化');
            return;
        }
        
        const skill = dataMgr.getSkillInfo(skillId);
        if (!skill) {
            this.showTipText('技能不存在');
            return;
        }
        
        const roleData = dataMgr.getRoleData();
        if(!roleData){
            this.showTipText('角色数据不存在');
            return;
        }
        if (!roleData.skills) {
            roleData.skills = {};
        }
        // 从roleData.skills检查技能是否已学习
        if (roleData.skills[skillId]) {
            this.showTipText('该技能已学习');
            return;
        }
        
        // 检查是否有技能书
        const skillBookCount = dataMgr.getItemCount('skill_book');
        
        if (skillBookCount < 1) {
            this.showTipText('技能书不足，需要 1 本技能书');
            return;
        }
        
        // 消耗一本技能书
        dataMgr.costProp('skill_book', 1);
        
        // 更新角色数据中的skills字段
        roleData.skills[skillId] = { level: 1, beActive:false };
        dataMgr.saveLocal();
        
        this.showTipText(`恭喜！学会了 ${skill.name}！`);
        
        // 更新 UI
        this.updateSkillLearnPanel();
        this.updateSkillBookCount();
        this.updateCharacterInfo();
    }
    
    /**
     * 升级技能
     * @param {string} skillId - 技能 ID
     */
    upgradeSkill(skillId) {
        const skill = dataMgr.getSkillInfo(skillId);
        if (!skill) {
            this.showTipText('技能不存在');
            return;
        }
        
        const roleData = dataMgr.getRoleData();
        const skillData = roleData.skills && roleData.skills[skillId];
        
        if (!skillData) {
            this.showTipText('该技能未学习');
            return;
        }
        
        const currentLevel = skillData.level;
        if (currentLevel >= skill.maxLevel) {
            this.showTipText('该技能已达到满级');
            return;
        }
        
        // 检查是否有技能书
        const game = window.game;
        if (!game || !dataMgr) {
            this.showTipText('游戏未初始化');
            return;
        }
        
        const skillBookCount = dataMgr.getItemCount('skill_book');
        
        const requiredBooks = currentLevel + 1; // 升级需要的技能书数量 = 当前等级 + 1
        if (skillBookCount < requiredBooks) {
            this.showTipText(`技能书不足，需要 ${requiredBooks} 本技能书`);
            return;
        }
        
        // 消耗技能书
        dataMgr.costProp('skill_book', requiredBooks);
        
        // 更新角色数据中的skills字段
        if (roleData) {
            roleData.skills[skillId].level = currentLevel + 1;
            dataMgr.saveLocal();
        }
        
        this.showTipText(`${skill.name} 升级到 Lv.${currentLevel + 1}！`);
        
        // 更新 UI
        this.updateSkillLearnPanel();
        this.updateSkillBookCount();
        this.updateCharacterInfo();
    }
    
    /**
     * 打开购买弹窗
     * @param {string} item - 物品类型
     * @param {number} price - 价格
     */
    openBuyModal(item, price) {
        const modal = document.getElementById('shop-buy-modal');
        if (!modal) return;
        
        // 设置当前选择的商品
        this.currentBuyItem = { item, price };
        
        // 获取商品信息
        const itemInfo = dataMgr.getPropInTable(item);
        const itemName = itemInfo ? itemInfo.name : item;
        
        // 更新弹窗中的商品信息
        const nameElement = document.getElementById('buy-item-name');
        const priceElement = document.getElementById('buy-item-price');
        if (nameElement) nameElement.textContent = itemName;
        if (priceElement) priceElement.textContent = `💰 ${price}`;
        
        // 重置数量为 1
        const quantityInput = document.getElementById('buy-quantity');
        const slider = document.getElementById('buy-quantity-slider');
        if (quantityInput) quantityInput.value = 1;
        if (slider) slider.value = 1;
        
        // 更新总价和金币显示
        this.updateTotalPrice();
        
        // 显示弹窗
        modal.classList.remove('hidden');
        
        // 绑定关闭事件
        const closeBtn = modal.querySelector('.modal-close');
        const cancelBtn = modal.querySelector('.cancel-btn');
        if (closeBtn) {
            closeBtn.onclick = () => modal.classList.add('hidden');
        }
        if (cancelBtn) {
            cancelBtn.onclick = () => modal.classList.add('hidden');
        }
    }
    
    /**
     * 调整购买数量
     * @param {number} delta - 变化量（+1 或 -1）
     */
    adjustQuantity(delta) {
        const quantityInput = document.getElementById('buy-quantity');
        const slider = document.getElementById('buy-quantity-slider');
        if (!quantityInput || !slider) return;
        
        let value = parseInt(quantityInput.value) + delta;
        value = Math.max(1, Math.min(99, value));
        
        quantityInput.value = value;
        slider.value = value;
        
        this.updateTotalPrice();
    }
    
    /**
     * 同步滑块和输入框的数量
     * @param {number} value - 数量值
     */
    syncQuantity(value) {
        const quantityInput = document.getElementById('buy-quantity');
        const slider = document.getElementById('buy-quantity-slider');
        if (!quantityInput || !slider) return;
        
        quantityInput.value = value;
        slider.value = value;
        
        this.updateTotalPrice();
    }
    
    /**
     * 更新总价显示
     */
    updateTotalPrice() {
        const quantityInput = document.getElementById('buy-quantity');
        const totalPriceElement = document.getElementById('buy-total-price');
        const playerGoldElement = document.getElementById('buy-player-gold');
        
        if (!quantityInput || !totalPriceElement || !playerGoldElement) return;
        
        const quantity = parseInt(quantityInput.value);
        const unitPrice = this.currentBuyItem.price;
        const totalPrice = unitPrice * quantity;
        
        // 获取玩家金币
        const playerData = dataMgr.getRoleData();
        const playerGold = playerData ? (playerData.gold || 0) : 0;
        
        // 更新显示
        totalPriceElement.textContent = `💰 ${totalPrice}`;
        playerGoldElement.textContent = `💰 ${playerGold}`;
        
        // 根据金币是否足够设置颜色
        if (playerGold >= totalPrice) {
            totalPriceElement.className = 'total-price affordable';
        } else {
            totalPriceElement.className = 'total-price unaffordable';
        }
    }
    
    /**
     * 确认购买
     */
    confirmBuy() {
        const game = window.game;
        if (!game) {
            alert('游戏未初始化');
            return;
        }
        
        // 从角色数据中获取金币
        const playerData = dataMgr.getRoleData();
        if (!playerData) {
            alert('角色数据不存在');
            return;
        }
        
        const quantityInput = document.getElementById('buy-quantity');
        if (!quantityInput) return;
        
        const quantity = parseInt(quantityInput.value);
        const { item, price } = this.currentBuyItem;
        const totalPrice = price * quantity;
        
        console.log(`购买商品: item=${item}, price=${price}, quantity=${quantity}, totalPrice=${totalPrice}`);
        
        let gold = playerData.gold || 0;
        
        if (gold < totalPrice) {
            alert('金币不足！');
            return;
        }
        
        // 扣除金币
        gold -= totalPrice;
        playerData.gold = gold;
        dataMgr.saveLocal();
        
        console.log(`购买前仓库物品数量: ${dataMgr.saveData.inventory.length}`);
        
        // 添加物品到仓库
        switch (item) {
            case 'skill_book':
                dataMgr.addMaterial('skillBook', 'skill_book', quantity);
                alert(`购买成功！获得技能书 x${quantity}`);
                break;
            case 'qingling_water':
                dataMgr.addMaterial('alchemy', 'qingling_water', quantity);
                alert(`购买成功！获得轻灵水 x${quantity}（炼丹材料）`);
                break;
            case 'quartz_sand':
                dataMgr.addMaterial('forge', 'quartz_sand', quantity);
                alert(`购买成功！获得石英砂 x${quantity}`);
                break;
            case 'laojun_dew':
                dataMgr.addMaterial('alchemy', 'laojun_dew', quantity);
                alert(`购买成功！获得老君仙露 x${quantity}（炼丹保底符）`);
                break;
            case 'stone_fire':
                dataMgr.addMaterial('forge', 'stone_fire', quantity);
                alert(`购买成功！获得石中火 x${quantity}（炼器保底符）`);
                break;
            case 'potion_health':
                dataMgr.addMaterial('dan', 'potion_health', quantity);
                alert(`购买成功！获得气血丹 x${quantity}`);
                break;
            case 'potion_mana':
                dataMgr.addMaterial('dan', 'potion_mana', quantity);
                alert(`购买成功！获得法力丹 x${quantity}`);
                break;
            case 'treasure_mirror':
                // 读取配置中的初始使用次数
                const treasureMirrorConfig = dataMgr.getPropInTable('treasure_mirror');
                const initialUseTimes = treasureMirrorConfig && treasureMirrorConfig.useTimes ? treasureMirrorConfig.useTimes : 100;
                
                // 添加百宝鉴，记录使用次数
                dataMgr.addProp({
                    type:'tool',
                    id: 'treasure_mirror',
                    useTimes: initialUseTimes,
                    count:quantity
                });
                alert(`购买成功！获得百宝鉴 x${quantity}（可查看材料隐藏属性，每次使用减少1点耐久度）`);
                break;
            case 'recipe_health':
                dataMgr.addMaterial('recipe', 'recipe_health', quantity);
                alert(`购买成功！获得气血丹方 x${quantity}`);
                break;
            case 'recipe_mana':
                dataMgr.addMaterial('recipe', 'recipe_mana', quantity);
                alert(`购买成功！获得法力丹方 x${quantity}`);
                break;
            case 'recipe_strength':
                dataMgr.addMaterial('recipe', 'recipe_strength', quantity);
                alert(`购买成功！获得力量丹方 x${quantity}`);
                break;
            case 'recipe_defense':
                dataMgr.addMaterial('recipe', 'recipe_defense', quantity);
                alert(`购买成功！获得防御丹方 x${quantity}`);
                break;
            case 'recipe_speed':
                dataMgr.addMaterial('recipe', 'recipe_speed', quantity);
                alert(`购买成功！获得速度丹方 x${quantity}`);
                break;
            case 'recipe_critical':
                dataMgr.addMaterial('recipe', 'recipe_critical', quantity);
                alert(`购买成功！获得暴击丹方 x${quantity}`);
                break;
            case 'recipe_evasion':
                dataMgr.addMaterial('recipe', 'recipe_evasion', quantity);
                alert(`购买成功！获得闪避丹方 x${quantity}`);
                break;
            case 'recipe_regen':
                dataMgr.addMaterial('recipe', 'recipe_regen', quantity);
                alert(`购买成功！获得回复丹方 x${quantity}`);
                break;
            case 'recipe_attack':
                dataMgr.addMaterial('recipe', 'recipe_attack', quantity);
                alert(`购买成功！获得攻击丹方 x${quantity}`);
                break;
            case 'recipe_magic':
                dataMgr.addMaterial('recipe', 'recipe_magic', quantity);
                alert(`购买成功！获得魔法丹方 x${quantity}`);
                break;
        }
        
        console.log(`购买后仓库物品数量: ${dataMgr.saveData.inventory.length}`);
        console.log(`购买后仓库物品:`, dataMgr.saveData.inventory.map(i => `${i.type}:${i.id}`));
        
        // 关闭弹窗
        const modal = document.getElementById('shop-buy-modal');
        if (modal) modal.classList.add('hidden');
        
        // 更新 UI
        this.updateGoldDisplay();
        this.updateSkillBookCount();
        this.updateCharacterInfo();
        this.updateInventoryList('all');
    }
    
    /**
     * 购买物品（旧方法，保留兼容性）
     * @param {string} item - 物品类型
     * @param {number} price - 价格
     */
    buyItem(item, price) {
        this.openBuyModal(item, price);
    }
    openPropDetailPop(type, materialId, count) {
        this.openMaterialDetailModal(type, materialId, count);
    }
    /**
     * 打开材料详情弹窗
     * @param {string} type - 材料类型（alchemy/forge）
     * @param {string} materialId - 材料 ID
     * @param {number} count - 材料数量
     */
    openMaterialDetailModal(type, materialId, count) {
        const modal = document.getElementById('prop-detail-modal');
        if (!modal) return;
        
        // 保存当前材料信息
        this.currentMaterial = { type, materialId, count };
        
        // 获取材料名称和配置表ID
        let configId = materialId;
        let materialName = materialId;
        let qualityColor = '#ffffff';// 获取道具品质颜色
        
        if (type === 'equipment') {
            // 装备：从仓库中找到该装备，用oid获取配置表信息
            const allItems = dataMgr.getAllProps();
            const equipmentItem = allItems.find(i => i.id === materialId && i.type === 'equipment');
            if (equipmentItem && equipmentItem.oid) {
                configId = equipmentItem.oid;
                materialName = dataMgr.getPropName(configId);
            }
            qualityColor = DEFINE.QUALITY_COLORS[equipmentItem.quality] || '#ffffff';
        } else {
            materialName = dataMgr.getPropName(materialId);
            qualityColor = this.getItemQualityColor({ type, id:materialId });
        }
        
        //console.log('获取材料名称:', materialName);
        // 获取道具信息（从配置表获取）
        const itemInfo = dataMgr.getPropInTable(configId);
        
        // 更新弹窗中的材料信息
        const nameElement = document.getElementById('prop-name');
        const countElement = document.getElementById('prop-count');
        const simpleIntro = document.getElementById('prop-simple-intro');
        const hiddenProps = document.getElementById('prop-hidden-props');
        
        if (nameElement) {
            nameElement.textContent = materialName;
            nameElement.style.color = qualityColor;
        }
        if (countElement) countElement.textContent = `数量：${type == 'equipment'?1:count}`;
        
        // 清空隐藏属性内容，防止残留
        let fiveElementsInfo = document.getElementById('five-elements-info');
        if (fiveElementsInfo) {
            fiveElementsInfo.innerHTML = '';
        }
        let yinYangInfo = document.getElementById('yin-yang-info');
        if (yinYangInfo) {
            yinYangInfo.innerHTML = '';
        }
        
        // 默认隐藏隐藏属性块
        if (hiddenProps) hiddenProps.classList.add('hidden');
        
        // 检查是否有百宝鉴
        let treasureMirrorItem = dataMgr ? dataMgr.getPropInBagByID('treasure_mirror') : null;
        let hasTreasureMirror = treasureMirrorItem && treasureMirrorItem.useTimes > 0;
        console.log('dataMgr:', dataMgr,treasureMirrorItem);
        let equipmentItem = null;
        let introText = document.querySelector('.prop-intro-text');
        
        // 根据不同类型处理显示逻辑
        if (type === 'equipment') {//装备
            // 装备：显示装备详情，包括装备属性
            if (hiddenProps) hiddenProps.classList.remove('hidden');
            
            // 隐藏分割线（装备不显示阴阳属性）
            const divider = hiddenProps ? hiddenProps.querySelector('.attribute-divider') : null;
            if (divider) divider.style.display = 'none';
            
            // 显示装备描述文本
            if (simpleIntro) simpleIntro.classList.remove('hidden');
            const introText = document.querySelector('.prop-intro-text');
            if (introText && itemInfo && itemInfo.description) {
                introText.textContent = itemInfo.description;
            } else if (introText) {
                introText.textContent = `${materialName}的详细描述。`;
            }

            // 优先使用装备自身的属性，如果没有则从配置表获取
            let equipmentAtt = null;
            equipmentItem = dataMgr.getPropInBagByID(materialId);
            console.warn('----equipmentItem:', equipmentItem,',materialId：',materialId);
            if (equipmentItem && equipmentItem.att) {
                equipmentAtt = equipmentItem.att;
            }

            // 从配置表获取装备信息（用于名称等基本信息）
            //const equipment = dataMgr.getEquipInTable(materialId);
            const equipment = dataMgr.getPropInBagByID(materialId);

            // 显示装备属性（五行）
            const fiveElementsInfo = document.getElementById('five-elements-info');
            if (fiveElementsInfo) {
                let html = '<h6 style="color:#fff;font-size:13px;margin:0 0 8px 0;">装备属性：</h6>';
                if (equipmentAtt.length > 0) {
                    for (const attr of equipmentAtt) {
                        console.log('attr:', attr.key,attr.value);
                        const attrName = this.getAttributeDisplayName(attr.key);
                        html += `<div class="element-item">
                            <span class="element-name">${attrName}</span>
                            <span class="element-ratio">+${attr.value}</span>
                        </div>`;
                    }
                } else {
                    html += `<div class="element-item">
                        <span class="element-name">无属性</span>
                        <span class="element-ratio">-</span>
                    </div>`;
                }
                fiveElementsInfo.innerHTML = html;
            }

            // 隐藏阴阳属性部分（装备不显示阴阳）
            const yinYangInfo = document.getElementById('yin-yang-info');
            if (yinYangInfo) {
                yinYangInfo.innerHTML = '';
            }
        }else if (type === 'alchemy') {//炼丹材料
            // 始终显示描述文本
            if (simpleIntro) simpleIntro.classList.remove('hidden');
            if (introText && itemInfo && itemInfo.description) {
                introText.textContent = itemInfo.description;
            } else if (introText) {
                introText.textContent = `${materialName}是一种炼丹材料，可用于炼制丹药。`;
            }
            console.log('hasTreasureMirror:', hasTreasureMirror,treasureMirrorItem);
            // 如果有百宝鉴，同时显示隐藏属性
            if (hasTreasureMirror) {
                if (hiddenProps) hiddenProps.classList.remove('hidden');
                // 使用百宝鉴，减少useTimes
                if (treasureMirrorItem) {
                    treasureMirrorItem.useTimes--;
                    if (treasureMirrorItem.useTimes <= 0) {
                        dataMgr.costProp('treasure_mirror', 1);
                        alert('百宝鉴已耗尽');
                    }
                    dataMgr.saveLocal();
                }
                
                // 显示五行属性
                const fiveElementsInfo = document.getElementById('five-elements-info');
                if (fiveElementsInfo && itemInfo && itemInfo.att) {
                    let html = '<h6 style="color:#fff;font-size:13px;margin:0 0 8px 0;">五行属性：</h6>';
                    let hasFiveElement = false;
                    for (const elem of itemInfo.att) {
                        if (elem.ele >= 1 && elem.ele <= 5) {
                            const elemName = DEFINE.ELEMENTS[elem.ele];
                            const elemColor = DEFINE.ELEMENT_COLORS[elemName] || '#fff';
                            html += `<div class="element-item">
                                <span class="element-name" style="color:${elemColor}">${elemName}</span>
                                <span class="element-ratio">${Math.round(elem.value * 100)}%</span>
                            </div>`;
                            hasFiveElement = true;
                        }
                    }
                    if (!hasFiveElement) {
                        html += '<p style="color:#666;text-align:center;">无五行属性</p>';
                    }
                    fiveElementsInfo.innerHTML = html;
                }
                
                // 显示阴阳属性
                const yinYangInfo = document.getElementById('yin-yang-info');
                if (yinYangInfo && itemInfo && itemInfo.att) {
                    let html = '<h6 style="color:#fff;font-size:13px;margin:0 0 8px 0;">阴阳属性：</h6>';
                    let hasYinYang = false;
                    for (const elem of itemInfo.att) {
                        if (elem.ele >= 6 && elem.ele <= 8) {
                            const elemName = DEFINE.ELEMENTS[elem.ele];
                            const elemColor = DEFINE.YINYANG_COLORS[elemName] || '#fff';
                            html += `<div class="element-item">
                                <span class="element-name" style="color:${elemColor}">${elemName}</span>
                                <span class="element-ratio">${Math.round(elem.value * 100)}%</span>
                            </div>`;
                            hasYinYang = true;
                        }
                    }
                    if (!hasYinYang) {
                        html += '<p style="color:#666;text-align:center;">无阴阳属性</p>';
                    }
                    yinYangInfo.innerHTML = html;
                }
            }
        } else if (type === 'forge') {//炼器材料
            // 矿材：显示描述
            if (simpleIntro) simpleIntro.classList.remove('hidden');
            if (introText && itemInfo && itemInfo.description) {
                introText.textContent = itemInfo.description;
            } else if (introText) {
                introText.textContent = `${materialName}是一种炼器材料，可用于锻造装备。`;
            }
        } else {//普通
            // 其他类型：显示普通详情（包括百宝鉴）
            if (simpleIntro) simpleIntro.classList.remove('hidden');
            if (introText) {
                let desc = '';
                if (itemInfo && itemInfo.description) {
                    desc = itemInfo.description;
                } else {
                    desc = `${materialName}的详细描述。`;
                }
                
                // 如果是百宝鉴，显示剩余次数
                if (materialId === 'treasure_mirror') {
                    const remainingTimes = treasureMirrorItem ? treasureMirrorItem.useTimes : 100;
                    desc += `\n当前剩余次数：${remainingTimes}次`;
                }
                
                introText.textContent = desc;
            }
        }
        
        // 设置售卖按钮文本
        // const sellBtn = document.getElementById('sell-material-btn');
        // if (sellBtn) {
        //     const sellPrice = this.getItemsByTypeellPrice(type, materialId);
        //     sellBtn.textContent = `售卖 (${sellPrice}金币/份)`;
        // }
        
        // 设置操作按钮
        const actionBtn = document.getElementById('craft-action-btn');
        const learnBtn = document.getElementById('learn-recipe-btn');
        
        
        // 隐藏所有特殊按钮
        if (learnBtn) learnBtn.classList.add('hidden');       
        if (actionBtn) {
            actionBtn.style.display = 'none';
            if (type === 'alchemy') {
                actionBtn.textContent = '炼丹';
                actionBtn.className = 'action-btn alchemy';
                actionBtn.style.display = 'block';
            } else if (type === 'forge') {
                actionBtn.textContent = '炼器';
                actionBtn.className = 'action-btn forging';
                actionBtn.style.display = 'block';
            } else if (type === 'dan') {
                actionBtn.textContent = '使用';
                actionBtn.className = 'action-btn use';
                actionBtn.style.display = 'block';
            } 
            // else if (type === 'equipment') {
            //     actionBtn.textContent = '强化';
            //     actionBtn.className = 'action-btn enhance';
            //     actionBtn.style.display = 'block';
            // } 
            else if (type === 'recipe') {
                // 丹方类型：显示学习按钮
                if (learnBtn) {
                    learnBtn.classList.remove('hidden');
                }
            }
        }
        
        // 显示弹窗
        modal.classList.remove('hidden');
        
        const workshopBtn = document.getElementById('workshop-btn');
        
        if (type === 'equipment') {
            actionBtn.classList.add('hidden');
            workshopBtn.classList.remove('hidden');
            workshopBtn.onclick = () => {
                // 道具已售罄，关闭道具详情弹窗
                this.closeMaterialDetailModal();
                // 显示工坊面板
                this.showWorkshopPanel(equipmentItem);
            }
        } else {
            workshopBtn.classList.add('hidden');
        }
    }
    
    /**
     * 关闭材料详情弹窗
     */
    closeMaterialDetailModal() {
        const modal = document.getElementById('prop-detail-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }
    
    /**
     * 道具详情弹窗-学习按钮：从弹窗中学习丹方
     */
    learnRecipeFromModal() {
        if (!this.currentMaterial || this.currentMaterial.type !== 'recipe') {
            return;
        }
        
        const { materialId } = this.currentMaterial;
        const recipeInfo = dataMgr.getPropInTable(materialId);
        
        if (!recipeInfo || !recipeInfo.dan) {
            alert('丹方信息无效');
            return;
        }
        
        // 调用dataMgr.learnRecipe学习丹方，传入dan字段的值
        dataMgr.learnRecipe(recipeInfo.dan);
        alert(`成功学习 ${recipeInfo.name}！`);
        dataMgr.costProp(materialId,1);
        this.updateInventoryList('normal');
        
        // 关闭弹窗
        this.closeMaterialDetailModal();
    }
    
    /**
     * 获取材料名称
     * @deprecated
     * @param {string} type - 材料类型
     * @param {string} materialId - 材料 ID
     * @returns {string} 材料名称
     */
    getMaterialName(type, materialId) {
        // 尝试从 DEFINE.ITEMS 中获取道具信息
        const item = dataMgr.getPropInTable(materialId);
        if (item && item.name) {
            return item.name;
        }
        
        // 兼容旧逻辑
        if (type === 'alchemy') {
            const mat = DEFINE.getAlchemyMaterial(materialId);
            return mat ? mat.name : materialId;
        } else if (type === 'forge') {
            const mat = DEFINE.getForgeMaterial(materialId);
            return mat ? mat.name : materialId;
        } else if (type === 'equipment') {
            const equip = dataMgr.getEquipInTable(materialId);
            return equip ? equip.name : materialId;
        }
        return materialId;
    }

    /**
     * 获取属性字段的显示名称
     * @param {string} key - 属性键名
     * @returns {string} 显示名称
     */
    getAttributeDisplayName(key) {
        const attrNames = {
            'maxHp': '气血',
            'maxMp': '法力',
            'attack': '攻击',
            'defense': '防御',
            'critRate': '暴击率',
            'critDamage': '暴伤率',
            'dodgeRate': '闪避率',
            'hpRegen': '回血',
            'mpRegen': '回蓝',
            'luck': '幸运值',
            'immune': '免疫',
            'damageReduction': '伤害减免'
        };
        return attrNames[key] || key;
    }
    
    /**
     * 格式化属性值，如果是百分比属性则加 % 符号
     * @param {string} key - 属性键名
     * @param {number} value - 属性值
     * @returns {string} 格式化后的属性值
     */
    formatAttributeValue(key, value) {
        if (DEFINE.PERCENT_ATTRIBUTES.includes(key)) {
            return value + '%';
        }
        return value;
    }

    /**
     * 获取材料售卖价格
     * @param {string} type - 材料类型
     * @param {string} materialId - 材料 ID
     * @returns {number} 售卖价格（金币）
     */
    getItemsByTypeellPrice(type, materialId) {
        // 基础价格为 5 金币
        return 5;
    }
    
    /**
     * 售卖材料
     */
    sellMaterial() {
        if (!this.currentMaterial) return;
        
        const { type, materialId, count } = this.currentMaterial;
        const sellPrice = this.getItemsByTypeellPrice(type, materialId);
        const totalGold = sellPrice * count;
        let propName = dataMgr.getPropName(materialId);
        if (confirm(`确定要售卖 ${count} 份 ${propName} 吗？\n可获得 ${totalGold} 金币`)) {
            if (!dataMgr) return;
            // 移除材料
            const item = dataMgr.getPropInBagByID(materialId);
            if (item && item.count >= count) {
                dataMgr.costProp(materialId,count);
            }else{
                console.error(`售卖失败，${propName} 不存在或数量不足`);
            }
            
            // 增加金币
            const playerData = dataMgr.getRoleData();
            if (playerData) {
                playerData.gold = (playerData.gold || 0) + totalGold;
                dataMgr.saveLocal();
                this.updateGoldDisplay();
            }
            
            // 关闭弹窗
            closeMaterialDetailModal();
            
            // 更新仓库列表
            this.updateInventoryList('all');
            
            alert(`售卖成功！获得 ${totalGold} 金币`);
        }
    }

    /**
     * 进行炼丹或炼器，或使用丹药，或强化装备
     */
    craftMaterial() {
        if (!this.currentMaterial) return;
        
        const { type, materialId } = this.currentMaterial;
        
        // 关闭弹窗
        closeMaterialDetailModal();
        
        // 跳转到相应页面或执行操作
        if (type === 'alchemy') {
            // 打开炼丹面板
            this.showAlchemyPanel();
        } else if (type === 'forge') {
            // 打开炼器面板
            this.showForgingPanel();
        } else if (type === 'dan') {
            // 使用丹药
            this.usePotion(materialId);
        } else if (type === 'equipment') {
            // 打开工坊面板
            this.showWorkshopPanel();
        }
    }
    
    /**
     * 使用丹药
     * @param {string} potionId - 丹药 ID
     */
    usePotion(potionId) {
        const game = window.game;
        if (!game || !dataMgr) return;
        
        // 获取丹药信息
        const potion = dataMgr.getPropInTable(potionId);
        if (!potion || !potion.att || !Array.isArray(potion.att)) return;
        
        // 移除一个丹药
        dataMgr.costProp(potionId,1);
        
        // 应用丹药属性加成
        const roleData = dataMgr.getRoleData();
        if (roleData) {
            for (const attr of potion.att) {
                if (roleData.attribute[attr.key] !== undefined) {
                    roleData.attribute[attr.key] += attr.value;
                } else if (attr.key === 'maxHp' && roleData.maxHp !== undefined) {
                    roleData.attribute.maxHp += attr.value;
                    roleData.attribute.hp += attr.value;
                } else if (attr.key === 'maxMp' && roleData.maxMp !== undefined) {
                    roleData.attribute.maxMp += attr.value;
                    roleData.attribute.mp += attr.value;
                }
            }
            
            // 保存数据
            dataMgr.saveLocal();
            //更新显示
            this.updateCharacterInfo();
            this.updateInventoryList('all');
            
            // 显示使用成功提示
            alert(`使用 ${potion.name} 成功！`);
        }
    }
    
    /**
     * 更新金币显示
     */
    updateGoldDisplay() {
        const goldElement = document.getElementById('player-gold');
        if (!goldElement) return;
        
        const playerData = dataMgr.getRoleData();
        const gold = playerData ? (playerData.gold || 0) : 0;
        goldElement.textContent = gold;
    }
    
    /**
     * 更新天赋链显示
     */
    renderTalentChain(container, refreshCallback) {
        if (!container) {
            console.error('天赋链容器不存在');
            return;
        }
        
        container.innerHTML = '';
        
        const totalRows = 20;
        const attrIconsPerRow = 3;
        
        const unlocks = [
            { row: 2, name: '回蓝', value: '+1/秒' },
            { row: 5, name: '暴击率', value: '+5%' },
            { row: 8, name: '闪避', value: '+5%' },
            { row: 11, name: '回血', value: '+3/秒' },
            { row: 14, name: '免疫', value: '+10%' },
            { row: 17, name: '宠物', value: '解锁' }
        ];
        
        let globalTalentIndex = 0;
        
        for (let row = 0; row < totalRows; row++) {
            const rowDiv = document.createElement('div');
            rowDiv.className = `talent-row`;
            
            for (let i = 0; i < attrIconsPerRow; i++) {
                const iconIndex = globalTalentIndex;
                const iconDiv = document.createElement('div');
                
                const attributeTypes = ['attack', 'defense', 'maxHp', 'maxMp'];
                const attrNames = ['攻', '防', '血', '法'];
                
                let actualIndex = iconIndex;
                if (row % 2 === 1) {
                    if (i === 0) {
                        actualIndex = iconIndex + 2;
                    } else if (i === 2) {
                        actualIndex = iconIndex - 2;
                    }
                }
                
                const attributeType = attributeTypes[actualIndex % attributeTypes.length];
                const attrName = attrNames[actualIndex % attrNames.length];
                
                const isUnlocked = dataMgr.isTalentUnlocked(actualIndex);
                
                iconDiv.className = `talent-icon ${attributeType} ${isUnlocked ? 'active' : 'locked'}`;
                iconDiv.dataset.index = actualIndex;
                iconDiv.dataset.attribute = attributeType;
                
                const iconContent = document.createElement('div');
                iconContent.className = 'talent-icon-content';
                
                const attrNameSpan = document.createElement('span');
                attrNameSpan.className = 'talent-attr-name';
                attrNameSpan.textContent = attrName;
                iconContent.appendChild(attrNameSpan);
                
                if (isUnlocked) {
                    const bonus = dataMgr.getTalentBonus(actualIndex);
                    const bonusSpan = document.createElement('span');
                    bonusSpan.className = 'talent-attr-value';
                    bonusSpan.textContent = `+${bonus}`;
                    iconContent.appendChild(bonusSpan);
                }
                
                iconDiv.appendChild(iconContent);
                
                iconDiv.addEventListener('click', () => {
                    this.handleTalentClick(actualIndex+1);
                });
                
                rowDiv.appendChild(iconDiv);
                
                globalTalentIndex++;
            }
            
            for (let i = 0; i < 2; i++) {
                const connector = document.createElement('div');
                connector.className = 'talent-connector horizontal';
                connector.style.left = `${50 + i * 70}px`;
                connector.style.width = '20px';
                rowDiv.appendChild(connector);
            }
            
            if (row < totalRows - 1) {
                const connector = document.createElement('div');
                connector.className = 'talent-connector vertical';
                if (row % 2 === 0) {
                    connector.style.left = '165px';
                } else {
                    connector.style.left = '25px';
                }
                connector.style.bottom = '-20px';
                connector.style.height = '20px';
                rowDiv.appendChild(connector);
            }
            
            const unlock = unlocks.find(u => u.row === row);
            const unlockIconDiv = document.createElement('div');
            unlockIconDiv.className = 'talent-icon unlock locked';
            unlockIconDiv.dataset.type = 'unlock';
            
            const isUnlockActive = dataMgr.spec[row] && !dataMgr.spec[row].locked;
            if (isUnlockActive) {
                unlockIconDiv.classList.remove('locked');
                unlockIconDiv.classList.add('active');
            }
            
            unlockIconDiv.style.minWidth = '50px';
            
            if (unlock) {
                unlockIconDiv.dataset.unlockId = unlocks.indexOf(unlock);
                unlockIconDiv.dataset.row = row;
                
                const unlockInfo = document.createElement('div');
                unlockInfo.className = 'talent-unlock-info';
                unlockInfo.innerHTML = `
                    <h4>${unlock.name}</h4>
                    <p>${unlock.value}</p>
                `;
                unlockIconDiv.appendChild(unlockInfo);
                
                unlockIconDiv.addEventListener('click', () => {
                    this.handleUnlockClick(row, unlock);
                });
            } else {
                unlockIconDiv.style.opacity = '0';
            }
            
            rowDiv.appendChild(unlockIconDiv);
            
            container.appendChild(rowDiv);
        }
    }
    
    updateTalentChain() {
        const talentChain = this.elements.talentChain;
        this.renderTalentChain(talentChain);
    }
    
    /**
     * 处理天赋图标点击事件
     * @param {number} talentIndex - 天赋索引
     */
    handleTalentClick(talentIndex) {
        const result = dataMgr.unlockTalent(talentIndex);
        if (result.success) {
            alert(result.message);
            this.refreshTalentDisplay();
        } else {
            alert(result.message);
        }
    }
    
    /**
     * 处理功能解锁图标点击事件
     * @param {number} row - 行号
     * @param {Object} unlock - 解锁配置对象
     */
    handleUnlockClick(row, unlock) {
        if (dataMgr.att[0] >= (row + 1) * 3+1) {
            const result = dataMgr.unlockUnlock(row, unlock);
            if (result.success) {
                alert(result.message);
                this.refreshTalentDisplay();
            } else {
                alert(result.message);
            }
        } else {
            alert(`需要先激活第${row + 1}行的全部天赋图标才能解锁此功能！`);
        }
    }
    
    refreshTalentDisplay() {
        const talentPanel = document.getElementById('talent-panel');
        const charTalentContent = document.getElementById('char-talent-content');
        
        if (charTalentContent && !charTalentContent.classList.contains('hidden') && charTalentContent.classList.contains('active')) {
            this.updateTalentPanelContent();
        } else if (talentPanel && !talentPanel.classList.contains('hidden')) {
            this.updateTalentChain();
            this.updateTalentPointDisplay();
        }
    }
    
    /**
     * 更新炼丹配方列表
     */
    updateAlchemyRecipes() {
        const game = window.game;
        if (!game || !dataMgr) return;
        
        const herbs = dataMgr.getItemsByType('alchemy');
        if (herbs.length === 0) {
            this.elements.alchemyRecipes.innerHTML = '<p style="color:#666;text-align:center;">暂无草药材料</p>';
            return;
        }
        
        let html = '<p style="color:#aaa;font-size:12px;margin-bottom:10px;">点击材料进行炼丹</p>';
        for (const herb of herbs) {
            html += `<div class="inventory-item" style="cursor:pointer;" onclick="window.game.alchemy('${herb.id}')">`;
            html += `<span class="name">${herb.name}</span>`;
            html += `<span class="count">x${dataMgr.getItemCount(herb.id) || 0}</span>`;
            html += `</div>`;
        }
        this.elements.alchemyRecipes.innerHTML = html;
    }
    
    /**
     * 更新炼器配方列表
     */
    updateForgingRecipes() {       
        const ores = dataMgr.getItemsByType('forge');
        if (ores.length === 0) {
            this.elements.forgingRecipes.innerHTML = '<p style="color:#666;text-align:center;">暂无矿石材料</p>';
            return;
        }
        
        let html = '<p style="color:#aaa;font-size:12px;margin-bottom:10px;">点击材料进行炼器</p>';
        for (const ore of ores) {
            html += `<div class="inventory-item" style="cursor:pointer;" onclick="window.game.forging('${ore.id}')">`;
            html += `<span class="name">${ore.name}</span>`;
            html += `<span class="count">x${dataMgr.getItemCount(ore.id) || 0}</span>`;
            html += `</div>`;
        }
        this.elements.forgingRecipes.innerHTML = html;
    }
    
    /**
     * 切换标签页
     * @param {string} tab - 标签页 ID
     */
    switchTab(tab) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        document.querySelector(`.tab-btn[data-tab="${tab}"]`).classList.add('active');
        document.getElementById(`tab-${tab}`).classList.add('active');
        console.log("切换到标签页:",tab);
        
        if (tab === 'character') {//角色页面
            this.updateCharacterInfo();
        } else if (tab === 'inventory') {//仓库页面
            this.setInventoryFilter('all');
        } else if (tab === 'shop') {//商店页面
            this.updateGoldDisplay();
        } else if (tab === 'battle') {//征战页面
            let roleData = dataMgr.getRoleData();
            if(!roleData.stage){
                roleData.stage = {
                    curId:1,//当前副本id
                    clearArr:[],//已通关副本id列表
                    rewardArr:[],//首次通关奖励物品列表列表
                };
                dataMgr.saveLocal();
            }
            
            // 检测疲劳值重置
            const today = new Date().toISOString().slice(0, 10);
            if (!roleData.fatigueDate || roleData.fatigueDate !== today) {
                roleData.fatigue = 120;
                roleData.fatigueDate = today;
                dataMgr.saveLocal();
            }
            
            // 打开征战页面时默认选中当前进度副本
            this.selectedDungeonId = roleData.stage.curId;
            this.renderDungeonInfo();
            this.updateFatigueDisplay();
        }
    }

    /**
     * 渲染当前选中副本的名称和描述
     */
    renderDungeonInfo() {
        if (this.selectedDungeonId == null) return;
        const dungeon = dataMgr.getDungeonInfo(this.selectedDungeonId);
        if (!dungeon) return;
        const nameEl = document.getElementById('current-dungeon-name');
        const descEl = document.getElementById('current-dungeon-desc');
        const lootEl = document.getElementById('dungeon-loot-items');
        if (nameEl) nameEl.textContent = dungeon.name;
        if (descEl) descEl.textContent = dungeon.description || '';
        if(lootEl){
            let lootStr = '',lootMap = {};
            // 遍历所有怪物，统计奖励物品数量
            for(let i = 0;i < dungeon.monsters.length;i++){
                let mon = dungeon.monsters[i];
                let monInfo = dataMgr.getMonsterInfo(mon.id);
                if(monInfo && monInfo.loot.length > 0){
                    for(let j = 0;j < monInfo.loot.length;j++){
                        let loot = monInfo.loot[j];
                        if(!lootMap[loot.id]){
                            lootMap[loot.id] = 0;
                        }
                        lootMap[loot.id] += loot.num;
                    }
                }
            }
            // 遍历奖励物品，生成奖励字符串
            for(let id in lootMap){
                let itemInfo = dataMgr.getPropInTable(id);
                if(itemInfo){
                    lootStr += `${itemInfo.name} × ${lootMap[id]}\n`;
                }
            }
            lootEl.textContent = lootStr;
        }
    }

    /**
     * 切换到上一个副本
     */
    prevDungeon() {
        const roleData = dataMgr.getRoleData();
        console.log("切换到上一个副本:",this.selectedDungeonId,roleData);
        if (!roleData || !roleData.stage) return;
        const newId = Number(this.selectedDungeonId) - 1;
        if (Number(newId) > Number(roleData.stage.curId)) {
            this.showTipText('该副本尚未解锁');
            return;
        }
        if (Number(newId) <1) {
            this.showTipText('已到第一个副本了');
            return;
        }
        
        if (newId < 1) return;
        this.selectedDungeonId = newId;
        this.renderDungeonInfo();
        
    }

    /**
     * 切换到下一个副本
     */
    nextDungeon() {
        const roleData = dataMgr.getRoleData();
        if (!roleData || !roleData.stage) return;
        const newId = Number(this.selectedDungeonId) + 1;
        if (Number(newId) > Number(roleData.stage.curId)) {
            this.showTipText('该副本尚未解锁');
            return;
        }
        if (!dataMgr.getDungeonInfo(newId)) return;
        this.selectedDungeonId = newId;
        this.renderDungeonInfo();
        
    }

    /**
     * 显示全局飘字提示
     */
    showTipText(text) {
        const floatEl = document.createElement('div');
        floatEl.className = 'dungeon-float-text';
        floatEl.textContent = text;
        document.body.appendChild(floatEl);
        setTimeout(() => {
            if (floatEl.parentNode) floatEl.parentNode.removeChild(floatEl);
        }, 1500);
    }

    /**
     * 挑战按钮点击处理
     */
    onChallengeBtnClick() {
        const roleData = dataMgr.getRoleData();
        if (!roleData || !roleData.stage) return;
        
        if (this.selectedDungeonId == null) {
            this.showTipText('请选择副本');
            return;
        }
        
        const dungeonId = Number(this.selectedDungeonId);
        const curId = Number(roleData.stage.curId);
        
        if (dungeonId > curId) {
            this.showTipText('该副本尚未解锁');
            return;
        }
        
        const dungeon = dataMgr.getDungeonInfo(dungeonId);
        if (!dungeon) {
            this.showTipText('副本信息不存在');
            return;
        }
        
        const fatigue = roleData.fatigue || 120;
        if (fatigue < 2) {
            this.showTipText('疲劳点不足');
            return;
        }
        
        roleData.fatigue -= 2;
        dataMgr.saveLocal();
        this.updateFatigueDisplay();
        
        window.game.startGame(dungeonId);//挑战按钮-指定副本id
    }
    //更新疲劳值显示
    updateFatigueDisplay() {
        const roleData = dataMgr.getRoleData();
        const fatigue = roleData ? (roleData.fatigue || 120) : 120;
        if (this.elements.fatigueDisplay) {
            this.elements.fatigueDisplay.textContent = `疲劳值: ${fatigue}/120`;
        }
    }
    
    //切换角色页面的标签页
    switchCharTab(tab) {
        document.querySelectorAll('.char-tab').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.char-tab-content').forEach(c => c.classList.remove('active'));
        
        document.querySelector(`.char-tab[data-tab="${tab}"]`).classList.add('active');
        document.getElementById(`char-${tab}-content`).classList.add('active');
        
        if (tab === 'talent') {
            this.updateTalentPanelContent();
        } else if (tab === 'pet') {
            this.updatePetPanelContent();
        } else if (tab === 'equip') {
            this.updateEquipmentPanelContent();
        } else if (tab === 'skill') {
            setTimeout(() => {
                this.adjustSkillListHeight();
            }, 50);
        }
    }
    //更新装备面板内容
    updateEquipmentPanelContent() {
        const charEquipContent = document.getElementById('char-equip-content');
        
        const isCharPage = charEquipContent && charEquipContent.classList.contains('active');
        
        if (!isCharPage) return;
        
        const slotsContainer = document.getElementById('char-equip-slots');
        const listContainer = document.getElementById('char-equip-list');
        const listSection = charEquipContent.querySelector('.equipment-list-section');
        
        this.updateEquippedSlots(slotsContainer);
        
        setTimeout(() => {
            this.updateEquipmentList(listContainer, listSection, true);
        }, 50);
    }
    //更新天赋面板内容
    updateTalentPanelContent() {
        const talentContent = document.getElementById('char-talent-content');
        if (!talentContent) return;
        
        if (dataMgr.getRoleData().talent.att[0] < 1) {
            talentContent.innerHTML = '<p style="color:#666;text-align:center;padding:40px;">天赋树未解锁！需要在战斗中达到 8 级才能解锁天赋系统。</p>';
            return;
        }
        
        const roleData = dataMgr.getRoleData();
        const talentPoint = roleData ? (roleData.talentPoint || 0) : 0;
        
        talentContent.innerHTML = `
            <div class="talent-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;">
                <h3 style="margin:0;color:#ffd700;">天赋</h3>
                <div class="talent-point-info" style="color:#ffd700;">
                    <span class="talent-point-icon">✨</span>
                    <span>${talentPoint}</span>
                </div>
            </div>
            <div class="talent-container" style="height:calc(100% - 40px);overflow-y:auto;">
                <div class="talent-chain" id="char-talent-chain"></div>
            </div>
        `;
        
        this.updateTalentChainContent(document.getElementById('char-talent-chain'));
    }
    //更新天赋链内容
    updateTalentChainContent(container) {
        this.renderTalentChain(container, () => {
            this.updateTalentPanelContent();
        });
    }
    //更新宠物面板内容
    updatePetPanelContent() {
        const petContent = document.getElementById('char-pet-content');
        if (!petContent) return;
        
        if (!window.game || !window.game.petManager) {
            petContent.innerHTML = '<p style="color:#666;text-align:center;padding:40px;">宠物系统未解锁！需要在天赋树中解锁宠物功能。</p>';
            return;
        }
        
        const roleD = dataMgr.getRoleData();
        if (roleD.pets) {
            window.game.petManager.loadPetsArray(roleD.pets);
        }
        
        window.game.petManager.updateActivePetInfo();
        
        petContent.innerHTML = `
            <div id="pet-current-status" class="pet-current-status" style="background:rgba(255,255,255,0.05);border-radius:8px;padding:10px;margin-bottom:15px;">
                <div class="pet-status-content" style="display:flex;gap:10px;">
                    <span class="pet-status-label" style="color:#aaa;">当前出战：</span>
                    <span id="pet-status-name" class="pet-status-name" style="color:#ffd700;"></span>
                    <span id="pet-status-level" class="pet-status-level" style="color:#fff;"></span>
                </div>
            </div>
            <div class="pet-scroll-list" style="height:calc(100% - 50px);overflow-y:auto;">
                <div id="pet-list" class="pet-list"></div>
            </div>
        `;
        
        window.game.petManager.renderPetList();
        window.game.petManager.updateActivePetInfo();
    }
    
    /**
     * 设置物品列表过滤器
     * @param {string} filter - 过滤器类型
     */
    setInventoryFilter(filter) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`.filter-btn[data-filter="${filter}"]`).classList.add('active');
        this.updateInventoryList(filter);
    }
    
    /**
     * 计算已穿戴装备的属性加成
     * @returns {Object} 属性加成对象
     */
    calculateEquipBonus() {
        const bonus = {};
        if (!dataMgr) return bonus;
        let roleD = dataMgr.getRoleData();  
        for (const slot in roleD.equips) {
            const equipment = roleD.equips[slot];
            if (equipment && equipment.att) {
                for (const attr of equipment.att) {
                    if (attr.key && attr.value) {
                        bonus[attr.key] = (bonus[attr.key] || 0) + attr.value;
                    }
                }
            }
        }
        return bonus;
    }
    
    /**
     * 升级按钮点击处理
     */
    onLevelUpClick() {
        const roleData = dataMgr.getRoleData();
        if (!roleData) return;
        
        const level = roleData.level || 1;
        const exp = roleData.exp || 0;
        const needExp = (level - 1) * 200 + 50 + 100 * Math.floor(level / 5);
        
        if (exp < needExp) {
            this.showTipText('经验不足，无法升级');
            return;
        }
        
        roleData.level++;
        roleData.exp -= needExp;
        //升级对属性点的影响
        roleData.attribute.maxHp += 100;
        roleData.attribute.maxMp += 50;
        roleData.attribute.attack += 2;
        roleData.attribute.defense += 1;
        roleData.talentPoint += 1;
        if(roleData.level % 5 == 0){
            roleData.attribute.mpRegen += 1;
            roleData.attribute.hpRegen += 5;
            roleData.attribute.critRate += 1;
            roleData.attribute.critDamage += 10;
            roleData.attribute.dodgeRate += 1;
            DEFINE.PLAYER.MOVE_SPEED += 20;//升级后移动速度增加20像素/秒

        }
        
        dataMgr.saveLocal();
        
        this.updateCharacterInfo();
        
        this.showTipText('升级成功！');
    }
    
    /**
     * 更新角色信息显示
     */
    updateCharacterInfo() {
        if (!this.elements.charInfo) {
            console.warn('charInfo element not found');
            return;
        }
        
        const game = window.game;
        if (!game) {
            console.warn('game not found');
            return;
        }
        
        const roleData = dataMgr.getRoleData();
        
        const equipBonus = this.calculateEquipBonus();
        const level = roleData.level || 1;
        const exp = roleData.exp || 0;
        const needExp = (level - 1) * 200 + 50 + 100 * Math.floor(level / 5);
        const expPercent = Math.min(100, Math.max(0, (exp / needExp) * 100));
        
        const canLevelUp = exp >= needExp;
        const btnColor = canLevelUp ? '#ffd700' : '#666';
        const btnCursor = canLevelUp ? 'pointer' : 'not-allowed';
        
        //角色昵称 代码设置：颜色 #ffd700 字号 22px ； 角色等级 代码设置：颜色 #ffffff 字号 14px
        let html = `<div style="margin-bottom:5px;display:flex;justify-content:space-between;align-items:center;">`;
        html += `<div>`;
        html += `<span style="color:#ffd700;font-size:26px;">${roleData.name || '未命名'}</span> <span style="color:#ffffff;font-size:24px;">Lv.${roleData.level}</span>`;
        html += `</div>`;
        html += `<button id="level-up-btn" style="font-size:16px;padding:4px 20px;border:none;border-radius:3px;background:${btnColor};color:#000;font-weight:bold;cursor:${btnCursor};outline:none;" onclick="uiMgr.onLevelUpClick()" ${!canLevelUp ? 'disabled' : ''}>升级</button>`;
        html += `</div>`;
        
        html += `<div style="margin-bottom:10px;">`;
        html += `<div style="height:8px;background:rgba(255,255,255,0.2);border-radius:4px;overflow:hidden;">`;
        html += `<div style="height:100%;background:linear-gradient(90deg,#ffd700,#ff9800);width:${expPercent}%;transition:width 0.3s ease;"></div>`;
        html += `</div>`;
        html += `<div style="text-align:center;font-size:12px;color:#aaa;margin-top:3px;">${exp}/${needExp} 经验</div>`;
        html += `</div>`;
        
        const attributes = Object.keys(roleData.attribute);
        
        html += `<table style="width:100%;border-collapse:collapse;font-size:14px;border-left:1px solid #444;border-right:1px solid #444;">`;
        
        for (let i = 0; i < attributes.length; i += 2) {
            const lightBg = 'rgba(255,255,255,0.1)';
            const darkBg = 'rgba(255,255,255,0.05)';
            
            const k1 = attributes[i];
            const k2 = attributes[i + 1];
            
            html += `<tr style="border-bottom:1px solid #444;height:0.7em;">`;
            if (k1) {
                html += `<td style="padding:4px 8px;background-color:${lightBg};color:#aaa;text-align:center;border-right:1px solid #444;">${this.getAttributeDisplayName(k1)}</td>`;
            }
            if (k2) {
                html += `<td style="padding:4px 8px;background-color:${lightBg};color:#aaa;text-align:center;">${this.getAttributeDisplayName(k2)}</td>`;
            }
            html += `</tr>`;
            
            html += `<tr style="border-bottom:1px solid #444;height:0.8em;">`;
            if (k1) {
                const baseValue1 = roleData.attribute[k1];
                const bonusValue1 = equipBonus[k1] || 0;
                if (bonusValue1 > 0) {
                    const bonus1Str = DEFINE.PERCENT_ATTRIBUTES.includes(k1) ? `+${bonusValue1}%` : `+${bonusValue1}`;
                    html += `<td style="padding:4px 8px;background-color:${darkBg};text-align:center;border-right:1px solid #444;"><span style="color:#ffd700;">${this.formatAttributeValue(k1, baseValue1 + bonusValue1)}</span><span style="color:#00ff00;">(${bonus1Str})</span></td>`;
                } else {
                    html += `<td style="padding:4px 8px;background-color:${darkBg};text-align:center;border-right:1px solid #444;color:#ffd700;">${this.formatAttributeValue(k1, baseValue1)}</td>`;
                }
            }
            if (k2) {
                const baseValue2 = roleData.attribute[k2];
                const bonusValue2 = equipBonus[k2] || 0;
                if (bonusValue2 > 0) {
                    const bonus2Str = DEFINE.PERCENT_ATTRIBUTES.includes(k2) ? `+${bonusValue2}%` : `+${bonusValue2}`;
                    html += `<td style="padding:4px 8px;background-color:${darkBg};text-align:center;"><span style="color:#ffd700;">${this.formatAttributeValue(k2, baseValue2 + bonusValue2)}</span><span style="color:#00ff00;">(${bonus2Str})</span></td>`;
                } else {
                    html += `<td style="padding:4px 8px;background-color:${darkBg};text-align:center;color:#ffd700;">${this.formatAttributeValue(k2, baseValue2)}</td>`;
                }
            }
            html += `</tr>`;
        }
        
        html += `</table>`;
        
        this.elements.charInfo.innerHTML = html;
        console.warn('角色技能skills：', roleData.skills,'技能总数量：',dataMgr.getAllSkills());
        console.warn('角色技能this.elements.charSkills：：', this.elements.charSkills);
        if (this.elements.charSkills) {
            const learnedSkills = roleData.skills || {};
            const learnedCount = Object.keys(learnedSkills).length;
            const totalSkills = Object.keys(dataMgr.getAllSkills()).length;
            
            const skillHeader = document.getElementById('char-skill-header');
            if (skillHeader) {
                const activeCount = Object.keys(learnedSkills).filter(skillId => learnedSkills[skillId].beActive === true).length;
                skillHeader.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding:8px;background:rgba(255,255,255,0.05);border-radius:4px;">` +
                    `<span style="color:#ffd700;">已学技能：${learnedCount}/${totalSkills}</span> <span style="color:#90EE90;">已激活：${activeCount}/5</span>` +
                    `<button id="skill-learn-btn" class="large-btn talent-btn" onclick="uiMgr.showSkillLearnPanel()">学习</button>` +
                    `</div>`;
            }
            
            let skillsHtml = '';
            
            for (const skillId of Object.keys(learnedSkills)) {
                const skillData = learnedSkills[skillId];
                const skill = dataMgr.getSkillInfo(skillId);
                
                if (skill) {
                    let isActive = skillData.beActive === true;
                    const clickHandler = `uiMgr.handleSkillCardClick('${skillId}')`;
                    skillsHtml += `<div class="character-skill-item" onclick="${clickHandler}">`;
                    skillsHtml += `<div class="character-skill-header">`;
                    skillsHtml += `<span class="character-skill-name">${skill.name}`;
                    if (isActive) {
                        skillsHtml += `<span class="character-skill-active-tag">已激活</span>`;
                    }
                    skillsHtml += `</span>`;
                    skillsHtml += `<span class="character-skill-level">Lv.${skillData.level}/${skill.maxLevel}</span>`;
                    skillsHtml += `</div>`;
                    
                    let descText = skill.description;
                    const damageInfo = this.getSkillDamageInfo(skill, skillData.level);
                    if (damageInfo) {
                        const damageText = damageInfo.replace(/<[^>]*>/g, '');
                        descText += ` - ${damageText}`;
                    }
                    
                    skillsHtml += `<p class="character-skill-desc">${descText}</p>`;
                    skillsHtml += `</div>`;
                }
            }
            if (Object.keys(learnedSkills).length === 0) {
                skillsHtml = '<p style="color:#666;text-align:center;">暂无技能</p>';
            }
            this.elements.charSkills.innerHTML = skillsHtml;
            
            this.adjustSkillListHeight();
        }
    }
    
    /**
     * 技能卡片点击处理
     * @param {string} skillId - 技能ID
     */
    handleSkillCardClick(skillId) {
        let roleData =dataMgr.getRoleData();
        if (!roleData||!roleData.skills||!roleData.skills[skillId]) {
            this.showTipText('角色数据或技能数据不存在');
            return;
        }
        // 飞剑是默认激活的，无法取消
        if (skillId === 'flying_sword') {
            this.showFlyingSwordHint();
            return;
        }
        
        // 已激活 → 显示取消激活弹窗
        if (roleData.skills[skillId].beActive) {
            this.showDeactivateConfirmModal(skillId);
        }else if (dataMgr.isActiveFull()) {// 未激活：检查激活数量
            // 已满 5 个 → 弹出当前激活技能列表
            this.showActiveSkillsModal();
        } else {
            // 未满 → 弹出激活确认弹窗
            this.showActivateConfirmModal(skillId);
        }
    }
    
    /**
     * 显示飞剑默认激活提示
     */
    showFlyingSwordHint() {
        const modal = document.getElementById('flying-sword-hint-modal');
        if (!modal) return;
        modal.classList.remove('hidden');
        
        // 绑定关闭按钮（每次重新绑定以防事件失效）
        const closeBtn = document.getElementById('flying-sword-hint-close');
        if (closeBtn) {
            const newClose = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newClose, closeBtn);
            newClose.addEventListener('click', () => {
                modal.classList.add('hidden');
            });
        }
    }
    
    /**
     * 显示取消激活确认弹窗
     * @param {string} skillId - 技能ID
     */
    showDeactivateConfirmModal(skillId) {
        const skill = dataMgr.getSkillInfo(skillId);
        if (!skill) return;
        
        const modal = document.getElementById('deactivate-skill-modal');
        const nameSpan = document.getElementById('deactivate-skill-name');
        const confirmBtn = document.getElementById('deactivate-skill-confirm');
        const cancelBtn = document.getElementById('deactivate-skill-cancel');
        
        if (!modal || !nameSpan || !confirmBtn || !cancelBtn) return;
        
        nameSpan.textContent = skill.name;
        modal.classList.remove('hidden');
        
        // 清理旧事件
        const newConfirm = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirm, confirmBtn);
        const newCancel = cancelBtn.cloneNode(true);
        cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);
        
        newConfirm.addEventListener('click', () => {
            const ok = dataMgr.deactivateSkill(skillId);
            modal.classList.add('hidden');
            if (ok) {
                uiMgr.updateCharacterInfo();
            }
        });
        newCancel.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }
    
    /**
     * 显示激活技能确认弹窗
     * @param {string} skillId - 技能ID
     */
    showActivateConfirmModal(skillId) {
        const skill = dataMgr.getSkillInfo(skillId);
        if (!skill) return;
        
        const modal = document.getElementById('activate-skill-modal');
        const nameSpan = document.getElementById('activate-skill-name');
        const confirmBtn = document.getElementById('activate-skill-confirm');
        const cancelBtn = document.getElementById('activate-skill-cancel');
        
        if (!modal || !nameSpan || !confirmBtn || !cancelBtn) return;
        
        nameSpan.textContent = skill.name;
        modal.classList.remove('hidden');
        
        // 清理旧事件
        const newConfirm = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirm, confirmBtn);
        const newCancel = cancelBtn.cloneNode(true);
        cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);
        
        newConfirm.addEventListener('click', () => {
            console.warn('激活技能====', skillId);
            const ok = dataMgr.activateSkill(skillId);
            modal.classList.add('hidden');
            if (ok) {
                uiMgr.updateCharacterInfo();
            }
        });
        newCancel.addEventListener('click', () => {
            const ok = dataMgr.deactivateSkill(skillId);
            if (ok) {
                uiMgr.updateCharacterInfo();
            }
            modal.classList.add('hidden');
        });
    }
    
    /**
     * 显示当前激活技能列表弹窗（不含飞剑）
     */
    showActiveSkillsModal() {
        const modal = document.getElementById('active-skills-modal');
        const list = document.getElementById('active-skills-list');
        const closeBtn = document.getElementById('active-skills-close');
        
        if (!modal || !list || !closeBtn) return;
        
        // 排除飞剑（飞剑是默认激活的，不可取消）
        const activeSkills = dataMgr.getActiveSkills().filter(s => s.id !== 'flying_sword');
        let html = '';
        for (const skill of activeSkills) {
            html += `<div class="active-skill-row">`;
            html += `<span class="active-skill-name">${skill.name}</span>`;
            html += `<button class="active-skill-deactivate-btn" data-skill-id="${skill.id}">取消激活</button>`;
            html += `</div>`;
        }
        if (activeSkills.length === 0) {
            html = '<p style="color:#666;text-align:center;">暂未激活任何可取消的技能</p>';
        }
        list.innerHTML = html;
        modal.classList.remove('hidden');
        
        // 绑定取消激活按钮
        list.querySelectorAll('.active-skill-deactivate-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-skill-id');
                dataMgr.deactivateSkill(id);
                uiMgr.updateCharacterInfo();
                // 重新刷新弹窗
                const newCount = dataMgr.getActiveSkillCount();
                if (newCount < 5) {
                    modal.classList.add('hidden');
                } else {
                    this.showActiveSkillsModal();
                }
            });
        });
        
        // 关闭按钮
        const newClose = closeBtn.cloneNode(true);
        closeBtn.parentNode.replaceChild(newClose, closeBtn);
        newClose.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }
    
    adjustSkillListHeight() {
        const skillContent = document.getElementById('char-skill-content');
        const skillHeader = document.getElementById('char-skill-header');
        const skillList = document.getElementById('char-skills');
        
        if (!skillContent || !skillHeader || !skillList) return;
        
        const contentHeight = skillContent.offsetHeight;
        const headerHeight = skillHeader.offsetHeight;
        const calculatedHeight = contentHeight - headerHeight - 20;
        
        if (calculatedHeight > 0) {
            skillList.style.height = `${calculatedHeight}px`;
        }
    }
    
    /**
     * 更新物品列表显示
     * @param {string} filter - 过滤器类型（all/normal/alchemy/forge/equipment）
     */
    updateInventoryList(filter) {
        if (filter === undefined || filter === null) {
            filter = this.currentInventoryFilter;
        } else {
            this.currentInventoryFilter = filter;
        }
        
        if (!this.elements.inventoryList) {
            console.warn('更新物品列表显示: inventoryList element not found');
            return;
        }
        if (!dataMgr) {
            console.warn('更新物品列表显示: dataMgr not found');
            return;
        }
        
        const items = dataMgr.getAllProps();
        console.log(`更新物品列表显示: filter=${filter}, total items=${items.length}`);
        console.log(`更新物品列表显示: all items=`, items.map(i => `${i.type}:${i.id}`));
        let filteredItems = items;
        
        if (filter === 'alchemy') {//炼丹材料：药材、成丹
            filteredItems = items.filter(i => i.type === 'alchemy'||i.type === 'dan');
        } else if (filter === 'forge') {//炼器材料
            filteredItems = items.filter(i => i.type === 'forge');
        } else if (filter === 'equipment') {//装备
            filteredItems = items.filter(i => i.type === 'equipment');
        } else if (filter === 'normal') {//普通道具
            // 普通道具：不属于炼丹、炼器、装备的道具
            filteredItems = items.filter(i => 
                i.type !== 'alchemy' && 
                i.type !== 'dan' && 
                i.type !== 'forge' && 
                i.type !== 'equipment'
            );
        }
        
        if (filteredItems.length === 0) {
            this.elements.inventoryList.innerHTML = '<p style="color:#666;text-align:center;">暂无物品</p>';
            return;
        }
        
        let html = '';
        for (const item of filteredItems) {
            // 获取物品名称和品质颜色
            const itemColor = this.getItemQualityColor(item);
            
            // 装备使用oid字段作为配置表ID来获取名称，其他使用id字段
            const configId = item.type === 'equipment' ? item.oid : item.id;
            const itemName = dataMgr.getPropName(configId);
            
            // 所有道具都可以点击查看详情（传入item.id作为标识）
            html += `<div class="inventory-item" style="cursor:pointer;" onclick="openMaterialDetail('${item.type}', '${item.id}', ${item.count})">`;
            html += `<span class="name" style="color: ${itemColor}">${itemName}</span>`;
            html += `<span class="count">x${item.type == 'equipment' ? '1' : item.count}</span>`;
            html += `</div>`;
        }
        
        this.elements.inventoryList.innerHTML = html;
    }
    
    /**
     * 隐藏游戏结束面板
     */
    hideGameOver() {
        this.elements.gameOverPanel.classList.add('hidden');
    }
    
    /**
     * 更新玩家状态显示
     * @param {Player} player - 战斗玩家对象
     */
    updatePlayer(player) {
        this.updateStateBar(player);
        this.updateAttRecord(player);        
        // 技能栏：只显示已激活的技能（按学习顺序）
        const skillPanel = document.getElementById('skill-panel');
        if (!skillPanel) return;
        
        // 计算当前应展示的激活技能列表
        const activeSkillIds = Object.keys(player.skills);
        const activeSet = new Set(activeSkillIds);
        
        // 复用已存在的槽位：按 data-skill-id 建立索引
        const existingSlots = new Map();
        for (const slot of skillPanel.querySelectorAll('.skill-slot')) {
            existingSlots.set(slot.dataset.skillId, slot);
        }
        
        // 1) 移除已不显示的槽位
        for (const [skillId, slot] of existingSlots) {
            if (!activeSet.has(skillId)) {
                slot.remove();
                existingSlots.delete(skillId);
                console.log('------删除槽位:',skillId);
            }
        }
        
        // 2) 按 activeSkillIds 顺序更新或新增槽位
        for (let skillId of activeSkillIds) {
            const skillInfo = dataMgr.getSkillInfo(skillId);
            let slot = existingSlots.get(skillId);
            if (!slot) {
                slot = document.createElement('div');
                slot.className = 'skill-slot skill-slot--enter';
                slot.dataset.skillId = skillId;
                slot.innerHTML =
                    '<div class="skill-text-col">' +
                        '<span class="skill-name"></span>' +
                        '<span class="skill-level"></span>' +
                    '</div>' +
                    '<div class="skill-icon">' +
                        '<div class="skill-cooldown-overlay"></div>' +
                        '<span class="skill-cooldown-text"></span>' +
                    '</div>';
                skillPanel.appendChild(slot);
            }
            const iconEl = slot.querySelector('.skill-icon');
            const nameEl = slot.querySelector('.skill-name');
            const levelEl = slot.querySelector('.skill-level');
            if (iconEl) iconEl.className = 'skill-icon ' + this.getSkillIconClass(skillId);
            if (nameEl) nameEl.textContent = skillInfo.name;
            if (levelEl) levelEl.textContent = "Lv."+player.skills[skillId].level;
            console.warn('显示升级面板选项actSkills:',skillId, player.skills[skillId]);
        }
    }

    /**
     * 更新技能栏冷却倒计时（矩形扫描进度条）
     * @param {Player} player - 战斗玩家对象
     */
    updateSkillCooldowns(player) {
        const skillPanel = document.getElementById('skill-panel');
        if (!skillPanel) return;

        for (const slot of skillPanel.querySelectorAll('.skill-slot')) {
            const skillId = slot.dataset.skillId;
            const skillData = player.skills[skillId];
            if (!skillData) continue;

            const overlay = slot.querySelector('.skill-cooldown-overlay');
            const textEl = slot.querySelector('.skill-cooldown-text');
            if (!overlay || !textEl) continue;

            const skillInfo = dataMgr.getSkillInfo(skillId);
            const totalCooldown = skillInfo ? (skillInfo.cooldown || 0) : 0;
            const remaining = skillData.cdSecond || 0;

            if (remaining > 0 && totalCooldown > 0) {
                const progress = remaining / totalCooldown;
                overlay.style.height = `${progress * 100}%`;
                textEl.textContent = remaining < 1 ? remaining.toFixed(1) : Math.ceil(remaining).toString();
                textEl.style.display = 'block';
            } else {
                overlay.style.height = '0%';
                textEl.style.display = 'none';
            }
        }
    }
    /**
     * 更新玩家状态条
     * @param {Player} player - 战斗玩家对象
     */
    updateStateBar(player){
        if(!player){
            player = window.game.player;
        }
        // HP Bar
        const hpPercent = player.getHpPercent() * 100;
        this.elements.hpBar.style.width = `${hpPercent}%`;
        this.elements.hpText.textContent = `${Math.ceil(player.hp)}/${player.maxHp}`;
        
        // Color HP bar based on percentage
        if (hpPercent > 50) {
            this.elements.hpBar.style.background = 'linear-gradient(90deg, #ff4444, #ff6b6b)';
        } else if (hpPercent > 25) {
            this.elements.hpBar.style.background = 'linear-gradient(90deg, #ffaa00, #ffcc00)';
        } else {
            this.elements.hpBar.style.background = 'linear-gradient(90deg, #ff0000, #ff4444)';
        }
        
        // MP Bar
        this.elements.mpBar.style.width = `${player.getMpPercent() * 100}%`;
        this.elements.mpText.textContent = `${Math.ceil(player.mp)}/${player.maxMp}`;
        //console.warn('#----##player.mp:',player.mp,',hp:',player.hp);
        // EXP Bar
        const expPercent = player.getExpPercent();
        this.elements.expBar.style.width = `${expPercent * 100}%`;
        this.elements.levelText.textContent = `Lv.${player.level}`;
        //console.log(`Exp: ${player.exp}/${player.expToNext} (${(expPercent * 100).toFixed(1)}%)`);
    }
    
    /**
     * 更新属性记录显示（status-bars下方）
     * @param {Player} player - 战斗玩家对象
     */
    updateAttRecord(player) {
        const attRecordEl = document.getElementById('att-record');
        if (!attRecordEl) return;
        console.warn('---更新属性记录显示.attRecord:',player.attRecord);
        let atts = dataMgr.getAllAttributes();
        let html = '';
        for (let key in player.attRecord) {
            const level = player.attRecord[key];
            if (level <= 0) continue;
            const name = atts.find(att => att.id === key)?.name || key;
            console.warn('---更新属性attRecord,name:',name,level);
            html += `<div class="att-record-item"><span class="att-name">${name}</span> <span class="att-level">Lv.${level}</span></div>`;
        }
        attRecordEl.innerHTML = html;
    }
    
    /**
     * 根据技能 id 获取对应的图标 class
     */
    getSkillIconClass(skillId) {
        const map = {
            'flying_sword': 'flying-sword',
            'talisman': 'talisman',
            'ultimate': 'ultimate',
            'jin_zhong_zhao': 'jin-zhang',
            'lei_guang_dun': 'lei-guang',
            'huo_yan': 'huo-yan',
            'wan_jian_jue': 'wan-jian',
            'tian_huo_liu_xing': 'tian-huo',
            'long_juan_feng': 'long-juan',
            'yan_shuang_fei': 'yan-shuang',
            'geng_jin_jian_zhen': 'geng-jin'
        };
        return map[skillId] || '';
    }
    
    /**
     * 更新波次显示
     * @param {WaveManager} waveManager - 波次管理器
     * @param {boolean} hasBoss - 是否有 BOSS
     */
    updateWave(waveManager, hasBoss) {
        this.elements.waveLabel.textContent = `波次 ${waveManager.currentWave}/${DEFINE.WAVE.MAX_WAVES}`;
        this.elements.progressBar.style.width = `${waveManager.getProgress() * 100}%`;
        this.elements.bossTimer.textContent = hasBoss ? 'BOSS 来袭!' : '';
    }
    
    /**
     * 显示开始菜单
     */
    showStartMenu() {
        this.elements.startMenu.classList.remove('hidden');
    }
    
    /**
     * 隐藏开始菜单
     */
    hideStartMenu() {
        this.elements.startMenu.classList.add('hidden');
    }
    
    /**
     * 显示游戏结束面板
     * @param {boolean} isVictory - 是否胜利
     * @param {number} wave - 最终波次
     * @param {number} level - 最终等级
     */
    showGameOver(isVictory, wave, level) {
        this.elements.gameOverTitle.textContent = isVictory ? '通关胜利!' : '游戏结束';
        this.elements.finalWave.textContent = wave;
        this.elements.finalLevel.textContent = level;
        this.elements.gameOverPanel.classList.remove('hidden');
    }
    
    /**
     * 显示升级面板
     * @param {Array} options - 升级选项数组
     */
    showLevelUpPanel() {
        this.elements.levelUpPanel.classList.remove('hidden');
        this.elements.skillOptions.innerHTML = '';
        /** @type {Array<skillLearnModel>} */
        let options = window.game.player.generateOptions();
        console.warn('**显示升级面板选项:', options);
        // 获取当前战场中已激活的技能 ID 列表         
        for (const option of options) {
            const div = document.createElement('div');
            div.className = 'skill-option';
            let showNew = false;
            if (option.type =='skill') {//技能选项:没学的标新
                showNew = !window.game.player.isSkillLearned(option.id);
                console.warn('显示升级面板选项actSkills:',option.id, showNew,option);
            } else if (option.type == 'att') {// 属性选项：没应用的标新
                showNew = !window.game.player.isAttBonus(option.id);
                console.warn('显示升级面板==属性:',option.id, showNew);
            }
            div.innerHTML = `
                    <h3>${option.name}${showNew ? '<span class="new-badge">新</span>' : ''}</h3>
                    <p>${option.description}</p>
                    <p>等级：${showNew ? '1':option.level +' → '+ (option.level + 1)}</p>
                `;
            this.elements.skillOptions.appendChild(div);
        }
        return options;
    }
    
    /**
     * 隐藏升级面板
     */
    hideLevelUpPanel() {
        this.elements.levelUpPanel.classList.add('hidden');
    }
    
    /**
     * 隐藏所有子面板
     */
    hideAllSubPanels() {
        const subPanels = document.querySelectorAll('.sub-panel');
        subPanels.forEach(panel => {
            panel.classList.add('hidden');
        });
    }
    
    /**
     * 显示炼丹面板
     */
    showAlchemyPanel() {
        this.hideAllSubPanels();
        document.getElementById('alchemy-panel').classList.remove('hidden');
        this.initAlchemyPanel();
    }
    
    /**
     * 初始化炼丹面板
     */
    initAlchemyPanel() {
        this.initRecipes();
        this.initAlchemyEvents();
    }
    
    /**
     * 初始化丹方列表
     */
    initRecipes() {
        const recipeSelect = document.getElementById('recipe-select');
        if (!recipeSelect) return;
        
        recipeSelect.innerHTML = '';
        
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '未选择';
        recipeSelect.appendChild(defaultOption);
        
        const learnedRecipes = dataMgr.getLearnedRecipes();
        
        for (const recipeId in learnedRecipes) {
            const recipeInfo = dataMgr.getPropInTable(recipeId);
            if (!recipeInfo) continue;
            
            let quality = recipeInfo.quality || 2;
            if (typeof quality === 'number') {
                quality = quality === 1 ? 'high' : quality === 2 ? 'medium' : 'low';
            }
            
            const option = document.createElement('option');
            option.value = recipeId;
            option.textContent = recipeInfo.name || recipeId;
            option.dataset.quality = quality;
            recipeSelect.appendChild(option);
        }
        
        this.addRecipeOptionStyles();
        
        recipeSelect.style.pointerEvents = 'auto';
        recipeSelect.disabled = false;
        
        this.rebindRecipeSelectEvent(recipeSelect);
    }
    
    /**
     * 重新绑定丹方选择事件
     * @param {HTMLSelectElement} recipeSelect - 丹方选择下拉框
     */
    rebindRecipeSelectEvent(recipeSelect) {
        // 移除现有的事件监听器
        const newSelect = recipeSelect.cloneNode(true);
        recipeSelect.parentNode.replaceChild(newSelect, recipeSelect);
        
        // 添加新的事件监听器
        newSelect.addEventListener('change', (e) => {
            console.log('重新绑定丹方选择事件==',e.target.value);
            this.onRecipeChange(e.target.value);
        });
    }
    
    /**
     * 添加丹方选项样式
     */
    addRecipeOptionStyles() {
        // 检查是否已经添加了样式
        if (document.getElementById('recipe-option-styles')) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = 'recipe-option-styles';
        style.textContent = `
            .recipe-select option[data-quality="high"] {
                color: #4caf50;
            }
            .recipe-select option[data-quality="medium"] {
                color: #ff9800;
            }
            .recipe-select option[data-quality="low"] {
                color: #f44336;
            }
        `;
        document.head.appendChild(style);
    }
    
    /**
     * 初始化炼丹事件
     */
    initAlchemyEvents() {
        // 开始炼丹按钮
        const startAlchemyBtn = document.getElementById('start-alchemy-btn');
        if (startAlchemyBtn) {
            startAlchemyBtn.addEventListener('click', () => {
                this.startAlchemy();
            });
        }
        
        // 材料槽位点击事件
        document.querySelectorAll('.item-slot').forEach(slot => {
            slot.addEventListener('click', () => {
                this.openMaterialSelectModal(slot.id);
            });
        });
        
        // 确定按钮点击事件
        const confirmBtn = document.getElementById('confirm-material-btn');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                this.confirmMaterialSelection();
            });
        }
    }
    
    /**
     * 打开材料选择弹窗
     * @param {string} slotId - 槽位ID
     */
    openMaterialSelectModal(slotId) {
        // 保存当前槽位ID
        this.currentSlotId = slotId;
        
        // 显示弹窗
        const modal = document.getElementById('material-select-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
        
        // 确保选中材料信息区域显示
        const infoContainer = document.getElementById('selected-material-info');
        if (infoContainer) {
            infoContainer.classList.remove('hidden');
        }
        
        // 根据槽位类型筛选材料
        const materialType = this.getSlotMaterialType(slotId);
        this.loadMaterialsByType(materialType);
        
        // 重置选中状态
        this.selectedMaterial = null;
        this.updateSelectedMaterialInfo();

        // 绑定关闭按钮点击事件
        const closeBtn = document.querySelector('.material-select-close-btn');
        if (closeBtn) {
            closeBtn.onclick = () => this.closeMaterialSelectModal();
        }

        // 绑定数量调节按钮点击事件
        const quantityBtns = document.querySelectorAll('#selected-material-info .quantity-control .quantity-btn');
        console.log('数量调节按钮:',quantityBtns);
        quantityBtns.forEach(btn => {
            if (btn.textContent === '-') {
                btn.onclick = () => this.adjustMaterialQuantity(-1);
            } else if (btn.textContent === '+') {
                btn.onclick = () => this.adjustMaterialQuantity(1);
            }
        });

    }
    
    /**
     * 根据槽位ID获取材料类型
     * @param {string} slotId - 槽位ID
     * @returns {string} 材料类型
     */
    getSlotMaterialType(slotId) {
        if (slotId === 'talisman-slot') {
            return 'talisman';
        } else if (slotId === 'neutralizer-slot') {
            return 'neutralizer';
        } else {
            return 'alchemy';
        }
    }
    
    /**
     * 根据类型加载材料
     * @param {string} type - 材料类型
     */
    loadMaterialsByType(type) {
        const materialGrid = document.getElementById('material-grid');
        if (!materialGrid) return;
        
        // 清空网格
        materialGrid.innerHTML = '';
        
        // 模拟材料数据
        const materials = this.getMockMaterials(type);
        
        materials.forEach(material => {
            const materialItem = document.createElement('div');
            materialItem.className = 'material-item';
            materialItem.innerHTML = `
                <div class="material-name">${dataMgr.getPropName(material.id)}</div>
                <div class="material-count">x${material.count}</div>
            `;
            
            materialItem.onclick = (e) => {
                this.selectMaterial(material, e.currentTarget);
            };
            
            materialGrid.appendChild(materialItem);
        });
        if(materials.length == 0){
            materialGrid.innerHTML = '<div class="no-materials">暂无材料</div>';
        }
    }
    
    /**
     * 获取模拟材料数据
     * @param {string} type - 材料类型
     * @returns {Array} 材料数组
     */
    getMockMaterials(type) {
        // const materials = {
        //     material: [
        //         { id: 'herb1', name: '千年灵芝', count: 5, type: 'material' },
        //         { id: 'herb2', name: '天山雪莲', count: 3, type: 'material' },
        //         { id: 'herb3', name: '人参', count: 8, type: 'material' },
        //         { id: 'herb4', name: '何首乌', count: 4, type: 'material' }
        //     ],
        //     neutralizer: [
        //         { id: 'neutralizer1', name: '轻灵水', count: 10, type: 'neutralizer' }
        //     ],
        //     talisman: [
        //         { id: 'talisman1', name: '保底符', count: 2, type: 'talisman' }
        //     ]
        // };
        
        const props = dataMgr.getItemsByType(type);
        console.log('获取模拟材料数据', type, props);
        return props || [];
    }
    
    /**
     * 选择材料
     * @param {Object} material - 材料对象
     * @param {HTMLElement} element - 材料元素
     */
    selectMaterial(material, element) {
        this.selectedMaterial = material;
        
        // 设置最大数量
        this.maxQuantity = material.count;
        
        // 更新选中状态
        document.querySelectorAll('.material-item').forEach(item => {
            item.classList.remove('selected');
        });
        if (element) {
            element.classList.add('selected');
        }
        
        // 更新选中材料信息
        this.updateSelectedMaterialInfo();
    }
    
    /**
     * 更新选中材料信息
     */
    updateSelectedMaterialInfo() {
        const infoContainer = document.getElementById('selected-material-info');
        const nameElement = document.getElementById('selected-item-name');
        const countElement = document.getElementById('selected-item-count');
        
        if (!infoContainer || !nameElement || !countElement) return;
        
        if (this.selectedMaterial) {
            nameElement.textContent = dataMgr.getPropName(this.selectedMaterial.id);
            countElement.textContent = `x1`;
            document.getElementById('material-quantity').textContent = '1';
        } else {
            nameElement.textContent = '未选择';
            countElement.textContent = '';
            document.getElementById('material-quantity').textContent = '1';
        }
    }
    
    /**
     * 确认材料选择
     */
    confirmMaterialSelection() {
        if (!this.selectedMaterial || !this.currentSlotId) return;
        
        let quantity = parseInt(document.getElementById('material-quantity').textContent) || 1;
        // 确保数量不超过最大值
        if (this.maxQuantity) {
            quantity = Math.min(quantity, this.maxQuantity);
        }
        
        // 放入材料到槽位
        this.putMaterialInSlot(this.currentSlotId, this.selectedMaterial, quantity);
        
        // 关闭弹窗
        this.closeMaterialSelectModal();
    }
    
    /**
     * 将材料放入槽位
     * @param {string} slotId - 槽位ID
     * @param {Object} material - 材料对象
     * @param {number} quantity - 数量
     */
    putMaterialInSlot(slotId, material, quantity) {
        const slot = document.getElementById(slotId);
        if (!slot) return;
        
        // 显示材料信息
        slot.innerHTML = `
            <div class="slot-material-name">${dataMgr.getPropName(material.id)}</div>
            <div class="slot-material-count">x${quantity}</div>
        `;
        slot.classList.add('has-item');
        
        // 保存材料信息到槽位
        slot.dataset.materialId = material.id;
        slot.dataset.materialName = dataMgr.getPropName(material.id);
        slot.dataset.quantity = quantity;
        
        // 重新计算成功率（直接调用calculateRecipeSuccessRate，而不是onRecipeChange）
        const recipeSelect = document.getElementById('recipe-select');
        const recipe = dataMgr.getPropInTable(recipeSelect.value);
        console.warn('当前丹方信息:',recipeSelect.value, recipe);
        if (recipe) {
            const successRate = this.calculateRecipeSuccessRate(recipe);
            this.updateRecipeRequirements(recipe);
            
            // 打印日志
            const materialRatios = this.calculateMaterialRatios();
            console.log('========== 炼丹材料变更 ==========');
            console.log('当前材料五行比例:', materialRatios);//{1: 28, 2: 56, 3: 17, 4: 0, 5: 0}
            
            // 检查是否符合丹方要求
            console.log('丹方要求:', recipe.att);
            const meetsRequirements = recipe.att.every(({ele, value}) => {
                const currentValue = materialRatios[ele] || 0;
                return currentValue >= value*100;
            });
            console.log('是否符合丹方要求:', meetsRequirements);
            
            // 检查是否达成炸炉条件
            console.log('炸炉条件:', recipe.broken);
            let hasExplodeCondition = false;
            if (recipe.broken) {
                for (let i = 0;i<recipe.broken.length;i++) {
                    let {ele,min, max} = recipe.broken[i];
                    const ratio = materialRatios[ele] || 0;
                    if (ratio >= min*100 && ratio <= max*100) {
                        console.log(`炸炉条件达成: ${DEFINE.ELEMENTS[ele]} 在 ${min*100}%-${max*100}% 范围内`);
                        hasExplodeCondition = true;
                    }
                }
            }
            console.log('是否达成炸炉条件:', hasExplodeCondition);
            
            // 成功率
            console.log('当前成功率:', successRate + '%');
            console.log('================================');
        }
    }
    
    /**
     * 关闭材料选择弹窗
     */
    closeMaterialSelectModal() {
        const modal = document.getElementById('material-select-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
        
        // 重置选中材料信息显示
        const infoContainer = document.getElementById('selected-material-info');
        const nameElement = document.getElementById('selected-item-name');
        const countElement = document.getElementById('selected-item-count');
        const quantityDisplay = document.getElementById('material-quantity');
        
        if (infoContainer) infoContainer.classList.add('hidden');
        if (nameElement) nameElement.textContent = '';
        if (countElement) countElement.textContent = '';
        if (quantityDisplay) quantityDisplay.textContent = '1';
        
        // 重置状态
        this.currentSlotId = null;
        this.selectedMaterial = null;
        this.maxQuantity = 1;
    }
    
    /**
     * 丹方选择变化
     * @param {string} recipeId - 丹方ID
     */
    onRecipeChange(recipeId) {
        if (!recipeId) {
            this.clearAlchemyState();
            return;
        }
        
        // 丹方数据
        const recipes = {
            'health-pill': { 
                name: '气血丹', 
                materials: 1, 
                requirements: { wood: 30, fire: 20 }, 
                explodeConditions: { wood: { min: 0, max: 40 }, fire: { min: 0, max: 30 } },
                quality: 'high' 
            },
            'mana-pill': { 
                name: '法力丹', 
                materials: 2, 
                requirements: { water: 40, wood: 20 }, 
                explodeConditions: { water: { min: 0, max: 50 }, wood: { min: 0, max: 30 } },
                quality: 'medium' 
            },
            'strength-pill': { 
                name: '力量丹', 
                materials: 3, 
                requirements: { metal: 50, fire: 30 }, 
                explodeConditions: { metal: { min: 0, max: 60 }, fire: { min: 0, max: 40 } },
                quality: 'low' 
            }
        };
        let recipe = dataMgr.getPropInTable(recipeId);
        if (!recipe) return;
        
        // 清除材料和中和剂信息（保留保底符）
        this.clearMaterialsAndNeutralizer();
        
        // 更新材料槽位显示
        this.updateMaterialSlots(recipe.materials);
        
        // 更新丹方要求
        this.updateRecipeRequirements(recipe);
        
        // 计算并显示成功率
        this.calculateRecipeSuccessRate(recipe.att);
    }
    
    /**
     * 清除材料和中和剂信息（保留保底符）
     */
    clearMaterialsAndNeutralizer() {
        // 清除材料槽位
        document.querySelectorAll('.material-slots .item-slot').forEach(slot => {
            slot.innerHTML = '';
            slot.classList.remove('has-item');
        });
        
        // 清除中和剂槽位
        const neutralizerSlot = document.getElementById('neutralizer-slot');
        if (neutralizerSlot) {
            neutralizerSlot.innerHTML = '';
            neutralizerSlot.classList.remove('has-item');
        }
    }
    
    /**
     * 更新材料槽位显示
     * @param {number} count - 材料槽位数
     */
    updateMaterialSlots(count) {
        const slots = document.querySelectorAll('.material-slots .item-slot');
        slots.forEach((slot, index) => {
            if (index < count) {
                slot.classList.remove('hidden');
            } else {
                slot.classList.add('hidden');
            }
        });
    }
    
    /**
     * 更新丹方要求
     * @param {Object} recipe - 丹方对象
     */
    updateRecipeRequirements(recipe) {
        const requirementsList = document.querySelector('.requirements-list');
        if (!requirementsList) return;
        
        requirementsList.innerHTML = '';
        
        // 计算材料的五行比例
        const materialRatios = this.calculateMaterialRatios();
        
        // 显示正常的丹方要求
        console.warn('显示正常的丹方要求:',recipe.att);
        for (let i = 0;i < recipe.att.length;i++) {
            let {ele, value} = recipe.att[i];
            let requirementItem = document.createElement('div');
            requirementItem.className = 'requirement-item';
            
            let actualValue = materialRatios[ele] || 0;
            let isSatisfied = actualValue >= value;
            
            requirementItem.className += isSatisfied ? ' satisfied' : ' unsatisfied';
            
            requirementItem.innerHTML = `
                <span>${DEFINE.ELEMENTS[ele]}: ${value*100}%</span>
                <span>${actualValue}%</span>
            `;
            requirementsList.appendChild(requirementItem);
        }
        
        // 显示炸炉条件
        if (recipe.broken) {
            // 添加炸炉条件标题
            const explodeTitle = document.createElement('div');
            explodeTitle.className = 'explode-title';
            explodeTitle.innerHTML = '<span style="color: #ff4444; font-weight: bold; text-align: center; display: block;">炸炉条件：</span>';
            requirementsList.appendChild(explodeTitle);
            
            // 添加炸炉条件
            for (let i = 0;i < recipe.broken.length;i++) {
                let {ele, min,max} = recipe.broken[i];
                let explodeItem = document.createElement('div');
                explodeItem.className = 'explode-condition';
                
                let actualValue = materialRatios[ele] || 0;
                let isExplode = actualValue >= min && actualValue <= max;
                explodeItem.className += isExplode ? ' explode' : ' safe';
                explodeItem.innerHTML = `
                    <span>${DEFINE.ELEMENTS[ele]}: ${min*100}%-${max*100}%</span>
                    <span>${actualValue}%</span>
                `;
                requirementsList.appendChild(explodeItem);
            }
        }
    }
    
    /**
     * 计算成功率
     * @param {Object} recipe - 丹方对象
     */
    calculateRecipeSuccessRate(recipe) {
        // 初始化成功率为0%
        let successRate = 0;
        
        // 检查是否有保底符
        const talismanSlot = document.getElementById('talisman-slot');
        const hasTalisman = talismanSlot && talismanSlot.classList.contains('has-item');
        
        // 计算材料的五行比例
        const materialRatios = this.calculateMaterialRatios();
        console.log('--当前材料五行比例:', materialRatios);//{1: 28, 2: 56, 3: 17, 4: 0, 5: 0}
        console.warn('--当前丹方要求:',recipe);  
        // 检查丹方要求并计算成功率
        if (recipe && recipe.att) {
            const totalRequirements = recipe.att.length;
            if (totalRequirements <= 0) {return;}
            // 每条满足的要求数
            let metRequirements = 0;
            // 遍历丹方要求
            for (let i = 0;i < recipe.att.length;i++) {
                let {ele, value} = recipe.att[i];
                let actualValue = materialRatios[ele] || 0;
                if (actualValue >= value) {
                    metRequirements++;
                }
            }
            // 计算基础成功率：每条满足的要求增加 (100 / 总要求数) %
            const successPerRequirement = 100 / totalRequirements;
            successRate = metRequirements * successPerRequirement;
            // 打印日志
            console.log('丹方要求总数:', totalRequirements);
            console.log('满足的要求数:', metRequirements);
            console.log('每条要求成功率:', successPerRequirement.toFixed(2) + '%');
            console.log('基础成功率:', successRate.toFixed(2) + '%');
        }
        
        // 如果有保底符，额外提升20%成功率
        if (hasTalisman) {
            successRate += 20;
            console.log('保底符加成: +20%');
        }
        
        // 检查炸炉条件，有炸炉条件降低成功率
        let hasExplodeCondition = false;
        if (recipe && recipe.broken) {
            for (let i = 0;i < recipe.broken.length;i++) {
                let {ele, min,max} = recipe.broken[i];
                let ratio = materialRatios[ele] || 0;
                console.log(`当前材料 ${DEFINE.ELEMENTS[ele]} 比例: ${ratio}, 炸炉条件: ${min}-${max}}`);
                if (ratio >= min*100 && ratio <= max*100) {
                    hasExplodeCondition = true;
                    break;
                }
            }
        }
        
        if (hasExplodeCondition) {
            successRate = Math.max(0, successRate - 30);
            console.log('炸炉条件扣除: -30%');
        }
        
        // 成功率不能超过100%
        successRate = Math.min(100, successRate);
        console.log('最终成功率:', successRate.toFixed(2) + '%');
        
        // 更新成功率显示
        const successRateValue = document.getElementById('success-rate-value');
        if (successRateValue) {
            successRateValue.textContent = `${Math.round(successRate)}%`;
            
            // 更新颜色
            successRateValue.className = '';
            if (successRate >= 80) {
                successRateValue.classList.add('high');
            } else if (successRate >= 40) {
                successRateValue.classList.add('medium');
            } else {
                successRateValue.classList.add('low');
            }
        }
        
        return successRate;
    }
    
    /**
     * 计算材料的五行比例
     * @returns {Object} 五行比例对象
     */
    calculateMaterialRatios() {
        // 初始化五行比例
        const ratios = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        };
        
        // 总数值
        let totalValue = 0;
        
        // 获取所有材料槽位
        const materialSlots = document.querySelectorAll('.material-slots .item-slot');
        
        // 遍历材料槽位
        materialSlots.forEach(slot => {
            if (slot.classList.contains('has-item')) {
                const materialId = slot.dataset.materialId;
                const quantity = parseInt(slot.dataset.quantity) || 1;
                
                // 获取材料信息
                const material = dataMgr.getPropInTable(materialId);
                if (material && material.att) {
                    // 遍历材料的属性
                    material.att.forEach(att => {
                        if (ratios.hasOwnProperty(att.ele)) {
                            const value = att.value * quantity;
                            ratios[att.ele] += value;
                            totalValue += value;    
                        }
                    });
                }
            }
        });
        
        // 计算百分比
        if (totalValue > 0) {
            Object.keys(ratios).forEach(element => {
                ratios[element] = Math.round((ratios[element] / totalValue) * 100);
            });
        }
        
        return ratios;
    }
    
    /**
     * 根据元素ID获取元素键名
     * @param {number} eleId - 元素ID
     * @returns {string} 元素键名
     */
    getElementKey(eleId) {
        const elementMap = {
            1: 'metal',
            2: 'wood',
            3: 'water',
            4: 'fire',
            5: 'earth'
        };
        return elementMap[eleId] || null;
    }
    
    /**
     * 根据元素键名获取元素ID
     * @param {string} elementKey - 元素键名
     * @returns {number} 元素ID
     */
    getElementId(elementKey) {
        const elementMap = {
            metal: 1,
            wood: 2,
            water: 3,
            fire: 4,
            earth: 5
        };
        return elementMap[elementKey] || 0;
    }
    
    /**
     * 开始炼丹
     */
    startAlchemy() {
        const recipeSelect = document.getElementById('recipe-select');
        const recipeId = recipeSelect.value;
        
        if (!recipeId) {
            this.showAlchemyToast('请选择丹方');
            return;
        }
        
        // 显示进度条
        const progress = document.getElementById('alchemy-progress');
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        if (progress && progressFill && progressText) {
            progress.classList.remove('hidden');
            
            let timeLeft = 5;
            let progressValue = 0;
            
            const interval = setInterval(() => {
                timeLeft--;
                progressValue = ((5 - timeLeft) / 5) * 100;
                progressFill.style.width = `${progressValue}%`;
                progressText.textContent = `${timeLeft}s`;
                
                if (timeLeft <= 0) {
                    clearInterval(interval);
                    this.finishAlchemy(recipeId);
                }
            }, 1000);
        }
    }
    
    /**
     * 完成炼丹
     * @param {string} recipeId - 丹方ID
     */
    finishAlchemy(recipeId) {
        // 隐藏进度条
        const progress = document.getElementById('alchemy-progress');
        if (progress) {
            progress.classList.add('hidden');
        }
        const recipe = dataMgr.getPropInTable(recipeId);
        // 计算成功率
        const successRate = this.calculateRecipeSuccessRate(recipe);
        // 模拟炼丹结果
        let isSuccess = Math.random() * 100 < successRate;
        if (isSuccess) {// 成功
            let lv = this.getPillQuality(recipe);
            this.showAlchemyToast(`炼丹成功！获得${DRUG_QualityName[lv]}品级的丹药：${recipe.name}`);
            //根据丹药品级修改数值
            let newAtt = [];
            for(let i=0;i<recipe.att.length;i++){
                newAtt.push({
                    type: recipe.att[i].type,
                    value: recipe.att[i].value * DRUG_LVArg[lv]
                });
            }
            //成丹数据
            let drugInfo = {
                type: recipe.type,
                id: recipe.id,
                lv: lv,
                quality: recipe.quality,
                att: newAtt
            }
            // 将成丹添加到玩家背包中
            dataMgr.addProp(drugInfo);
            
            // 炼丹成功，获得基础经验 5 点 + 成丹品级额外经验
            const baseExp = 5;
            const bonusExp = DEFINE.DRUG_ExpPoint[lv] || 0;
            dataMgr.addAlchemyExp(baseExp + bonusExp);
            
            // 如果成功率100%，固化丹方
            if (successRate === 100) {
                this.saveReciped(recipeId);
            }
        } else {
            // 失败，获得 2 点经验
            this.showAlchemyToast('炼丹失败');
            dataMgr.addAlchemyExp(2);
        }
    }
    
    
    
    /**
     * 获取丹药品级
     * @param {Object} recipe - 丹方对象
     * @returns {number} 品级
     */
    getPillQuality(recipe){
        let rand = Math.random(),lv=1;
        if(rand < 0.05){
            lv=6;
        }else if(rand < 0.2){
            lv=5;
        }else if(rand < 0.5){
            lv=4;
        }else if(rand < 0.8){
            lv=3;
        }else if(rand < 0.95){
            lv=2;
        }else{
            lv=1;
        }
        
        // 检查炸炉条件是否成立
        const materialRatios = this.calculateMaterialRatios();
        let hasExplodeCondition = false;
        
        if (recipe && recipe.broken) {
            for (const [element, range] of recipe.broken) {
                const ratio = materialRatios[element] || 0;
                if (ratio >= range.min && ratio <= range.max) {
                    hasExplodeCondition = true;
                    break;
                }
            }
        }
        
        // 如果炸炉条件成立，下调成丹品级
        if (hasExplodeCondition) {
            // 降低随机值，使品级下降
            lv -= 1;
        }
        if(lv < 1){
            lv=1;
        }
        return lv;
    }
    
    /**
     * 固化丹方
     * @param {string} recipeId - 丹方ID
     */
    saveReciped(recipeId) {
        // 这里应该保存固化的丹方到角色数据
        console.log('固化丹方:', recipeId);
    }
    
    /**
     * 清除炼丹状态
     */
    clearAlchemyState() {
        // 清空材料槽位
        document.querySelectorAll('.item-slot').forEach(slot => {
            slot.innerHTML = '';
            slot.classList.remove('has-item');
        });
        
        // 清空要求列表
        const requirementsList = document.querySelector('.requirements-list');
        if (requirementsList) {
            requirementsList.innerHTML = '';
        }
        
        // 重置成功率
        const successRateValue = document.getElementById('success-rate-value');
        if (successRateValue) {
            successRateValue.textContent = '0%';
            successRateValue.className = '';
        }
    }
    
    /**
     * 显示炼丹提示
     * @param {string} message - 提示信息
     */
    showAlchemyToast(message) {
        console.log('[UIManager.showAlchemyToast]', message);
        const toast = document.createElement('div');
        toast.className = 'equipment-toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('hidden');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 2000);
        }, 2000);
    }    
    // 出售相关方法
    openSellModal() {
        const modal = document.getElementById('sell-modal');
        if (modal) {
            modal.classList.remove('hidden');
            // 初始化出售数量为1
            document.getElementById('sell-quantity').textContent = '1';
            this.updateSellTotal();
        }
    }
    
    closeSellModal() {
        const modal = document.getElementById('sell-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }
    
    adjustSellQuantity(delta) {
        const quantityElement = document.getElementById('sell-quantity');
        if (!quantityElement) return;
        
        let quantity = parseInt(quantityElement.textContent) || 1;
        const maxQuantity = this.currentMaterial ? this.currentMaterial.count : 1;
        
        if (delta < 0 && quantity <= 1) {
            // 已经是最少出售一份
            this.showAlchemyToast('最少出售一份');
            return;
        }
        
        if (delta > 0 && quantity >= maxQuantity) {
            // 数量已达最大值
            this.showAlchemyToast('数量已达最大值');
            return;
        }
        
        quantity = Math.max(1, Math.min(maxQuantity, quantity + delta));
        quantityElement.textContent = quantity;
        this.updateSellTotal();
    }
    
    updateSellTotal() {
        const quantityElement = document.getElementById('sell-quantity');
        const totalElement = document.getElementById('sell-total');
        if (!quantityElement || !totalElement) return;
        
        const quantity = parseInt(quantityElement.textContent) || 1;
        // 假设售价为10金币每个
        const price = 10;
        const total = quantity * price;
        totalElement.textContent = `总价：${total} 金币`;
    }
    //确定售卖道具
    confirmSell() {
        const quantityElement = document.getElementById('sell-quantity');
        if (!quantityElement || !this.currentMaterial) return;
        
        const quantity = parseInt(quantityElement.textContent) || 1;
        const price = 10; // 假设售价为10金币每个
        const total = quantity * price;
        
        // 增加金币到角色数据
        let costSuc = dataMgr.costProp(this.currentMaterial.materialId, quantity);
        if(costSuc){
            dataMgr.addGold(total);
        }
        let leftNum = dataMgr.getItemCount(this.currentMaterial.materialId);
        if(leftNum > 0){
            // 道具还有剩余，刷新道具详情页面
            this.openMaterialDetailModal(
                this.currentMaterial.type, 
                this.currentMaterial.materialId, 
                leftNum
            );  
        }else{
            // 道具已售罄，关闭道具详情弹窗
            this.closeMaterialDetailModal();
        }
        //刷新仓库列表的显示
        this.updateInventoryList('all');
        
        this.closeSellModal();
    }
    /**
     * 材料选择弹窗中的 数量调整点击函数
     * @param {number} delta - 数量变化值
     */
    adjustMaterialQuantity(delta) {
        const quantityDisplay = document.getElementById('material-quantity');
        const countElement = document.getElementById('selected-item-count');
        if (quantityDisplay && countElement && window.game && uiMgr) {
            let currentValue = parseInt(quantityDisplay.textContent) || 1;
            currentValue = Math.max(1, currentValue + delta);
            // 不超过最大数量
            if (uiMgr.maxQuantity) {
                currentValue = Math.min(currentValue, uiMgr.maxQuantity);
            }
            quantityDisplay.textContent = currentValue;
            countElement.textContent = `x${currentValue}`;
        }
    }
    
    /**
     * 从config.json加载商城商品列表
     */
    loadShopItems() {
        const shopContainer = document.getElementById('shop-items-container');
        if (!shopContainer) {
            console.warn('loadShopItems: shop container not found');
            return;
        }
        if (!dataMgr || !dataMgr.config || !dataMgr.config.mall) {
            console.warn('loadShopItems: config or mall not found');
            return;
        }
        
        // 清空现有商品
        shopContainer.innerHTML = '';
        
        // 从config.json的mall数组中读取商品
        const mallItems = dataMgr.config.mall;
        console.log(`loadShopItems: loading ${mallItems.length} items from mall config`);
        
        mallItems.forEach(item => {
            const { id, price } = item;
            
            // 获取商品名称和描述
            let itemName = id;
            let itemDesc = '';
            
            // 从items配置中获取商品信息
            const itemInfo = dataMgr.getPropInTable(id);
            if (itemInfo) {
                itemName = itemInfo.name || itemName;
                itemDesc = itemInfo.description || itemDesc;
            } else {
                //  fallback到默认名称
                switch (id) {
                    case 'skill_book':
                        itemName = '技能书';
                        itemDesc = '用于学习和升级技能';
                        break;
                    case 'qingling_water':
                        itemName = '轻灵水';
                        itemDesc = '炼丹材料，作为中和剂使用';
                        break;
                    case 'quartz_sand':
                        itemName = '石英砂';
                        itemDesc = '炼器材料，可增强装备';
                        break;
                    case 'laojun_dew':
                        itemName = '老君仙露';
                        itemDesc = '炼丹保底符，提升 20% 成功率并提升丹药品级';
                        break;
                    case 'stone_fire':
                        itemName = '石中火';
                        itemDesc = '炼器保底符，成功后额外增加 20% 属性或 5% 特殊属性的出现概率';
                        break;
                    case 'treasure_mirror':
                        itemName = '百宝鉴';
                        itemDesc = '查看材料隐藏属性，每次使用减少1点耐久度 100';
                        break;
                    case 'hp_potion':
                        itemName = '气血丹';
                        itemDesc = '立即恢复 50 点气血';
                        break;
                    case 'mp_potion':
                        itemName = '法力丹';
                        itemDesc = '立即恢复 30 点法力';
                        break;
                    case 'recipe_health':
                        itemName = '气血丹方';
                        itemDesc = '用于炼制气血丹';
                        break;
                    case 'recipe_mana':
                        itemName = '法力丹方';
                        itemDesc = '用于炼制法力丹';
                        break;
                    case 'recipe_strength':
                        itemName = '力量丹方';
                        itemDesc = '用于炼制力量丹';
                        break;
                    case 'recipe_defense':
                        itemName = '防御丹方';
                        itemDesc = '用于炼制防御丹';
                        break;
                    case 'recipe_speed':
                        itemName = '速度丹方';
                        itemDesc = '用于炼制速度丹';
                        break;
                    case 'recipe_critical':
                        itemName = '暴击丹方';
                        itemDesc = '用于炼制暴击丹';
                        break;
                    case 'recipe_evasion':
                        itemName = '闪避丹方';
                        itemDesc = '用于炼制闪避丹';
                        break;
                    case 'recipe_regen':
                        itemName = '回复丹方';
                        itemDesc = '用于炼制回复丹';
                        break;
                    case 'recipe_attack':
                        itemName = '攻击丹方';
                        itemDesc = '用于炼制攻击丹';
                        break;
                    case 'recipe_magic':
                        itemName = '魔法丹方';
                        itemDesc = '用于炼制魔法丹';
                        break;
                }
            }
            
            // 创建商品元素
            const shopItem = document.createElement('div');
            shopItem.className = 'shop-item';
            shopItem.dataset.item = id;
            shopItem.dataset.price = price;
            
            shopItem.innerHTML = `
                <div class="shop-item-info">
                    <span class="shop-item-name">${itemName}</span>
                    <span class="shop-item-desc">${itemDesc}</span>
                </div>
                <div class="shop-item-action">
                    <span class="shop-item-price">💰 ${price}</span>
                </div>
            `;
            
            // 绑定点击事件
            shopItem.addEventListener('click', (e) => {
                const itemType = e.currentTarget.dataset.item;
                const itemPrice = parseInt(e.currentTarget.dataset.price);
                if (itemType && itemPrice) {
                    this.openBuyModal(itemType, itemPrice);
                }
            });
            
            shopContainer.appendChild(shopItem);
        });
    }
    
    /**
     * 初始化化凡炼心数据
     */
    initCultivationData() {
        let roleD = dataMgr.getRoleData();
        if (!roleD.world) {
            roleD.world = {
                currentLocation: 'yinlong',
                spiritFields: {}, 
                shopRentals: {}, 
                materials: {}, 
                cultivation: {lv:1,max:10,progress:0,completed:[]},
                auctions: {}, 
                searchs: {date:'',locations:[]},
                finds: {date:'',locations:[]}, 
            };
        }
        
        if (!roleD.world.cultivation) {
            roleD.world.cultivation = {
                lv: 1,
                max: 10,
                exp: 0,
                count: 0,
                date: '',
                progress: 0,
                completed: []
            };
        }
    }
    
    /**
     * 境界名称数组
     */
    realmNames = [
        '炼气一层', '炼气二层', '炼气三层', '炼气四层', '炼气五层',
        '筑基一层', '筑基二层', '筑基三层', '筑基四层', '筑基五层',
        '金丹一层', '金丹二层', '金丹三层', '金丹四层', '金丹五层'
    ];
    
    /**
     * 显示化凡炼心页面
     */
    showCultivationPanel() {
        this.initCultivationData();
        
        const panel = document.getElementById('cultivation-panel');
        if (!panel) return;
        
        // 隐藏世界面板
        const worldTab = document.getElementById('tab-world');
        if (worldTab) worldTab.classList.add('hidden');
        
        // 显示化凡炼心面板
        panel.classList.remove('hidden');
        
        // 更新显示
        this.updateCultivationDisplay();
        
        // 绑定按钮事件
        this.bindCultivationEvents();
    }
    
    /**
     * 隐藏化凡炼心页面
     */
    hideCultivationPanel() {
        const panel = document.getElementById('cultivation-panel');
        if (panel) panel.classList.add('hidden');
        
        // 显示世界面板
        const worldTab = document.getElementById('tab-world');
        if (worldTab) worldTab.classList.remove('hidden');
    }
    
    /**
     * 绑定化凡炼心事件
     */
    bindCultivationEvents() {
        // 返回按钮
        const backBtn = document.getElementById('cultivation-back');
        if (backBtn) {
            backBtn.onclick = () => this.hideCultivationPanel();
        }
        
        // 规则按钮
        const ruleBtn = document.getElementById('cultivation-rule-btn');
        if (ruleBtn) {
            ruleBtn.onclick = () => this.showCultivationRulePanel();
        }
        
        // 化凡按钮
        const cultivationBtn = document.getElementById('cultivation-btn');
        if (cultivationBtn) {
            cultivationBtn.onclick = () => this.performCultivation();
        }
    }
    
    /**
     * 更新化凡炼心显示
     */
    updateCultivationDisplay() {
        this.initCultivationData();
        let roleD = dataMgr.getRoleData();
        const cultivation = roleD.world.cultivation;
        const today = new Date().toDateString();
        
        // 如果是新的一天，重置次数
        if (cultivation.date !== today) {
            cultivation.count = 0;
            cultivation.date = today;
            dataMgr.saveLocal();
        }
        
        // 更新化凡次数显示
        const countElement = document.getElementById('cultivation-count');
        if (countElement) countElement.textContent = `${cultivation.count}/5`;
        
        // 更新境界显示
        const currentRealm = this.realmNames[cultivation.lv - 1] || '炼气一层';
        const nextRealm = this.realmNames[cultivation.lv] || '炼气二层';
        
        const currentRealmElement = document.getElementById('realm-current');
        const nextRealmElement = document.getElementById('realm-next');
        
        if (currentRealmElement) currentRealmElement.textContent = currentRealm;
        if (nextRealmElement) nextRealmElement.textContent = nextRealm;
        
        // 计算境界进度
        const expNeeded = this.getExpNeededForLevel(cultivation.lv);
        const progressPercent = Math.min(100, (cultivation.exp / expNeeded) * 100);
        
        const progressFill = document.getElementById('realm-progress-fill');
        if (progressFill) progressFill.style.width = `${progressPercent}%`;
        
        // 更新瓶子水位
        const bottleWater = document.getElementById('bottle-water');
        if (bottleWater) {
            bottleWater.style.height = `${progressPercent}%`;
            // 设置渐变色
            bottleWater.style.background = `linear-gradient(to right, #87ceeb, #000)`;
        }
        
        // 更新化凡按钮状态
        const cultivationBtn = document.getElementById('cultivation-btn');
        if (cultivationBtn) {
            cultivationBtn.disabled = cultivation.count >= 5;
        }
    }
    
    /**
     * 获取升级所需经验
     * @param {number} level - 当前等级
     * @returns {number} 所需经验
     */
    getExpNeededForLevel(level) {
        return level * 100;
    }
    
    /**
     * 执行化凡炼心
     */
    performCultivation() {
        this.initCultivationData();
        let roleD = dataMgr.getRoleData();
        const cultivation = roleD.world.cultivation;
        
        // 检查次数
        if (cultivation.count >= 5) {
            alert('今日化凡炼心次数已用完！');
            return;
        }
        
        // 增加次数
        cultivation.count++;
        
        // 增加经验（随机5-15）
        const expGained = Math.floor(Math.random() * 11) + 5;
        cultivation.exp += expGained;
        
        // 检查升级
        while (cultivation.exp >= this.getExpNeededForLevel(cultivation.lv) && cultivation.lv < cultivation.max) {
            cultivation.exp -= this.getExpNeededForLevel(cultivation.lv);
            cultivation.lv++;
            alert(`恭喜！境界提升至 ${this.realmNames[cultivation.lv - 1]}！`);
        }
        
        // 保存数据
        dataMgr.saveLocal();
        
        // 更新显示
        this.updateCultivationDisplay();
        
        alert(`化凡炼心完成！获得 ${expGained} 点修炼经验！`);
    }
    
    /**
     * 显示化凡炼心规则页面
     */
    showCultivationRulePanel() {
        const modal = document.getElementById('cultivation-rule-modal');
        const content = document.getElementById('cultivation-rule-content');
        
        if (!modal || !content) return;
        
        content.innerHTML = `
            <div style="margin-bottom: 20px;">
                <h4>化凡炼心简介</h4>
                <p>化凡炼心是提升修炼境界的重要途径。通过每日修炼，可以获得修炼经验，突破境界，不断变强。</p>
            </div>
            <div style="margin-bottom: 20px;">
                <h4>修炼次数</h4>
                <p>每日最多可进行5次化凡炼心。每次修炼获得5-15点修炼经验。每日0点重置次数。</p>
            </div>
            <div style="margin-bottom: 20px;">
                <h4>境界体系</h4>
                <p>从炼气一层开始，最高可修炼到金丹五层。每突破一层需要的经验都会增加。</p>
            </div>
            <div style="margin-bottom: 20px;">
                <h4>经验计算</h4>
                <p>第N层所需经验 = N × 100。例如，炼气一层需要100经验，炼气二层需要200经验，以此类推。</p>
            </div>
        `;
        
        modal.classList.remove('hidden');
    }
}
// 导出单例实例 
const uiMgr = new UIManager();
window.uiMgr = uiMgr;

// 全局函数供 HTML 调用
function adjustQuantity(delta) {
    if (window.game && uiMgr) {
        uiMgr.adjustQuantity(delta);
    }
}

function syncQuantity(value) {
    if (window.game && uiMgr) {
        uiMgr.syncQuantity(value);
    }
}

function confirmBuy() {
    if (window.game && uiMgr) {
        uiMgr.confirmBuy();
    }
}

function closeMaterialDetailModal() {
    if (window.game && uiMgr) {
        uiMgr.closeMaterialDetailModal();
    }
}

function openMaterialDetail(type, materialId, count) {
    if (window.game && uiMgr) {
        uiMgr.openMaterialDetailModal(type, materialId, count);
    }
}

// 暴露全局函数
window.openMaterialDetail = openMaterialDetail;
window.adjustQuantity = adjustQuantity;
window.syncQuantity = syncQuantity;
window.confirmBuy = confirmBuy;
window.closeMaterialDetailModal = closeMaterialDetailModal;
window.learnRecipeFromModal = learnRecipeFromModal;

// 出售相关全局函数
function learnRecipeFromModal() {
    if (window.game && uiMgr) {
        uiMgr.learnRecipeFromModal();
    }
}

// 出售相关全局函数
function openSellModal() {
    if (window.game && uiMgr) {
        uiMgr.openSellModal();
    }
}

function closeSellModal() {
    if (window.game && uiMgr) {
        uiMgr.closeSellModal();
    }
}

function adjustSellQuantity(delta) {
    if (window.game && uiMgr) {
        uiMgr.adjustSellQuantity(delta);
    }
}

function confirmSell() {
    if (window.game && uiMgr) {
        uiMgr.confirmSell();
    }
}

function sellMaterial() {
    if (window.game && uiMgr) {
        uiMgr.sellMaterial();
    }
}

function craftMaterial() {
    if (window.game && uiMgr) {
        uiMgr.craftMaterial();
    }
}

// 暴露更多全局函数
window.openSellModal = openSellModal;
window.closeSellModal = closeSellModal;
window.adjustSellQuantity = adjustSellQuantity;
window.confirmSell = confirmSell;
window.sellMaterial = sellMaterial;
window.craftMaterial = craftMaterial;
window.selectPet = selectPet;
window.togglePet = togglePet;

function selectPet(petType) {
    if (window.game && window.game.petManager) {
        window.game.petManager.selectPet(petType);
    }
}

function togglePet() {
    if (window.game && window.game.petManager) {
        window.game.petManager.togglePet();
    }
}

// 装备弹窗相关全局函数
function closeEquipmentDetailModal() {
    if (window.game && uiMgr) {
        uiMgr.closeEquipmentDetailModal();
    }
}

function closeEquipmentCompareModal() {
    if (window.game && uiMgr) {
        uiMgr.closeEquipmentCompareModal();
    }
}

// ====== js\ui\joystick.js ======
// ==================== 摇杆控制器 ====================
class JoystickController {
    constructor(baseElement, thumbElement) {
        this.base = baseElement;
        this.thumb = thumbElement;
        this.active = false;
        this.direction = { x: 0, y: 0 };
        this.maxRadius = 40;
        
        this.bindEvents();
    }
    
    bindEvents() {
        const joystickArea = document.getElementById('joystick-area');
        
        // Touch events
        joystickArea.addEventListener('touchstart', (e) => this.onStart(e));
        joystickArea.addEventListener('touchmove', (e) => this.onMove(e));
        joystickArea.addEventListener('touchend', (e) => this.onEnd(e));
        joystickArea.addEventListener('touchcancel', (e) => this.onEnd(e));
        
        // Mouse events
        joystickArea.addEventListener('mousedown', (e) => this.onStart(e));
        document.addEventListener('mousemove', (e) => this.onMove(e));
        document.addEventListener('mouseup', (e) => this.onEnd(e));
    }
    
    onStart(e) {
        e.preventDefault();
        this.active = true;
        const touch = e.touches ? e.touches[0] : e;
        this.update(touch.clientX, touch.clientY);
    }
    
    onMove(e) {
        if (!this.active) return;
        e.preventDefault();
        const touch = e.touches ? e.touches[0] : e;
        this.update(touch.clientX, touch.clientY);
    }
    
    onEnd(e) {
        this.active = false;
        this.direction = { x: 0, y: 0 };
        this.thumb.style.transform = 'translate(-50%, -50%)';
    }
    
    update(touchX, touchY) {
        const rect = this.base.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        let dx = touchX - centerX;
        let dy = touchY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > this.maxRadius) {
            dx = dx / dist * this.maxRadius;
            dy = dy / dist * this.maxRadius;
        }
        
        this.direction.x = dx / this.maxRadius;
        this.direction.y = dy / this.maxRadius;
        
        this.thumb.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    }
    
    isHolding() {
        return this.active && (Math.abs(this.direction.x) > 0.1 || Math.abs(this.direction.y) > 0.1);
    }
    
    getDirection() {
        return this.direction;
    }
}

// ====== js\game.js ======
// ==================== 主游戏类 ====================
// [BUNDLE] removed import
// [BUNDLE] removed import
// [BUNDLE] removed import
// [BUNDLE] removed import

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
        let width = container.clientWidth;
        let height = container.clientHeight;
        
        // 修复 Exeify/WebView 中 container.clientWidth 可能为 0 的问题
        // 使用 window.innerWidth/Height 作为 fallback
        if (width === 0 || height === 0) {
            console.warn('resizeCanvas: container size is 0, using window.innerWidth/Height as fallback');
            width = window.innerWidth;
            height = window.innerHeight;
        }
        
        if (width === 0 || height === 0) {
            console.warn('resizeCanvas: still 0, retrying via RAF');
            requestAnimationFrame(() => this.resizeCanvas());
            return;
        }
        
        this.canvas.width = width;
        this.canvas.height = height;
        
        console.log(`Canvas resized: ${width}x${height}`);
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
        
        // 确保画布在游戏界面显示后正确调整尺寸（修复 Exeify/WebView 中 canvas 为 0x0 的问题）
        this.resizeCanvas();
        
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
        // 初始化游戏循环：使用 RAF 延迟一帧，确保布局在 WebView 中完成后再启动
        this.lastTime = performance.now();
        requestAnimationFrame(() => {
            this.lastTime = performance.now();
            requestAnimationFrame((t) => this.gameLoop(t));
        });
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
        
        try {
            const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
            this.lastTime = timestamp;
            
            // === 诊断日志：第一帧输出关键变量 ===
            if (!this._diagnosticLogged) {
                this._diagnosticLogged = true;
                console.warn('=== DIAGNOSTIC: gameLoop first frame ===');
                console.warn('canvas.width:', this.canvas.width, 'canvas.height:', this.canvas.height);
                console.warn('container.clientWidth:', document.getElementById('game-container').clientWidth,
                    'clientHeight:', document.getElementById('game-container').clientHeight);
                console.warn('window.innerWidth:', window.innerWidth, 'innerHeight:', window.innerHeight);
                console.warn('devicePixelRatio:', window.devicePixelRatio);
                console.warn('cameraX:', this.cameraX, 'cameraY:', this.cameraY);
                console.warn('player:', this.player ? `x=${this.player.x},y=${this.player.y}` : 'NULL');
                console.warn('monsters.length:', this.monsters ? this.monsters.length : 'N/A');
                console.warn('state:', this.state);
                console.warn('=== DIAGNOSTIC END ===');
            }
            
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
        } catch (e) {
            console.error('=== gameLoop ERROR:', e.message, e.stack);
            // 出错后仍然尝试继续运行
            requestAnimationFrame((t) => this.gameLoop(t));
        }
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
