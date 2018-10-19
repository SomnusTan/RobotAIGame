class StepResultVo extends StepVo {

    private _winResultCode: number;

    private _winResultInfo: string;

    private _winTeamId: number;

    private _lostTeamId: number;

    public constructor() {
        super();
    }

    public parse(time: string, jsonData: any): void {
        super.parse(time, jsonData);
        this._winTeamId = jsonData.win_player;
        this._winResultCode = jsonData.win_resultcode;
        this._winResultInfo = jsonData.win_resultinfo;

        this._lostTeamId = jsonData.lose_palyerinfo.player;
    }

    public exec(): void {
        super.exec();

        App.menu.showResult(this._winTeamId, this._lostTeamId);
    }
}