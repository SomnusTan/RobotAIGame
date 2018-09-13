class HpEffect extends eui.Group {
    private static _pool: HpEffect[];

    private _label: eui.BitmapLabel;

    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._label = new eui.BitmapLabel();
        this.addChild(this._label);
        this._label.font = "hp_font_fnt";
        // this._label.horizontalCenter = 0;
        // this._label.verticalCenter = 0;
    }


    public show(text: string, parent: egret.DisplayObjectContainer, x?: number, y?: number): void {
        this._label.text = text;
        if (parent)
            parent.addChild(this);
        if (x)
            this.x = x;
        if (y)
            this.y = y;
        this._label.anchorOffsetX = this._label.width >> 1;
        this._label.anchorOffsetY = this._label.height >> 1;
        // this._label.x = -this._label.width>>1;
        // this._label.y = -this._label.height>>1;
        this.alpha = 1;
        egret.Tween.get(this._label).set({ alpha: 0, scaleX: 0.5, scaleY: 0.5 }).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 200, egret.Ease.backInOut);
        egret.Tween.get(this).to({ y: this.y - 30 }, 500, egret.Ease.backInOut).wait(500).to({ alpha: 0 }, 500).call(this.dispose, this);
    }

    public remove(): void {
        if (this.parent)
            this.parent.removeChild(this);
    }

    public dispose(): void {
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this._label);
        this.remove();
        HpEffect.recovery(this);
    }

    public static getEffect(): HpEffect {
        if (this._pool == null)
            this._pool = [];
        if (this._pool.length > 0)
            return this._pool.shift();
        return new HpEffect();
    }

    public static recovery(obj: HpEffect): void {
        if (obj && this._pool.indexOf(obj) == -1) {
            this._pool.push(obj);
        }
    }
}