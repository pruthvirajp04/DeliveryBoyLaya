import View_ZMDGJ_Base from "../ViewBase";
import Utilit_ZMDGJ_ from "../../Utilit";
import View_ZMDGJ_Mgr, { View_ZMDGJ_Def } from "../../Mgr/ViewMgr";
import Mini_ZMDGJ_Game_ZMDGJ_View_ZMDGJ_Template from "./MiniGame/MiniGameViewTemplate";
import Wu_ZMDGJ_dian_ZMDGJ_Mgr from "../../Mgr/WudianMgr";
import WX_ZMDGJ_API from "../../WXAPI";
import App_ZMDGJ_Switch_ZMDGJ_Config from "../../Config/AppSwitchConfig";
import QQ_ZMDGJ_Mini_ZMDGJ_GameAPI from "../../QQMiniGameAPI";
import Event_ZMDGJ_Mgr from "../../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../../Event/EventDef";

export default class Template_ZMDGJ_View_ZMDGJ_Base extends View_ZMDGJ_Base 
{
    public get History_ZMDGJ_Btn()
    {
        if(null == this._history_ZMDGJ_Btn)
        {
            this._history_ZMDGJ_Btn = this.Top_ZMDGJ_Zone.getChildByName("HistoryBtn") as Laya.Sprite;
        }
        return this._history_ZMDGJ_Btn;
    }
    private _history_ZMDGJ_Btn : Laya.Sprite = null;
    public get Top_ZMDGJ_Zone()
    {
        if(null == this._top_ZMDGJ_Zone)
        {
            this._top_ZMDGJ_Zone = this.View_ZMDGJ_.getChildByName("TopZone") as Laya.Clip;
        }
        return this._top_ZMDGJ_Zone;
    }
    protected _top_ZMDGJ_Zone : Laya.Clip = null;

    onAwake()
    {
        this._top_ZMDGJ_Zone = this.View_ZMDGJ_.getChildByName("TopZone") as Laya.Clip;
        if(Utilit_ZMDGJ_.is_ZMDGJ_IphoneX())
        {
            this._top_ZMDGJ_Zone.top =  this._top_ZMDGJ_Zone.top + 75;
        }
        this._history_ZMDGJ_Btn = this._top_ZMDGJ_Zone.getChildByName("HistoryBtn") as Laya.Sprite;
        if(-1 == Wu_ZMDGJ_dian_ZMDGJ_Mgr.Ip_ZMDGJ_Block_ZMDGJ_Flag())
        {
            this._history_ZMDGJ_Btn.visible = false;
        }
        else
        {
            this._history_ZMDGJ_Btn.visible = this.is_ZMDGJ_Show_ZMDGJ_HistoryBtn;
        }
    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
        this.History_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_History_ZMDGJ_Btn);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.App_On_ZMDGJ_Update_ZMDGJ_IpBlockState,this,this.on_ZMDGJ_UpdateIp_ZMDGJ_BlockState);
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
        this.History_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_History_ZMDGJ_Btn);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.App_On_ZMDGJ_Update_ZMDGJ_IpBlockState,this,this.on_ZMDGJ_UpdateIp_ZMDGJ_BlockState);
    }

    protected on_ZMDGJ_History_ZMDGJ_Btn()
    {
        let self = this;
        View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.MiniGameView,null,(v : Mini_ZMDGJ_Game_ZMDGJ_View_ZMDGJ_Template)=>
        {
            self.hide_ZMDGJ_();
            v.on_ZMDGJ_CloseEvent = ()=>
            {
                if(null != self.View_ZMDGJ_ && !self.View_ZMDGJ_.destroyed)
                {
                    self.show_ZMDGJ_();
                }
            }
        })
    }

    protected get is_ZMDGJ_Show_ZMDGJ_HistoryBtn()
    {
        let launchScene = 0;
        if(Laya.Browser.onMiniGame)
        {
            launchScene = WX_ZMDGJ_API.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene;
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            launchScene = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene;
        }
        let noEnterBySearch: boolean = true;
        let wudianSceneList = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wu_ZMDGJ_dian_ZMDGJ_Scene_ZMDGJ_List;
        for (let i = 0; i < wudianSceneList.length; ++i)  
        {
            let wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        if(Laya.Browser.onQGMiniGame || !noEnterBySearch || !Wu_ZMDGJ_dian_ZMDGJ_Mgr.Get_ZMDGJ_Ip_ZMDGJ_Blocked() 
            || 0 == App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().fakeBtn)
        {
            return false;
        }
        return true;
    }

    protected on_ZMDGJ_UpdateIp_ZMDGJ_BlockState(para)
    {
        this._history_ZMDGJ_Btn.visible = this.is_ZMDGJ_Show_ZMDGJ_HistoryBtn;
    }
}