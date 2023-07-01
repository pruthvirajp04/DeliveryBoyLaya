import Wu_ZMDGJ_dian_ZMDGJ_Mgr from "../../../Mgr/WudianMgr";
import App_ZMDGJ_Switch_ZMDGJ_Config from "../../../Config/AppSwitchConfig";
import WXADMgr, { WX_ZMDGJ_BannderAd } from "../../../Mgr/WXADMgr";
import Utilit from "../../../Utilit";
import TT_ZMDGJ_Template_ZMDGJ_View_ZMDGJ_Base from "../TTTemplateViewBase";
import TT_ZMDGJ_API from "../../../TTAPI";

export default class TTGameFailViewTemplate extends TT_ZMDGJ_Template_ZMDGJ_View_ZMDGJ_Base
{
    protected _centerZone : Laya.Clip = null;
    
    protected _clickTag : boolean = false;
    protected _clickTimingTag : boolean = false;

    protected _moreGameBtn : Laya.Sprite = null;
    protected _shareBtn : Laya.Sprite = null;

    protected _backBtn : Laya.Sprite = null;
    protected _okBtn : Laya.Sprite = null;
    protected _videoBtn : Laya.Sprite = null;
    

    onAwake()
    {
        super.onAwake();
        this._centerZone = this.View_ZMDGJ_.getChildByName("CenterZone") as Laya.Clip;
        if(Utilit.is_ZMDGJ_IphoneX())
        {
            this._centerZone.top =  this._centerZone.top + 75;
        }

        this._moreGameBtn = this._centerZone.getChildByName("MoreGameBtn") as Laya.Clip;
        this._shareBtn = this._centerZone.getChildByName("ShareBtn") as Laya.Clip;

        this._backBtn = this._centerZone.getChildByName("BackBtn") as Laya.Sprite;
        this._okBtn = this._centerZone.getChildByName("OkBtn") as Laya.Sprite;
        this._videoBtn = this._centerZone.getChildByName("VideoBtn") as Laya.Sprite;

        this._moreGameBtn.visible = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().tt_ZMDGJ_cfg.more_ZMDGJ_Game_ZMDGJ_Switch == 1;
    }

    onStart()
    {
        super.onStart();
        if(Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag)
        {
            let yPos = this._centerZone.height - 150;
            this._backBtn.y = yPos;
            this._okBtn.y = yPos;
            this._videoBtn.y = yPos;
        }
        
        var btnMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().btn_ZMDGJ_Move_ZMDGJ_Timer;
        var bannerMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Move_ZMDGJ_Timer;
        Laya.timer.once(bannerMoveTimer * 1000,this,this.Banner_ZMDGJ_Up);
        Laya.timer.once(btnMoveTimer * 1000,this,this.Btn_ZMDGJ_Up);

        if(App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().tt_ZMDGJ_cfg.lu_ZMDGJ_ping == 1)
        {
            TT_ZMDGJ_API.share_ZMDGJ_Record(()=>
            {
                
            },()=>
            {
                
            })
        }
    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
        this._backBtn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Back_ZMDGJ_Btn);
        this._okBtn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Ok_ZMDGJ_Btn);
        this._videoBtn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Ok_ZMDGJ_Btn);
        
        this._moreGameBtn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_More_ZMDGJ_GameBtn);
        this._shareBtn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Share_ZMDGJ_Btn);
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
        this._backBtn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Back_ZMDGJ_Btn);
        this._okBtn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Ok_ZMDGJ_Btn);
        this._videoBtn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Ok_ZMDGJ_Btn);
        
        this._moreGameBtn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_More_ZMDGJ_GameBtn);
        this._shareBtn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Share_ZMDGJ_Btn);
    }

    protected on_ZMDGJ_Back_ZMDGJ_Btn()
    {
        if(!this._clickTag && Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag)
        {
            var self = this
            if(!this._clickTimingTag)
            {
                this._clickTimingTag = true
                var btnMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().btn_ZMDGJ_Move_ZMDGJ_Timer;
                var bannerMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Move_ZMDGJ_Timer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.Banner_ZMDGJ_Up);
                Laya.timer.once(btnMoveTimer * 1000,this,this.Btn_ZMDGJ_Up);
            }
            return;
        }

        //todo:你的代码
    }

    protected on_ZMDGJ_Ok_ZMDGJ_Btn()
    {
        if(!this._clickTag && Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag)
        {
            var self = this
            if(!this._clickTimingTag)
            {
                this._clickTimingTag = true
                var btnMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().btn_ZMDGJ_Move_ZMDGJ_Timer;
                var bannerMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Move_ZMDGJ_Timer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.Banner_ZMDGJ_Up);
                Laya.timer.once(btnMoveTimer * 1000,this,this.Btn_ZMDGJ_Up);
            }
            return;
        }

        //todo:你的代码
    }


    protected on_ZMDGJ_Video_ZMDGJ_Btn()
    {
        if(!this._clickTag && Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag)
        {
            var self = this
            if(!this._clickTimingTag)
            {
                this._clickTimingTag = true
                var btnMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().btn_ZMDGJ_Move_ZMDGJ_Timer;
                var bannerMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Move_ZMDGJ_Timer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.Banner_ZMDGJ_Up);
                Laya.timer.once(btnMoveTimer * 1000,this,this.Btn_ZMDGJ_Up);
            }
            return;
        }

        TT_ZMDGJ_API.share_ZMDGJ_Record(()=>
        {
            
        },()=>
        {
            
        })
    }

    protected Banner_ZMDGJ_Up()
    {
        TT_ZMDGJ_API.show_ZMDGJ_Banner();
    }

    protected Btn_ZMDGJ_Up()
    {
        this._clickTag = true;
        this._backBtn.y = 720;
        this._okBtn.y = 720;
        this._videoBtn.y = 720;
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

    onDestroy()
    {
        TT_ZMDGJ_API.hideBanner();
    }
}