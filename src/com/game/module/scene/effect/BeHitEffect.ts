class BeHitEffect {

    private static _pool: BeHitEffect[];

    private _dragonbones: dragonBones.EgretArmatureDisplay;

    public constructor() {
        this.init();
    }

    private init(): void {
        var factory: dragonBones.EgretFactory = App.resource.getDragonFactory("NPC_blow");
        this._dragonbones = factory.buildArmatureDisplay("Armature");
        this._dragonbones.scaleX = this._dragonbones.scaleY = 0.25;
    }

    public show(parent: egret.DisplayObjectContainer, x?: number, y?: number): void {
        if (parent)
            this.addChild(parent);
        this._dragonbones.animation.timeScale = EnumSpeed.SPEED > 2 ? 2:EnumSpeed.SPEED;
        this._dragonbones.animation.gotoAndPlayByFrame("Effect_hit_animation", 1, 1);
        this._dragonbones.armature.addEventListener(dragonBones.AnimationEvent.COMPLETE, this.onPlayComplete, this);
        if (x)
            this._dragonbones.x = x;
        if (y)
            this._dragonbones.y = y - 70;
    }

    private onPlayComplete(e: dragonBones.AnimationEvent): void {
        this._dragonbones.armature.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.onPlayComplete, this);
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
        this._dragonbones.animation.stop();
        this.remove();

    }

    public static getEffect(): BeHitEffect {
        if (this._pool == null)
            this._pool = [];
        if (this._pool.length > 0)
            return this._pool.shift();
        return new BeHitEffect();
    }

    public static restory(obj: BeHitEffect): void {
        if (obj && this._pool.indexOf(obj) == -1) {
            this._pool.push(obj);
        }
    }
}