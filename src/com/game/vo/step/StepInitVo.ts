/**
 * 初始化布局步骤
 */
class StepInitVo extends StepVo {
    public constructor() {
        super();
    }

    public parse(time: string, jsonData: any): void {
        super.parse(time, jsonData);
    }

    public exec(): void {
        super.exec();
        App.role.reset();
        var playerInfo: any = this._jsonData.player1info;
        App.team.team1.costcoin = playerInfo.costcoin;
        App.team.team1.id = playerInfo.player;
        App.team.team1.maxHp = App.team.team1.hp = playerInfo.aibrainhp;
        var robotlist: any[] = playerInfo.robotlist;
        var robot: any;
        var teamId: number = App.team.team1.id;
        for (var i: number = 0, len: number = robotlist.length; i < len; i++) {
            robot = robotlist[i];
            App.role.createRole(teamId, robot.roleid, robot.robottype, robot.hp, robot.hp, robot.columnid, robot.rowid);
        }
        playerInfo = this._jsonData.player2info;
        App.team.team2.costcoin = playerInfo.costcoin;
        App.team.team2.id = playerInfo.player;
        App.team.team2.maxHp = App.team.team2.hp = playerInfo.aibrainhp;
        robotlist = playerInfo.robotlist;
        teamId = App.team.team2.id;
        for (var i: number = 0, len: number = robotlist.length; i < len; i++) {
            robot = robotlist[i];
            App.role.createRole(teamId, robot.roleid, robot.robottype, robot.hp, robot.hp, robot.columnid, robot.rowid);
        }
        this.end();
    }
}