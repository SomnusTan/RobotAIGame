class StepRoundVo extends StepVo {
    public exec(): void {
        super.exec();
        console.log("第" + this.round + "回合");
        App.menu.updateRound(this.round);
        this.end();
    }
}