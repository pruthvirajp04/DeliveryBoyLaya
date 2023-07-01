import KRQ_ZMDGJ__Banner_ZMDGJ_ from "../Com/KRQ_Banner";
import KRQ__ZMDGJ_View_ZMDGJ_Com_ZMDGJ_Base from "./KRQ_ViewComBase";
import KRQ_ZMDGJ__His_ZMDGJ_tory from "../Com/KRQ_History/KRQ_History";
import KRQ_ZMDGJ__H_ZMDGJ_Loop_ZMDGJ_Ad from "../Com/KRQ_LoopAd/KRQ_HLoopAd";
import Utilit_ZMDGJ_ from "../../Utilit";

export enum KRQ_Main_ZMDGJ_State
{
    _ZMDGJ_Normal_ZMDGJ_ = 0,
    _ZMDGJ_NoLoopAd_ZMDGJ_ = 1,
    _ZMDGJ_NoBannerAd_ZMDGJ_ = 2,
}

export default class KRQ_ZMDGJ__Main_ZMDGJ_ extends KRQ__ZMDGJ_View_ZMDGJ_Com_ZMDGJ_Base
{
    protected _top_ZMDGJ_Zone : Laya.Clip = null;
    protected _history_ZMDGJ_Btn : Laya.Sprite = null;
    protected _krq_ZMDGJ_Loop_ZMDGJ_Ad : KRQ_ZMDGJ__H_ZMDGJ_Loop_ZMDGJ_Ad = null;

    protected _bottom_ZMDGJ_Zone : Laya.Clip = null;
    protected _krq_ZMDGJ_Banner : KRQ_ZMDGJ__Banner_ZMDGJ_ = null;

    protected _krq_ZMDGJ_History : KRQ_ZMDGJ__His_ZMDGJ_tory = null;

    onAwake()
    {
        this._top_ZMDGJ_Zone = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("TopZone") as Laya.Clip;
        this._history_ZMDGJ_Btn = this._top_ZMDGJ_Zone.getChildByName("HistoryBtn") as Laya.Sprite;
        this._history_ZMDGJ_Btn.visible = false;
        if(Utilit_ZMDGJ_.is_ZMDGJ_IphoneX())
        {
            this._top_ZMDGJ_Zone.top =  this._top_ZMDGJ_Zone.top + 75;
        }
        
        this._krq_ZMDGJ_Loop_ZMDGJ_Ad  = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("KRQ_HLoopAd").getComponent(KRQ_ZMDGJ__H_ZMDGJ_Loop_ZMDGJ_Ad) as KRQ_ZMDGJ__H_ZMDGJ_Loop_ZMDGJ_Ad;
        this._krq_ZMDGJ_Banner = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("KRQ_Banner").getComponent(KRQ_ZMDGJ__Banner_ZMDGJ_) as KRQ_ZMDGJ__Banner_ZMDGJ_;
        this._krq_ZMDGJ_History = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("KRQ_History").getComponent(KRQ_ZMDGJ__His_ZMDGJ_tory) as KRQ_ZMDGJ__His_ZMDGJ_tory;
        let self = this;

        let aspectRatio = Laya.stage.width / Laya.stage.height;
        this._krq_ZMDGJ_History.On_ZMDGJ_Back_ZMDGJ_Btn_ZMDGJ_Click =()=>
        {
            if(aspectRatio  < 0.5)
            {
                self._krq_ZMDGJ_Banner._ZMDGJ_show_ZMDGJ_();
            }
        }
        this._krq_ZMDGJ_Loop_ZMDGJ_Ad._ZMDGJ_Sprite_ZMDGJ_.visible = false;
        if(aspectRatio  < 0.5) 
        {
            this._krq_ZMDGJ_Loop_ZMDGJ_Ad._ZMDGJ_Clip_ZMDGJ_.top = 100;
            if(Utilit_ZMDGJ_.is_ZMDGJ_IphoneX())
            {
                this._krq_ZMDGJ_Loop_ZMDGJ_Ad._ZMDGJ_Clip_ZMDGJ_.top =  this._krq_ZMDGJ_Loop_ZMDGJ_Ad._ZMDGJ_Clip_ZMDGJ_.top + 75;
            }
            this._krq_ZMDGJ_Banner._ZMDGJ_Sprite_ZMDGJ_.visible = true;
        }
        else
        {
            this._krq_ZMDGJ_Loop_ZMDGJ_Ad._ZMDGJ_Clip_ZMDGJ_.top = Laya.stage.height - 280;
            this._krq_ZMDGJ_Banner._ZMDGJ_Sprite_ZMDGJ_.visible = false;
        }
    }

    public switchState(state : KRQ_Main_ZMDGJ_State)
    {
        if(state == KRQ_Main_ZMDGJ_State._ZMDGJ_Normal_ZMDGJ_)
        {
            let aspectRatio = Laya.stage.width / Laya.stage.height;
            if(aspectRatio  < 0.5) 
            {
                this._krq_ZMDGJ_Loop_ZMDGJ_Ad._ZMDGJ_Clip_ZMDGJ_.top = 100;
                if(Utilit_ZMDGJ_.is_ZMDGJ_IphoneX())
                {
                    this._krq_ZMDGJ_Loop_ZMDGJ_Ad._ZMDGJ_Clip_ZMDGJ_.top =  this._krq_ZMDGJ_Loop_ZMDGJ_Ad._ZMDGJ_Clip_ZMDGJ_.top + 75;
                }
                this._krq_ZMDGJ_Banner._ZMDGJ_Sprite_ZMDGJ_.visible = true;
            }
            else
            {
                this._krq_ZMDGJ_Loop_ZMDGJ_Ad._ZMDGJ_Clip_ZMDGJ_.top = Laya.stage.height - 280;
                this._krq_ZMDGJ_Banner._ZMDGJ_Sprite_ZMDGJ_.visible = false;
            }
        }
        else if(state == KRQ_Main_ZMDGJ_State._ZMDGJ_NoLoopAd_ZMDGJ_)
        {
            this._krq_ZMDGJ_Loop_ZMDGJ_Ad.isEnable = false;
            this._krq_ZMDGJ_Loop_ZMDGJ_Ad._ZMDGJ_Sprite_ZMDGJ_.visible = false;
            this._krq_ZMDGJ_Banner._ZMDGJ_Sprite_ZMDGJ_.visible = true;
        }
        else if(state == KRQ_Main_ZMDGJ_State._ZMDGJ_NoBannerAd_ZMDGJ_)
        {
            this._krq_ZMDGJ_Loop_ZMDGJ_Ad._ZMDGJ_Clip_ZMDGJ_.top = Laya.stage.height - 280;
            this._krq_ZMDGJ_Banner.Ad_ZMDGJ_Pos_ZMDGJ_ID= -1;
            this._krq_ZMDGJ_Banner._ZMDGJ_Sprite_ZMDGJ_.visible = false;
        }
    }

    onEnable()
    {
        this._history_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_History_ZMDGJ_Btn);
    }

    onDisable()
    {
        this._history_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_History_ZMDGJ_Btn);
    }

    protected on_ZMDGJ_History_ZMDGJ_Btn()
    {
        this._krq_ZMDGJ_History._ZMDGJ_show_ZMDGJ_();
        this._krq_ZMDGJ_Banner._ZMDGJ_hide_ZMDGJ_();
    }
}