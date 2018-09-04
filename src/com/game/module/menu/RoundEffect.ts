class RoundEffect extends egret.DisplayObjectContainer {

    private _label: eui.Label;

    private _round: number;

    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._label = new eui.Label("");
        this._label.textColor = 0xFFFFFF;
        this._label.size = 26;
        this._label.italic = true;
        this._label.bold=true;
        this.addChild(this._label);

    }


    public show(round: number): void {
        this._round = round;
        this._label.text = "Round " + round;
        this._label.x = -this._label.textWidth >> 1;
        App.layer.menuLayer.addChild(this);
        this.x = Config.STAGE_WIDTH >> 1;
        this.y = Math.floor(Config.STAGE_HEIGHT * 0.35);
        this.scaleX = this.scaleY = 8;
        egret.Tween.get(this).wait(200).to({ scaleX: 1, scaleY: 1, y: 47 }, 500, egret.Ease.quartInOut).call(this.hide, this);
    }

    public hide(): void {
        App.menu.updateRound(this._round);
        egret.Tween.removeTweens(this);
        if (this.parent)
            this.parent.removeChild(this);
    }

}