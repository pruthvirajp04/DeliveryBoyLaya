import Template_ZMDGJ_View_ZMDGJ_Base from "../TemplateViewBase";
import KRQ_ZMDGJ__Main_ZMDGJ_ from "../../../KRQ/ViewCom/KRQ_Main";
import Event_ZMDGJ_Mgr from "../../../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../../../Event/EventDef";
import User_ZMDGJ_ from "../../../User/User";
import Utilit_ZMDGJ_ from "../../../Utilit";
import View_ZMDGJ_Mgr, { View_ZMDGJ_Def } from "../../../Mgr/ViewMgr";

export default class Main_ZMDGJ_View_ZMDGJ_Template extends Template_ZMDGJ_View_ZMDGJ_Base
{
    protected _krq_ZMDGJ_Main : KRQ_ZMDGJ__Main_ZMDGJ_ = null;

    protected _center_ZMDGJ_Zone : Laya.Clip = null;
    protected _start_ZMDGJ_Btn : Laya.Sprite = null;

    protected _level_ZMDGJ_Num : Laya.FontClip = null;
    protected _money_ZMDGJ_Num : Laya.FontClip = null;
    
    onAwake()
    {
        super.onAwake();

        this._krq_ZMDGJ_Main = this.View_ZMDGJ_.getChildByName("KRQ_Main").getComponent(KRQ_ZMDGJ__Main_ZMDGJ_);
        this._center_ZMDGJ_Zone = this.View_ZMDGJ_.getChildByName("CenterZone") as Laya.Clip;

        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit_ZMDGJ_.is_ZMDGJ_IphoneX())
            {
                this._center_ZMDGJ_Zone.top =  this._center_ZMDGJ_Zone.top + 75;
            }
        }
        else
        {
            this._center_ZMDGJ_Zone.top =  this._center_ZMDGJ_Zone.top - 200;
            if(Utilit_ZMDGJ_.is_ZMDGJ_IphoneX())
            {
                this._center_ZMDGJ_Zone.top =  this._center_ZMDGJ_Zone.top + 75;
            }
        }

        this._start_ZMDGJ_Btn = this._center_ZMDGJ_Zone.getChildByName("StartBtn") as Laya.Sprite;

        this._level_ZMDGJ_Num = this._center_ZMDGJ_Zone.getChildByName("LevelInfo").getChildByName("LevelNum") as Laya.FontClip;
        this._money_ZMDGJ_Num = this._center_ZMDGJ_Zone.getChildByName("MoneyInfo").getChildByName("MoneyNum") as Laya.FontClip;
    }

    onStart()
    {
        super.onStart();
        this._money_ZMDGJ_Num.value = String(User_ZMDGJ_.get_ZMDGJ_Money());
        this._level_ZMDGJ_Num.value = String(User_ZMDGJ_.get_ZMDGJ_LeveNum());
    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
        this._start_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Start_ZMDGJ_Btn);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_On_ZMDGJ_User_ZMDGJ_Money_ZMDGJ_Change,this,this.on_ZMDGJ_UserMoney_ZMDGJ_Change);
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
        this._start_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Start_ZMDGJ_Btn);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_On_ZMDGJ_User_ZMDGJ_Money_ZMDGJ_Change,this,this.on_ZMDGJ_UserMoney_ZMDGJ_Change);
    }

    protected on_ZMDGJ_Start_ZMDGJ_Btn()
    {
        View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.SkinTipsView, null, ()=>{
            View_ZMDGJ_Mgr.ins_ZMDGJ_tance.close_ZMDGJ_View(View_ZMDGJ_Def.MainView);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_On_ZMDGJ_Level_ZMDGJ_Start);
        });
    }

    protected on_ZMDGJ_UserMoney_ZMDGJ_Change(para)
    {
        let curr = para.curr;
        let last = para.last;
        this._money_ZMDGJ_Num.value = String(curr);
    }
}