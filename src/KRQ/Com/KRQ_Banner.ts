import KRQ__ZMDGJ_Com_ZMDGJ_Base from "./KRQ_ComBase";
import IView_ZMDGJ_State_ZMDGJ_Listener from "../../View/IViewStateListener";
import WX_ZMDGJ_API from "../../WXAPI";
import App_ZMDGJ_Switch_ZMDGJ_Config from "../../Config/AppSwitchConfig";
import _ZMDGJ_ShareAd_ZMDGJ_ from "../../ShareAd/ShareAd";
import QQ_ZMDGJ_Mini_ZMDGJ_GameAPI from "../../QQMiniGameAPI";
import Wu_ZMDGJ_dian_ZMDGJ_Mgr from "../../Mgr/WudianMgr";

export default class KRQ_ZMDGJ__Banner_ZMDGJ_ extends KRQ__ZMDGJ_Com_ZMDGJ_Base implements IView_ZMDGJ_State_ZMDGJ_Listener
{
    public get _ZMDGJ_Clip_ZMDGJ_()
    {
        return this.owner as Laya.Clip;
    }
    protected _wx_ZMDGJ_Banner : any = null;

    protected _on_ZMDGJ_Load : Function = null;
    protected _on_ZMDGJ_Error : Function = null;
    protected _on_ZMDGJ_Resize : Function = null;

    protected _is_ZMDGJ_Creating : boolean = false;
    protected _is_ZMDGJ_Destroyed: boolean = false;
    protected _is_ZMDGJ_Hide: boolean = false;

    onAwake()
    {
        this.Ad_ZMDGJ_Pos_ZMDGJ_ID = _ZMDGJ_ShareAd_ZMDGJ_.Banner_ZMDGJ_AdLocationID;
    }

    onStart()
    {
        this.ref_ZMDGJ_resh();
    }

