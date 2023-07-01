import _ZMDGJ_ShareAd_ZMDGJ_ from "../ShareAd";
import WX_ZMDGJ_API from "../../WXAPI";
import ALD from "../../ALD";
import Event_ZMDGJ_Mgr from "../../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../../Event/EventDef";
import App_ZMDGJ_Switch_ZMDGJ_Config from "../../Config/AppSwitchConfig";
import OPPO_ZMDGJ_API from "../../OPPOAPI";
import QQ_ZMDGJ_Mini_ZMDGJ_GameAPI from "../../QQMiniGameAPI";
import IView_ZMDGJ_State_ZMDGJ_Listener from "../../View/IViewStateListener";

export default class Banner_ZMDGJ_Ad_ZMDGJ_View extends Laya.Script implements IView_ZMDGJ_State_ZMDGJ_Listener
{
    public Ad_ZMDGJ_Pos_ZMDGJ_ID : number = _ZMDGJ_ShareAd_ZMDGJ_.Banner_ZMDGJ_AdLocationID;
    protected _display_ZMDGJ_Sp : Laya.Sprite;
    protected _data_ZMDGJ_ : any = null;

    public WX_ZMDGJ_Banner_ZMDGJ_Width : number;
    protected _wx_ZMDGJ_Banner : any = null;

    protected _onLoad : Function = null;
    protected _onError : Function = null;
    protected _onResize : Function = null;

    onAwake()
    {
        this._display_ZMDGJ_Sp = this.owner.getChildByName("Display") as Laya.Sprite;
        if(null == this._display_ZMDGJ_Sp)
        {
            this._display_ZMDGJ_Sp = this.owner as Laya.Sprite;
        }
    }
    
