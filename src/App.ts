class App {

    public static stage: egret.Stage;
    /**日志数据 */
    public static data: DataManager;
    /**场景角色数据 */
    public static role: RoleManager;
    /**地图数据 */
    public static map: MapManager;
    /**显示层级 */
    public static layer: MainLayer;
    /**全局数据 */
    public static global:GlobalManager;
    /**时间管理器 */
    public static timer:TimeCenter;
    /**资源管理器 */
    public static resource:ResManager;
    /**队伍管理器 */
    public static team:TeamManager;


    public static init(stage: egret.Stage): void {
        this.stage = stage;
        Config.STAGE_WIDTH = document.body.clientWidth; //stage.stageWidth;
        Config.STAGE_HEIGHT = document.body.clientHeight;//stage.stageHeight;
        stage.addEventListener(egret.Event.RESIZE,this.onResize,this);
        this.timer = new TimeCenter(stage);
        this.data = new DataManager();
        this.role = new RoleManager();
        this.map = new MapManager();
        this.global = new GlobalManager();
        this.resource = new ResManager();
        this.team = new TeamManager();
        this.layer = new MainLayer();
        this.stage.addChild(this.layer);
    }

    private static onResize(e:egret.Event):void
    {
        Config.STAGE_WIDTH = this.stage.stageWidth;
        Config.STAGE_WIDTH = this.stage.stageHeight;
    }
}