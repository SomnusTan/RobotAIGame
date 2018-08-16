/**
 * 基本角色对象
 */
class BaseAvatar {

    protected _vo: BaseAvatarVo;

    protected _roleMovie: MovieAvatar;

    protected _nameBar: NameBar;

    protected _offY: number = -120;

    protected _x: number = 0;

    protected _y: number = 0;

    protected _scale: number = 1;

    protected _col: number;

    protected _row: number;
    /**方向 EnumDirection -1：左 1：右 */
    protected _dir: number = 1;

    public constructor() {
        this.init();
    }

    private init(): void {
        this._nameBar = new NameBar();
        this._roleMovie = new MovieAvatar();
        this._roleMovie.setMcFactory(App.resource.getMcFactory("avatar1"));
        this._roleMovie.father = this;
    }

    public initInfo(vo: BaseAvatarVo): void {
        this._vo = vo;
        this._nameBar.init(this._vo.teamId);
        this._nameBar.initInfo(this._vo.name, this._vo.hp, this._vo.maxHp);
        this.playAction(EnumAction.STAND);
        this.scale = 0.6;
    }

    public playAction(action: string, playBack: FunctionVo = null): void {
        this._roleMovie.playAction(action, playBack);
    }

    public updateHp(): void {
        this._nameBar.updateHp(this._vo.hp, this._vo.maxHp);
    }

    public setGrid(col: number, row: number): void {
        this._col = col;
        this._row = row;
        this.x = MapUtil.getXByNodeX(col);
        this.y = MapUtil.getYByNodeY(row);
    }

    public get col(): number {
        return this._col;
    }

    public get row(): number {
        return this._row;
    }

    public set scale(value: number) {
        if (value <= 0)
            return;
        this._scale = value;
        this._roleMovie.scaleX = this._scale * this._dir
        this._roleMovie.scaleY = this._scale;
        this._nameBar.scaleX = this._nameBar.scaleY = this._scale;
    }


    public set x(value: number) {
        this._x = Math.floor(value);
        this._col = MapUtil.getNodeXByX(this._x);
        this._roleMovie.x = this._x;
        this._nameBar.x = this._x;
    }

    public set dir(value: number) {
        this._dir = value;
        this._roleMovie.scaleX = this._scale * this._dir
        this._roleMovie.scaleY = this._scale;
    }

    public get x(): number {
        return this._x;
    }


    public set y(value: number) {
        this._y = Math.floor(value);
        this._row = MapUtil.getNodeYByY(this._y);
        this._roleMovie.y = this._y;
        this._nameBar.y = this._y + Math.floor(this._offY * this._scale);
    }

    public get y(): number {
        return this._y;
    }

    public get vo(): BaseAvatarVo {
        return this._vo;
    }

    public show(): void {
        App.layer.mapLayer.barContainer.addChild(this._nameBar);
        App.layer.mapLayer.avatarContainer.addChild(this._roleMovie);
    }

    public remove(): void {
        this._nameBar.remove();
        this._roleMovie.remove();
    }

    public dispose(): void {
        this.remove();
        if (this._roleMovie) {
            this._roleMovie.dispose();
            this._roleMovie = null;
        }
        if (this._nameBar) {
            this._nameBar.dispose();
            this._nameBar = null;
        }
        this._vo = null;
    }

}