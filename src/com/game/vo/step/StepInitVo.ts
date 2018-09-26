/**
 * 初始化布局步骤
 */
class StepInitVo extends StepVo {
    private _createList: any[];

    public constructor() {
        super();
    }

    public parse(time: string, jsonData: any): void {
        super.parse(time, jsonData);
        this._createList = [];

        var playerInfo: any = this._jsonData.player1info;
        App.team.team1.costcoin = playerInfo.costcoin;
        App.team.team1.id = playerInfo.player;
        App.team.team1.maxHp = App.team.team1.hp = playerInfo.aibrainhp;

        var robotlist: any[] = playerInfo.robotlist;
        var robot: any;
        var teamId: number = App.team.team1.id;
        this._createList.push({ move: true, col: robotlist[0].columnid, row: robotlist[0].rowid });
        for (var i: number = 0, len: number = robotlist.length; i < len; i++) {
            robot = robotlist[i];
            robot.teamId = teamId;
            this._createList.push(robot);
        }

        playerInfo = this._jsonData.player2info;
        App.team.team2.costcoin = playerInfo.costcoin;
        App.team.team2.id = playerInfo.player;
        App.team.team2.maxHp = App.team.team2.hp = playerInfo.aibrainhp;
        robotlist = playerInfo.robotlist;
        teamId = App.team.team2.id;
        this._createList.push({ move: true, col: robotlist[0].columnid, row: robotlist[0].rowid });
        for (var i: number = 0, len: number = robotlist.length; i < len; i++) {
            robot = robotlist[i];
            robot.teamId = teamId;
            this._createList.push(robot);
        }
    }

    private createRole(thisObj?: any): void {
        if (thisObj._createList.length > 0) {
            var robot: any = thisObj._createList.shift();
            if (robot.hasOwnProperty("move")) {
                App.layer.mapLayer.moveCamera(robot.col, robot.row, thisObj.createRole, thisObj, [thisObj]);
            }
            else {
                App.role.createRole(robot.teamId, robot.roleid, robot.robottype, robot.hp, robot.hp, robot.columnid, robot.rowid);
                if (robot.robottype == EnumAvatarType.AI_BRAIN) {
                    App.menu.initHp(robot.teamId, robot.hp, robot.hp);
                }
                if(Config.playCreateSound)
                    App.sound.playSound(robot.teamId==App.team.team1.id?EnumSound.CREATE1:EnumSound.CREATE2);
                App.team.getTeamVo(robot.teamId).addAvatarNum(robot.robottype, 1);
                App.menu.updateTeamInfo(App.team.getTeamVo(robot.teamId));
                App.layer.mapLayer.updateAvatarDepth();
                App.menu.updateMiniMap();
                App.timer.doTimeOnce(thisObj, EnumSpeed.getCreateRoleDealy(), thisObj.createRole, [thisObj]);
            }
        }
        else {
            new StartEffect().show(App.layer.alertLayer,Config.STAGE_WIDTH>>1,Config.STAGE_HEIGHT>>1,new FunctionVo(thisObj.end,thisObj));
            // thisObj.end();
        }
    }

    public exec(): void {
        super.exec();
        App.role.reset();
        this.createRole(this);
    }

    public dispose(): void {
        super.dispose();
        this._createList = null;
    }

}