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
