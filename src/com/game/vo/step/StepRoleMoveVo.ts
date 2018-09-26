class StepRoleMoveVo extends StepVo {
    private _teamId: number;
    private _roleid: number;
    private _oldCol: number;
    private _oldRow: number;
    private _path: any[];
    private _avatar: BaseAvatar;
    private _targetCol: number;
    private _targetRow: number;

    public constructor() {
        super();
    }

    public parse(time: string, jsonData: any): void {
        super.parse(time, jsonData);
        this._teamId = this._jsonData.player;
        this._roleid = this._jsonData.roleid;
        var oldCol: number = this._oldCol = this._jsonData.org_columnid;
        var oldRow: number = this._oldRow = this._jsonData.org_rowid;
        this._targetCol = this._jsonData.columnid;
        this._targetRow = this._jsonData.rowid;
        var path: string = this._jsonData.walk;
        this._path = [];
        for (var i: number = 0, len: number = path.length; i < len; i++) {
            switch (path[i]) {
                case "R":
                    oldCol++;
                    break;
                case "L":
                    oldCol--;
                    break;
                case "U":
                    oldRow--;
                    break;
                case "D":
                    oldRow++;
                    break;
            }
            this._path.push({ col: oldCol, row: oldRow });
        }
    }

    public toString(): string {
        var name: string = this._avatar.vo ? this._avatar.vo.name : "null";
        return `move[teamId:${this._teamId},roleId:${this._roleid},name:${name},tx:${this._targetCol},ty:${this._targetRow}]`;
    }

    public exec(): void {
        super.exec();
        this._avatar = App.role.getRole(this._teamId, this._roleid);
        this._avatar.showName(true);
        console.log(this.toString());
        if (App.layer.mapLayer.isInScreen(this._oldCol, this._oldRow) && App.layer.mapLayer.isInScreen(this._targetCol, this._targetRow)) {
            this.doAction();
        }
        else {
            var index: number = Math.floor(this._path.length >> 1) - 1;
            if (index < 0)
                index = 0;
            App.layer.mapLayer.moveCamera(this._path[index].col, this._path[index].row, this.doAction, this);
        }

    }

    private doAction(): void {
        this.showPathGrid();
        this.startMove();
        if(Config.playMoveSound)
            App.sound.playSound(EnumSound.MOVE[Math.floor(Math.random()*EnumSound.MOVE.length)]);
    }

    private showPathGrid(): void {
        App.layer.mapLayer.drawGridPath({ col: this._oldCol, row: this._oldRow }, this._path.slice(0, this._path.length - 1), { col: this._targetCol, row: this._targetRow });
    }

    private startMove(): void {
        App.layer.mapLayer.updateAvatarDepth();
        this._avatar.visible = App.layer.mapLayer.isInScreen(this._avatar.col, this._avatar.row, 0);
        App.menu.updateMiniMap();
        if (this._path.length > 0) {
            var pos: any = this._path.shift();
            var posX: number = MapUtil.getXByNodeX(pos.col);
            var posY: number = MapUtil.getYByNodeY(pos.row);
            egret.Tween.get(this._avatar).to({ x: posX, y: posY }, EnumSpeed.getMoveNodeTime()).call(this.startMove, this);
            if (posX > this._avatar.x)
                this._avatar.dir = EnumDirection.RIGHT;
            else if (posX < this._avatar.x)
                this._avatar.dir = EnumDirection.LEFT;
            this._avatar.playAction(EnumAction.MOVE);
        }
        else {
            this._avatar.playAction(EnumAction.STAND);
            this.end();
        }
    }

    public dispose(): void {
        App.layer.mapLayer.clearGrid();
        super.dispose()
        this._avatar.showName(false);
        this._path = null;
        this._avatar = null;
    }
}