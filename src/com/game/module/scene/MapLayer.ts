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

    /**地图底（不动） */
    private _mapBg: eui.Image;

    /**中心点X */
    private _cameraX: number;
    /**中心点Y */
    private _cameraY: number;

    private _mapTileHash: HashMap;

    private _mapRect: egret.Rectangle;

    private _offsetScaleX: number = 1;

    private _offsetScaleY: number = 1;

    private _startX: number;

    private _startY: number;

    private _startStageX: number;

    private _startStageY: number;


    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this.y = EnumMap.MAP_Y;

        this._mapRect = new egret.Rectangle();


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
        App.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    }

    private onTouchBegin(e: egret.TouchEvent): void {
        if (Config.isMouseMode) {
            App.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            App.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this._startX = this._mapRect.x;
            this._startY = this._mapRect.y;
            this._startStageX = e.stageX;
            this._startStageY = e.stageY;
        }
    }

    private onTouchMove(e: egret.TouchEvent): void {
        var offX: number = e.stageX - this._startStageX;
        var offY: number = e.stageY - this._startStageY;
        var mapX: number = this._startX - offX;
        var mapY: number = this._startY - offY;
        mapX = this.getRange(mapX, EnumMap.MAP_WIDTH - Config.MAP_SCREEN_WIDTH, 0);
        mapY = this.getRange(mapY, EnumMap.MAP_HEIGHT - Config.MAP_SCREEN_HEIGHT, 0);
        this._mapRect.x = mapX;
        this._mapRect.y = mapY;
        App.layer.mapBottomLayer.x = Math.floor(-mapX * this._offsetScaleX);
        App.layer.mapBottomLayer.y = Math.floor(-mapY * this._offsetScaleY);
        this.scrollRect = this._mapRect;
    }

    private onTouchEnd(e: egret.TouchEvent): void {
        App.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        App.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }

    private onResize(e: egret.Event): void {
        this.resetMapRect();
    }

    private resetMapRect(): void {
        if (this._mapBg && this._mapTileHash) {
            var mw: number = EnumMap.MAP_WIDTH - Config.MAP_SCREEN_WIDTH;
            var dw: number = this._mapBg.width - Config.MAP_SCREEN_WIDTH;
            var mh: number = EnumMap.MAP_HEIGHT - Config.MAP_SCREEN_HEIGHT;
            var dh: number = this._mapBg.height - Config.STAGE_HEIGHT;
            this._offsetScaleX = dw / mw;
            this._offsetScaleY = dh / mh;
        }

        var mapX: number = this.getRange(this._mapRect.x, EnumMap.MAP_WIDTH - Config.MAP_SCREEN_WIDTH, 0);
        var mapY: number = this.getRange(this._mapRect.y, EnumMap.MAP_HEIGHT - Config.MAP_SCREEN_HEIGHT, 0);
        this._mapRect.x = mapX;
        this._mapRect.y = mapY;
        this._mapRect.width = Config.MAP_SCREEN_WIDTH;
        this._mapRect.height = Config.MAP_SCREEN_HEIGHT;
        App.layer.mapBottomLayer.x = Math.floor(-mapX * this._offsetScaleX);
        App.layer.mapBottomLayer.y = Math.floor(-mapY * this._offsetScaleY);
        this.scrollRect = this._mapRect;
    }

    public initMapBottom(): void {
        if (this._mapBg == null) {
            this._mapBg = new eui.Image("UI_2048_jpg")
            App.layer.mapBottomLayer.addChild(this._mapBg);

        }
    }

    /**
     * 初始化地图资源
     */
    public initMap(): void {
        this.initMapBottom();
        if (this._mapTileHash == null) {
            this._mapTileHash = new HashMap();
            var col: number = Math.ceil(EnumMap.MAP_WIDTH / EnumMap.MAP_TILE_WIDTH);
            var row: number = Math.ceil(EnumMap.MAP_HEIGHT / EnumMap.MAP_TILE_HEIGHT);
            var colIndex: number, rowIndex: number, mapTile: MapTile;
            for (rowIndex = 0; rowIndex < row; rowIndex++) {
                for (colIndex = 0; colIndex < col; colIndex++) {
                    mapTile = new MapTile();
                    mapTile.init(rowIndex * col + colIndex + 1, colIndex, rowIndex);
                    this.mapContainer.addChild(mapTile);
                    this._mapTileHash.put(mapTile.id, mapTile);
                }
            }
            // this.showNodeLine(true);
        }
        this.resetMapRect();
    }

    /**
     * 是否在屏幕中
     */
    public isInScreen(col: number, row: number): boolean {
        var x: number = MapUtil.getXByNodeX(col);
        var y: number = MapUtil.getYByNodeY(row);
        return x > this._mapRect.x && x < this._mapRect.x + this._mapRect.width
            && y > this._mapRect.y && y < this._mapRect.y + this._mapRect.height;
    }

    /**
     * 是否在中心区域(3个格子)
     */
    public isInCenterArea(col: number, row: number, range: number = 3): boolean {
        var x: number = MapUtil.getXByNodeX(col);
        var y: number = MapUtil.getYByNodeY(row);
        var centerX: number = this._mapRect.x + (this._mapRect.width >> 1);
        var centerY: number = this._mapRect.y + (this._mapRect.height >> 1);
        return Math.abs(x - centerX) <= EnumMap.MAP_NODE_WIDTH * range && Math.abs(y - centerY) <= EnumMap.MAP_NODE_HEIGHT * range;
    }

    /**
     * 移动镜头
     */
    public moveCamera(col: number, row: number, callBack?: Function, callBackObj?: any, callBackParams?: any[]): void {
        if (Config.isMouseMode) {
            if (callBack != null)
                callBack.apply(callBackObj, callBackParams);
        }
        else {
            var x: number = MapUtil.getXByNodeX(col) - (Config.MAP_SCREEN_WIDTH >> 1);
            var y: number = MapUtil.getYByNodeY(row) - (Config.MAP_SCREEN_HEIGHT >> 1);
            var mapX: number = this.getRange(x, EnumMap.MAP_WIDTH - Config.MAP_SCREEN_WIDTH, 0);
            var mapY: number = this.getRange(y, EnumMap.MAP_HEIGHT - Config.MAP_SCREEN_HEIGHT, 0);
            var duration: number = Math.sqrt(Math.pow(mapX - this._mapRect.x, 2) + Math.pow(mapY - this._mapRect.y, 2)) / EnumSpeed.getMapMoveSpeed();

            egret.Tween.get(this._mapRect, { onChange: this.onUpdate, onChangeObj: this }).to({ x: mapX, y: mapY }, duration).call(callBack, callBackObj, callBackParams);
        }
    }

    private onUpdate(): void {
        this._mapRect.x = Math.floor(this._mapRect.x);
        this._mapRect.y = Math.floor(this._mapRect.y);
        App.layer.mapBottomLayer.x = Math.floor(-this._mapRect.x * this._offsetScaleX);
        App.layer.mapBottomLayer.y = Math.floor(-this._mapRect.y * this._offsetScaleY);
        this.scrollRect = this._mapRect;
    }

    private getRange(value: number, max: number, min: number): number {
        if (value > max)
            return max;
        if (value < min)
            return min;
        return value;
    }

    public drawGridPath(src: any, path: any[], target: any): void {
        if (src) {
            this.drawGrid(src.col, src.row, 0x0000ff);
        }
        if (path) {
            for (var i: number = 0, len: number = path.length; i < len; i++) {
                this.drawGrid(path[i].col, path[i].row, 0x00ff00)
            }
        }
        if (target) {
            this.drawGrid(target.col, target.row, 0xff0000);
        }
    }

    /**
     * 绘制格子
     */
    public drawGrid(col: number, row: number, color: number = 0x0000ff): void {
        this.mapGridContainer.graphics.beginFill(color, 0.2);
        this.mapGridContainer.graphics.drawRect((col) * EnumMap.MAP_NODE_WIDTH, (row) * EnumMap.MAP_NODE_HEIGHT, EnumMap.MAP_NODE_WIDTH, EnumMap.MAP_NODE_HEIGHT);
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
            if (Math.floor(a.y) < Math.floor(b.y))
                return -1;
            else if (Math.floor(a.y) > Math.floor(b.y))
                return 1;
            else {
                if (a.x < b.x)
                    return -1;
                else
                    return 1;
            }
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