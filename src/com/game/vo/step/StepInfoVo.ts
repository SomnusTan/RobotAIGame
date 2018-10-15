/**
 * 初始化基本信息步骤
 */
class StepInfoVo extends StepVo {
    public constructor() {
        super();
    }

    // public parse(time: string, jsonData: any): void {
    //     super.parse(time, jsonData);
    // }

    public exec(): void {
        super.exec();
        App.global.fightuid = this._jsonData.fightuuid;
        App.team.team1.reset();
        App.team.team1.dir = this._jsonData.player1dir;
        App.team.team1.name = this._jsonData.player1name;
        App.team.team2.reset();
        App.team.team2.dir = this._jsonData.player2dir;
        App.team.team2.name = this._jsonData.player2name;
        App.menu.initInfo(App.team.team1.name, App.team.team2.name);
        this.end();
    }

    public end(): void {
        if (Config.isShowInitInfo == false) {
            super.end();
        }
    }
}