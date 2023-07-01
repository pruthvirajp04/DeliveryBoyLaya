import Wu_ZMDGJ_dian_ZMDGJ_Mgr from "../../../Mgr/WudianMgr";
import App_ZMDGJ_Switch_ZMDGJ_Config from "../../../Config/AppSwitchConfig";
import WXADMgr, { WX_ZMDGJ_BannderAd } from "../../../Mgr/WXADMgr";
import Utilit_ZMDGJ_ from "../../../Utilit";
import QQ_ZMDGJ_Template_ZMDGJ_ViewBase from "../QQTemplateViewBase";
import QQ_ZMDGJ_Mini_ZMDGJ_GameAPI from "../../../QQMiniGameAPI";
import App_ZMDGJ_Config from "../../../AppConfig";

export default class QQ_ZMDGJ_Game_ZMDGJ_FailViewTemplate extends QQ_ZMDGJ_Template_ZMDGJ_ViewBase
{
    protected _center_ZMDGJ_Zone : Laya.Clip = null;
    protected _back_ZMDGJ_Btn : Laya.Sprite = null;
    protected _continue_ZMDGJ_Btn : Laya.Sprite = null;
    
    protected _click_ZMDGJ_Tag : boolean = false;
    protected _click_ZMDGJ_TimingTag : boolean = false;

    onAwake()
    {
        super.onAwake();
        this._center_ZMDGJ_Zone = this.View_ZMDGJ_.getChildByName("CenterZone") as Laya.Clip;
        if(Utilit_ZMDGJ_.is_ZMDGJ_IphoneX())
        {
            this._center_ZMDGJ_Zone.top =  this._center_ZMDGJ_Zone.top + 75;
        }

        this._back_ZMDGJ_Btn = this._center_ZMDGJ_Zone.getChildByName("BackBtn") as Laya.Sprite;
        this._continue_ZMDGJ_Btn = this._center_ZMDGJ_Zone.getChildByName("ContinueBtn") as Laya.Sprite;
    }

    onStart()
    {
        super.onStart();
        let self = this;
        if(Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag && App_ZMDGJ_Config.Versions_ZMDGJ_ == App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().qq_ZMDGJ_cfg.qq_ZMDGJ_versions)
        {
            if(1 == App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().qq_ZMDGJ_cfg.wei_ZMDGJ_yi)
            {
                let yPos = this._center_ZMDGJ_Zone.height - 150;
                this._back_ZMDGJ_Btn.y = yPos;
                this._continue_ZMDGJ_Btn.y = yPos;
            }
            let excute = function()
            {
                var btnMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().btn_ZMDGJ_Move_ZMDGJ_Timer;
                var bannerMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Move_ZMDGJ_Timer;
                Laya.timer.once(bannerMoveTimer * 1000, self, self.Banner_ZMDGJ_Up);
                Laya.timer.once(btnMoveTimer * 1000, self, self.Btn_ZMDGJ_Up);
            }
            if (1 == App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().qq_ZMDGJ_cfg.box)  {
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.show_ZMDGJ_App_ZMDGJ_BoxAd(() =>  
                {
                    excute();
                }, () =>  
                {
                    excute();
                })
            }
            else
            {
                excute();
            }
        }


    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
        this._back_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Back_ZMDGJ_Btn);
        this._continue_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Continue_ZMDGJ_Btn);
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
        this._back_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Back_ZMDGJ_Btn);
        this._continue_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Continue_ZMDGJ_Btn);
    }

    protected on_ZMDGJ_Back_ZMDGJ_Btn()
    {
        if(!this._click_ZMDGJ_Tag && Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag)
        {
            var self = this
            if(!this._click_ZMDGJ_TimingTag)
            {
                this._click_ZMDGJ_TimingTag = true
                var btnMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().btn_ZMDGJ_Move_ZMDGJ_Timer;
                var bannerMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Move_ZMDGJ_Timer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.Banner_ZMDGJ_Up);
                Laya.timer.once(btnMoveTimer * 1000,this,this.Btn_ZMDGJ_Up);
            }
            return;
        }

        //todo:你的代码
    }

    protected on_ZMDGJ_Continue_ZMDGJ_Btn()
    {
        if(!this._click_ZMDGJ_Tag && Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag)
        {
            var self = this
            if(!this._click_ZMDGJ_TimingTag)
            {
                this._click_ZMDGJ_TimingTag = true
                var btnMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().btn_ZMDGJ_Move_ZMDGJ_Timer;
                var bannerMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Move_ZMDGJ_Timer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.Banner_ZMDGJ_Up);
                Laya.timer.once(btnMoveTimer * 1000,this,this.Btn_ZMDGJ_Up);
            }
            return;
        }

        //todo:你的代码
    }

    protected Banner_ZMDGJ_Up()
    {
        //todo：显示Banner
    }

    protected Btn_ZMDGJ_Up()
    {
        this._click_ZMDGJ_Tag = true;
        this._back_ZMDGJ_Btn.y = 720;
        this._continue_ZMDGJ_Btn.y = 720;
    }

    onDestroy()
    {
        //todo：隐藏Banner
    }
}