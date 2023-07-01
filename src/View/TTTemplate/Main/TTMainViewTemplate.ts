import KRQ_Main from "../../../KRQ/ViewCom/KRQ_Main";
import Event_ZMDGJ_Mgr from "../../../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../../../Event/EventDef";
import User_ZMDGJ_ from "../../../User/User";
import Utilit_ZMDGJ_ from "../../../Utilit";
import TT_ZMDGJ_Template_ZMDGJ_View_ZMDGJ_Base from "../TTTemplateViewBase";
import TT_ZMDGJ_API from "../../../TTAPI";
import App_ZMDGJ_Switch_ZMDGJ_Config from "../../../Config/AppSwitchConfig";

export default class TT_ZMDGJ_Main_ZMDGJ_ViewTemplate extends TT_ZMDGJ_Template_ZMDGJ_View_ZMDGJ_Base
{
    protected _center_ZMDGJ_Zone : Laya.Clip = null;
    protected _start_ZMDGJ_Btn : Laya.Sprite = null;

    protected _level_ZMDGJ_Num : Laya.FontClip = null;
    protected _money_ZMDGJ_Num : Laya.FontClip = null;
    
    protected _more_ZMDGJ_GameBtn : Laya.Sprite = null;
    protected _share_ZMDGJ_Btn : Laya.Sprite = null;

    onAwake()
    {
        super.onAwake();

        this._center_ZMDGJ_Zone = this.View_ZMDGJ_.getChildByName("CenterZone") as Laya.Clip;
        this._more_ZMDGJ_GameBtn = this._center_ZMDGJ_Zone.getChildByName("MoreGameBtn") as Laya.Clip;
        this._share_ZMDGJ_Btn = this._center_ZMDGJ_Zone.getChildByName("ShareBtn") as Laya.Clip;

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


        this._more_ZMDGJ_GameBtn.visible = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().tt_ZMDGJ_cfg.more_ZMDGJ_Game_ZMDGJ_Switch == 1;
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
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_On_ZMDGJ_User_ZMDGJ_Money_ZMDGJ_Change,this,this.on_ZMDGJ_User_ZMDGJ_MoneyChange);

        this._more_ZMDGJ_GameBtn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_More_ZMDGJ_GameBtn);
        this._share_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Share_ZMDGJ_Btn);
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
        this._start_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Start_ZMDGJ_Btn);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_On_ZMDGJ_User_ZMDGJ_Money_ZMDGJ_Change,this,this.on_ZMDGJ_User_ZMDGJ_MoneyChange);

        this._more_ZMDGJ_GameBtn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_More_ZMDGJ_GameBtn);
        this._share_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Share_ZMDGJ_Btn);
    }

    protected on_ZMDGJ_Start_ZMDGJ_Btn()
    {
        
    }

    protected on_ZMDGJ_More_ZMDGJ_GameBtn()
    {
        TT_ZMDGJ_API.showMoreGamesModal(()=>
        {
            
        },()=>
        {

        })
    }

    protected on_ZMDGJ_Share_ZMDGJ_Btn()
    {
        TT_ZMDGJ_API.share_ZMDGJ_(()=>
        {

        })
    }

    protected on_ZMDGJ_User_ZMDGJ_MoneyChange(para)
    {
        let curr = para.curr;
        let last = para.last;
        this._money_ZMDGJ_Num.value = String(curr);
    }
}