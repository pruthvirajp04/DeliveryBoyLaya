import Template_ZMDGJ_View_ZMDGJ_Base from "../TemplateViewBase";
import WX_ZMDGJ_ADMgr, { WX_ZMDGJ_BannderAd } from "../../../Mgr/WXADMgr";
import Wu_ZMDGJ_dian_ZMDGJ_Mgr from "../../../Mgr/WudianMgr";
import App_ZMDGJ_Switch_ZMDGJ_Config from "../../../Config/AppSwitchConfig";
import KRQ_Roll_ZMDGJ_Single_ZMDGJ_Ad from "../../../KRQ/Com/KRQ_RollSingleAd";
import Utilit_ZMDGJ_ from "../../../Utilit";
import View_ZMDGJ_Mgr, { View_ZMDGJ_Def } from "../../../Mgr/ViewMgr";
import Mini_ZMDGJ_Game_ZMDGJ_View_ZMDGJ_Template from "../MiniGame/MiniGameViewTemplate";
import User_ZMDGJ_ from "../../../User/User";
import Game_ZMDGJ_Mgr from "../../../Mgr/GameMgr";

export default class Game_ZMDGJ_Win_ZMDGJ_ViewTemplate extends Template_ZMDGJ_View_ZMDGJ_Base
{
    protected _center_ZMDGJ_Zone : Laya.Clip = null;
    protected _back_ZMDGJ_Btn : Laya.Sprite = null;
    protected _next_ZMDGJ_Btn : Laya.Sprite = null;
    protected _roll_ZMDGJ_SingleAds : Array<KRQ_Roll_ZMDGJ_Single_ZMDGJ_Ad> = new Array<KRQ_Roll_ZMDGJ_Single_ZMDGJ_Ad>();
    
    protected _click_ZMDGJ_Tag : boolean = false;
    protected _click_ZMDGJ_TimingTag : boolean = false;

    protected _banner : WX_ZMDGJ_BannderAd = null;

    protected _bAlive: boolean = true;
    
    onAwake()
    {
        super.onAwake();
        this._center_ZMDGJ_Zone = this.View_ZMDGJ_.getChildByName("CenterZone") as Laya.Clip;
        if(Utilit_ZMDGJ_.is_ZMDGJ_IphoneX())
        {
            this._center_ZMDGJ_Zone.top =  this._center_ZMDGJ_Zone.top + 75;
        }

        this._back_ZMDGJ_Btn = this._center_ZMDGJ_Zone.getChildByName("BackBtn") as Laya.Sprite;
        this._next_ZMDGJ_Btn = this._center_ZMDGJ_Zone.getChildByName("NextBtn") as Laya.Sprite;

        for (let i = 0; i < this._center_ZMDGJ_Zone.numChildren; ++i) 
        {
            let ad = this._center_ZMDGJ_Zone.getChildAt(i).getComponent(KRQ_Roll_ZMDGJ_Single_ZMDGJ_Ad) as KRQ_Roll_ZMDGJ_Single_ZMDGJ_Ad;
            if (null == ad)
                continue;
            this._roll_ZMDGJ_SingleAds.push(ad);
        }

        if(Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag)
        {
            this.History_ZMDGJ_Btn.visible = false;
        }
    }

