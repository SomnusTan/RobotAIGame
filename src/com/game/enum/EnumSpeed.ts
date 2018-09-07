class EnumSpeed {
    /**每格移动速度 */
    public static MOVE_NODE_TIME: number = 200;
    /**步骤间隔 */
    public static STEP_DELAY: number = 100;
    /**创角间隔 */
    public static CREATE_ROLE_DELAY: number = 250;
    /**地图每毫秒移动多少像素 */
    public static MAP_MOVE_SPEED: number = 2;
    /**死亡消失时间 */
    public static DEAD_DISAPPEAR_TIME: number = 2000;
    /**时间倍数 */
    public static SPEED: number = 1;

    /**
     * 每格移动时间
     */
    public static getMoveNodeTime(): number {
        return this.MOVE_NODE_TIME / this.SPEED;
    }

    /**
     * 步骤间隔
     */
    public static getStepDelay(): number {
        return this.STEP_DELAY// / this.SPEED;
    }

    /**
     * 创角间隔
     */
    public static getCreateRoleDealy(): number {
        return this.CREATE_ROLE_DELAY / this.SPEED;
    }

    /**
     * 地图移动每秒多少像素
     */
    public static getMapMoveSpeed(): number {
        if(this.SPEED>=4)
            return this.MAP_MOVE_SPEED * 3;
        else
            return this.MAP_MOVE_SPEED * this.SPEED;
    }

    /**
     * 死亡消失时间
     */
    public static getDeadDisappearTime(): number {
        return this.DEAD_DISAPPEAR_TIME / this.SPEED;
    }

    public static addSpeed(): void {
        this.SPEED *= 2
        if (this.SPEED > 8)
            this.SPEED = 1;
        App.layer.mapLayer.updateRoleSpeed();
    }

}