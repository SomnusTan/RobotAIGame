class EnumAvatarType {
    /**AI大脑 */
    public static AI_BRAIN: string = "AiBrain";
    /**霸王兵 */
    public static OVERLORD_SOLDIER: string = "OverLordSoldier";
    /**铁甲兵 */
    public static ARMOUR_SOLDIER: string = "ArmourSoldier";
    /**飞石兵 */
    public static SLUNG_SHOT_SOLDIER: string = "SlungshotSoldier";

    public static RANK_LIST: string[] = [EnumAvatarType.AI_BRAIN, EnumAvatarType.OVERLORD_SOLDIER, EnumAvatarType.ARMOUR_SOLDIER, EnumAvatarType.SLUNG_SHOT_SOLDIER];

    public static RES_LIST: string[] = [EnumAvatarType.SLUNG_SHOT_SOLDIER, EnumAvatarType.ARMOUR_SOLDIER, EnumAvatarType.OVERLORD_SOLDIER, EnumAvatarType.AI_BRAIN];

    public static RES_SCALE_LIST: number[] = [0.25, 0.2, 0.3, 0.3];

    /**
     * 通过类型获取名字
     */
    public static getNameByType(type: string): string {
        switch (type) {
            case this.AI_BRAIN:
                return "AI大脑";
            case this.OVERLORD_SOLDIER:
                return "霸王兵";
            case this.ARMOUR_SOLDIER:
                return "铁甲兵";
            default:
                return "飞石兵";
        }
    }

    public static getSortRank(type: string): number {
        return this.RANK_LIST.indexOf(type);
    }

    /**
     * 获取资源ID
     */
    public static getResName(type: string): string {
        return "juese_" + (this.RES_LIST.indexOf(type) + 1);
    }

}