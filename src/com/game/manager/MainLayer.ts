class MainLayer extends egret.DisplayObjectContainer {

    public mapBottomLayer: egret.DisplayObjectContainer;

    public moveImage: eui.Image;
    /**地图层 */
    public mapLayer: MapLayer;
    /**菜单层 */
    public menuLayer: egret.DisplayObjectContainer;
    /**面板层 */
    public moduleLayer: egret.DisplayObjectContainer;
    /**提示层 */
    public alertLayer: egret.DisplayObjectContainer;

    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this.mapBottomLayer = new egret.DisplayObjectContainer();
        this.moveImage = new eui.Image();
        this.mapLayer = new MapLayer();
        this.menuLayer = new egret.DisplayObjectContainer();
        this.moduleLayer = new egret.DisplayObjectContainer();
        this.alertLayer = new egret.DisplayObjectContainer();
        this.addChild(this.mapBottomLayer);
        this.addChild(this.moveImage);
        this.addChild(this.mapLayer);
        this.addChild(this.menuLayer);
        this.addChild(this.moduleLayer);
        this.addChild(this.alertLayer);
    }

    public initImage(): void {
        this.moveImage.source = "space_ship_png";
        this.moveImage.x = -this.moveImage.width;
        this.moveImage.y = -this.moveImage.height;
    }

    public startMove(): void {
        this.moveImage.x = -this.moveImage.width;
        this.moveImage.y = -this.moveImage.height;
        var distance: number = Math.sqrt((Config.STAGE_WIDTH + this.moveImage.width) * (Config.STAGE_WIDTH + this.moveImage.width) + (Config.STAGE_HEIGHT + this.moveImage.height) * (Config.STAGE_HEIGHT + this.moveImage.height));
        var time: number = distance * 30;
        egret.Tween.get(this.moveImage).to({ x: Config.STAGE_WIDTH, y: Config.STAGE_HEIGHT }, time).call(this.startMove, this);
    }
}