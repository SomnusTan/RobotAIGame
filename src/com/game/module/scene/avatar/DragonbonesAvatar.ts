class DragonbonesAvatar extends egret.Sprite {

    private _dragonbonesFactory: dragonBones.EgretFactory;

    private _action: string;

    private _father: BaseAvatar;

    private _playBack: FunctionVo;

    private _dragonbones: dragonBones.EgretArmatureDisplay;

    public constructor() {
        super();
    }

    public set father(value: BaseAvatar) {
        this._father = value;
    }

    public get father(): BaseAvatar {
        return this._father;
    }

    public setFactory(mcFactory: dragonBones.EgretFactory): void {
        this._dragonbonesFactory = mcFactory;
        if (this._dragonbones == null) {
            this._dragonbones = this._dragonbonesFactory.buildArmatureDisplay("armatureName");
            this.addChild(this._dragonbones);
        }
    }

    public set speed(value: number) {
        if (this._dragonbones && this._dragonbones.animation && this._action) {
            var speed: number = value > EnumAction.getActionHighestSpeed(this._action) ? EnumAction.getActionHighestSpeed(this._action) : value;
            this._dragonbones.animation.timeScale = speed;
        }
    }

    public playAction(action: string, playBack: FunctionVo = null): void {
        if (this._action == action)
            return;
        if (this._father.vo.type == EnumAvatarType.SLUNG_SHOT_SOLDIER && action == EnumAction.MOVE)
            action = EnumAction.STAND;
        else if (this._father.vo.type == EnumAvatarType.OVERLORD_SOLDIER && action == EnumAction.STAND)
            action = EnumAction.MOVE;
        this._action = action;
        this.speed = EnumSpeed.SPEED;
        this._playBack = playBack;
        if (EnumAction.LOOP_ACTION_LIST.indexOf(action) == -1) {
            this._dragonbones.armature.addEventListener(dragonBones.AnimationEvent.COMPLETE, this.onPlayComplete, this);
            this._dragonbones.animation.gotoAndPlayByFrame(this._action, 1, 1);
        }
        else {
            this._dragonbones.animation.gotoAndPlayByFrame(this._action, 1, 0);
        }
    }

    /**
     * 不循环动作完成
     */
    private onPlayComplete(e: dragonBones.AnimationEvent): void {
        this._dragonbones.armature.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.onPlayComplete, this);
        if (this._playBack) {
            this._playBack.exec(this._father);
            this._playBack = null;
        }
        if (this._action == EnumAction.DEAD) {
            this._dragonbones.animation.stop();
            egret.Tween.get(this).to({ alpha: 0 }, EnumSpeed.getDeadDisappearTime()).call(App.role.removeRole, App.role, [this._father]);
            // App.role.removeRole(this._father);
        }
        else {
            this.playAction(EnumAction.STAND);
        }
    }

    public get action(): string {
        return this._action;
    }

    public remove(): void {
        if (this.parent)
            this.parent.removeChild(this);
    }

    public dispose(): void {
        this._father = null;
        this._action = null;
        this._dragonbonesFactory = null;
        if (this._dragonbones) {
            this._dragonbones.animation.stop();
            this._dragonbones.dispose();
            if (this._dragonbones.parent)
                this._dragonbones.parent.removeChild(this._dragonbones);
            this._dragonbones = null;
        }
        this.removeEventListener(egret.Event.COMPLETE, this.onPlayComplete, this);
        this.remove();
    }

}