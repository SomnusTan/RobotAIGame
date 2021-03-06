class StepVo {
    /**日志类型 EnumStepType */
    public type: string;
    /**第几回合 */
    public round: number;
    /**日志时间 */
    public time: string;
    /**JSON数据 */
    protected _jsonData: any;

    /**
     * 全局解析
     */
    public static parse(str: string): StepVo {
        var index: number = str.indexOf("]") + 1;
        var time: string = str.slice(0, index);;
        index = str.indexOf(" ", index + 1) + 1;
        var jsonData: any = JSON.parse(str.slice(index));
        var vo: StepVo;
        switch (jsonData.logtype) {
            case EnumStepType.TEAM_INFO:
                vo = new StepInfoVo();
                break;
            case EnumStepType.TEAM_INIT:
                vo = new StepInitVo();
                break;
            case EnumStepType.ROUND_CHANGE:
                vo = new StepRoundVo();
                break;
            case EnumStepType.ROLE_MOVE:
                vo = new StepRoleMoveVo();
                break;
            case EnumStepType.ROLE_ATTACK:
                vo = new StepRoleAttackVo();
                break;
            case EnumStepType.SEIZE_BASE:
                vo = new StepSeizeBaseVo();
                break;
            case EnumStepType.AI_DROP_HP:
                vo = new StepAIDropVo();
                break;
            case EnumStepType.BUG:
                vo = new StepBugVo();
                break;
            case EnumStepType.RESULT:
                vo = new StepResultVo();
                break;
        }
        vo.parse(time, jsonData);
        return vo;
    }

    /**
     * 解析
     */
    public parse(time, jsonData: any): void {
        this._jsonData = jsonData;
        this.time = time;
        this.round = jsonData.round;
        this.type = jsonData.logtype;
    }

    /**
     * 执行
     */
    public exec(): void {

    }

    public toString(): string {
        return "";
    }

    protected end(): void {
        this.dispose();
        App.timer.doTimeOnce(App.data, EnumSpeed.getStepDelay(), App.data.execNextStep);
    }

    public dispose(): void {
        this._jsonData = null;
    }
}