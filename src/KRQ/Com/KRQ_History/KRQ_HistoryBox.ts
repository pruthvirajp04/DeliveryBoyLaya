import KRQ__ZMDGJ_Com_ZMDGJ_Base from "../../Com/KRQ_ComBase";

export default class KRQ__ZMDGJ_History_ZMDGJ_Box extends KRQ__ZMDGJ_Com_ZMDGJ_Base
{
    protected __ZMDGJ_icon : Laya.Sprite = null;
    protected __ZMDGJ_text : Laya.Text = null;
    protected __ZMDGJ_mark : Laya.Sprite = null;

    onAwake()
    {
        this.__ZMDGJ_icon = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("Icon") as Laya.Sprite;
        this.__ZMDGJ_text = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("Text") as Laya.Text;
        this.__ZMDGJ_text.overflow = Laya.Text.SCROLL;
        this.__ZMDGJ_text.text = "";
        this.__ZMDGJ_mark = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("Mark") as Laya.Text;
        this.__ZMDGJ_mark.visible = false;
    }

    onStart()
    {
        this.auto_ZMDGJ_Scroll_ZMDGJ_Text(this.__ZMDGJ_text);
    }

    onEnable()
    {
        this._ZMDGJ_Sprite_ZMDGJ_.on(Laya.Event.CLICK,this,this.onClic_ZMDGJ_kAd)
    }

    onDisable()
    {
        this._ZMDGJ_Sprite_ZMDGJ_.off(Laya.Event.CLICK,this,this.onClic_ZMDGJ_kAd)
    }

    protected onClic_ZMDGJ_kAd()
    {
        this.navigate_ZMDGJ_To_ZMDGJ_Mini_ZMDGJ_Program();
    }

    public setData(data,star : boolean)
    {
        this._data = data;
        if(null != this._data)
        {
            var self = this;
            this.__ZMDGJ_icon.loadImage(this._data.logo,Laya.Handler.create(this,function()
            {
                if(!self.__ZMDGJ_icon.destroyed)
                {
                    self.__ZMDGJ_icon.width = 100;
                    self.__ZMDGJ_icon.height = 100;
                }
            }));
            var str = String(this._data.title);
            this.__ZMDGJ_text.text = str;
            this.__ZMDGJ_mark.visible = star;
        }
    }
}