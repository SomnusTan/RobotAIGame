class SeizeBaseEffect {
    private _dragonbones: dragonBones.EgretArmatureDisplay;

    private _callBack: FunctionVo;

    public constructor() {
        this.init();
    }

    private init(): void {
        var factory: dragonBones.EgretFactory = App.resource.getDragonFactory("gongpo");
        this._dragonbones = factory.buildArmatureDisplay("shengli");
        this._dragonbones.scaleX = this._dragonbones.scaleY = 0.7;
    }

    public show(parent: egret.DisplayObjectContainer, x?: number, y?: number, callBack?: FunctionVo): void {
        if (parent)
            this.addChild(parent);
        this._callBack = callBack;
        this._dragonbones.animation.timeScale = EnumSpeed.SPEED > 2 ? 2 : EnumSpeed.SPEED;
        this._dragonbones.animation.gotoAndPlayByFrame("play", 1, 1);
        this._dragonbones.armature.addEventListener(dragonBones.AnimationEvent.COMPLETE, this.onPlayComplete, this);
        if (x)
            this._dragonbones.x = x;
        if (y)
            this._dragonbones.y = y;
    }

    private onPlayComplete(e: dragonBones.AnimationEvent): void {
        this._dragonbones.armature.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.onPlayComplete, this);
        if (this._callBack) {
            this._callBack.exec();
        }
        this.dispose();
    }

    public addChild(parent: egret.DisplayObjectContainer): void {
        if (parent)
            parent.addChild(this._dragonbones);
    }

    public remove(): void {
        if (this._dragonbones.parent)
            this._dragonbones.parent.removeChild(this._dragonbones);
    }

    public dispose(): void {
        this._callBack = null;
        this._dragonbones.animation.stop();
        this._dragonbones.armature.dispose();
        this.remove();
        this._dragonbones = null;
    }
}