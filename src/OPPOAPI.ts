import App_ZMDGJ_Config from "./AppConfig";
import Http_ZMDGJ_Unit from "./Net/HttpUnit";
import App_ZMDGJ_Switch_ZMDGJ_Config from "./Config/AppSwitchConfig";
import View_ZMDGJ_Mgr, { View_ZMDGJ_Def } from "./Mgr/ViewMgr";
import OPPO_ZMDGJ_NativeAd_ZMDGJ_ViewTemplate from "./View/TemplateViews/OPPONativeAd/OPPONativeAdViewTemplate";

export default class OPPO_ZMDGJ_API 
{
    public static readonly ad_ZMDGJ_UnitId = "";
    public static readonly banner_ZMDGJ_AdUnitId = "";
    public static readonly Ins_ZMDGJ_AdUnitId = "";
    public static readonly Open_ZMDGJ_Screen_ZMDGJ_AdUnitId = "";
    public static readonly Native_ZMDGJ_AdId = ""

    public static get Banner_ZMDGJ_Instance()
    {
        return OPPO_ZMDGJ_API._banner_ZMDGJ_;
    }
    protected static _banner_ZMDGJ_ : any = null;

    public static _ZMDGJ_Login_ZMDGJ_(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onQGMiniGame) {
            Laya.Browser.window["qg"].login(
                {
                    success: (res) => {
                        let token = res.data.token;
                        onSuccess(token);
                        console.log("OPPO 登陆成功,获取到 token : " + token);
                        for (var key in res)  {
                            console.log(key, res[key]);
                        }
                    },
                    fail: (res) => {
                        console.log("OPPO 登陆失败", res);
                        for(var key in res)
                        {
                            console.log(key, res[key]);
                        }
                    }
                })
        }
    }

    public static init_ZMDGJ_AdService(onSuccess : Function,onFail : Function,onComplete : Function)
    {
        Laya.Browser.window["qg"].initAdService(
            {
                appId: App_ZMDGJ_Config.App_ZMDGJ_ID,
                isDebug: false,
                success: function (res) {
                    console.log("oppo initAdService success");
                    if (onSuccess) {
                        onSuccess(res)
                    }
                },
                fail: function (res) {
                    console.log("oppo initAdService fail: ", res.code, res.msg);
                    if (onFail) {
                        onFail(res)
                    }
                },
                complete: function (res) {
                    console.log("oppo initAdService complete");
                    if (onComplete) {
                        onComplete(res)
                    }
                }
            })
    }
   
    public static show_ZMDGJ_Reward_ZMDGJ_edVideoAd(onAdClose: Function, onFailed: Function) {
        if(Laya.Browser.onQGMiniGame)
        {
            var videoAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                posId: OPPO_ZMDGJ_API.ad_ZMDGJ_UnitId,
            })
            videoAd.onLoad(()=>
            {
                console.log("oppo 视频广告加载完成");
                videoAd.show();
            })
            videoAd.onVideoStart(()=>
            {
                console.log("oppo 视频广告开始播放");
            })
            videoAd.onClose((res) =>{
                if(res.isEnded){
                    console.log("oppo 视频广告观看 完成");
                    onAdClose(true);
                }else{
                    console.log("oppo 视频广告观看 未完成");
                    onAdClose(false);
                }
                videoAd.destroy();
            })
            videoAd.onError((err)=>
            {
                console.log("oppo 视频广告获取失败",err);
                videoAd.destroy();
                onFailed();
            })
            videoAd.load();
        }
        else
        {
            onAdClose(true);
        }
    }

    public static navigate_ZMDGJ_To_ZMDGJ_MiniProgram(pkgName: string,gameName : string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
        if (Laya.Browser.onQGMiniGame) {
            console.log("OPPO 跳转游戏： " + pkgName);
            Http_ZMDGJ_Unit.report_ZMDGJ_Export(pkgName,gameName,(result)=>
            {
                if(1 == result.code)
                {
                    console.log("OPPO 导出上报成功");
                }
                else
                {
                    console.log("OPPO 导出上报失败",result.msg);
                }
            },(result)=>
            {
                console.log("OPPO 导出上报失败");
                for(var key in result)
                {
                    console.log(key, result[key]);
                }
            });
            let time = Date.now();
            while(Date.now() - time <= 500)
            {

            }
            Laya.Browser.window["qg"].navigateToMiniGame(
                {
                    pkgName: pkgName,
                    path: path,
                    extraData: {
                        from : App_ZMDGJ_Config.App_ZMDGJ_ID
                    },
                    envVersion: 'release',
                    success(res) {
                        if (onSuccess) {
                            onSuccess(res)
                        }
                    },
                    fail(res) {
                        if (onFail) {
                            onFail(res)
                        }
                    },
                    // complete(res) {
                    //     if (onComplate) {
                    //         onComplate(res)
                    //     }
                    // }
                })


        }
    }

    public static show_ZMDGJ_Interstitial_ZMDGJ_Ad(onAdClose: Function, onFailed: Function)  {
        if (Laya.Browser.onQGMiniGame) 
        {
            var insertAd = qg.createInsertAd({ 
                posId: OPPO_ZMDGJ_API.Ins_ZMDGJ_AdUnitId
            })
            insertAd.load();
            insertAd.onLoad(()=>
            {
                console.log("插屏广告加载完成");
                insertAd.show();
            })
            insertAd.onShow(()=>
            {
                console.log("插屏广告显示成功");
            })
            insertAd.onError((err)=> {
                console.log("插屏广告拉取失败",err);
                insertAd.destroy();
                if(onFailed)
                {
                    onFailed();
                }
            })
        }
        else
        {
            onAdClose();
        }
    }

    public static show_ZMDGJ_Bannaer() : any
    {
        if(OPPO_ZMDGJ_API._banner_ZMDGJ_)
        {
            OPPO_ZMDGJ_API._banner_ZMDGJ_.show();
            return;
        }
        var bannerAd = qg.createBannerAd({
            posId: OPPO_ZMDGJ_API.banner_ZMDGJ_AdUnitId
        })
        bannerAd.show();
        OPPO_ZMDGJ_API._banner_ZMDGJ_ = bannerAd;
    }

    public static hide_ZMDGJ_Banner()
    {
        if(OPPO_ZMDGJ_API._banner_ZMDGJ_)
        {
            OPPO_ZMDGJ_API._banner_ZMDGJ_.hide();
        }
    }

    public static destroyBanner()
    {
        if(OPPO_ZMDGJ_API._banner_ZMDGJ_)
        {
            OPPO_ZMDGJ_API._banner_ZMDGJ_.destroy();
        }
        OPPO_ZMDGJ_API._banner_ZMDGJ_ = null;
    }

    public static get_ZMDGJ_LaunchOpt_ZMDGJ_ionsSync() {
        let obj : any = { query: "", referrerInfo: { package: "", extraData: { appid : ""} } }
        if (Laya.Browser.onQGMiniGame) {
            var options = Laya.Browser.window["qg"].getLaunchOptionsSync();
            if(null != options && options != "")
            {
                obj = options;
            }
            else
            {
                console.log("没有启动设置！！！")
            }
            return obj;
        }
        return obj;
    }

    public static _ZMDGJ_share_ZMDGJ_(complate: Function, titel: string, imageUrl: string) {
        complate(false);
    }

    public static create_ZMDGJ_DesktopIcon(onSuccess : Function,onFail : Function)
    {
        if (Laya.Browser.onQGMiniGame) 
        {
            Laya.Browser.window["qg"].hasShortcutInstalled({
                success: function (res) 
                {
                    if (res == false) 
                    {
                        Laya.Browser.window["qg"].installShortcut(
                        {
                            success: function () {
                                if (onSuccess)  {
                                    onSuccess();
                                }
                            },
                            fail: function (err) {
                                if (onFail)  {
                                    onFail();
                                }
                                console.log("创建桌面图标失败！！！！",err);
                                for(var key in err)
                                {
                                    console.log(key,err);
                                }
                            },
                            complete: function () {

                            }
                        })
                    }
                    else  
                    {
                        console.log("桌面图标已存在！！！！");
                        if (onFail)  {
                            onFail();
                        }
                    }
                },
                fail: function(err) 
                {
                    if (onFail)  {
                        onFail();
                    }
                    console.log("判断桌面图标是否存在失败！！！",err);
                    for(var key in err)
                    {
                        console.log(key,err);
                    }
                },
                complete: function() 
                {

                }
            })
        }
        else
        {
            if(onFail)
            {
                onFail();
            }
        }
    }

    //根据配置的概率自动弹出创建图标确认框
    public static auto_ZMDGJ_Pop_ZMDGJ_Create_ZMDGJ_DestopIcon(onSuccess : Function,onFail : Function)
    {
        if(!Laya.Browser.onQGMiniGame)
        {
            if(null != onFail)
            {
                onFail();
            }
            return;
        }
        let rate = Math.floor(Math.random() * 100);
        if(rate <= App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().oppo_ZMDGJ_cfg.add_ZMDGJ_To_ZMDGJ_Desktop)
        {
            OPPO_ZMDGJ_API.create_ZMDGJ_DesktopIcon(onSuccess,onFail);
        }
        else
        {
            if(null != onFail)
            {
                onFail();
            }
        }
    }

    //显示OPPO原生界面
    public static show_ZMDGJ_NativeAd(onSuccess : Function,onFail : Function)
    {
        if(!Laya.Browser.onQGMiniGame)
        {
            if(null != onFail)
            {
                onFail();
            }
            return;
        }
        if(1 == App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().oppo_ZMDGJ_cfg.yuan_ZMDGJ_sheng_ZMDGJ_Switch)
        {
            View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.OPPONativeView,null,(v : OPPO_ZMDGJ_NativeAd_ZMDGJ_ViewTemplate)=>
            {
                if(null != onSuccess)
                {
                    onSuccess(v);
                }
            });
        }
        else
        {
            if(null != onFail)
            {
                onFail();
            }
        }
    }
}