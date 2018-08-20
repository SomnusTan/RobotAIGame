class EnumSpeed {
    /**每格移动速度 */
    public static MOVE_NODE_TIME: number = 200;
    /**步骤间隔 */
    public static STEP_DELAY: number = 100;
    /**时间倍数 */
    public static SPEED: number = 1;

    /**
     * 每格移动速度
     */
    public static getMoveNodeTime(): number {
        return this.MOVE_NODE_TIME / this.SPEED
    }

    /**
     * 步骤间隔
     */
    public static getStepDelay(): number {
        return this.STEP_DELAY / this.SPEED;
    }

    public static addSpeed(): void {
        this.SPEED *= 2
        if (this.SPEED > 8)
            this.SPEED = 1;
    }

}