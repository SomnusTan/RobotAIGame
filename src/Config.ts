class Config {
    /**场景宽 */
    public static STAGE_WIDTH: number;
    /**场景高 */
    public static STAGE_HEIGHT: number;
    /**地图可显示宽 */
    public static MAP_SCREEN_WIDTH: number;
    /**地图可显示高 */
    public static MAP_SCREEN_HEIGHT: number;

    /**是否调试 */
    public static isDebug: boolean;
    /**是否发行版本 */
    public static isRelease: boolean;
    /**版本号 */
    public static version: string = "1.0.0";
    /**当前游戏帧数 */
    public static currentGameFps: number;
    /**是否鼠标模式 */
    public static isMouseMode: boolean = false;

    public static playMoveSound: boolean = false;

    public static playCreateSound: boolean = false;
    /**是否显示初始化信息就停止 */
    public static isShowInitInfo: boolean = false;
}