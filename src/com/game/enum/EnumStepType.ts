/**
 * 日志类型枚举
 */
class EnumStepType {
    /**用来定义参与Pk的两个战队的名字,是第一条 */
    public static TEAM_INFO: string = "CPlayerNameLog";

    /**参与游戏的两方初始化的兵力布局信息 */
    public static TEAM_INIT: string = "CPlayerInitMapLog";

    /**开始第几个回合 */
    public static ROUND_CHANGE: string = "CBeginRound";

    /**具体哪个兵行走的信息 */
    public static ROLE_MOVE: string = "CRobotWalk";

    /**具体哪个兵进行攻击的信息 */
    public static ROLE_ATTACK: string = "CRobotAttack";

    /**游戏胜负的日志，最后一条 */
    public static RESULT: string = "CPlayerWinLog";

    /**占领大本营 */
    public static SEIZE_BASE: string = "CAttackPeerBase";

    /**AI大脑不在安全区而掉血 */
    public static AI_DROP_HP: string = "CRobotDropHpNotInSafe";
    
    /**bug引起AI大脑掉血 */
    public static BUG: string = "CRobotBug";

}