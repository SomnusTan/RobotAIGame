class Menu extends egret.Sprite {

    private _view: MenuUI;

    private _roundEffect: RoundEffect;

    private _resultView: ResultUI;

    private MOUSE_MODE: string = "鼠标操作";

    private AUTO_MODE: string = "自动镜头";

    private _miniMap: MiniMap;

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

        this._view.boxMoveEffect.selected = Config.playMoveSound;

        this._miniMap = new MiniMap();
        this._view.addChild(this._miniMap);
        this._miniMap.y = 108;

    }

    public show(): void {
        this._view.btnCamera.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeMode, this);
        this._view.btnSpeed.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeSpeed, this);
        this._view.btnOpenFile.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenFile, this);
        this._view.boxMoveEffect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeMoveSound, this);
        this.onResize();
    }

    public hide(): void {
    }

    private onOpenFile(e: egret.TouchEvent): void {
        if (Config.isShowInitInfo) {
            this._view.btnOpenFile.visible = false;
            App.data.execNextStep();
            App.sound.playBgmSound(EnumSound.BGM);
        }
        else {
            var files: any = document.getElementById("files");
            files.click();
            files.addEventListener("change", (e) => {
                GameLog.log(files.files[0].name)
                var reader = new FileReader();
                reader.readAsText(files.files[0]);
                reader.onload = (e) => {
                    this._view.btnOpenFile.visible = false;
                    // App.layer.startMove();
                    App.data.parseLogData(reader.result);
                    App.sound.playBgmSound(EnumSound.BGM);
                }
            })
        }
    }

    private onChangeMoveSound(e: egret.TouchEvent): void {
        Config.playMoveSound = this._view.boxMoveEffect.selected;
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
        this._miniMap.x = (Config.STAGE_WIDTH - this._miniMap.width >> 1) + 360;
    }

    public updateMiniMap(): void {
        this._miniMap.updateAvatar();
    }

    public initInfo(teamName1: string, teamName2: string): void {
        this.updateRound(0);
        this._view.txtTeamName1.text = teamName1;
        this._view.txtTeamName2.text = teamName2;
    }

    public updateRound(round: number): void {
        this._view.txtRound.text = "Round " + round;
    }

    public initHp(teamId: number, hp: number, max: number): void {
        this._view["rectTeamMask" + teamId].scaleX = hp / max;
        this._view["txtBlood" + teamId].text = hp + "/" + max;
    }

    public updateHp(teamId: number, hp: number, max: number): void {
        // this._view["rectTeamMask" + team].scaleX  =  hp / max
        egret.Tween.removeTweens(this._view["rectTeamMask" + teamId]);
        egret.Tween.get(this._view["rectTeamMask" + teamId]).to({ scaleX: hp / max }, 500);
        this._view["txtBlood" + teamId].text = hp + "/" + max;
        var team: TeamVo = App.team.getTeamVo(teamId);
        team.hp = hp;
    }

    public updateTeamInfo(vo: TeamVo): void {
        var txt: eui.Label = this._view["txtTeamLeft" + vo.id];
        txt.text = vo.getLeftAvatarStr();
    }

    /**
     * 显示结算
     */
    public showResult(winTeamId: number, loseTeamId: number): void {
        if (this._resultView == null) {
            this._resultView = new ResultUI();
            this._resultView.x = Config.STAGE_WIDTH >> 1;
            this._resultView.y = Config.STAGE_HEIGHT >> 1;
        }
        App.layer.menuLayer.addChild(this._resultView);
        App.sound.playSound(EnumSound.RESULT);
        var team: TeamVo = App.team.getTeamVo(winTeamId);
        this._resultView.txtWinName.text = team.name;
        var list: string[] = team.getLeftAvatarList();
        this._resultView.txtWinMemberName.text = list[0];
        this._resultView.txtWinMemberLeftNum.text = list[1];
        this._resultView.txtWinMemberNum.text = team.srcNumStr;
        this._resultView.txtWinLeftBlood.text = team.hp.toString();

        team = App.team.getTeamVo(loseTeamId);
        this._resultView.txtLostName.text = team.name;
        list = team.getLeftAvatarList();
        this._resultView.txtLostMemberName.text = list[0];
        this._resultView.txtLostMemberLeftNum.text = list[1];
        this._resultView.txtLostMemberNum.text = team.srcNumStr;
        this._resultView.txtLostLeftBlood.text = team.hp.toString();

        this._resultView.boxWiner.x = 0;
        this._resultView.boxWiner.y = 0;
        this._resultView.boxWiner.scaleX = this._resultView.boxWiner.scaleY = 3;
        this._resultView.boxWiner.alpha = 1;
        egret.Tween.get(this._resultView.boxWiner).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 600, egret.Ease.backInOut).to({ x: -300 }, 1000, egret.Ease.backInOut);
        this._resultView.boxLoser.x = 300;
        this._resultView.boxLoser.y = 0;
        this._resultView.boxLoser.alpha = 0;
        egret.Tween.get(this._resultView.boxLoser).wait(2000).to({ alpha: 1 }, 1000);
    }


}