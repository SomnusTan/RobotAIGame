class EnumAction {
    /**站立 */
    public static STAND: string = "idle";
    /**攻击 */
    public static ATTACK: string = "attack";
    /**移动 */
    public static MOVE: string = "run";
    /**受击 */
    public static BE_HIT: string = "hit";
    /**死亡 */
    public static DEAD: string = "death";

    /**循环的动作列表 */
    public static LOOP_ACTION_LIST: string[] = [EnumAction.STAND, EnumAction.MOVE];
    /**动作基本速度比例 */
    public static ACTION_BASE_SPEED: any = { idle: 0.7, attack: 0.6, run: 0.7, hit: 0.6, death: 1 };
    public static ACTION_HIGHEST_SPEED: any = { idle: 2, attack: 2, run: 2, hit: 2, death: 2 };

    public static getActionBaseSpeed(action: string): number {
        return this.ACTION_BASE_SPEED[action];
    }

    public static getActionHighestSpeed(action:string):number{
        return this.ACTION_HIGHEST_SPEED[action];
    }
}