    onEnable()
    {
        this._ZMDGJ_Sprite_ZMDGJ_.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Click_ZMDGJ_Ad)
    }

    onDisable()
    {
        this._ZMDGJ_Sprite_ZMDGJ_.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Click_ZMDGJ_Ad)
    }

    protected on_ZMDGJ_Click_ZMDGJ_Ad()
    {
        this.navigate_ZMDGJ_To_ZMDGJ_Mini_ZMDGJ_Program();
    }

    public ref_ZMDGJ_resh(onComplate? : Function)
    {
        if (this._is_ZMDGJ_Destroyed)
            return;
        let banner = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().ba_ZMDGJ_nner;
        if (1 == banner)
        {
            this.refresh_ZMDGJ_WXBanner();
            if(Laya.Browser.onQQMiniGame && Wu_ZMDGJ_dian_ZMDGJ_Mgr.Get_ZMDGJ_Ip_ZMDGJ_Blocked())
            {
                let launchScene = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene;
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
                if(noEnterBySearch)
                {
                    let banner_ZMDGJ_Recreate_ZMDGJ_Time = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Recreate_ZMDGJ_Time;
                    Laya.timer.loop(banner_ZMDGJ_Recreate_ZMDGJ_Time * 1000,this,this.refresh_ZMDGJ_WXBanner);
                }
            }
        }
        else
        {
            this.refresh_ZMDGJ_Banner();
            if(Laya.Browser.onQQMiniGame && Wu_ZMDGJ_dian_ZMDGJ_Mgr.Get_ZMDGJ_Ip_ZMDGJ_Blocked())
            {
                let launchScene = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene;
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
                if(noEnterBySearch)
                {
                    let banner_ZMDGJ_Recreate_ZMDGJ_Time = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Recreate_ZMDGJ_Time;
                    Laya.timer.loop(banner_ZMDGJ_Recreate_ZMDGJ_Time * 1000,this,this.refresh_ZMDGJ_WXBanner);
                }
            }
        }
    }

    protected refresh_ZMDGJ_Banner()
    {        
        if(null == this._ZMDGJ_Sprite_ZMDGJ_ || !this._ZMDGJ_Sprite_ZMDGJ_.visible)
            return;
        if (this._is_ZMDGJ_Creating || this._is_ZMDGJ_Destroyed)
            return;
            this._is_ZMDGJ_Creating = true;
        super.ref_ZMDGJ_resh(() =>  {
            if(null != this._data)
            {
                let self = this;
                this._ZMDGJ_Sprite_ZMDGJ_.loadImage(this._data.logo,Laya.Handler.create(this,function()
                {
                    if(null != self._ZMDGJ_Sprite_ZMDGJ_ && !self._ZMDGJ_Sprite_ZMDGJ_.destroyed)
                    {
                        self._ZMDGJ_Sprite_ZMDGJ_.width = 600;
                        self._ZMDGJ_Sprite_ZMDGJ_.height = 205;
                    }
                }));
            }
            this._is_ZMDGJ_Creating = false;
        })
    }

    protected refresh_ZMDGJ_WXBanner()
    {
        if ((!Laya.Browser.onMiniGame && !Laya.Browser.onQQMiniGame) || null == this._ZMDGJ_Sprite_ZMDGJ_ || this._ZMDGJ_Sprite_ZMDGJ_.destroyed || !this._ZMDGJ_Sprite_ZMDGJ_.visible) {
            Laya.timer.clearAll(this);
            this.clear_ZMDGJ_WXBaner();
            return;
        }
        if (this._is_ZMDGJ_Creating || this._is_ZMDGJ_Destroyed || this._is_ZMDGJ_Hide)
            return;
        this.clear_ZMDGJ_WXBaner();
        let self = this;
        let sysInfo = null;
        if(Laya.Browser.onMiniGame)
        {
            sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        }
        else if (Laya.Browser.onQQMiniGame)
        {
            sysInfo = Laya.Browser.window["qq"].getSystemInfoSync();
        }
        let sw = sysInfo.screenWidth;
        let sh = sysInfo.screenHeight;
        let pos = this._ZMDGJ_Sprite_ZMDGJ_.localToGlobal(new Laya.Point(0,0))
        let width = 300;
        let scale = self._ZMDGJ_Sprite_ZMDGJ_.width / Laya.stage.width;
        let realWidth = sw * scale;
        let offset = (realWidth - width) / 2;
        let left = pos.x / Laya.stage.width * sw + offset;
        let top = pos.y / Laya.stage.height * sh;

        if(Laya.Browser.onMiniGame)
        {
            self._is_ZMDGJ_Creating = true;
            let recreateBannerIDList = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().recreate_ZMDGJ_Banner_ZMDGJ_IDList
            let bannerAdUnitId = recreateBannerIDList
            [
                Math.floor(Math.random() * recreateBannerIDList.length)
            ]
            if(null == bannerAdUnitId)
            {
                bannerAdUnitId = WX_ZMDGJ_API.banner_ZMDGJ_AdUnitId;
            }
            this._wx_ZMDGJ_Banner = Laya.Browser.window["wx"].createBannerAd(
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
            if(null != self._wx_ZMDGJ_Banner)
            {
                self._wx_ZMDGJ_Banner.onLoad((res) => {
                    console.log("KRQ  WXBanner广告 加载完成 : ", bannerAdUnitId);
                    console.log(res);
                    self._is_ZMDGJ_Creating = false;
                    if(self._is_ZMDGJ_Destroyed || null == self._wx_ZMDGJ_Banner || self._is_ZMDGJ_Hide)
                    {
                        self.clear_ZMDGJ_WXBaner();
                        return;
                    }
                    self._wx_ZMDGJ_Banner.show();
                })
                self._wx_ZMDGJ_Banner.onError((err) =>  {
                    console.log("KRQ WXBanner广告 加载失败 : ", bannerAdUnitId);
                    console.log(err);
                    self._is_ZMDGJ_Creating = false;
                    self.clear_ZMDGJ_WXBaner();
                    if(self._is_ZMDGJ_Destroyed || self._is_ZMDGJ_Hide)
                    {
                        return;
                    }
                    self.refresh_ZMDGJ_Banner();
                })
                self._wx_ZMDGJ_Banner.onResize(res => {
        
                  })
            }
            else
            {
                self.refresh_ZMDGJ_Banner();
            }
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            self._is_ZMDGJ_Creating = true;
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
                self._on_ZMDGJ_Load = (res) => {
                    console.log("KRQ QQBanner广告 加载完成 : ", bannerAdUnitId);
                    console.log(res);
                    self._is_ZMDGJ_Creating = false;
                    if(self._is_ZMDGJ_Destroyed || null == self._wx_ZMDGJ_Banner || self._is_ZMDGJ_Hide)
                    {
                        self.clear_ZMDGJ_WXBaner();
                        return;
                    }
                    self._wx_ZMDGJ_Banner.show();
                }
                self._wx_ZMDGJ_Banner.onLoad(self._on_ZMDGJ_Load);
                self._on_ZMDGJ_Error = (err) => {
                    console.log("KRQ QQBanner广告 加载失败 : ", bannerAdUnitId);
                    console.log(err);
                    self._is_ZMDGJ_Creating = false;
                    self.clear_ZMDGJ_WXBaner();
                    if(self._is_ZMDGJ_Destroyed || null == self._wx_ZMDGJ_Banner || self._is_ZMDGJ_Hide)
                    {
                        return;
                    }
                    self.refresh_ZMDGJ_Banner();
                }
                self._wx_ZMDGJ_Banner.onError(self._on_ZMDGJ_Error);
                self._on_ZMDGJ_Resize = (res) => {

                }
                self._wx_ZMDGJ_Banner.onResize(self._on_ZMDGJ_Resize);
            }
            else  {
                self.refresh_ZMDGJ_Banner();
            }
        }
    }
    
    protected clear_ZMDGJ_WXBaner()
    {
        if(this._wx_ZMDGJ_Banner)
        {
            this._wx_ZMDGJ_Banner.hide();
            this._wx_ZMDGJ_Banner.offLoad(this._on_ZMDGJ_Load);
            this._wx_ZMDGJ_Banner.offError(this._on_ZMDGJ_Error);
            this._wx_ZMDGJ_Banner.offResize(this._on_ZMDGJ_Resize);
            this._wx_ZMDGJ_Banner.destroy();
        }
        this._wx_ZMDGJ_Banner = null;
    }

    public onViewShow()
    {
        let banner = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().ba_ZMDGJ_nner;
        if (1 == banner)
        {
            if(null == this._wx_ZMDGJ_Banner)
            {
                this.refresh_ZMDGJ_WXBanner();
                if(Laya.Browser.onQQMiniGame && Wu_ZMDGJ_dian_ZMDGJ_Mgr.Get_ZMDGJ_Ip_ZMDGJ_Blocked())
                {
                    let launchScene = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene;
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
                    if(noEnterBySearch)
                    {
                        let banner_ZMDGJ_Recreate_ZMDGJ_Time = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Recreate_ZMDGJ_Time;
                        Laya.timer.loop(banner_ZMDGJ_Recreate_ZMDGJ_Time * 1000,this,this.refresh_ZMDGJ_WXBanner);
                    }
                }
            }
        }
        else
        {
            this.refresh_ZMDGJ_Banner();
            if(Laya.Browser.onQQMiniGame && Wu_ZMDGJ_dian_ZMDGJ_Mgr.Get_ZMDGJ_Ip_ZMDGJ_Blocked())
            {
                let launchScene = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene;
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
                if(noEnterBySearch)
                {
                    let banner_ZMDGJ_Recreate_ZMDGJ_Time = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Recreate_ZMDGJ_Time;
                    Laya.timer.loop(banner_ZMDGJ_Recreate_ZMDGJ_Time * 1000,this,this.refresh_ZMDGJ_WXBanner);
                }
            }
        }
        this._is_ZMDGJ_Hide = false;
    }

    public onViewHide()
    {
        this.clear_ZMDGJ_WXBaner();
        Laya.timer.clearAll(this);
        this._is_ZMDGJ_Hide = true;
    }

    onDestroy()
    {
        this.clear_ZMDGJ_WXBaner();
        Laya.timer.clearAll(this);
        this._is_ZMDGJ_Destroyed = true;
    }

    public _ZMDGJ_show_ZMDGJ_()
    {
        super._ZMDGJ_show_ZMDGJ_();
        this.onViewShow();
    }

    public _ZMDGJ_hide_ZMDGJ_()
    {
        super._ZMDGJ_hide_ZMDGJ_();
        this.onViewHide();
    }
}

