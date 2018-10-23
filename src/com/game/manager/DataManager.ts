class DataManager {
    /**未解析的数据 */
    private _tempList: string[];
    /**当解析到的数据长度，则可运行游戏 */
    private CAN_EXEC_COUNT: number = 40;
    /**数据总长度 */
    private _count: number;
    /**已经解析的长度 */
    private _index: number;
    /**步骤数据集 */
    private _stepList: StepVo[];

    public constructor() {

    }

    /**
     * 解析配置数据
     */
    public parseLogData(data: string): void {
        this._tempList = data.split("\n");
        this._index = 0;
        this._count = this._tempList.length;
        this._stepList = [];
        GameLog.log("日志长度为", this._tempList.length);
        this.parseLogByStep();

    }

    /**
     *  分步解析配置
     */
    private parseLogByStep(): void {
        var startTime: number = egret.getTimer();
        GameLog.log("开始解析：", startTime);
        var str: string;
        for (; this._index < this._count; this._index++) {
            str = this._tempList[this._index];
            if (str) {
                this._stepList.push(StepVo.parse(str));
                if (egret.getTimer() - startTime > 40) {//分帧解析
                    this.checkStart();
                    App.timer.doFrameOnce(this, 1, this.parseLogByStep);
                    return;
                }
            }
        }
        GameLog.log("解析完成：", egret.getTimer());
        this.checkStart();
        this._tempList.length = 0;
        this._tempList = null;
    }

    /**
     * 检测是否需要开始播放
     */
    private checkStart(): void {
        if (!App.global.isPlaying) {
            if (this._index >= this.CAN_EXEC_COUNT || this._index >= this._count) {
                GameLog.log("开始执行");
                this.execNextStep();
            }
        }
    }

    /**
     * 执行下一步
     */
    public execNextStep(): void {
        if (this._stepList.length > 0) {
            this._stepList.shift().exec();
        }
        else {
            GameLog.log("全部执行结束");
        }
    }
}