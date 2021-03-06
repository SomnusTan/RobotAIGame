class StepSeizeBaseVo extends StepVo {

    private _teamId: number;
    private _roleid: number;
    private _avatar: BaseAvatar;
    private _dropHp: number;

    private _targetTeamId: number;
    private _targetRoleId: number;
    private _targetHp: number;
    private _targetIsAlive: number;
    private _targetAvatar: BaseAvatar;

    public parse(time: string, jsonData: any): void {
        super.parse(time, jsonData);

        this._dropHp = this._jsonData.drophp;
        this._targetHp = this._jsonData.dstrobot.hp;

        this._teamId = this._jsonData.srcrobot.player;
        this._roleid = this._jsonData.srcrobot.roleid;

        this._targetTeamId = this._jsonData.dstrobot.player;
        this._targetRoleId = this._jsonData.dstrobot.roleid;
        this._targetIsAlive = this._jsonData.dstrobot.isalive;
    }

    public toString(): string {
        var name: string = this._avatar.vo ? this._avatar.vo.name : "null";
        var targetName: string = this._targetAvatar.vo ? this._targetAvatar.vo.name : "null";
        return `SeizeBase[teamId:${this._teamId},roleId:${this._roleid},name:${name},targetRoleId:${this._targetRoleId},targetName:${targetName}]`;
    }

    public exec(): void {
        super.exec();
        this._avatar = App.role.getRole(this._teamId, this._roleid);
        this._targetAvatar = App.role.getRole(this._targetTeamId, this._targetRoleId);

        this._avatar.showName(true, EnumSpeed.SHOW_NAME_TIME);
        this._targetAvatar.showName(true, EnumSpeed.SHOW_NAME_TIME);

        GameLog.log(this.toString());
        new SeizeBaseEffect().show(this._targetTeamId, App.layer.alertLayer, Config.STAGE_WIDTH >> 1, Config.STAGE_HEIGHT >> 1, new FunctionVo(this.updateHp, this));
    }

    private updateHp():void{
        if (this._targetIsAlive == 1) {
            BeHitEffect.getEffect().show(App.layer.mapLayer.effectContainer, this._targetAvatar.x, this._targetAvatar.y);
            this._targetAvatar.playAction(EnumAction.BE_HIT, new FunctionVo(this.end, this));
        }
        else {
            DeadEffect.getEffect().show(App.layer.mapLayer.effectContainer, this._targetAvatar.x, this._targetAvatar.y);
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
        if (this._targetAvatar&&this._targetIsAlive == 0) {
            App.team.getTeamVo(this._targetAvatar.vo.teamId).removeAvatarNum(this._targetAvatar.vo.type, 1);
            App.menu.updateTeamInfo(App.team.getTeamVo(this._targetAvatar.vo.teamId));
        }
        this.end();
    }

    public dispose(): void {
        super.dispose()
        App.layer.mapLayer.clearGrid();
        this._targetAvatar = null;
        this._avatar = null;
    }
}