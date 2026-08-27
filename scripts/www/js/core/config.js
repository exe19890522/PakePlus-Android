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
