class MapMaskContainer extends egret.Sprite {

    public maskSp: egret.Shape;

    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this.maskSp = new egret.Shape();
        this.mask = this.maskSp;
    }

    public onResize(): void {
        this.maskSp.graphics.clear();
        this.maskSp.graphics.beginFill(0);
        this.maskSp.graphics.drawRect(0, 0, Config.MAP_SCREEN_WIDTH, Config.MAP_SCREEN_HEIGHT);
        this.maskSp.graphics.endFill();
    }

}