    onEnable(): void 
    {
        this._display_ZMDGJ_Sp.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Sp_ZMDGJ_Click);
        var banner = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().ba_ZMDGJ_nner;
        if(0 == banner)
        {
            this.refresh_ZMDGJ_Banner_ZMDGJ_Dis();
            let bannerRecreateTime = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Recreate_ZMDGJ_Time;
            Laya.timer.loop(bannerRecreateTime * 1000,this,this.refresh_ZMDGJ_Banner_ZMDGJ_Dis);
            
        }
        else if (1 == banner)
        {
            this.refresh_ZMDGJ_Banner_ZMDGJ_Dis();
            let bannerRecreateTime = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Recreate_ZMDGJ_Time;
            Laya.timer.loop(bannerRecreateTime * 1000,this,this.refresh_ZMDGJ_Banner_ZMDGJ_Dis);
        }
    }

    onDisable(): void 
    {
        this._display_ZMDGJ_Sp.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Sp_ZMDGJ_Click);
        this.clear_ZMDGJ_WXBaner();
    }

    protected refresh_ZMDGJ_Banner_ZMDGJ_Dis()
    {
        var self = this;
        _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_ADVs(this.Ad_ZMDGJ_Pos_ZMDGJ_ID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                var data = datas[Math.floor(Math.random() * datas.length)];

                self._display_ZMDGJ_Sp.loadImage(data.logo,Laya.Handler.create(self,function()
                {
                    if(!self._display_ZMDGJ_Sp.destroyed)
                    {
                        self._display_ZMDGJ_Sp.width = 750;
                        self._display_ZMDGJ_Sp.height = 256;
                    }
                }));
                self._data_ZMDGJ_ = data;
            }
        },false)
    }

    protected on_ZMDGJ_Sp_ZMDGJ_Click()
    {
        var data = this._data_ZMDGJ_;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            if(Laya.Browser.onMiniGame)
            {
                WX_ZMDGJ_API.navigate_ZMDGJ_To_ZMDGJ_MiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    _ZMDGJ_ShareAd_ZMDGJ_.report_ZMDGJ_User_ZMDGJ_Click(data.appid);
                    ALD.ald_ZMDGJ_Send_ZMDGJ_ReportAdClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.AD_On_ZMDGJ_ShareAd_ZMDGJ_Fail);
                    if(res.errMsg == "navigateToMiniProgram:fail cancel")
                    {
                        console.log("用户取消跳转");
                        ALD.aldSend_ZMDGJ_ReportAd_ZMDGJ_ClickFail(data);
                    }
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQGMiniGame)
            {
                OPPO_ZMDGJ_API.navigate_ZMDGJ_To_ZMDGJ_MiniProgram(data.appid,data.title,data.url,(res)=>
                {
                    console.log("跳转成功")
                    _ZMDGJ_ShareAd_ZMDGJ_.report_ZMDGJ_User_ZMDGJ_Click(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.AD_On_ZMDGJ_ShareAd_ZMDGJ_Fail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQQMiniGame)  //qq小游戏
            {
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.navigate_ZMDGJ_To_ZMDGJ_Mini_ZMDGJ_Program(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    _ZMDGJ_ShareAd_ZMDGJ_.report_ZMDGJ_User_ZMDGJ_Click(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.AD_On_ZMDGJ_ShareAd_ZMDGJ_Fail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
        }
    }

    protected refresh_ZMDGJ_WXBanner()
    {
        if((!Laya.Browser.onMiniGame && !Laya.Browser.onQQMiniGame)
            || !(this.owner as Laya.Sprite).visible)
            return;
        this.clear_ZMDGJ_WXBaner();
        var self = this;
        let sysInfo = null;
        if(Laya.Browser.onMiniGame)
        {
            sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        }
        else if (Laya.Browser.onQQMiniGame)
        {
            sysInfo = Laya.Browser.window["qq"].getSystemInfoSync();
        }
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this._display_ZMDGJ_Sp.localToGlobal(new Laya.Point(0,0))

        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.WX_ZMDGJ_Banner_ZMDGJ_Width ? this.WX_ZMDGJ_Banner_ZMDGJ_Width / Laya.stage.width * sw : sw;

        if(Laya.Browser.onMiniGame)
        {
            let recreateBannerIDList = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().recreate_ZMDGJ_Banner_ZMDGJ_IDList
            let bannerAdUnitId = recreateBannerIDList
            [
                Math.floor(Math.random() * recreateBannerIDList.length)
            ]
            if(null == bannerAdUnitId)
            {
                bannerAdUnitId = WX_ZMDGJ_API.banner_ZMDGJ_AdUnitId;
            }
            self._wx_ZMDGJ_Banner = Laya.Browser.window["wx"].createBannerAd(
                {
                    adUnitId : bannerAdUnitId,
                    adIntervals : 30,
                    style : 
                    {
                        left:left,
                        top:top,
                        width: width,
                    }
                })
                self._wx_ZMDGJ_Banner.onLoad((res) =>  {
                console.log("WXBanner广告 加载完成");
                console.log(res);
            })
            self._wx_ZMDGJ_Banner.onError((err) =>  {
                console.log("WXBanner广告 加载失败");
                console.log(err);
                self.refresh_ZMDGJ_Banner_ZMDGJ_Dis();
                self.clear_ZMDGJ_WXBaner();
            })
            self._wx_ZMDGJ_Banner.onResize(res => {

              })
            self._wx_ZMDGJ_Banner.show();
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            let recreateBannerIDList = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().recreate_ZMDGJ_Banner_ZMDGJ_IDList
            let bannerAdUnitId = recreateBannerIDList
            [
                Math.floor(Math.random() * recreateBannerIDList.length)
            ]
            if(null == bannerAdUnitId)
            {
                bannerAdUnitId = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.banner_ZMDGJ_AdUnitId;
            }
            self._wx_ZMDGJ_Banner = Laya.Browser.window["qq"].createBannerAd(
                {
                    adUnitId: bannerAdUnitId,
                    adIntervals: 30,
                    style:
                        {
                            left: left,
                            top: top,
                            width: width,
                        }
                })
            if (null != self._wx_ZMDGJ_Banner)  {
                self._onLoad = (res) => {
                    console.log("QQBanner广告 加载完成 : ", bannerAdUnitId);
                    console.log(res);
                    self._wx_ZMDGJ_Banner.show();
                }
                self._wx_ZMDGJ_Banner.onLoad(self._onLoad);
                self._onError = (err) => {
                    console.log("QQBanner广告 加载失败 : ", bannerAdUnitId);
                    console.log(err);
                    self.refresh_ZMDGJ_Banner_ZMDGJ_Dis();
                    self.clear_ZMDGJ_WXBaner();
                }
                self._wx_ZMDGJ_Banner.onError(self._onError);
                self._onResize = (res) => {

                }
                self._wx_ZMDGJ_Banner.onResize(self._onResize);
            }
            else  {
                self.refresh_ZMDGJ_Banner_ZMDGJ_Dis();
            }
        }
    }
    
    public clear_ZMDGJ_WXBaner()
    {
        if(this._wx_ZMDGJ_Banner)
        {
            this._wx_ZMDGJ_Banner.offLoad(this._onLoad);
            this._wx_ZMDGJ_Banner.offError(this._onError);
            this._wx_ZMDGJ_Banner.offResize(this._onResize);
            this._wx_ZMDGJ_Banner.destroy();
        }
        this._wx_ZMDGJ_Banner = null;
    }

    public onViewShow()
    {
        var banner = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().ba_ZMDGJ_nner;
        if (1 == banner && null == this._wx_ZMDGJ_Banner)
        {
            this.refresh_ZMDGJ_Banner_ZMDGJ_Dis();
            let bannerRecreateTime = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Recreate_ZMDGJ_Time;
            Laya.timer.loop(bannerRecreateTime * 1000,this,this.refresh_ZMDGJ_Banner_ZMDGJ_Dis);
        }
        else
        {
            this.refresh_ZMDGJ_Banner_ZMDGJ_Dis();
            let bannerRecreateTime = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Recreate_ZMDGJ_Time;
            Laya.timer.loop(bannerRecreateTime * 1000,this,this.refresh_ZMDGJ_Banner_ZMDGJ_Dis);
        }
    }

    public onViewHide()
    {
        this.clear_ZMDGJ_WXBaner();
        Laya.timer.clearAll(this);
    }

    onDestroy()
    {
        this.clear_ZMDGJ_WXBaner();
        Laya.timer.clearAll(this);
    }
}