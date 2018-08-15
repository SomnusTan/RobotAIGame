class MainLayer extends egret.DisplayObjectContainer
{  
    /**地图层 */
    public mapLayer: MapLayer;
    /**菜单层 */
    public menuLayer: egret.DisplayObjectContainer;
    /**面板层 */
    public moduleLayer: egret.DisplayObjectContainer;
    /**提示层 */
    public alertLayer: egret.DisplayObjectContainer;

    public constructor()
    { 
        super();
        this.init();
    }

    private init(): void
    {
        this.mapLayer = new MapLayer();
        this.menuLayer = new egret.DisplayObjectContainer();
        this.moduleLayer = new egret.DisplayObjectContainer();
        this.alertLayer = new egret.DisplayObjectContainer();
        this.addChild(this.mapLayer);
        this.addChild(this.menuLayer);
        this.addChild(this.moduleLayer);
        this.addChild(this.alertLayer);
    }
}