import App_ZMDGJ_Switch_ZMDGJ_Config from "./Config/AppSwitchConfig";
import WX_SSPD_API_SSPD_ from "./WXAPI";
import QQ_ZMDGJ_Mini_ZMDGJ_GameAPI from "./QQMiniGameAPI";

export default class Cached_ZMDGJ_QQ_ZMDGJ_BannerAd {
    protected static _cur_ZMDGJ_Banner: any = null;
    protected static _on_ZMDGJ_Load : Function = null;
    protected static _on_ZMDGJ_Error : Function = null;
    protected static _is_ZMDGJ_Hide : boolean = true;

    public static pre_ZMDGJ_load_ZMDGJ_Banner() {

    }

    public static _ZMDGJ_show_ZMDGJ_(bannerid?: string) {
        let wxWuDianBanners = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wx_ZMDGJ_Wu_ZMDGJ_Dian_ZMDGJ_Banners;
        let bannerTodayBannerMax = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Today_ZMDGJ_Banner_ZMDGJ_Max;
        bannerid = wxWuDianBanners[Math.floor(Math.random() * wxWuDianBanners.length)];
        if (Laya.Browser.onQQMiniGame && null != bannerid) {
            let sysInfo = Laya.Browser.window["qq"].getSystemInfoSync();
            let sw = sysInfo.screenWidth;
            let sh = sysInfo.screenHeight;
            let banner = Laya.Browser.window["qq"].createBannerAd(
                {
                    adUnitId: bannerid,
                    adIntervals: 30,
                    style:
                        {
                            left: 0,
                            top: (Laya.stage.height - 240) / Laya.stage.height * sh,
                            width: sw,
                        }
                })
            if (banner) {
                let self = this;
                Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._on_ZMDGJ_Load = (res) => {
                    console.log("CachedQQBanner 广告 加载完成", bannerid);
                    console.log(res);
                    if(!self._is_ZMDGJ_Hide)
                    {
                        banner.show();
                    }
                    else
                    {
                        banner.offLoad(Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._on_ZMDGJ_Load);
                        banner.offError(Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._on_ZMDGJ_Error);
                        banner.destroy();
                    }
                }
                banner.onLoad(Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._on_ZMDGJ_Load);
                Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._on_ZMDGJ_Error = (err) => {
                    console.log("CachedQQBanner 广告 加载失败", bannerid);
                    console.log(err);
                    banner.offLoad(Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._on_ZMDGJ_Load);
                    banner.offError(Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._on_ZMDGJ_Error);
                    banner.destroy();
                }
                banner.onError(Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._on_ZMDGJ_Error);
                Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._cur_ZMDGJ_Banner = banner
            }
        }
        Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._is_ZMDGJ_Hide = false;
    }


    public static hide() {
        Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._is_ZMDGJ_Hide = true;
        Laya.timer.clearAll(Cached_ZMDGJ_QQ_ZMDGJ_BannerAd);
        if (null != Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._cur_ZMDGJ_Banner)  {
            Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._cur_ZMDGJ_Banner.hide();
            Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._cur_ZMDGJ_Banner.offLoad(Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._on_ZMDGJ_Load);
            Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._cur_ZMDGJ_Banner.offError(Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._on_ZMDGJ_Error);
            Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._cur_ZMDGJ_Banner.destroy();
            Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._cur_ZMDGJ_Banner = null;
            console.log("CachedQQBanner 广告隐藏");
        }
    }

    public static change_ZMDGJ_Show() {
        if (null != Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._cur_ZMDGJ_Banner) {
            Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._cur_ZMDGJ_Banner.hide();
            Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._cur_ZMDGJ_Banner = null;
        }
        Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._ZMDGJ_show_ZMDGJ_();
    }

    public static _ZMDGJ_clear_ZMDGJ_() {

    }
}