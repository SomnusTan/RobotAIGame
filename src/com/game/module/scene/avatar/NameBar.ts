class NameBar extends egret.DisplayObjectContainer {
    private _txtName: egret.TextField;

    private _hpBar: egret.Bitmap;

    private _hpBarBg: egret.Bitmap;

    private static WIDTH: number = 80;

    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._hpBarBg = new egret.Bitmap(RES.getRes("img_blood_bg_png"));
        this._hpBarBg.width = NameBar.WIDTH + 2;
        this._hpBarBg.height = this._hpBarBg.height + 2;
        this.addChild(this._hpBarBg);
        this._hpBarBg.x = -this._hpBarBg.width >> 1;
        this._hpBarBg.y = -this._hpBarBg.height;

        this._hpBar = new egret.Bitmap(RES.getRes("img_blood_png"));
        this._hpBar.width = NameBar.WIDTH;
        this.addChild(this._hpBar);
        this._hpBar.x = -this._hpBar.width >> 1;
        this._hpBar.y = -this._hpBar.height - 1;

        this._txtName = new egret.TextField();
        this._txtName.stroke = 1;
        this._txtName.size = 24;
        this._txtName.textColor = 0xffffff;
        this.addChild(this._txtName);
    }

    /**
     * 初始化
     */
    public initInfo(name: string, hp: number, maxHp: number): void {
        this._txtName.text = name;
        this._txtName.x = -this._txtName.textWidth >> 1;
        this._txtName.y = -this._hpBarBg.height - this._txtName.height - 2;
        this.updateHp(hp, maxHp);
    }

    /**
     * 更新血量
     */
    public updateHp(hp: number, maxHp: number): void {
        this._hpBar.width = hp / maxHp * NameBar.WIDTH;
    }

    public remove():void
    {
        if(this.parent)
        {
            this.parent.removeChild(this);
        }
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