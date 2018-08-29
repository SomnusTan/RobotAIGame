class EnumSkill {

    public static SKILL_DATA: any = { OverLordSoldier: [500], ArmourSoldier: [500], SlungshotSoldier: [500] };

    public static getSkillData(type: string): any {
        return this.SKILL_DATA[type];
    }
}