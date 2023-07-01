import App_ZMDGJ_Switch_ZMDGJ_Config from "./Config/AppSwitchConfig";
import WX_SSPD_API_SSPD_ from "./WXAPI";

export default class Cached_ZMDGJ_WX_ZMDGJ_BannerAd
{
    protected static _banner_ZMDGJ_Cache : any = {};
    protected static _cur_ZMDGJ_Banner : any = null;

    protected static readonly _pre_ZMDGJ_Loop_ZMDGJ_Obj = {}

    public static pre_ZMDGJ_load_ZMDGJ_Banner() 
    {
        var wxWuDianBanners = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wx_ZMDGJ_Wu_ZMDGJ_Dian_ZMDGJ_Banners;
        var bannerTodayBannerMax = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Today_ZMDGJ_Banner_ZMDGJ_Max;
        var preLoadBanners : Array<string> = new Array<string>();
        for (var i = 0; i < wxWuDianBanners.length; ++i)
        {
            preLoadBanners.push(wxWuDianBanners[i]);
        }
        if(preLoadBanners.length > bannerTodayBannerMax)
        {
            var delNum = preLoadBanners.length - bannerTodayBannerMax;
            for (var i = 0; i < delNum; ++i)  
            {
                preLoadBanners.splice(Math.floor(Math.random() * preLoadBanners.length),1);
            }
        }
        console.log("开始预创建微信Bannaer",preLoadBanners);
        console.log("Bannaer 最大数限制 ：",bannerTodayBannerMax);
        var counter = 0;
        Laya.timer.loop(2000,Cached_ZMDGJ_WX_ZMDGJ_BannerAd._pre_ZMDGJ_Loop_ZMDGJ_Obj,()=>
        {
            if(counter >= preLoadBanners.length)
            {
                Laya.timer.clearAll(Cached_ZMDGJ_WX_ZMDGJ_BannerAd._pre_ZMDGJ_Loop_ZMDGJ_Obj);
                return;
            }
            var bannerid = preLoadBanners[counter];
            var banner = Cached_ZMDGJ_WX_ZMDGJ_BannerAd._banner_ZMDGJ_Cache[bannerid];
            if(null == banner)
            {
                banner = Cached_ZMDGJ_WX_ZMDGJ_BannerAd._ZMDGJ_create_ZMDGJ_(bannerid);
                if(null != banner)
                {
                    Cached_ZMDGJ_WX_ZMDGJ_BannerAd._banner_ZMDGJ_Cache[bannerid] = banner;
                    console.log("预创建微信Bannaer",bannerid,"完成");
                }
            }
            ++counter;
        });
    }

    protected static get_ZMDGJ_Banner(bannerid : string) : any
    {
        if(null == bannerid || "" == bannerid)
            return null;
        var banner = Cached_ZMDGJ_WX_ZMDGJ_BannerAd._banner_ZMDGJ_Cache[bannerid];
        if(null == banner)
        {
            banner = Cached_ZMDGJ_WX_ZMDGJ_BannerAd._ZMDGJ_create_ZMDGJ_(bannerid);
            if(null != banner)
            {
                Cached_ZMDGJ_WX_ZMDGJ_BannerAd._banner_ZMDGJ_Cache[bannerid] = banner;
            }
        }
        return banner
    }

    protected static _ZMDGJ_create_ZMDGJ_(bannerid : string)
    {
        if(Laya.Browser.onMiniGame)
        {
            var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            var banner = Laya.Browser.window["wx"].createBannerAd(
                {
                    adUnitId : bannerid,
                    adIntervals : 30,
                    style : 
                    {
                        left : 0,
                        top : (Laya.stage.height - 240) / Laya.stage.height * sh,
                        width : sw,
                    }
                })
            if(banner)
            {
                banner.onLoad((res) =>  {
                    console.log("CachedWXBanner 广告 加载完成",bannerid);
                    console.log(res);
                })
                banner.onError((err) =>  {
                    console.log("CachedWXBanner 广告 加载失败",bannerid);
                    console.log(err);
                })
                banner.onResize(res => {
                    console.log(banner.style.realWidth, banner.style.realHeight)
                  })
            }
            return banner;
        }
        else
        {
            return null;
        }
    }

    public static _ZMDGJ_show_ZMDGJ_()
    {
        if(null != Cached_ZMDGJ_WX_ZMDGJ_BannerAd._cur_ZMDGJ_Banner)
        {
            Cached_ZMDGJ_WX_ZMDGJ_BannerAd._cur_ZMDGJ_Banner.hide();
            Cached_ZMDGJ_WX_ZMDGJ_BannerAd._cur_ZMDGJ_Banner = null;
        }
        var wuDianBanners = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wx_ZMDGJ_Wu_ZMDGJ_Dian_ZMDGJ_Banners;
        var bannerid = wuDianBanners[Math.floor(Math.random() * wuDianBanners.length)];
        var banner = Cached_ZMDGJ_WX_ZMDGJ_BannerAd.get_ZMDGJ_Banner(bannerid);
        if(banner)
        {
            Cached_ZMDGJ_WX_ZMDGJ_BannerAd._cur_ZMDGJ_Banner = banner;
            var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            Cached_ZMDGJ_WX_ZMDGJ_BannerAd._cur_ZMDGJ_Banner.style.top = (Laya.stage.height - 240) / Laya.stage.height * sh;
            Cached_ZMDGJ_WX_ZMDGJ_BannerAd._cur_ZMDGJ_Banner.show();
            console.log("CachedWXBanner 广告显示 bannerid ： ",bannerid);
        }
        var time = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Fresh_ZMDGJ_Timer;
        //Laya.timer.once(time * 1000,CachedWXBannerAd,CachedWXBannerAd.changeShow);
    }


    public static _ZMDGJ_hide_ZMDGJ_()
    {
        Laya.timer.clearAll(Cached_ZMDGJ_WX_ZMDGJ_BannerAd);
        if(null != Cached_ZMDGJ_WX_ZMDGJ_BannerAd._cur_ZMDGJ_Banner)
        {
            Cached_ZMDGJ_WX_ZMDGJ_BannerAd._cur_ZMDGJ_Banner.hide();
            Cached_ZMDGJ_WX_ZMDGJ_BannerAd._cur_ZMDGJ_Banner = null;
        }
        console.log("CachedWXBanner 广告隐藏");
    }

    public static change_ZMDGJ_Show()
    {
        if(null != Cached_ZMDGJ_WX_ZMDGJ_BannerAd._cur_ZMDGJ_Banner)
        {
            Cached_ZMDGJ_WX_ZMDGJ_BannerAd._cur_ZMDGJ_Banner.hide();
            Cached_ZMDGJ_WX_ZMDGJ_BannerAd._cur_ZMDGJ_Banner = null;
        }
        Cached_ZMDGJ_WX_ZMDGJ_BannerAd._ZMDGJ_show_ZMDGJ_();
    }

    public static _ZMDGJ_clear_ZMDGJ_()
    {
        Laya.timer.clearAll(Cached_ZMDGJ_WX_ZMDGJ_BannerAd);
        for(var key in Cached_ZMDGJ_WX_ZMDGJ_BannerAd._banner_ZMDGJ_Cache)
        {
            var banner = Cached_ZMDGJ_WX_ZMDGJ_BannerAd._banner_ZMDGJ_Cache[key];
            if(null != banner)
            {
                banner.destroy();
            }
            Cached_ZMDGJ_WX_ZMDGJ_BannerAd._banner_ZMDGJ_Cache[key] = null;
        }
    }
}