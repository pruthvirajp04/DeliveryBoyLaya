import KRQ__ZMDGJ_Com_ZMDGJ_Base from "./KRQ_ComBase";
import _ZMDGJ_ShareAd_ZMDGJ_ from "../../ShareAd/ShareAd";

export default class KRQ_ZMDGJ__Single_ZMDGJ_Ad extends KRQ__ZMDGJ_Com_ZMDGJ_Base
{
    protected static readonly _repeatCheckList : Array<string> = new Array<string>();

    protected _ZMDGJ__display_ZMDGJ_ : Laya.Sprite;
    protected _ZMDGJ__text_ZMDGJ_ : Laya.Text;

    protected _ZMDGJ__originW_ZMDGJ_ : number = 300;
    protected _ZMDGJ__originH_ZMDGJ_ : number = 300;

    onAwake()
    {
        this.Ad_ZMDGJ_Pos_ZMDGJ_ID = _ZMDGJ_ShareAd_ZMDGJ_.LoopAd_ZMDGJ_LocationID;

        this._ZMDGJ__display_ZMDGJ_ = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("Display") as Laya.Sprite;
        this._ZMDGJ__text_ZMDGJ_ = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("Text") as Laya.Text;
        this._ZMDGJ__text_ZMDGJ_.overflow = Laya.Text.SCROLL;
        this._ZMDGJ__text_ZMDGJ_.text = "";
    }

    onEnable()
    {
        this._ZMDGJ_Sprite_ZMDGJ_.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Click_ZMDGJ_Ad)
    }

    onDisable()
    {
        this._ZMDGJ_Sprite_ZMDGJ_.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Click_ZMDGJ_Ad)
    }

    onStart()
    {
        this.auto_ZMDGJ_Scroll_ZMDGJ_Text(this._ZMDGJ__text_ZMDGJ_);
        this.ref_ZMDGJ_resh();
    }


    public ref_ZMDGJ_resh(onComplate? : Function)
    {
        let self = this;
        _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_ADVs(this.Ad_ZMDGJ_Pos_ZMDGJ_ID,(datas)=>
        {
            if(null != datas)
            {
                self._datas = datas;
                if(self._ZMDGJ_Sprite_ZMDGJ_ && !self._ZMDGJ_Sprite_ZMDGJ_.destroyed)
                {
                    for(let i=0;i < self._datas.length;++i)
                    {
                        let find = false;
                        let data = self._datas[i];
                        for(let j=0;j < KRQ_ZMDGJ__Single_ZMDGJ_Ad._repeatCheckList.length;++j)
                        {
                            let appid = KRQ_ZMDGJ__Single_ZMDGJ_Ad._repeatCheckList[j];
                            if(appid == data.appid)
                            {
                                find = true;
                                break;
                            }
                        }
                        if(!find)
                        {
                            self.clear_ZMDGJ_Repeat();
                            self._data = data;
                            break;
                        }
                    }

                    if(null == self._data)
                    {
                        self._data = self._datas[Math.floor(Math.random() * datas.length)];
                    }
        
                    if(null != self._data)
                    {
                        self._ZMDGJ__display_ZMDGJ_.loadImage(self._data.logo,Laya.Handler.create(self,function()
                        {
                            if(null != self._ZMDGJ_Sprite_ZMDGJ_ && !self._ZMDGJ_Sprite_ZMDGJ_.destroy)
                            {
                                self._ZMDGJ_Sprite_ZMDGJ_.visible = true;
                                if(onComplate)
                                {
                                    onComplate();
                                }
                            }
                        }));
                        var str = self._data.title;
                        self._ZMDGJ__text_ZMDGJ_.text = str;

                        let isHas = false;
                        for(let j=0;j < KRQ_ZMDGJ__Single_ZMDGJ_Ad._repeatCheckList.length;++j)
                        {
                            let appid = KRQ_ZMDGJ__Single_ZMDGJ_Ad._repeatCheckList[j];
                            if(appid == self._data.appid)
                            {
                                isHas = true;
                                break;
                            }
                        }
                        if(!isHas)
                        {
                            KRQ_ZMDGJ__Single_ZMDGJ_Ad._repeatCheckList.push(self._data.appid);
                        }
                    }
                    else
                    {
                        if(null != self._ZMDGJ_Sprite_ZMDGJ_ && !self._ZMDGJ_Sprite_ZMDGJ_.destroy)
                        {
                            self._ZMDGJ_Sprite_ZMDGJ_.visible = false;
                        }
                        if(onComplate)
                        {
                            onComplate();
                        }
                    }
                }
            }
            else
            {
                self._ZMDGJ_Sprite_ZMDGJ_.visible = false;

                if(onComplate)
                {
                    onComplate();
                }
            }
        })
    }

    public _ZMDGJ_hide_ZMDGJ_()
    {
        this._ZMDGJ_Sprite_ZMDGJ_.visible = false;
        this.clear_ZMDGJ_Repeat();
    }

    protected clear_ZMDGJ_Repeat()
    {
        if(null != this._data)
        {
            for (let i = 0; i < KRQ_ZMDGJ__Single_ZMDGJ_Ad._repeatCheckList.length; ++i)
            {
                let appid = KRQ_ZMDGJ__Single_ZMDGJ_Ad._repeatCheckList[i];
                if(appid == this._data.appid)
                {
                    KRQ_ZMDGJ__Single_ZMDGJ_Ad._repeatCheckList.splice(i,1);
                    break;
                }
            }
        }
    }

    protected on_ZMDGJ_Click_ZMDGJ_Ad()
    {
        this.navigate_ZMDGJ_To_ZMDGJ_Mini_ZMDGJ_Program();
        this.ref_ZMDGJ_resh();
    }

    onDestroy()
    {
        this.clear_ZMDGJ_Repeat();
    }
}