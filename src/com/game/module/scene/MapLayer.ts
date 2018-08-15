class MapLayer extends egret.DisplayObjectContainer {
    /**地图层 */
    public mapContainer: egret.DisplayObjectContainer;
    /**格子绘制层 */
    public mapGridContainer:egret.Shape;
    /**角色层 */
    public avatarContainer: egret.DisplayObjectContainer;
    /**特效层 */
    public effectContainer: egret.DisplayObjectContainer;
    /**血条名字层 */
    public barContainer: egret.DisplayObjectContainer;

    private _mapWidth: number;
    private _mapHeight: number;
    /**中心点X */
    private _cameraX: number;
    /**中心点Y */
    private _cameraY: number;

    private _mapTileHash: HashMap;


    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this.mapContainer = new egret.DisplayObjectContainer();
        this.mapGridContainer = new egret.Shape();
        this.avatarContainer = new egret.DisplayObjectContainer();
        this.effectContainer = new egret.DisplayObjectContainer();
        this.barContainer = new egret.DisplayObjectContainer();
        this.addChild(this.mapContainer);
        this.addChild(this.mapGridContainer);
        this.addChild(this.avatarContainer);
        this.addChild(this.effectContainer);
        this.addChild(this.barContainer);
        this._mapWidth = Config.STAGE_WIDTH
        this._mapHeight = Config.STAGE_HEIGHT;
        App.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
    }

    private onResize(e: egret.Event): void {
        this._mapWidth = Config.STAGE_WIDTH
        this._mapHeight = Config.STAGE_HEIGHT;
        this.resetMapRect();
    }

    private resetMapRect(): void {

    }

    public moveCamera(x: number, y: number): void {

    }

    public initMap(): void {
        if (this._mapTileHash == null) {
            this._mapTileHash = new HashMap();
            var col: number = Math.ceil(EnumMap.MAP_WIDTH / EnumMap.MAP_TILE_WIDTH);
            var row: number = Math.ceil(EnumMap.MAP_HEIGHT / EnumMap.MAP_TILE_HEIGHT);
            var colIndex: number, rowIndex: number, mapTile: MapTile;
            for (rowIndex = 0; rowIndex < row; rowIndex++) {
                for (colIndex = 0; colIndex < col; colIndex++) {
                    mapTile = new MapTile();
                    mapTile.init(colIndex + 1, rowIndex + 1);
                    this.mapContainer.addChild(mapTile);
                    this._mapTileHash.put(mapTile.id, mapTile);
                }
            }
            this.showNode(true);
        }
    }

    public showNode(show: boolean): void {
        this.mapGridContainer.graphics.clear();
        if (show) {
            this.mapGridContainer.graphics.lineStyle(2, 0x0000ff,0.5);
            var col: number = Math.ceil(EnumMap.MAP_WIDTH / EnumMap.MAP_NODE_WIDTH);
            var row: number = Math.ceil(EnumMap.MAP_HEIGHT / EnumMap.MAP_NODE_HEIGHT);
            var colIndex: number, rowIndex: number;
            for (rowIndex = 1; rowIndex < row; rowIndex++) {
                this.mapGridContainer.graphics.moveTo(0, rowIndex * EnumMap.MAP_NODE_HEIGHT);
                this.mapGridContainer.graphics.lineTo(EnumMap.MAP_WIDTH, rowIndex * EnumMap.MAP_NODE_HEIGHT);
            }
            for (colIndex = 1; colIndex < col; colIndex++) {
                this.mapGridContainer.graphics.moveTo(colIndex * EnumMap.MAP_NODE_WIDTH, 0);
                this.mapGridContainer.graphics.lineTo(colIndex * EnumMap.MAP_NODE_WIDTH, EnumMap.MAP_HEIGHT);
            }
        }
    }
}