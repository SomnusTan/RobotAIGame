class TimeCenter {
	public constructor(stage:egret.Stage) {
		stage.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this)	
	}

	get frametime():number {
		return this._frametime;
	}

	private onEnterFrame(e:egret.Event):void 
	{
		this._currFrame ++;
		this._currTimer = egret.getTimer();
		this._frametime = this._currTimer - this._lastTime;
		this._lastTime = this._currTimer;
		let fpsInv:number = this._currTimer - this._fpsLastTime;
		if(fpsInv > 1000) 
		{
			let fps:number = (this._currFrame - this._fpsCount) / (fpsInv / 1000);
			this._fpsCount = this._currFrame;
			this._fpsLastTime = this._currTimer;
			Config.currentGameFps = Math.floor(fps * 1000) / 1000;
		}
		let hashs:any[] = this._normalHash.values;
		for(let i:number = 0;i<hashs.length;i ++)
		{
			let hash:HashMap = hashs[i];
			let handlers:any[] = hash.values;
			let keys:any[] = hash.keys;
			for(let j:number = 0;j<handlers.length;j++)
			{
				let handler:TimerHandler = handlers[j];
				let t:number = handler.userFrame ? this._currFrame : this._currTimer;
				if(t >= handler.exeTime)
				{
					let method:Function = handler.method;
					let key:any = keys[j];
					let args:any[] = handler.args;
					let thisArg:any = handler.thisArg;
					if(handler.repeat)
					{
						while(t >= handler.exeTime) 
						{
							if(hash.has(key))
							{
								handler.exeTime += handler.delay;
								FunctionApply.doExecute(method,thisArg,args);
							}else
							{
								break;
							}
						}
					}else
					{
						this.clearTimer(key,thisArg);
						FunctionApply.doExecute(method,thisArg,args);
					}
				}
			}
		}
		// this.serverTimeHandler();
	}

	private serverTimeHandler():void 
	{
		let ctSec:number = ServerTime.getServerTime();
		let hashs:any[] = this._serverHash.values;
		for(let i:number = 0;i<hashs.length;i++)
		{
			let hash:HashMap = hashs[i];
			let datas:any[] = hash.values;
			for(let j:number = 0;j<datas.length;j++)
			{
				let data:ServerTimeData = datas[j];
				let time:number = data.endServerTime - ctSec;
				let thisArg:any = data.thisArg;
				if(time != data.spuleTime)
				{
					data.spuleTime = time;
					let params:any[] = [data];
					if(data.args)
					{
						params = params.concat(data.args);
					}
					FunctionApply.doExecute(data.method,data.thisArg,params);
				}
				if(time <= 0) 
				{
					this.clearTimer(data,thisArg);
				}
			}
		}
	}

	private create(thisArg:any,useFrame:boolean, repeat:boolean, delay:number, method:Function, args:any[] = null, cover:Boolean = true):any 
	{
		let key:any = undefined;
		if(cover) {
			//先删除相同函数的计时
			this.clearTimer(method,thisArg);
			key = method;
		} else 
		{
			key = this._index ++;
		}

		//如果执行时间小于1，直接执行
		if(delay < 1) {
			FunctionApply.doExecute(method,thisArg,args);
			return -1;
		}
		let handler:TimerHandler = this._pool.length > 0 ? this._pool.pop() : new TimerHandler();
		handler.thisArg = thisArg;
		handler.userFrame = useFrame;
		handler.repeat = repeat;
		handler.delay = delay;
		handler.method = method;
		handler.args = args;
		handler.exeTime = delay + (useFrame ? this._currFrame : this._currTimer);
		let hash:HashMap = this._normalHash.get(thisArg);
		if(hash)
		{
			hash.put(key,handler);
		}else
		{	
			hash = new HashMap();
			hash.put(key,handler);
			this._normalHash.put(thisArg,hash);
		}	
		this._count++;
		return key;
	}

	/**定时执行一次
	 * thisArg 作用域
	 * delay  延迟时间(单位毫秒)
	 * method 结束时的回调方法
	 * args   回调参数
	 * cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
	 * cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数*/
	public doTimeOnce(thisArg:any,delay:number, method:Function, args:any[] = undefined, cover:boolean = true):any {
		return this.create(thisArg,false, false, delay, method, args, cover);
	}

	/**定时重复执行
	 * thisArg 作用域
	 * delay  延迟时间(单位毫秒)
	 * ethod 结束时的回调方法
	 * args   回调参数
	 * cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
	 * cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数*/
	public doTimeLoop(thisArg:any,delay:number, method:Function, args:any[] = undefined, cover:boolean = true):any {
		return this.create(thisArg,false, true, delay, method, args, cover);
	}

	/**定时执行一次(基于帧率)
	 * thisArg 作用域
	 * delay  延迟时间(单位为帧)
	 * method 结束时的回调方法
	 * args   回调参数
	 * cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
	 * cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数*/
	public doFrameOnce(thisArg:any,delay:number, method:Function, args:any[] = undefined, cover:boolean = true):any {
		return this.create(thisArg,true, false, delay, method, args, cover);
	}

	/**定时重复执行(基于帧率)
	 * thisArg 作用域
	 * delay  延迟时间(单位为帧)
	 * method 结束时的回调方法
	 * args   回调参数
	 * cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
	 * cover=true时返回回调函数本身，否则返回唯一ID，均用来作为clearTimer的参数*/
	public doFrameLoop(thisArg:any,delay:number, method:Function, args:any[] = undefined, cover:boolean = true):any {
		return this.create(thisArg,true, true, delay, method, args, cover);
	}

	/**
	 * 服务器的定时倒计时检测，会自动校正时间
	 * */
	public serverTimeEnd(thisArg:any,method:Function, endTime:number, args:any[] = undefined, startTime:number = -1):any {
		this.clearTimer(method,thisArg);
		let key:any = method;
		let data:ServerTimeData = ServerTimeData.getData();
		startTime = startTime == -1 ? ServerTime.getServerTime() : startTime;
		data.setTime(startTime, endTime);
		data.thisArg = thisArg;
		data.method = method;
		data.args = args;

		let hash:HashMap = this._serverHash.get(thisArg);
		if(hash)
		{
			hash.put(key,data);
		}else
		{	
			hash = new HashMap();
			hash.put(key,data);
			this._serverHash.put(thisArg,hash);
		}
		let ctSec:number = ServerTime.getServerTime();
		let time:number = data.endServerTime - ctSec;
		data.spuleTime = time;
		let arry:any[] = [data];
		if(data.args) {
			arry = arry.concat(data.args);
		}
		FunctionApply.doExecute(data.method,data.thisArg,arry);
		return key;
	}

	/**定时器执行数量*/
	get count():number {
		return this._count;
	}

	/**清理定时器
	 * method 创建时的cover=true时method为回调函数本身，否则method为返回的唯一ID
	 * thisArg 作用域
	 */
	public clearTimer(key:any,thisArg:any):void 
	{
		let hash:HashMap = this._normalHash.get(thisArg);
		if(hash)
		{
			let timeHandler:TimerHandler = hash.get(key);
			if(timeHandler)
			{
				timeHandler.clear();
				this._count --;
				hash.del(key);
				this._pool.push(timeHandler);
			}
			if(hash.length == 0)
			{
				this._normalHash.del(thisArg);
			}
		}

		let serverHash:HashMap = this._serverHash.get(thisArg);
		if(serverHash)
		{
			let data:ServerTimeData = serverHash.get(key);
			if(data)
			{
				data.dispose();
				this._count --;
				serverHash.del(key);
			}
			if(serverHash.length == 0)
			{
				this._serverHash.del(thisArg);
			}
		}
	}

	private _pool:any[] = [];
	private _normalHash:HashMap = new HashMap();
	private _serverHash:HashMap = new HashMap();
	private _currTimer:number = egret.getTimer();
	private _currFrame:number = 0;
	private _count:number = 0;
	private _index:number = 0;
	private _frametime:number = 0;
	private _lastTime:number = 0;
	private _fpsLastTime:number = 0;
	private _fpsCount:number = 0;
}