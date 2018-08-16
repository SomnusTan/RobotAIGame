class MapLayer extends egret.DisplayObjectContainer {
    /**地图层 */
    public mapContainer: egret.DisplayObjectContainer;
    /**格子绘制层 */
    public mapGridContainer: egret.Shape;
    /**网格线层 */
    public mapLineContainer: egret.Shape;
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
        this.mapLineContainer = new egret.Shape();
        this.avatarContainer = new egret.DisplayObjectContainer();
        this.effectContainer = new egret.DisplayObjectContainer();
        this.barContainer = new egret.DisplayObjectContainer();
        this.addChild(this.mapContainer);
        this.addChild(this.mapGridContainer);
        this.addChild(this.mapLineContainer);
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
            this.showNodeLine(true);
        }
    }

    public drawGridPath(src: any, path: any[], target: any): void {
        if (src) {
            this.drawGrid(src.col, src.row, 0xff0000);
        }
        if (path) {
            for (var i: number = 0, len: number = path.length; i < len; i++) {
                this.drawGrid(path[i].col, path[i].row, 0x00ff00)
            }
        }
        if (target) {
            this.drawGrid(target.col, target.row);
        }
    }

    public drawGrid(col: number, row: number, color: number = 0x0000ff): void {
        this.mapGridContainer.graphics.beginFill(color, 0.4);
        this.mapGridContainer.graphics.drawRect((col - 1) * EnumMap.MAP_NODE_WIDTH, (row - 1) * EnumMap.MAP_NODE_HEIGHT, EnumMap.MAP_NODE_WIDTH, EnumMap.MAP_NODE_HEIGHT);
        this.mapGridContainer.graphics.endFill();
    }

    public clearGrid(): void {
        this.mapGridContainer.graphics.clear();
    }

    public showNodeLine(show: boolean): void {
        this.mapLineContainer.graphics.clear();
        if (show) {
            this.mapLineContainer.graphics.lineStyle(1, 0xffffff, 0.3);
            var col: number = Math.ceil(EnumMap.MAP_WIDTH / EnumMap.MAP_NODE_WIDTH);
            var row: number = Math.ceil(EnumMap.MAP_HEIGHT / EnumMap.MAP_NODE_HEIGHT);
            var colIndex: number, rowIndex: number;
            for (rowIndex = 1; rowIndex < row; rowIndex++) {
                this.mapLineContainer.graphics.moveTo(0, rowIndex * EnumMap.MAP_NODE_HEIGHT);
                this.mapLineContainer.graphics.lineTo(EnumMap.MAP_WIDTH, rowIndex * EnumMap.MAP_NODE_HEIGHT);
            }
            for (colIndex = 1; colIndex < col; colIndex++) {
                this.mapLineContainer.graphics.moveTo(colIndex * EnumMap.MAP_NODE_WIDTH, 0);
                this.mapLineContainer.graphics.lineTo(colIndex * EnumMap.MAP_NODE_WIDTH, EnumMap.MAP_HEIGHT);
            }
        }
    }

    /**
     * 更新角色深度
     */
    public updateAvatarDepth(): void {
        var list: MovieAvatar[] = [];
        var childrenCount: number = this.avatarContainer.numChildren;
        var index: number = 0;
        var avatar: MovieAvatar;
        var pos: number;
        while (index < childrenCount) {
            avatar = this.avatarContainer.getChildAt(index++) as MovieAvatar;
            list.push(avatar);
        }
        list.sort((a: MovieAvatar, b: MovieAvatar) => {
            if (a.y < b.y)
                return -1;
            else
                return 1;
        })
        childrenCount = list.length;
        index = 0;
        while (index < childrenCount) {
            avatar = list[index];
            if (avatar != this.avatarContainer.getChildAt(index)) {
                this.avatarContainer.setChildIndex(avatar, index);
            }
            index++;
        }
    }
}