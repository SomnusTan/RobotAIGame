class StepRoundVo extends StepVo {
    public exec(): void {
        super.exec();
        console.log("第" + this.round + "回合");
        App.menu.showRoundEffect(this.round);
        this.end();
    }

    protected end(): void {
        App.timer.doTimeOnce(App.data, EnumSpeed.getStepDelay() + 500, App.data.execNextStep);
        this.dispose();
    }

}