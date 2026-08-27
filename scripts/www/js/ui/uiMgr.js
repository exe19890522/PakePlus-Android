// ==================== UI 管理器 ====================

import { dataMgr } from "../core/dataMgr.js";
import Player from "../entity/player.js";

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
export const uiMgr = new UIManager();
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
