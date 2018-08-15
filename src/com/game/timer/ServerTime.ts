class ServerTime {
    /**登录游戏时服务器时间 */
    private static _serverStartTime: number = 0


    /**
	 * 同步时间，毫秒
	 * @param time
	 */
    public static setServerTime(time: number): void {
        this._serverStartTime = time - egret.getTimer();
    }

    /**
     * 服务器现在的时间
     * @return
     */
    public static getServerTime(): number {
        return this._serverStartTime + egret.getTimer();
    }

    /**
     * 服务器现在的时间(秒)
     */
    public static get serverTime():number
    {
        return Math.floor(this.getServerTime()*0.001);
    }
}