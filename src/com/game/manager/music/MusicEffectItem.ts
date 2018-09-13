class MusicEffectItem 
{
	public constructor() 
	{
	}

	public get lastPlaying():number
	{
		return this._lastPlayingTime;
	}
	
	public set lastPlaying(value:number)
	{
		this._lastPlayingTime = value;
	}

	public set volume(value:number)
	{
		this._volume = value;
		if(this._soundChannel)
		{
			this._soundChannel.volume = this._volume;
		}
	}

	public get volume():number
	{
		return this._volume;
	}	

	public get path():string
	{
		return this._path;
	}
	
	public set path(value:string)
	{
		this._path = value;
	}

	public get isPlaying() : boolean
	{
		return this._isPlaying;
	}
    
	public playSound(volume:number, callBack:FunctionVo) : void
	{
		this._volume = volume;
		this._callBack = callBack;
		if(this._isPlaying)
		{
			return;
		}
		if(!this._sound)
		{
			this._sound = new egret.Sound();
			this._sound.type = egret.Sound.EFFECT;
			this._sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
			this._sound.load(this.path);
		}
		this._isPlaying = true;
	}

	private onLoadComplete(evt:egret.Event):void
	{
		if(this._isPlaying)
        {
			this._sound.removeEventListener(egret.Event.COMPLETE,this.onLoadComplete,this);
			if(this._soundChannel)
			{
				this._soundChannel.removeEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this);
			}
			this._soundChannel = this._sound.play(0,1);
			this._soundChannel.volume = this._volume;
            if(this._soundChannel)
            {
               this._soundChannel.addEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this);
            }
            else
            {
               this.stopSound();
            }
         }
         else
         {
            this.stopSound();
         }
	}

	private onSoundComplete(event:egret.Event) : void
	{
		this._soundChannel.removeEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this);
		this.stopSound();
	}

	public stopSound():void
	{
		this._isPlaying = false;
		if(this._callBack != null)
		{
			this._callBack.param = [this];
			this._callBack.exec();
		}
		this.dispose();
	}

	public dispose():void
    {
		if(this._soundChannel)
		{
			this._soundChannel.stop();
			this._soundChannel.removeEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this);
         	this._soundChannel = null;
		}
		if(this._sound)
		{
            try
            {
               this._sound.close();
            }
            catch(e)
            {
            }
            this._sound = null;
         }
         this._volume = 0;
    }

	private _sound:egret.Sound;
	private _soundChannel:egret.SoundChannel; 
	private _path:string;
	private _volume:number = 0;
	private _callBack:FunctionVo;
	private _lastPlayingTime:number = 0;
	private _isPlaying:boolean = false;
}