import KRQ__ZMDGJ_Com_ZMDGJ_Base from "../KRQ_ComBase";

export default class KRQ_ZMDGJ__Loop_ZMDGJ_Ad_ZMDGJ_Box extends KRQ__ZMDGJ_Com_ZMDGJ_Base
{
    protected _display_ZMDGJ_Sp : Laya.Sprite;
    protected _ZMDGJ__disText_ZMDGJ_ : Laya.Text;
    protected _ZMDGJ__originW_ZMDGJ_ : number = 170;
    protected _ZMDGJ__originH_ZMDGJ_ : number = 170;

    onAwake()
    {
        this._display_ZMDGJ_Sp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._ZMDGJ__originW_ZMDGJ_ = this._display_ZMDGJ_Sp.width;
        this._ZMDGJ__originH_ZMDGJ_ = this._display_ZMDGJ_Sp.height;
        this._ZMDGJ__disText_ZMDGJ_ = this.owner.getChildByName("TitelText") as Laya.Text;
        this._ZMDGJ__disText_ZMDGJ_.overflow = Laya.Text.SCROLL;
        this._ZMDGJ__disText_ZMDGJ_.text = "";
    }

    onStart()
    {
        this.auto_ZMDGJ_Scroll_ZMDGJ_Text(this._ZMDGJ__disText_ZMDGJ_);
    }

    onEnable()
    {
        this._ZMDGJ_Sprite_ZMDGJ_.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Click_ZMDGJ_Ad)
    }

    onDisable()
    {
        this._ZMDGJ_Sprite_ZMDGJ_.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Click_ZMDGJ_Ad)
    }

    protected on_ZMDGJ_Click_ZMDGJ_Ad()
    {
        this.navigate_ZMDGJ_To_ZMDGJ_Mini_ZMDGJ_Program();
    }

    public set_ZMDGJ_Data(data)
    {
        this._data = data;
        if(null != this._data)
        {
            let self = this;
            this._display_ZMDGJ_Sp.loadImage(this._data.logo,Laya.Handler.create(this,function()
            {
                if(!self._display_ZMDGJ_Sp.destroyed)
                {
                    self._display_ZMDGJ_Sp.width = self._ZMDGJ__originW_ZMDGJ_;
                    self._display_ZMDGJ_Sp.height = self._ZMDGJ__originH_ZMDGJ_;
                }
            }));
            let str = String(this._data.title);
            this._ZMDGJ__disText_ZMDGJ_.text = str;
        }
    }
}