class BaseUI extends eui.Component {
	private _euiSkinName: string = "";
	private _hasCreated: boolean = false;
	public isDispose: boolean = false;
	/**是否初始化完成 */
	protected isCreate: boolean = false;
	public constructor(euiSkinName?: string) {
		super();
		this.touchEnabled = false;
		if (euiSkinName) {
			this.euiSkinName = euiSkinName;
		}
	}

	public set euiSkinName(value: string) {
		if (this._hasCreated) return;
		this._hasCreated = true;
		this._euiSkinName = value;
		this.createView();
	}

	public get euiSkinName(): string {
		return this._euiSkinName;
	}

	protected createView(): void {
		this.addEventListener(egret.Event.COMPLETE, this.createComplete, this);
		this.skinName = this.euiSkinName;
	}

	protected createComplete(): void {
		this.removeEventListener(egret.Event.COMPLETE, this.createComplete, this);
		this.isCreate = true;
	}

	public dispose(): void {
		this._hasCreated = false;
		this.isDispose = true;
	}
}