class ObjectPool {
	public constructor(cls: any, checkDuplicate: boolean = true) {
		this._pool = [];
		this._cls = cls;
		this._checkDuplicate = checkDuplicate;
		if (this._checkDuplicate) {
			this._poolDict = new HashMap();
		}
	}

	get numCount(): number {
		return this._numCount;
	}

	public getObject(): any {
		var eft: any = undefined;
		if (this._pool.length > 0) {
			eft = this._pool.pop();
			if (this._checkDuplicate) {
				this._poolDict.del(eft);
			}
		}
		else {
			eft = new this._cls();
			this._numCount++;
		}
		return eft;
	}

	public push(data: any): void {
		if (this._checkDuplicate) {
			if (!this._poolDict.has(data)) {
				this._pool.push(data);
				this._poolDict.put(data, data);
			}
			else {
				GameLog.log("有重复的对象入池");
			}
		}
		else {
			this._pool.push(data);
		}
	}

	public pushArr(datas: any[]): void {
		let i: number = 0;
		for (i = 0; i < datas.length; i++) {
			this.push(datas[i]);
		}
	}

	private _cls: any = undefined;
	private _pool: any[] = undefined;
	private _poolDict: HashMap = undefined;
	private _numCount: number = 0;
	private _checkDuplicate: boolean = true;
}