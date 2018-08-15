class TimerHandler {
	public constructor() {
	}

	/**作用域*/
	public thisArg:any = undefined;
	/**执行间隔*/
	public delay:number = 0;
	/**是否重复执行*/
	public repeat:Boolean = false;
	/**是否用帧率*/
	public userFrame:Boolean = false;
	/**执行时间*/
	public exeTime:number = 0;
	/**处理方法*/
	public method:Function = undefined;
	/**参数*/
	public args:any[];

	/**清理*/
	public clear():void
	{
		this.method = undefined;
		this.args = undefined;
	}
}