class ServerTimeData {
	public constructor() {
	}

	public static getData():ServerTimeData 
	{
		if(this.pool==null)
			this.pool = new ObjectPool(ServerTimeData);
		return this.pool.getObject() as ServerTimeData;
	}

	get args():any[]{
		return this._args;
	}

	set args(value:any[]){
		this._args = value;
	}

	get method():Function {
		return this._method;
	}

	set method(value:Function){
		this._method = value;
	}

	/**
	 * 剩余时间，单位秒
	 */
	get spuleTime():number {
		return this._spuleTime;
	}

	set spuleTime(value:number) {
		this._spuleTime = value;
	}

	set thisArg(value:any)
	{
		this._thisArg = value;
	}

	get thisArg():any
	{
		return this._thisArg;
	}

	/**
	 * 结束的目标时间
	 */
	get endServerTime():number {
		return this._endServerTime;
	}

	/**
	 * 开始计时的服务器时间
	 */
	get startServerTime():number {
		return this._startServerTime;
	}

	public setTime(startTime:number, endTime:number):void {
		this._startServerTime = startTime;
		this._endServerTime = endTime;
	}

	public dispose():void
	{
		this._method = undefined;
		this._thisArg = undefined;
		this._args = undefined;
		ServerTimeData.pool.push(this);
	}
	
	private _startServerTime:number = 0;
	private _endServerTime:number = 0;
	private _spuleTime:number = 0;
	private _method:Function = undefined;
	private _thisArg:any = undefined;
	private _args:any[] = undefined;
	private static pool:ObjectPool;
}