    onStart()
    {
        super.onStart();
        if(Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag)
        {
            let yPos = this._center_ZMDGJ_Zone.height - 150;
            this._back_ZMDGJ_Btn.y = yPos;
            this._next_ZMDGJ_Btn.y = yPos;
        }

        for (let i = 0; i < this._roll_ZMDGJ_SingleAds.length; ++i)  
        {
            let ad = this._roll_ZMDGJ_SingleAds[i];
            Laya.timer.once(150,this,()=>
            {
                ad.play_ZMDGJ_Ani();
            })
        }

        var btnMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().btn_ZMDGJ_Move_ZMDGJ_Timer;
        var bannerMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Move_ZMDGJ_Timer;
        Laya.timer.once(bannerMoveTimer * 1000,this,this.BannerUp);
        Laya.timer.once(btnMoveTimer * 1000,this,this.BtnUp);

        Laya.timer.frameOnce(500,this,()=>{
            Game_ZMDGJ_Mgr.get_ZMDGJ_Instance().PreLoadScene(User_ZMDGJ_.get_ZMDGJ_FakerNextLeveNum().toString());
        });
    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
        this._back_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.onBack_ZMDGJ_Btn);
        this._next_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.onNext_ZMDGJ_Btn);
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
        this._back_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.onBack_ZMDGJ_Btn);
        this._next_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.onNext_ZMDGJ_Btn);
    }

    protected onBack_ZMDGJ_Btn()
    {
        if(!this._click_ZMDGJ_Tag && Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag)
        {
            var self = this
            if(!this._click_ZMDGJ_TimingTag)
            {
                this._click_ZMDGJ_TimingTag = true
                var btnMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().btn_ZMDGJ_Move_ZMDGJ_Timer;
                var bannerMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Move_ZMDGJ_Timer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000,this,this.BtnUp);
            }
            return;
        }

        //todo:你的代码
        this.NextLevel();
    }

    protected onNext_ZMDGJ_Btn()
    {
        if(!this._click_ZMDGJ_Tag && Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag)
        {
            var self = this
            if(!this._click_ZMDGJ_TimingTag)
            {
                this._click_ZMDGJ_TimingTag = true
                var btnMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().btn_ZMDGJ_Move_ZMDGJ_Timer;
                var bannerMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Move_ZMDGJ_Timer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000,this,this.BtnUp);
            }
            return;
        }

        //todo:你的代码
        this.NextLevel();
    }

    protected NextLevel(){
        if (!this._bAlive) {
            return;
        }
        this._bAlive = false;

        User_ZMDGJ_.set_ZMDGJ_LeveNum(User_ZMDGJ_.get_ZMDGJ_LeveNum() + 1);
        View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.Export2View,null,()=>{
            View_ZMDGJ_Mgr.ins_ZMDGJ_tance.close_ZMDGJ_View(View_ZMDGJ_Def.GameWinView);
        });
    }

    protected BannerUp()
    {
        let self = this;
        WX_ZMDGJ_ADMgr.get_ZMDGJ_Banner((banner : WX_ZMDGJ_BannderAd)=>
        {
            if(null != self._banner)
            {
                this._banner._ZMDGJ_hide_ZMDGJ_();
            }
            self._banner = banner
            if (null != self._banner) 
            {
                this._banner._ZMDGJ_show_ZMDGJ_();
            }
            if(this.is_ZMDGJ_Show_ZMDGJ_HistoryBtn)
            {
                self.History_ZMDGJ_Btn.visible = true;
            }
        });
    }

    protected BtnUp()
    {
        this._click_ZMDGJ_Tag = true;
        this._back_ZMDGJ_Btn.y = 720;
        this._next_ZMDGJ_Btn.y = 720;
    }

    onDestroy()
    {
        if(null != this._banner)
        {
            this._banner._ZMDGJ_hide_ZMDGJ_();
        }
        this._banner = null;
        Game_ZMDGJ_Mgr.get_ZMDGJ_Instance().save_ZMDGJ_Game_ZMDGJ_Data();
    }

    protected on_ZMDGJ_History_ZMDGJ_Btn()
    {
        let self = this;
        View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.MiniGameView,null,(v : Mini_ZMDGJ_Game_ZMDGJ_View_ZMDGJ_Template)=>
        {
            self.hide_ZMDGJ_();
            if(null != self._banner)
            {
                self._banner._ZMDGJ_hide_ZMDGJ_();
            }
            v.on_ZMDGJ_CloseEvent = ()=>
            {
                if(null != self.View_ZMDGJ_ && !self.View_ZMDGJ_.destroyed)
                {
                    self.show_ZMDGJ_();
                    if(null != self._banner)
                    {
                        self._banner._ZMDGJ_show_ZMDGJ_();
                    }
                }
            }
        })
    }
}