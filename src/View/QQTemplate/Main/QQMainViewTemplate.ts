import KRQ_Main from "../../../KRQ/ViewCom/KRQ_Main";
import Event_ZMDGJ_Mgr from "../../../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../../../Event/EventDef";
import User from "../../../User/User";
import Utilit from "../../../Utilit";
import QQ_ZMDGJ_Template_ZMDGJ_ViewBase from "../QQTemplateViewBase";
import QQMiniGameAPI from "../../../QQMiniGameAPI";

export default class QQ_ZMDGJ_Main_ZMDGJ_View_ZMDGJ_Template extends QQ_ZMDGJ_Template_ZMDGJ_ViewBase
{
    protected _center_ZMDGJ_Zone : Laya.Clip = null;
    protected _start_ZMDGJ_Btn : Laya.Sprite = null;

    protected _level_ZMDGJ_Num : Laya.FontClip = null;
    protected _money_ZMDGJ_Num : Laya.FontClip = null;
    
    protected _more_ZMDGJ_Game_ZMDGJ_Btn : Laya.Sprite = null;

    onAwake()
    {
        super.onAwake();

        this._center_ZMDGJ_Zone = this.View_ZMDGJ_.getChildByName("CenterZone") as Laya.Clip;
        this._more_ZMDGJ_Game_ZMDGJ_Btn = this._center_ZMDGJ_Zone.getChildByName("MoreGameBtn") as Laya.Sprite;

        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit.is_ZMDGJ_IphoneX())
            {
                this._center_ZMDGJ_Zone.top =  this._center_ZMDGJ_Zone.top + 75;
            }
        }
        else
        {
            //this._center_ZMDGJ_Zone.top =  this._center_ZMDGJ_Zone.top - 200;
            if(Utilit.is_ZMDGJ_IphoneX())
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
        this._money_ZMDGJ_Num.value = String(User.get_ZMDGJ_Money());
        this._level_ZMDGJ_Num.value = String(User.get_ZMDGJ_LeveNum());
    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
        this._start_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Start_ZMDGJ_Btn);
        this._more_ZMDGJ_Game_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.onMore_ZMDGJ_Game_ZMDGJ_Btn);

        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_On_ZMDGJ_User_ZMDGJ_Money_ZMDGJ_Change,this,this.on_ZMDGJ_User_ZMDGJ_MoneyChange);
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
        this._start_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Start_ZMDGJ_Btn);
        this._more_ZMDGJ_Game_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.onMore_ZMDGJ_Game_ZMDGJ_Btn);
        
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_On_ZMDGJ_User_ZMDGJ_Money_ZMDGJ_Change,this,this.on_ZMDGJ_User_ZMDGJ_MoneyChange);
    }

    protected on_ZMDGJ_Start_ZMDGJ_Btn()
    {
        
    }

    protected onMore_ZMDGJ_Game_ZMDGJ_Btn()
    {
        QQMiniGameAPI.show_ZMDGJ_App_ZMDGJ_BoxAd(()=>
        {
            
        });
    }

    protected on_ZMDGJ_User_ZMDGJ_MoneyChange(para)
    {
        let curr = para.curr;
        let last = para.last;
        this._money_ZMDGJ_Num.value = String(curr);
    }
}