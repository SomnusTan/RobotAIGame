class FunctionApply {
	public constructor() {
	}

	public static doExecute(method: Function, thisArg: any, args: any[]): void {
		if (this.OPEN_TRY_CATCH) {
			try {
				return this.execute(method, thisArg, args);
			} catch (e) {
				console.log(e.stack);
			}
			return undefined;
		}
		return this.execute(method, thisArg, args)
	}

	private static execute(method: Function, thisArg: any, args: any[]): any {
		if (!args || args.length == 0) {
			return method.apply(thisArg);
		} else {
			return method.apply(thisArg, args);
		}
	}

	public static OPEN_TRY_CATCH: Boolean = false;
}