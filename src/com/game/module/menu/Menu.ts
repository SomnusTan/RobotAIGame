class Menu extends egret.Sprite {

    private _view: MenuUI;

    private _roundEffect: RoundEffect;

    private _resultView: ResultUI;

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

        this._boxSpeed = new eui.box();
        this._btnMode.skinName = "skins.ButtonSkin";
        this._btnMode.label = this.AUTO_MODE;
        this._btnMode.height = 40;
        this._btnMode.x = 5;
        this._btnMode.y = 5;
        this.addChild(this._btnMode);

        this._view.imgBlood1.mask = this._view.rectTeamMask1;
        this._view.imgBlood2.mask = this._view.rectTeamMask2;
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
        this._view["rectTeamMask" + team].scaleX = hp / max;
    }

    public updateHp(team: number, hp: number, max: number): void {
        // this._view["rectTeamMask" + team].scaleX  =  hp / max
        egret.Tween.removeTweens(this._view["rectTeamMask" + team]);
        egret.Tween.get(this._view["rectTeamMask" + team]).to({ scaleX: hp / max }, 500);
    }

    public updateTeamInfo(vo: TeamVo): void {
        var txt: eui.Label = this._view["txtTeamLeft" + vo.id];
        txt.text = vo.getLeftAvatarStr();
    }

    /**
     * 显示结算
     */
    public showResult(winTeamId: number): void {
        var team: TeamVo = App.team.getTeamVo(winTeamId);
        if (this._resultView == null) {
            this._resultView = new ResultUI();
            App.layer.menuLayer.addChild(this._resultView);
        }
        this._resultView.txtWinName.text = team.name;
        this._resultView.x = Config.STAGE_WIDTH - this._resultView.width >> 1;
        this._resultView.y = Config.STAGE_HEIGHT - this._resultView.height >> 1;
        this._resultView.alpha = 0;
        this._resultView.scaleX = this._resultView.scaleY = 0;
        egret.Tween.get(this._resultView).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500, egret.Ease.backInOut);
        // team.getLeftAvatarStr
    }


}