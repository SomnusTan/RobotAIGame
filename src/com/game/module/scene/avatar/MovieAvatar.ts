class MovieAvatar extends egret.MovieClip {

    private _mcFactory: egret.MovieClipDataFactory;

    private _action: string;

    private _father: BaseAvatar;

    public constructor() {
        super();
    }

    public set father(value: BaseAvatar) {
        this._father = value;
    }

    public setMcFactory(mcFactory: egret.MovieClipDataFactory): void {
        this._mcFactory = mcFactory
    }

    public playAction(action: string): void {
        if(this._action==action)
            return;
        this._action = action;
        var mcData: egret.MovieClipData = this._mcFactory.generateMovieClipData(action);
        this.movieClipData = mcData;
        if (EnumAction.LOOP_ACTION_LIST.indexOf(action) == -1) {
            this.once(egret.Event.COMPLETE, this.onPlayComplete, this);
            this.gotoAndPlay(1, 1);
        }
        else {
            this.gotoAndPlay(1,-1);
        }
    }

    /**
     * 不循环动作完成
     */
    private onPlayComplete(e: egret.Event): void {
        if (this._action == EnumAction.DEAD) {
            this.stop();
            App.role.removeRole(this._father);
        }
        else {
            this.playAction(EnumAction.STAND);
        }
    }

    public get action(): string {
        return this._action;
    }

    public remove():void
    {
        if (this.parent)
            this.parent.removeChild(this);
    }

    public dispose(): void {
        this._father = null;
        this._action = null;
        this._mcFactory = null;
        this.stop();
        this.movieClipData = null;
        this.removeEventListener(egret.Event.COMPLETE, this.onPlayComplete, this);
        this.remove();
    }
}