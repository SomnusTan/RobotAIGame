class NameBar extends egret.DisplayObjectContainer {
    private _txtName: egret.TextField;

    private _hpBar: egret.Bitmap;

    private _hpBarBg: egret.Bitmap;

    private static WIDTH: number = 54;

    private static aScale9Grid: egret.Rectangle = new egret.Rectangle(3, 2, 2, 2);

    public constructor() {
        super();
    }

    /**
     * 初始化样式
     */
    public init(style: number): void {
        this._hpBarBg = new egret.Bitmap(RES.getRes("img_blood_bg"));
        this._hpBarBg.scale9Grid = NameBar.aScale9Grid;
        this._hpBarBg.width = NameBar.WIDTH + 2;
        this._hpBarBg.height = this._hpBarBg.height + 2;
        this.addChild(this._hpBarBg);
        this._hpBarBg.x = -this._hpBarBg.width >> 1;
        this._hpBarBg.y = -this._hpBarBg.height;

        this._hpBar = new egret.Bitmap(RES.getRes("img_blood"));
        this._hpBar.scale9Grid = NameBar.aScale9Grid;
        this._hpBar.width = NameBar.WIDTH;
        this.addChild(this._hpBar);
        this._hpBar.x = -this._hpBar.width >> 1;
        this._hpBar.y = -this._hpBar.height - 1;

        // this._txtName = new egret.TextField();
        // this._txtName.stroke = 1;
        // this._txtName.size = 20;
        // this._txtName.textColor = style == 1 ? 0xffffff : 0xffff00;
        // this.addChild(this._txtName);
    }

    /**
     * 初始化
     */
    public initInfo(name: string, hp: number, maxHp: number): void {
        if(this._txtName){
            this._txtName.text = name;
            this._txtName.x = -this._txtName.textWidth >> 1;
            this._txtName.y = -this._hpBarBg.height - this._txtName.height - 2;
        }
        this.updateHp(hp, maxHp);
    }

    /**
     * 更新血量
     */
    public updateHp(hp: number, maxHp: number): void {
        this._hpBar.width = hp / maxHp * NameBar.WIDTH;
    }

    public remove(): void {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    public set barFilters(data: any[]) {
        this._hpBar.filters = data;
    }

    public dispose(): void {
        if (this._txtName) {
            if (this._txtName.parent)
                this._txtName.parent.removeChild(this._txtName);
            this._txtName = null;
        }
        if (this._hpBar) {
            if (this._hpBar.parent)
                this._hpBar.parent.removeChild(this._hpBar);
            this._hpBar.texture = null;
            this._hpBar = null;
        }
        if (this._hpBarBg) {
            if (this._hpBarBg.parent)
                this._hpBarBg.parent.removeChild(this._hpBarBg);
            this._hpBarBg.texture = null;
            this._hpBarBg = null;
        }
        this.remove();
    }
}