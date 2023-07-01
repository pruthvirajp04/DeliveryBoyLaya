import _ZMDGJ_ShareAd_ZMDGJ_ from "../ShareAd";
import WX_ZMDGJ_API from "../../WXAPI";
import ALD from "../../ALD";
import Event_ZMDGJ_Mgr from "../../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../../Event/EventDef";
import App_ZMDGJ_Switch_ZMDGJ_Config from "../../Config/AppSwitchConfig";
import OPPO_ZMDGJ_API from "../../OPPOAPI";
import QQ_ZMDGJ_Mini_ZMDGJ_GameAPI from "../../QQMiniGameAPI";

export default class Wu_ZMDGJ_dian_ZMDGJ_Banner_ZMDGJ_AdView extends Laya.Script {
    public Ad_ZMDGJ_Pos_ZMDGJ_ID: number = _ZMDGJ_ShareAd_ZMDGJ_.Banner_ZMDGJ_AdLocationID;
    protected _display_ZMDGJ_Sp: Laya.Sprite;
    protected _data_ZMDGJ_: any = null;

    public WX_ZMDGJ_Banner_ZMDGJ_Width: number;
    protected _wx_ZMDGJ_Banner: any = null;

    onAwake() {
        this._display_ZMDGJ_Sp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._display_ZMDGJ_Sp.visible = false;
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.AD_Wu_ZMDGJ_dian_ZMDGJ_Banner_Show, this, this.Show_ZMDGJ_Banner);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.AD_Wu_ZMDGJ_dian_ZMDGJ_Banner__ZMDGJ_Hide, this, this.Hide_ZMDGJ_Banner);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.AD_Wu_ZMDGJ_dian_ZMDGJ_Banner_Pre_ZMDGJ_Load, this, this.Pre_ZMDGJ_load_ZMDGJ_Banner);
    }

    onEnable(): void {
        this.Pre_ZMDGJ_load_ZMDGJ_Banner();
    }
    public Pre_ZMDGJ_load_ZMDGJ_Banner() {
        if ((this.owner as Laya.UIComponent).visible == false) return;
        var banner = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().ba_ZMDGJ_nner;
        if (1 == banner && Laya.Browser.onMiniGame) {
            this.refresh_ZMDGJ_WXBanner();
        }
        else {
            this.refresh_ZMDGJ_Banner_ZMDGJ_Dis();
        }
    }
    public Show_ZMDGJ_Banner() {
        if ((this.owner as Laya.UIComponent).visible == false) return;
        console.log("showBanner");
        var banner = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().ba_ZMDGJ_nner;
        if (1 == banner && Laya.Browser.onMiniGame && this._wx_ZMDGJ_Banner) {
            console.log("WxshowBanner");
            this._wx_ZMDGJ_Banner.show();
        }
        else if (this._data_ZMDGJ_ != null) {
            this._display_ZMDGJ_Sp.visible = true;
            this._display_ZMDGJ_Sp.on(Laya.Event.CLICK, this, this.on_ZMDGJ_Sp_ZMDGJ_Click);
        }
    }
    public Hide_ZMDGJ_Banner() {
        this._display_ZMDGJ_Sp.off(Laya.Event.CLICK, this, this.on_ZMDGJ_Sp_ZMDGJ_Click);
        this._display_ZMDGJ_Sp.visible = false;
        this.clear_ZMDGJ_WXBaner();
    }
    onDestroy() {
        this.Hide_ZMDGJ_Banner();
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.AD_Wu_ZMDGJ_dian_ZMDGJ_Banner_Show, this, this.Show_ZMDGJ_Banner);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.AD_Wu_ZMDGJ_dian_ZMDGJ_Banner__ZMDGJ_Hide, this, this.Hide_ZMDGJ_Banner);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.AD_Wu_ZMDGJ_dian_ZMDGJ_Banner_Pre_ZMDGJ_Load, this, this.Pre_ZMDGJ_load_ZMDGJ_Banner);
    }
    // onDisable(): void {
    //     this._displaySp.off(Laya.Event.CLICK, this, this.onSpClick);
    //     this.clearWXBaner();
    // }

    protected refresh_ZMDGJ_Banner_ZMDGJ_Dis() {
        var self = this;
        _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_ADVs(this.Ad_ZMDGJ_Pos_ZMDGJ_ID, (datas) => {
            if (datas && datas.length > 0) {
                var data = datas[Math.floor(Math.random() * datas.length)];
                self._display_ZMDGJ_Sp.loadImage(data.logo, Laya.Handler.create(self, function () {
                    if (!self._display_ZMDGJ_Sp.destroyed) {
                        self._display_ZMDGJ_Sp.width = 750;
                        self._display_ZMDGJ_Sp.height = 256;
                        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.AD_Wu_ZMDGJ_dianBanner_Load_ZMDGJ_Complete);
                    }
                }));
                self._data_ZMDGJ_ = data;
            }
        }, false)
    }

    protected on_ZMDGJ_Sp_ZMDGJ_Click() {
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
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
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

    protected refresh_ZMDGJ_WXBanner() {
        if (!Laya.Browser.onMiniGame)
            return;
        this.clear_ZMDGJ_WXBaner();
        var self = this;
        var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this._display_ZMDGJ_Sp.localToGlobal(new Laya.Point(0, 0))

        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.WX_ZMDGJ_Banner_ZMDGJ_Width ? this.WX_ZMDGJ_Banner_ZMDGJ_Width / Laya.stage.width * sw : sw;

        this._wx_ZMDGJ_Banner = Laya.Browser.window["wx"].createBannerAd(
            {
                adUnitId: WX_ZMDGJ_API.banner_ZMDGJ_AdUnitId,
                adIntervals: 30,
                style:
                    {
                        left: left,
                        top: top,
                        width: width,
                    }
            })
        self._wx_ZMDGJ_Banner.onLoad((res) => {
            console.log("误点Banner广告 加载完成");
            console.log(res);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.AD_Wu_ZMDGJ_dianBanner_Load_ZMDGJ_Complete);
        })
        this._wx_ZMDGJ_Banner.onError((err) => {
            console.log("误点Banner广告 加载失败");
            console.log(err);
            self.refresh_ZMDGJ_Banner_ZMDGJ_Dis();
            self.clear_ZMDGJ_WXBaner();
        })
        this._wx_ZMDGJ_Banner.onResize(res => {
            console.log(self._wx_ZMDGJ_Banner.style.realWidth, self._wx_ZMDGJ_Banner.style.realHeight)
        })
        self._wx_ZMDGJ_Banner.hide();
    }

    public clear_ZMDGJ_WXBaner() {
        if (this._wx_ZMDGJ_Banner) {
            this._wx_ZMDGJ_Banner.destroy();
        }
        this._wx_ZMDGJ_Banner = null;
    }
}