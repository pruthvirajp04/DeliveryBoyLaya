
export default class Sound_ZMDGJ_Mgr {
    public static readonly sound_ZMDGJ_Res_ZMDGJ_Path = "subRes/sound/"
    public static readonly ins_ZMDGJ_tance: Sound_ZMDGJ_Mgr = new Sound_ZMDGJ_Mgr();
    
    private _ZMDGJ_bgm_ZMDGJ_:any;

    private constructor() {
    }

    public get _ZMDGJ_Enabled_ZMDGJ_()
    {
        return this._enabled_ZMDGJ_;
    }

    public set _ZMDGJ_Enabled_ZMDGJ_(e : boolean)
    {
        if(!e)
        {
            this.stop_ZMDGJ_BGM();
        }
        this._enabled_ZMDGJ_ = e;
    }

    protected _enabled_ZMDGJ_ : boolean = true;

    public get_ZMDGJ_Sound_ZMDGJ_Url(name: string) : string
    {
        let url = Sound_ZMDGJ_Mgr.sound_ZMDGJ_Res_ZMDGJ_Path + name + ".mp3";
        return url;
    }

    public play_ZMDGJ_Sound(name: string): void {
        if(!this._enabled_ZMDGJ_)
            return;
        var url = this.get_ZMDGJ_Sound_ZMDGJ_Url(name);
        if (Laya.Browser.onMiniGame) {
            var sound = laya.utils.Pool.getItem(name);
            if (sound == null) {
                sound = wx.createInnerAudioContext();
                sound.src = Sound_ZMDGJ_Mgr.sound_ZMDGJ_Res_ZMDGJ_Path + name + ".mp3";
                sound.onEnded(() => {
                    laya.utils.Pool.recover(name, sound);
                    sound.offEnded();
                })
            }
            sound.play();
        } else {
            Laya.SoundManager.playSound(url, 1);
        }
    }

    public play_ZMDGJ_BGM(name){
        if(!this._enabled_ZMDGJ_)
            return;
        let url = this.get_ZMDGJ_Sound_ZMDGJ_Url(name);
        if (Laya.Browser.onMiniGame) {
            if(!this._ZMDGJ_bgm_ZMDGJ_)
            {
                this._ZMDGJ_bgm_ZMDGJ_ = wx.createInnerAudioContext();
            }
            this._ZMDGJ_bgm_ZMDGJ_.pause();
            this._ZMDGJ_bgm_ZMDGJ_.src = url;
            this._ZMDGJ_bgm_ZMDGJ_.loop = true;
            this._ZMDGJ_bgm_ZMDGJ_.play();
        } else {
            Laya.SoundManager.playMusic(url, 0);
        }
    }

    public stop_ZMDGJ_BGM(){
        if (Laya.Browser.onMiniGame) {
            if(this._ZMDGJ_bgm_ZMDGJ_){
                this._ZMDGJ_bgm_ZMDGJ_.pause();
            }
        }else{
            Laya.SoundManager.stopMusic();
        }
    }

}