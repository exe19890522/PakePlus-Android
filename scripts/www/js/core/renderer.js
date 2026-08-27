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
