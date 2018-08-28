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

    public setFactory(mcFactory: dragonBones.EgretFactory): void {
        this._dragonbonesFactory = mcFactory;
        if (this._dragonbones == null) {
            this._dragonbones = this._dragonbonesFactory.buildArmatureDisplay("armatureName");
            this.addChild(this._dragonbones);
        }
    }

    public playAction(action: string, playBack: FunctionVo = null): void {
        if (this._action == action)
            return;
        this._action = action;
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