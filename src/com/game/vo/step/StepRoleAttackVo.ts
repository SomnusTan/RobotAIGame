class StepRoleAttackVo extends StepVo {

	private _teamId: number;
	private _roleid: number;
	private _avatar: BaseAvatar;

	private _targetTeamId: number;
	private _targetRoleId: number;
	private _targetAvatar: BaseAvatar;
	private _targetHp: number;
	private _targetIsAlive: number;

	private _dropHp: number;

	public constructor() {
		super();
	}

	public parse(time: string, jsonData: any): void {
		super.parse(time, jsonData);
		this._dropHp = this._jsonData.drophp;
		this._teamId = this._jsonData.srcrobot.player;
		this._roleid = this._jsonData.srcrobot.roleid;

		this._targetTeamId = this._jsonData.dstrobot.player;
		this._targetRoleId = this._jsonData.dstrobot.roleid;
		this._targetHp = this._jsonData.dstrobot.hp;
		this._targetIsAlive = this._jsonData.dstrobot.isalive;
	}

	public toString(): string {
		var name: string = this._avatar.vo ? this._avatar.vo.name : "null";
		var targetName: string = this._targetAvatar.vo ? this._targetAvatar.vo.name : "null";
		return `attack[teamId:${this._teamId},roleId:${this._roleid},name:${name},targetRoleId:${this._targetRoleId},targetName:${targetName}]`;
	}

	public exec(): void {
		super.exec();
		this._avatar = App.role.getRole(this._teamId, this._roleid);
		this._targetAvatar = App.role.getRole(this._targetTeamId, this._targetRoleId);

		console.log(this.toString());

		if (App.layer.mapLayer.isInCenterArea(this._avatar.col, this._avatar.row)) {
			this.showPathGrid();
			this.startAttack();
		}
		else {
			App.layer.mapLayer.moveCamera(this._avatar.col, this._avatar.row, this.doAction, this);
		}
	}

	private doAction(): void {
		this.showPathGrid();
		this.startAttack();
	}

	private showPathGrid(): void {
		App.layer.mapLayer.drawGridPath({ col: this._avatar.col, row: this._avatar.row }, null, { col: this._targetAvatar.col, row: this._targetAvatar.row });
	}

	private startAttack(): void {
		this._avatar.playAction(EnumAction.ATTACK, new FunctionVo(this.end, this));
		App.timer.doTimeOnce(this, 500, this.dealyHit);
		//还要加攻击效果
	}

	private dealyHit(): void {
		if (this._targetIsAlive == 1)
			this._targetAvatar.playAction(EnumAction.BE_HIT);
		else
			this._targetAvatar.playAction(EnumAction.DEAD, new FunctionVo(this.deadCallBack, this));
		this._targetAvatar.vo.hp = this._targetHp;
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
				this._targetAvatar = null;
			}
		}
	}

	public dispose(): void {
		super.dispose()
		App.layer.mapLayer.clearGrid();
		this._avatar = null;
	}

}