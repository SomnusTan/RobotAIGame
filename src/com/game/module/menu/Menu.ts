class Menu extends egret.Sprite {

    private _view: MenuUI;

    private _hpRect1: egret.Rectangle;
    private _hpRect2: egret.Rectangle;
    private _rectW: number = 0;
    private _roundEffect: RoundEffect;

    private _btnMode: eui.Button;

    private MOUSE_MODE: string = "鼠标操作";

    private AUTO_MODE: string = "自动镜头";

    public constructor() {
        super();
        this.init();
    }

    private init() {
        this._view = new MenuUI();
        this.addChild(this._view);

        this._btnMode = new eui.Button();
        this._btnMode.skinName = "skins.ButtonSkin";
        this._btnMode.label = this.AUTO_MODE;
        this._btnMode.height = 40;
        this._btnMode.x = 5;
        this._btnMode.y = 5;
        this.addChild(this._btnMode);

        this._hpRect1 = new egret.Rectangle(0, 0, 0, 0);
        this._view.imgBlood1.scrollRect = this._hpRect1;

        this._hpRect2 = new egret.Rectangle(0, 0, 0, this._view.imgBlood2.height);
        this._view.imgBlood2.scrollRect = this._hpRect2;
    }

    public show(): void {
        this._btnMode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeMode, this);
        this.onResize();
    }

    public hide(): void {
    }

    private onChangeMode(e: egret.TouchEvent): void {
        Config.isMouseMode = !Config.isMouseMode;
        this._btnMode.label = Config.isMouseMode ? this.MOUSE_MODE : this.AUTO_MODE;
    }

    public showRoundEffect(round: number): void {
        if (this._roundEffect == null) {
            this._roundEffect = new RoundEffect();
        }
        this._roundEffect.show(round);
    }

    public onResize(): void {
        this._view.x = Config.STAGE_WIDTH - this._view.width >> 1;
    }

    public initInfo(teamName1: string, teamName2: string): void {
        this.updateRound(0);
        this._view.txtTeamName1.text = teamName1;
        this._view.txtTeamName2.text = teamName2;
    }

    public updateRound(round: number): void {
        this._view.txtRound.text = "Round " + round;
    }

    public initHp(team: number, hp: number, max: number): void {
        if (this._rectW == 0) {
            this._rectW = this._view.imgBlood1.width;
            this._hpRect1.height = this._view.imgBlood1.height;
            this._hpRect2.height = this._view.imgBlood2.height;
        }
        this["_hpRect" + team].width = this._rectW * hp / max;
        this._view["imgBlood" + team].scrollRect = this["_hpRect" + team];
    }

    public updateHp(team: number, hp: number, max: number): void {
        if (team == 2) {
            this["_hpRect" + team].width = this._rectW * hp / max;
            this._view["imgBlood" + team].scrollRect = this["_hpRect" + team];
        }
        else {
            this["_hpRect" + team].width = this._rectW * hp / max;
            this["_hpRect" + team].x = this._rectW - this["_hpRect" + team].width;
            this._view["imgBlood" + team].scrollRect = this["_hpRect" + team];
        }
    }

    public updateTeamInfo(vo: TeamVo): void {
        var txt: eui.Label = this._view["txtTeamLeft" + vo.id];
        txt.text = vo.getLeftAvatarStr();
    }


}