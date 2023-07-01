import Template_ZMDGJ_View_ZMDGJ_Base from "../TemplateViewBase";
import KRQ_ZMDGJ__V_ZMDGJ_Loop_ZMDGJ_Ad from "../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd";
import App_ZMDGJ_Switch_ZMDGJ_Config from "../../../Config/AppSwitchConfig";

export default class ExportViewTemplate extends Template_ZMDGJ_View_ZMDGJ_Base
{
    protected _continue_ZMDGJ_Btn : Laya.Sprite = null;
    protected _krq_ZMDGJ_VLoopAd : KRQ_ZMDGJ__V_ZMDGJ_Loop_ZMDGJ_Ad = null;
    

    onAwake()
    {
        super.onAwake();
        this._krq_ZMDGJ_VLoopAd = this.View_ZMDGJ_.getChildByName("KRQ_VLoopAd").getComponent(KRQ_ZMDGJ__V_ZMDGJ_Loop_ZMDGJ_Ad);
        this._krq_ZMDGJ_VLoopAd.useMovePause = false;
        this._continue_ZMDGJ_Btn = this._krq_ZMDGJ_VLoopAd._ZMDGJ_Sprite_ZMDGJ_.getChildByName("ContinueBtn") as Laya.Sprite;
        this._continue_ZMDGJ_Btn.visible = false;
        let self = this;
        Laya.timer.once(App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().continue_ZMDGJ_Btn_ZMDGJ_DelayTime * 1000,this,()=>
        {
            self._continue_ZMDGJ_Btn.visible = true;
        })
    }

    onStart()
    {
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
        
    }
}