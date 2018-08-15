class EnumAction {
    /**站立 */
    public static STAND: string = "stand";
    /**攻击 */
    public static ATTACK: string = "attack";
    /**移动 */
    public static MOVE: string = "move";
    /**受击 */
    public static BE_HIT: string = "behit";
    /**死亡 */
    public static DEAD: string = "dead";

    /**循环的动作列表 */
    public static LOOP_ACTION_LIST: string[] = [EnumAction.STAND, EnumAction.MOVE];
}