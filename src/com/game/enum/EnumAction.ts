class EnumAction {
    /**站立 */
    public static STAND: string = "idle";
    /**攻击 */
    public static ATTACK: string = "attack";
    /**移动 */
    public static MOVE: string = "idle";
    /**受击 */
    public static BE_HIT: string = "hit";
    /**死亡 */
    public static DEAD: string = "death";

    /**循环的动作列表 */
    public static LOOP_ACTION_LIST: string[] = [EnumAction.STAND, EnumAction.MOVE];
}