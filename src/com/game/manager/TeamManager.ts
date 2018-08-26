class TeamManager {
    /**队伍1 */
    public team1: TeamVo;
    /**队伍2 */
    public team2: TeamVo;

    public constructor() {
        this.team1 = new TeamVo();
        this.team2 = new TeamVo();
    }


    public getTeamVo(id: number): TeamVo {
        if (this.team1.id == id)
            return this.team1;
        else if (this.team2.id = id)
            return this.team2;
    }
}