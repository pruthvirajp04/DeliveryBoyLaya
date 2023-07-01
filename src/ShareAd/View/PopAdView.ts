import Loop_ZMDGJ_Ad_ZMDGJ_View from "./LoopAdView";
import Event_ZMDGJ_Mgr from "../../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../../Event/EventDef";

export default class Pop_ZMDGJ_Ad_ZMDGJ_View extends Laya.Script 
{

    protected _bg_ZMDGJ_ : Laya.Sprite;
    protected _pop_ZMDGJ_Btn : Laya.Sprite;
    protected _loop_ZMDGJ_Ad : Loop_ZMDGJ_Ad_ZMDGJ_View;

    onAwake()
    {
        this._bg_ZMDGJ_ = this.owner.getChildByName("BG") as Laya.Sprite;
        this._pop_ZMDGJ_Btn = this._bg_ZMDGJ_.getChildByName("PopADBtn") as Laya.Sprite;
        this._loop_ZMDGJ_Ad = this._bg_ZMDGJ_.getChildByName("LoopAD").getComponent(Loop_ZMDGJ_Ad_ZMDGJ_View);
        this._loop_ZMDGJ_Ad.Ad_ZMDGJ_Pos_ZMDGJ_ID = 44;
    }
    
    onEnable(): void 
    {
        this._pop_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Pop_ZMDGJ_Btn_ZMDGJ_Click);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.AD_On_ZMDGJ_ShareAd_ZMDGJ_Fail,this,this.on_ZMDGJ_Share_ZMDGJ_AdFail);
    }

    onDisable(): void 
    {
        this._pop_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Pop_ZMDGJ_Btn_ZMDGJ_Click);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.AD_On_ZMDGJ_ShareAd_ZMDGJ_Fail,this,this.on_ZMDGJ_Share_ZMDGJ_AdFail);
    }


    protected on_ZMDGJ_Pop_ZMDGJ_Btn_ZMDGJ_Click()
    {
        if(this._bg_ZMDGJ_.x > 0)
        {
            this.pop_ZMDGJ_Down();
        }
        else
        {
            this.pop_ZMDGJ_Up();
        }
    }

    public pop_ZMDGJ_Down()
    {
        Laya.Tween.to(this._bg_ZMDGJ_,
            {x : 0},
            250,
            Laya.Ease.circIn,Laya.Handler.create(this,()=>
            {

            }),null,true)
    }

    public pop_ZMDGJ_Up()
    {
        Laya.Tween.to(this._bg_ZMDGJ_,
            {x : this._bg_ZMDGJ_.width},
            250,
            Laya.Ease.circIn,Laya.Handler.create(this,()=>
            {

            }),null,true)
    }

    protected on_ZMDGJ_Share_ZMDGJ_AdFail()
    {
        this.pop_ZMDGJ_Up();
    }
}