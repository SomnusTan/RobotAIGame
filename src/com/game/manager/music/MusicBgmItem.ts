/**
 * 背景音乐
 */
class MusicBgmItem 
{
	public constructor() 
	{

	}

	public set isPlaying(value:boolean)
	{
		this._isPlaying = value;
	}
	
	public get isPlaying() : boolean
	{
		return this._isPlaying;
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

	public playSound(url:string, delay:number = 3, volume:number = 0.3, num:number = 0, back:FunctionVo = null) : void
	{
		if(this._isPlaying)
		{
			return;
		}
		this._delay = delay;
		this._num = num;
		this._volume = volume;
		this._isPlaying = true;
		this._url = url;
		this._callBack = back;
		if(this._delay == 0)
		{
			this._delay = 1;
		}
		if(!this._sound)
		{
			this._sound = new egret.Sound();
			this._sound.type = egret.Sound.MUSIC;
			this._sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
			this._sound.load(url);
		}
	}

	private onLoadComplete(evt:egret.Event):void
	{
		this._isLoadingFinish = true;
		if(this._isPlaying)
        {
			this._sound.removeEventListener(egret.Event.COMPLETE,this.onLoadComplete,this);
			if(this._soundChannel)
			{
				this._soundChannel.removeEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this);
			}
			this._soundChannel = this._sound.play(0,this._num);
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

	protected onSoundComplete(event:egret.Event) : void
	{
		this._crtPlayCount ++;
		this._isPlaying = false;
		this.stopSound();
		App.timer.doTimeOnce(this,this._delay*1000,this.onTimeHandler);
		// this._inval = egret.setTimeout(this.onTimeHandler,this,this._delay * 1000);
	}

	private onTimeHandler() : void
	{
		if(this._callBack)
		{
			this._callBack.exec();
		}
	}

	public stopSound():void
    {
		if(this._inval > 0)
		{
			egret.clearTimeout(this._inval);
		}
		if(this._soundChannel)
		{
			this._soundChannel.stop();
			this._soundChannel.removeEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this);
		}
		if(this._sound)
		{
			this._sound.removeEventListener(egret.Event.COMPLETE,this.onLoadComplete,this);
			if(this._isLoadingFinish == false)
			{
				try
				{
					this._sound.close();
				}
				catch(e)
				{
				}
			}
		}
	 	this._isPlaying = false;
		this._volume = 0;
		this._sound = null;
		this._soundChannel = null;
    }

	private _crtPlayCount:number = 0;
	private _inval:number = 0;
	private _soundChannel:egret.SoundChannel;
	private _isLoadingFinish:boolean = false;
	private _sound:egret.Sound;
	private _volume:number = 0;
	private _delay:number = 0;
	private _url:string;
	private _num:number = 0;
	private _callBack:FunctionVo;
	private _isPlaying:boolean = false;
	public soundManager:MusicManager;
}