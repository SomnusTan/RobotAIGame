/**
 * HashMap
 *
 */
class HashMap {
    public constructor() {
        this._keyArray = new Array<any>();
        this._valueArray = new Array<any>();
    }

    public get keys(): Array<any> {
        return this._keyArray.concat();
    }

    public get values(): Array<any> {
        return this._valueArray.concat();
    }

    // public $_getKeys(): Array<any> {
    //     return this._keyArray;
    // }

    // public $_getValues(): Array<any> {
    //     return this._valueArray;
    // }

	/**
	 * 填入KEY 和值
	 * @param key
	 * @param value
	 */
    public put(key: any, value: any): void {
        let index: number = this._keyArray.indexOf(key);
        if (index >= 0) {
            this._valueArray[index] = value;
            return;
        }
        this._keyArray[this._length] = key;
        this._valueArray[this._length] = value;
        this._length++;
    }

    public get(key: any): any {
        let index: number = this._keyArray.indexOf(key);
        if (index >= 0) {
            return this._valueArray[index];
        }
        return null;
    }

    public has(key: any): boolean {
        return this._keyArray.indexOf(key) >= 0 ? true : false;
    }

    public del(key: any): void {
        this.remove(key);
    }

    public remove(key: any): boolean {
        let index: number = this._keyArray.indexOf(key);
        if (index >= 0) {
            if (index != this._length - 1) {
                //交换位置
                this._keyArray[index] = this._keyArray.pop();
                this._valueArray[index] = this._valueArray.pop();
            }
            else {
                this._keyArray.pop();
                this._valueArray.pop();
            }
            this._length--;
            return true;
        }
        return false;
    }

    public get size(): number {
        return this._length;
    }

    public get length(): number {
        return this._length;
    }

    public foEach(fuc: Function, thisAny: any, parmas: Array<any> = null): void {
        var ary: Array<any> = [null, null];
        if (parmas) {
            ary = ary.concat(parmas);
        }

        for (let i: number = 0; i < this._length; i++) {
            ary[0] = this._keyArray[i];
            ary[1] = this._valueArray[i];
            var bool: boolean = fuc.apply(thisAny, ary);
            if (bool) {
                break;
            }
        }
    }

    public forInKeyByFunctionName(fucName: string): void {
        let keys: Array<any> = this._keyArray;
        let leng: number = keys.length;
        for (let i: number = 0; i < leng; i++) {
            let item: any = keys[i] as any;
            item[fucName]();
        }
    }

    public forInValueExcetureFunctionName(fucName: string): void {
        let values: Array<any> = this._valueArray;
        let leng: number = values.length;
        for (let i: number = 0; i < leng; i++) {
            let item: any = values[i] as any;
            item[fucName]();
        }
    }

    public clear(): void {
        this._keyArray.length = 0;
        this._valueArray.length = 0;
        this._length = 0;
    }

    public dispose(): void {
        this._valueArray = null;
        this._keyArray = null;
    }

    private _length: number = 0;
    private _keyArray: Array<any> = null;
    private _valueArray: Array<any> = null;
}