class Menu extends egret.Sprite {

    private _view: MenuUI;

    private _roundEffect: RoundEffect;

    private _resultView: ResultUI;

    private MOUSE_MODE: string = "鼠标操作";

    private AUTO_MODE: string = "自动镜头";

    public constructor() {
        super();
        this.init();
    }

    private init() {
        this._view = new MenuUI();
        this.addChild(this._view);

        this._view.btnCamera.label = this.AUTO_MODE;
        this._view.btnSpeed.label = "播放速度(x" + EnumSpeed.SPEED + ")"

        this._view.imgBlood1.mask = this._view.rectTeamMask1;
        this._view.imgBlood2.mask = this._view.rectTeamMask2;
        (this._view.btnOpenFile.labelDisplay as eui.Label).size = 30;
    }

    public show(): void {
        this._view.btnCamera.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeMode, this);
        this._view.btnSpeed.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeSpeed, this);
        this._view.btnOpenFile.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenFile, this);
        this.onResize();
    }

    public hide(): void {
    }

    private onOpenFile(e: egret.TouchEvent): void {
        var files: any = document.getElementById("files");
        files.click();
        files.addEventListener("change", (e) => {
            console.log(files.files[0].name)
            var reader = new FileReader();
            reader.readAsText(files.files[0]);
            reader.onload = (e) => {
                this._view.btnOpenFile.visible = false;
                App.layer.startMove();
                App.data.parseLogData(reader.result);
            }
        })
    }

    private onChangeSpeed(e: egret.TouchEvent): void {
        EnumSpeed.addSpeed();
        this._view.btnSpeed.label = "播放速度(x" + EnumSpeed.SPEED + ")"
    }

    private onChangeMode(e: egret.TouchEvent): void {
        Config.isMouseMode = !Config.isMouseMode;
        this._view.btnCamera.label = Config.isMouseMode ? this.MOUSE_MODE : this.AUTO_MODE;
    }

    public showRoundEffect(round: number): void {
        if (this._roundEffect == null) {
            this._roundEffect = new RoundEffect();
        }
        this._roundEffect.show(round);
    }

    public onResize(): void {
        this._view.width = Config.STAGE_WIDTH;
        this._view.btnOpenFile.y = Config.STAGE_HEIGHT - this._view.btnOpenFile.height >> 1;
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
        var list: string[] = team.getLeftAvatarList();
        this._resultView.txtMemberName.text = list[0];
        this._resultView.txtMemberNum.text = list[1];
        egret.Tween.get(this._resultView).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500, egret.Ease.backInOut);
    }


}