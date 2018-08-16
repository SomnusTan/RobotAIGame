class EnumAvatarType
{   
    /**AI大脑 */
    public static AI_BRAIN:string ="AiBrain";
    /**霸王兵 */
    public static OVERLORD_SOLDIER:string ="OverLordSoldier";
    /**铁甲兵 */
    public static ARMOUR_SOLDIER:string ="ArmourSoldier";
    /**飞石兵 */
    public static SLUNG_SHOT_SOLDIER:string ="SlungshotSoldier";

    /**
     * 通过类型获取名字
     */
    public static getNameByType(type:string):string
    {
        switch(type)
        {
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

}