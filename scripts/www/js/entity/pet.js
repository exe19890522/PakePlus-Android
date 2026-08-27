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