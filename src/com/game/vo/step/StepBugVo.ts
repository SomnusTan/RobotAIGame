class StepBugVo extends StepVo {
    private _targetTeamId: number;
    private _targetRoleId: number;
    private _targetAvatar: BaseAvatar;
    private _targetHp: number;
    private _targetIsAlive: number;

    private _dropHp: number;

    private _bugType: number;
    private _bugInfo: string;


    public parse(time: string, jsonData: any): void {
        super.parse(time, jsonData);
        this._dropHp = this._jsonData.drophp;
        this._targetHp = this._jsonData.dstrobot.hp;

        this._targetTeamId = this._jsonData.dstrobot.player;
        this._targetRoleId = this._jsonData.dstrobot.roleid;
        this._targetIsAlive = this._jsonData.dstrobot.isalive;

        this._bugType = this._jsonData.bugtype;
        this._bugInfo = this._jsonData.buginfo;
    }

    public toString(): string {
        var targetName: string = this._targetAvatar.vo ? this._targetAvatar.vo.name : "null";
        return `Bug[teamId:${this._targetTeamId},roleId:${this._targetRoleId},bugType:${this._bugType},bugContent:${EnumBug.BUG_LIST[this._bugType]},bugInfo:${this._bugInfo}]`;
    }

    public exec(): void {
        super.exec();
        this._targetAvatar = App.role.getRole(this._targetTeamId, this._targetRoleId);
        this._targetAvatar.showName(true, EnumSpeed.SHOW_NAME_TIME);
        GameLog.log(this.toString());
        App.sound.playSound(EnumSound.BUG);
        if (this._targetIsAlive == 1) {
            // BeHitEffect.getEffect().show(App.layer.mapLayer.effectContainer, this._targetAvatar.x, this._targetAvatar.y);
            this._targetAvatar.playAction(EnumAction.BE_HIT, new FunctionVo(this.end, this));
        }
        else {
            // DeadEffect.getEffect().show(App.layer.mapLayer.effectContainer, this._targetAvatar.x, this._targetAvatar.y);
            this._targetAvatar.playAction(EnumAction.DEAD, new FunctionVo(this.deadCallBack, this));
        }
        this._targetAvatar.vo.hp = this._targetHp;
        this._targetAvatar.playHpEffect(-this._dropHp);
        this._targetAvatar.updateHp();
        if (this._targetAvatar.vo.type == EnumAvatarType.AI_BRAIN) {
            App.menu.updateHp(this._targetAvatar.vo.teamId, this._targetAvatar.vo.hp, this._targetAvatar.vo.maxHp);
        }
    }

    private deadCallBack(): void {
        if (this._targetAvatar) {
            if (this._targetAvatar.action == EnumAction.DEAD) {
                App.team.getTeamVo(this._targetAvatar.vo.teamId).removeAvatarNum(this._targetAvatar.vo.type, 1);
                App.menu.updateTeamInfo(App.team.getTeamVo(this._targetAvatar.vo.teamId));
                this.end();
            }
        }
    }

    public dispose(): void {
        super.dispose()
        App.layer.mapLayer.clearGrid();
        this._targetAvatar = null;
    }
}