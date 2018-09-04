class TeamVo {
    /**AI当前血量 */
    public hp: number;
    /**AI最大血量 */
    public maxHp: number;
    /**队伍名字 */
    public name: string;

    public id: number;
    /**方位 */
    public dir: string;
    /**布局消耗 */
    public costcoin: number;

    public teamList: HashMap = new HashMap();

    public reset(): void {
        this.teamList.clear();
    }

    /**
     * 添加角色数据
     */
    public addAvatarNum(roleType: string, num: number = 1): void {
        if (this.teamList.has(roleType)) {
            this.teamList.put(roleType, this.teamList.get(roleType) + num);
        }
        else {
            this.teamList.put(roleType, num);
        }
    }

    public removeAvatarNum(roleType: string, num: number = 1): void {
        if (this.teamList.has(roleType)) {
            num = this.teamList.get(roleType) - num;
            if (num <= 0) {
                this.teamList.remove(roleType);
            }
            else {
                this.teamList.put(roleType, num);
            }
        }
    }

    public getLeftAvatarStr(): string {
        var str: string = "";
        var keys: any[] = this.teamList.keys;
        keys.sort((n1: any, n2: any) => {
            if (EnumAvatarType.getSortRank(n1) <= EnumAvatarType.getSortRank(n2))
                return -1;
            else
                return 1;
        })
        for (var i: number = 0, len: number = keys.length; i < len; i++) {
            str += EnumAvatarType.getNameByType(keys[i]) + " X " + this.getFullNum(this.teamList.get(keys[i])) + "\n";
        }
        return str;
    }

    public getLeftAvatarList(): string[] {
        var nameStr: string = "";
        var numStr: string = "";
        var keys: any[] = this.teamList.keys;
        keys.sort((n1: any, n2: any) => {
            if (EnumAvatarType.getSortRank(n1) <= EnumAvatarType.getSortRank(n2))
                return -1;
            else
                return 1;
        })
        for (var i: number = 0, len: number = keys.length; i < len; i++) {
            nameStr += EnumAvatarType.getNameByType(keys[i]) + "\n";
            numStr += this.teamList.get(keys[i]) + "\n";
        }
        return [nameStr, numStr];
    }

    private getFullNum(num: number): string {
        if (num < 10)
            return "0" + num;
        else
            return "" + num;
    }
}