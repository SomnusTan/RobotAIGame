class BaseAvatarVo {
    /**阵营 */
    public teamId: number;
    /**角色ID  */
    public roleId: number;
    /**血量 */
    public hp: number;
    /**最大血量 */
    public maxHp: number;
    /**名字 */
    public name: string;
    /**类型 EnumAvatarType */
    public type: string;
    /**移动一格消耗时间 */
    public moveNodeTime: number = 200;

    public constructor() {

    }



}