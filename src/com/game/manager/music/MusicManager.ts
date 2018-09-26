class MusicManager {
	public constructor() {
		this._soundHash = new HashMap();
		this._playingSoundHash = new HashMap();
	}

	public get soundHashLength(): number {
		return this._soundHash.size;
	}

	public set bgmVolume(value: number) {
		this._bgmVolume = value;
		if (this._currentBackBgmSound) {
			this._currentBackBgmSound.volume = this._bgmVolume;
		}
	}

	public get bgmVolume(): number {
		return this._bgmVolume;
	}

	public set effectVolume(value: number) {
		this._effectVolume = value;
		if (this._playingSoundHash) {
			let len: number = this._playingSoundHash.size;
			let values: Array<MusicEffectItem> = this._playingSoundHash.values;
			for (let i: number = 0; i < len; i++) {
				values[i].volume = this._effectVolume;
			}
		}
	}

	public get effectVolue(): number {
		return this._effectVolume;
	}

	public get isCloseBgm(): boolean {
		return this._isCloseBgm;
	}

	public set isCloseBgm(value: boolean) {
		if (this._isCloseBgm != value) {
			this._isCloseBgm = value;
			if (value) {
				this.closeBgm();
			}
			else {
				if (this._currentBgmId) {
					this.playBgmSound(this._currentBgmId);
				}
			}
		}
	}

	public get isCloseSound(): boolean {
		return this._isCloseSound;
	}

	public set isCloseSound(value: boolean) {
		if (this._isCloseSound != value) {
			this._isCloseSound = value;
		}
	}


	/**
	 * 播放背景音乐
	 */
	public playBgmSound(id: string): void {
		if (id) {
			this._currentBgmId = id;
			this._currentBackBgmSound = new MusicBgmItem();
			this._currentBackBgmSound.soundManager = this;
			var path: string = "resource/assets/sound/" + id + ".mp3";
			if (path) {
				if (this._currentBackBgmSound && this._currentBackBgmSound.isPlaying == false) {
					this._currentBackBgmSound.playSound(path, 2, this.bgmVolume, 1, new FunctionVo(this.playCallBack, this, [this._currentBgmId]));
				}
			}
		}
	}

	private playCallBack(id: string): void {
		this.playBgmSound(id);
	}

	private closeBgm(): void {
		if (this._currentBackBgmSound) {
			this._currentBackBgmSound.stopSound();
		}
		this._currentBackBgmSound = null;
	}

	/**
	 * 播放音效
	 */
	public playSound(id: string, gap: number = 0, value: number = 1): void {
		if (this._isCloseSound) {
			return;
		}
		let sdItem: MusicEffectItem;
		let crt: number = 0;
		let v: number = NaN;
		if (this._playingSoundHash.size < this._maxEffectSoundLen && id && id != "0") {
			sdItem = this._soundHash.get(id) as MusicEffectItem;
			crt = egret.getTimer();
			if (sdItem && crt - sdItem.lastPlaying < 0) {
				return;
			}
			sdItem = this.getSoundItem(id, sdItem);
			if (sdItem) {
				sdItem.lastPlaying = crt + gap;
				v = value * this._effectVolume;
				sdItem.playSound(v, new FunctionVo(this.playEndBlack, this));
				this._playingSoundHash.put(sdItem, id);
			}
		}
	}

	private playEndBlack(sdItem: MusicEffectItem): void {
		this._playingSoundHash.remove(sdItem);
	}

	private getSoundItem(id: string, sdItem?: MusicEffectItem): MusicEffectItem {
		let sdItem2: MusicEffectItem;
		let path: string = "resource/assets/sound/" + id + ".mp3";
		if (!path) {
			return null;
		}
		if (sdItem) {
			if (sdItem.isPlaying == false) {
				return sdItem;
			}
			sdItem2 = new MusicEffectItem();
			sdItem2.path = path;
		}
		else {
			sdItem2 = new MusicEffectItem();
			sdItem2.path = path;
		}
		if (this._soundHash.has(id) == false) {
			this._soundHash.put(id, sdItem2);
		}
		return sdItem2;
	}

	public stopAll(): void {
		let sdType: any;
		if (this._playingSoundHash) {
			let len: number = this._playingSoundHash.size;
			let values: Array<MusicEffectItem> = this._playingSoundHash.values;
			for (let i: number = 0; i < len; i++) {
				values[i].stopSound();
			}
		}
		if (this._currentBackBgmSound) {
			this._currentBackBgmSound.stopSound();
		}
	}

	public addvanceTime(): void {
		let key: any;
		let sound: MusicEffectItem;
		let ct: number = egret.getTimer();
		let cha: number = 10 * 60 * 1000;
		let keys: Array<any> = this._soundHash.keys;
		let len: number = keys.length;
		for (let i: number = 0; i < len; i++) {
			key = keys[i];
			sound = this._soundHash.get(key) as MusicEffectItem;
			if (sound && ct - sound.lastPlaying > cha && sound.isPlaying == false) {
				sound.dispose();
				this._soundHash.remove(key);
			}
		}
	}

	private _currentBackBgmSound: MusicBgmItem;
	private _currentBgmId: string;
	/**当前音效音量 */
	private _effectVolume: number = 1;
	/**当前背景音乐音量 */
	private _bgmVolume: number = 0.6;
	/**是否关闭背景音乐 */
	private _isCloseBgm: boolean = false;
	/**是否播放音效 */
	private _isCloseSound: boolean = false;

	private _maxEffectSoundLen: number = 10;
	private _playingSoundHash: HashMap;
	private _soundHash: HashMap;
}