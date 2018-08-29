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
    private _type: string;

    public resName: string;

    public constructor() {

    }

    public set type(value: string) {
        this._type = value;
        this.resName = EnumAvatarType.getResName(this._type)
    }
    /**
     * 类型 EnumAvatarType
     */
    public get type(): string {
        return this._type;
    }



}