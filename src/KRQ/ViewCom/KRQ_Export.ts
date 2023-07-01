import KRQ__ZMDGJ_View_ZMDGJ_Com_ZMDGJ_Base from "./KRQ_ViewComBase";
import Utilit_ZMDGJ_ from "../../Utilit";

export default class KRQ_ZMDGJ__Export_ZMDGJ_ extends KRQ__ZMDGJ_View_ZMDGJ_Com_ZMDGJ_Base
{
    public on_ZMDGJ_Continue_ZMDGJ_Btn_ZMDGJ_Click : Function = null;

    protected _top_ZMDGJ_Zone_ZMDGJ_ : Laya.Clip = null;
    public get Back_ZMDGJ_Btn()
    {
        if(null == this._back_ZMDGJ_Btn)
        {
            this._back_ZMDGJ_Btn = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("TopZone").getChildByName("BackBtn") as Laya.Sprite;
        }
        return this._back_ZMDGJ_Btn;
    }
    protected _back_ZMDGJ_Btn : Laya.Sprite = null;
    
    protected _center_ZMDGJ_Zone : Laya.Clip = null;
    public get Continue_ZMDGJ_Btn()
    {
        if(null == this._continue_ZMDGJ_Btn)
        {
            this._continue_ZMDGJ_Btn = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("CenterZone").getChildByName("ContinueBtn") as Laya.Sprite;
        }
        return this._continue_ZMDGJ_Btn;
    }
    protected _continue_ZMDGJ_Btn : Laya.Sprite = null;

    onAwake()
    {
        this._top_ZMDGJ_Zone_ZMDGJ_ = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("TopZone") as Laya.Clip;
        if(Utilit_ZMDGJ_.is_ZMDGJ_IphoneX())
        {
            this._top_ZMDGJ_Zone_ZMDGJ_.top =  this._top_ZMDGJ_Zone_ZMDGJ_.top + 75;
        }
        this._back_ZMDGJ_Btn = this._top_ZMDGJ_Zone_ZMDGJ_.getChildByName("BackBtn") as Laya.Sprite;
        this._center_ZMDGJ_Zone = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("CenterZone") as Laya.Clip;
        if(Utilit_ZMDGJ_.is_ZMDGJ_IphoneX())
        {
            this._center_ZMDGJ_Zone.top =  this._center_ZMDGJ_Zone.top + 75;
        }
        this._continue_ZMDGJ_Btn = this._center_ZMDGJ_Zone.getChildByName("ContinueBtn") as Laya.Sprite;
    }

    onEnable()
    {
        this._back_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Back_ZMDGJ_Btn);
        this._continue_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Continue_ZMDGJ_Btn);
    }

    onDisable()
    {
        this._back_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Back_ZMDGJ_Btn);
        this._continue_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Continue_ZMDGJ_Btn);
    }

    protected on_ZMDGJ_Back_ZMDGJ_Btn()
    {
        this._ZMDGJ_hide_ZMDGJ_();
    }

    protected on_ZMDGJ_Continue_ZMDGJ_Btn()
    {
        if(null != this.on_ZMDGJ_Continue_ZMDGJ_Btn_ZMDGJ_Click)
        {
            this.on_ZMDGJ_Continue_ZMDGJ_Btn_ZMDGJ_Click();
        }
    }
}