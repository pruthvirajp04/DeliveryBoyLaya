import Template_ZMDGJ_View_ZMDGJ_Base from "../TemplateViewBase";
import KRQ_ZMDGJ__Main_ZMDGJ_, { KRQ_Main_ZMDGJ_State } from "../../../KRQ/ViewCom/KRQ_Main";
import Utilit_ZMDGJ_ from "../../../Utilit";

export enum In_ZMDGJ_Game_ZMDGJ_ShowType
{
    _ZMDGJ_Normal_ZMDGJ_ = 0,
    _ZMDGJ_NoLoopAd_ZMDGJ_ = 1,
    _ZMDGJ_NoBannerAd_ZMDGJ_ = 2,
}

export default class In_ZMDGJ_Game_ZMDGJ_View_ZMDGJ_Template extends Template_ZMDGJ_View_ZMDGJ_Base
{
    protected _center_ZMDGJ_Zone : Laya.Clip = null;
    protected _krq_ZMDGJ_Main : KRQ_ZMDGJ__Main_ZMDGJ_ = null;

    onAwake()
    {
        super.onAwake();
        this._center_ZMDGJ_Zone = this.View_ZMDGJ_.getChildByName("CenterZone") as Laya.Clip;
        this._krq_ZMDGJ_Main = this.View_ZMDGJ_.getChildByName("KRQ_Main").getComponent(KRQ_ZMDGJ__Main_ZMDGJ_);

        var aspectRatio = Laya.stage.width / Laya.stage.height;
        // if(aspectRatio  < 0.5) 
        // {
        //     if(Utilit_ZMDGJ_.is_ZMDGJ_IphoneX())
        //     {
        //         this._center_ZMDGJ_Zone.top =  this._center_ZMDGJ_Zone.top + 75;
        //     }
        // }
        // else
        // {
        //     this._center_ZMDGJ_Zone.top =  this._center_ZMDGJ_Zone.top - 200;
        //     if(Utilit_ZMDGJ_.is_ZMDGJ_IphoneX())
        //     {
        //         this._center_ZMDGJ_Zone.top =  this._center_ZMDGJ_Zone.top + 75;
        //     }
        // }

    }

    public open_ZMDGJ_View(data?: any): void
    {
        super.open_ZMDGJ_View(data);
        if(null != data &&  null != data.showType)
        {
            let showType = data.showType as In_ZMDGJ_Game_ZMDGJ_ShowType;
            switch(showType)
            {
                case In_ZMDGJ_Game_ZMDGJ_ShowType._ZMDGJ_Normal_ZMDGJ_:
                    this._krq_ZMDGJ_Main.switchState(KRQ_Main_ZMDGJ_State._ZMDGJ_Normal_ZMDGJ_);
                    break;
                case In_ZMDGJ_Game_ZMDGJ_ShowType._ZMDGJ_NoLoopAd_ZMDGJ_:
                    this._krq_ZMDGJ_Main.switchState(KRQ_Main_ZMDGJ_State._ZMDGJ_NoLoopAd_ZMDGJ_);
                    break;
                case In_ZMDGJ_Game_ZMDGJ_ShowType._ZMDGJ_NoBannerAd_ZMDGJ_:
                    this._krq_ZMDGJ_Main.switchState(KRQ_Main_ZMDGJ_State._ZMDGJ_NoBannerAd_ZMDGJ_);
                    break;
            }
        }
    }

    onStart()
    {
        super.onStart();
    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
    }
}