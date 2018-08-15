class StepRoleMoveVo extends StepVo {
    private _teamId: number;
    private _roleid: number;
    private _path: any[];
    private _target: BaseAvatar;
    private _targetCol: number;
    private _targetRow: number;

    public constructor() {
        super();
    }

    public parse(time: string, jsonData: any): void {
        super.parse(time, jsonData);
        this._teamId = this._jsonData.player;
        this._roleid = this._jsonData.roleid;
        var oldCol: number = this._jsonData.org_columnid;
        var oldRow: number = this._jsonData.org_rowid;
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
                case "T":
                    oldRow--;
                    break;
                case "B":
                    oldRow++;
                    break;
            }
            this._path.push({ col: oldCol, row: oldRow });
        }
    }

    public toString(): string {
        var name: string = this._target.vo ? this._target.vo.name : "null";
        return `move[teamId:${this._teamId},roleId:${this._roleid},name:${name},tx:${this._targetCol},ty:${this._targetRow}]`;
    }

    public exec(): void {
        super.exec();
        this._target = App.role.getRole(this._teamId, this._roleid);
        console.log(this.toString());
        this.startMove();
    }

    private startMove(): void {
        if (this._path.length > 0) {
            var pos: any = this._path.shift();
            var posX: number = MapUtil.getXByNodeX(pos.col);
            var posY: number = MapUtil.getYByNodeY(pos.row);
            egret.Tween.get(this._target).to({ x: posX, y: posY }, this._target.vo.moveNodeTime).call(this.startMove, this);
            if (posX > this._target.x)
                this._target.dir = EnumDirection.RIGHT;
            else if (posX < this._target.x)
                this._target.dir = EnumDirection.LEFT;

            this._target.playAction(EnumAction.MOVE);
        }
        else {
            this._target.playAction(EnumAction.STAND);
            this.end();
        }
    }
    public dispose(): void {
        super.dispose()
        this._path = null;
        this._target = null;
    }
}