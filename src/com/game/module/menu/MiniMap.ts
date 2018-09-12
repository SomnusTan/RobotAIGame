class MiniMap extends eui.Group {
    private _gridMap: egret.Shape;

    private _avatarMap: egret.Shape;

    private gridW: number = 5;
    private gridH: number = 5;


    public constructor() {
        super();

        this.init();
    }

    private init(): void {
        this._gridMap = new egret.Shape();
        this.addChild(this._gridMap);
        var col: number = EnumMap.MAP_WIDTH / EnumMap.MAP_NODE_WIDTH;
        var row: number = EnumMap.MAP_HEIGHT / EnumMap.MAP_NODE_HEIGHT;
        var i: number;
        this._gridMap.graphics.beginFill(0,0.2);
        this._gridMap.graphics.drawRect(0, 0, this.gridW * col, this.gridH * row);
        this._gridMap.graphics.endFill();
        this._gridMap.graphics.lineStyle(1, 0xffffff, 0.1);
        for (i = 0; i <= row; i++) {
            this._gridMap.graphics.moveTo(0, this.gridH * i);
            this._gridMap.graphics.lineTo(this.gridW * col, this.gridH * i);
        }
        for (i = 0; i <= col; i++) {
            this._gridMap.graphics.moveTo(this.gridW * i, 0);
            this._gridMap.graphics.lineTo(this.gridW * i, this.gridH * row);
        }

        this._avatarMap = new egret.Shape();
        this.addChild(this._avatarMap);
    }

    public updateAvatar(): void {
        this._avatarMap.graphics.clear();
        var hashMap: HashMap = App.role.getRoleTeam(App.team.team1.id);
        if (hashMap) {
            this._avatarMap.graphics.beginFill(0xff0000);
            hashMap.foEach(this.onForEach, this);
            this._avatarMap.graphics.endFill();
        }

        hashMap = App.role.getRoleTeam(App.team.team2.id);
        if (hashMap) {
            this._avatarMap.graphics.beginFill(0x0000ff);
            hashMap.foEach(this.onForEach, this);
            this._avatarMap.graphics.endFill();
        }
    }

    private onForEach(key: number, value: BaseAvatar): boolean {
        var x: number = (value.col + 0.5) * this.gridW;
        var y: number = (value.row + 0.5) * this.gridH;
        this._avatarMap.graphics.drawRect(-1.5 + x, -1.5 + y, 3, 3);
        return false;
    }

    public get width(): number {
        return this._gridMap.width;
    }
}