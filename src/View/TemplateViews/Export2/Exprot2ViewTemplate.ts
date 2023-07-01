import Template_ZMDGJ_View_ZMDGJ_Base from "../TemplateViewBase";
import KRQ_ZMDGJ__V_ZMDGJ_Loop_ZMDGJ_Ad from "../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd";
import App_ZMDGJ_Switch_ZMDGJ_Config from "../../../Config/AppSwitchConfig";
import Utilit_ZMDGJ_ from "../../../Utilit";
import _ZMDGJ_ShareAd_ZMDGJ_ from "../../../ShareAd/ShareAd";
import Game_ZMDGJ_Mgr from "../../../Mgr/GameMgr";
import View_ZMDGJ_Mgr, { View_ZMDGJ_Def } from "../../../Mgr/ViewMgr";

export default class Exprot2_ZMDGJ_View_ZMDGJ_Template extends Template_ZMDGJ_View_ZMDGJ_Base 
{
    protected _continue_ZMDGJ_Btn : Laya.Sprite = null;
    protected _krq_ZMDGJ_VLoopAd : KRQ_ZMDGJ__V_ZMDGJ_Loop_ZMDGJ_Ad = null;
    protected _KRQ_V_ZMDGJ_LoopAd : Laya.Clip = null;

    onAwake()
    {
        super.onAwake();
        this._krq_ZMDGJ_VLoopAd = this.View_ZMDGJ_.getChildByName("KRQ_VLoopAd").getComponent(KRQ_ZMDGJ__V_ZMDGJ_Loop_ZMDGJ_Ad);
        this._krq_ZMDGJ_VLoopAd.use_ZMDGJ_Local_ZMDGJ_Random = false;
        this._krq_ZMDGJ_VLoopAd.useRandom = false;
        this._krq_ZMDGJ_VLoopAd.useMovePause = false;
        this._continue_ZMDGJ_Btn = this.View_ZMDGJ_.getChildByName("ContinueBtn") as Laya.Sprite;
        this._continue_ZMDGJ_Btn.visible = false;
        let self = this;
        Laya.timer.once(App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().continue_ZMDGJ_Btn_ZMDGJ_DelayTime * 1000,this,()=>
        {
            self._continue_ZMDGJ_Btn.visible = true;
        })

        this._KRQ_V_ZMDGJ_LoopAd = this.View_ZMDGJ_.getChildByName("KRQ_VLoopAd") as Laya.Clip;
        if(Utilit_ZMDGJ_.is_ZMDGJ_IphoneX())
        {
            this._KRQ_V_ZMDGJ_LoopAd.top =  this._KRQ_V_ZMDGJ_LoopAd.top + 75;
        }
    }

    onStart()
    {
        this._krq_ZMDGJ_VLoopAd.Ad_ZMDGJ_Pos_ZMDGJ_ID = _ZMDGJ_ShareAd_ZMDGJ_.MoreGame_ZMDGJ_LocationID;
        super.onStart();
    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
        this._continue_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Continue_ZMDGJ_Btn);
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
        this._continue_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Continue_ZMDGJ_Btn);
    }

    protected on_ZMDGJ_Continue_ZMDGJ_Btn()
    {
        Game_ZMDGJ_Mgr.get_ZMDGJ_Instance().EnterGameScene(() => {
            View_ZMDGJ_Mgr.ins_ZMDGJ_tance.close_ZMDGJ_View(View_ZMDGJ_Def.Export2View);
        });
    }
}