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
    public static global: GlobalManager;
    /**时间管理器 */
    public static timer: TimeCenter;
    /**资源管理器 */
    public static resource: ResManager;
    /**队伍管理器 */
    public static team: TeamManager;
    /**主菜单 */
    public static menu: Menu;
    /**声音管理器 */
    public static sound: MusicManager;


    public static init(stage: egret.Stage): void {
        this.stage = stage;
        this.stage.scaleMode = egret.StageScaleMode.NO_SCALE;
        this.onResize();
        stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
        this.timer = new TimeCenter(stage);
        this.data = new DataManager();
        this.role = new RoleManager();
        this.map = new MapManager();
        this.global = new GlobalManager();
        this.resource = new ResManager();
        this.team = new TeamManager();
        this.layer = new MainLayer();
        this.sound = new MusicManager();
        this.stage.addChild(this.layer);

        var data: any = RES.getRes("Config_json");
        Config.playMoveSound = data.moveSound;
        Config.playCreateSound = data.createSound;
    }

    private static onResize(e?: egret.Event): void {
        Config.STAGE_WIDTH = document.body.clientWidth;//this.stage.stageWidth;
        Config.STAGE_HEIGHT = document.body.clientHeight;//this.stage.stageHeight;
        Config.MAP_SCREEN_WIDTH = this.stage.stageWidth;
        Config.MAP_SCREEN_HEIGHT = this.stage.stageHeight - EnumMap.MAP_Y;
        if (this.menu)
            this.menu.onResize();
    }
}