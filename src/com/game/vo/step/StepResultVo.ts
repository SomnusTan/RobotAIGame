class StepResultVo extends StepVo {

    private _winResultCode: number;

    private _winResultInfo: string;

    private _winTeamId: number;

    public constructor() {
        super();
    }

    public parse(time: string, jsonData: any): void {
        super.parse(time, jsonData);
        this._winTeamId = jsonData.win_player;
        this._winResultCode = jsonData.win_resultcode;
        this._winResultInfo = jsonData.win_resultinfo;
    }

    public exec(): void {
        super.exec();

        App.menu.showResult(this._winTeamId);
    }
}