import App_ZMDGJ_Config from "./AppConfig";

export default class TT_ZMDGJ_API
{
    public static readonly ad_ZMDGJ_UnitId = ""   
    public static readonly banner_ZMDGJ_AdUnitId = ""   
    public static readonly Ins_ZMDGJ_AdUnitId = ""
    public static readonly _templateId_ZMDGJ_ = ""       //分享素材id
    
    private static record_ZMDGJ_Res:string = ""
    private static record_ZMDGJ_:any;

    protected static _banner_ZMDGJ_ : any = null;    

    public static _ZMDGJ_ttLogin_ZMDGJ_(onSuccess: Function, onFail: Function) {
        if (App_ZMDGJ_Config.onTTMiniGame && null != Laya.Browser.window["tt"]) {
            Laya.Browser.window["tt"].login(
                {
                    force : false,                    
                    success: (res) => {
                        console.log("登陆成功1");
                        let code = res.code;
                        if(code){
                            onSuccess(code);
                        }else{
                            console.log("用户没有登陆，采用临时code")
                            onFail();
                        }
                    },
                    fail:()=>{
                        console.log("登陆失败1");
                        onFail();
                    },
                })
            TT_ZMDGJ_API.init_ZMDGJ_Record();       
        }
    }

    //-------------------------激励视频---------------------------------
    protected static _isReg_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Event = false;
    protected static _on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Failed: Function = null;
    protected static _on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close: Function = null;
    protected static on_ZMDGJ_Rewarded_ZMDGJ_Video_ZMDGJ_AdLoad() {
        console.log('激励视频 广告加载完成')
    }
    protected static on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Error(err) {
        console.log('激励视频 广告加载失败' + err)
        if (TT_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Failed) {
            TT_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Failed();
        }
    }
    protected static on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close(res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看')
            if (TT_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close) {
                TT_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close(true)
            }
        }
        else {
            console.log('激励视频 未完整观看')
            if (TT_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close) {
                TT_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close(false)
            }
        }
    }
    protected static reg_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Event(rewardedVideoAd) {

        rewardedVideoAd.onLoad(TT_ZMDGJ_API.on_ZMDGJ_Rewarded_ZMDGJ_Video_ZMDGJ_AdLoad)
        rewardedVideoAd.onError(TT_ZMDGJ_API.on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Error)
        rewardedVideoAd.onClose(TT_ZMDGJ_API.on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close)
        TT_ZMDGJ_API._isReg_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Event = true;
    }
    public static show_ZMDGJ_Rewarded_ZMDGJ_VideoAd(onAdClose: Function, onFailed: Function) {
        if (App_ZMDGJ_Config.onTTMiniGame && null != Laya.Browser.window["tt"]) {
            TT_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close = onAdClose;
            TT_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Failed = onFailed;

            var rewardedVideoAd = Laya.Browser.window["tt"].createRewardedVideoAd(
                {
                    adUnitId: TT_ZMDGJ_API.ad_ZMDGJ_UnitId,
                }
            );

            if (!TT_ZMDGJ_API._isReg_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Event) {
                TT_ZMDGJ_API.reg_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Event(rewardedVideoAd);
            }

            rewardedVideoAd.load().then(() => {
                var promise = rewardedVideoAd.show();
                promise.then(() => console.log('激励视频 广告显示成功'));
                promise.catch((err) => {
                    rewardedVideoAd.load()
                        .then(() => rewardedVideoAd.show())
                        .catch(err => {
                            console.log('激励视频 广告显示失败')
                            if (onFailed) {
                                onFailed();
                            }
                        })
                });
            }).catch(err => {
                console.log('激励视频 广告加载失败')
                if (onFailed) {
                    onFailed();
                }
            })
        }
        else {
            onAdClose(true);
        }
    }
    //----------------------------------------------------------------


    //-------------------------小游戏跳转---------------------------TODO
    // public static navigateToMiniProgram(appId: string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
    //     if (Laya.Browser.onMiniGame) {
    //         console.log("跳转游戏： " + appId);
    //         Laya.Browser.window["tt"].navigateToMiniProgram(
    //             {
    //                 appId: appId,
    //                 path: path,
    //                 extraData: {
    //                     foo: 'bar'
    //                 },
    //                 envVersion: 'release',
    //                 success(res) {
    //                     if (onSuccess) {
    //                         onSuccess(res)
    //                     }
    //                 },
    //                 fail(res) {
    //                     if (onFail) {
    //                         onFail(res)
    //                     }
    //                 },
    //                 complete(res) {
    //                     if (onComplate) {
    //                         onComplate(res)
    //                     }
    //                 }
    //             })

    //     }
    // }
    //-------------------------------------------------------------

    //-------------------录屏-------------------------------------------
    /**
     * 配置录屏
     */
    
    private static init_ZMDGJ_Record(){
        TT_ZMDGJ_API.record_ZMDGJ_ = Laya.Browser.window["tt"].getGameRecorderManager();  
        if(TT_ZMDGJ_API.record_ZMDGJ_!=null){
            TT_ZMDGJ_API.record_ZMDGJ_.onStart(res =>{
                console.log("录屏开始");
                TT_ZMDGJ_API.record_ZMDGJ_Res="";        
            })

            TT_ZMDGJ_API.record_ZMDGJ_.onStop(res =>{
                console.log("录屏结束");
                TT_ZMDGJ_API.record_ZMDGJ_Res = res.videoPath;
            })
        }
    }

    /**
     * 开始录屏
     */
    public static start_ZMDGJ_Record(duration = 300){
        if(!App_ZMDGJ_Config.onTTMiniGame)return;
        TT_ZMDGJ_API.record_ZMDGJ_.start({
            duration
        })
    }

     /**
     * 停止录屏
     */
    public static stop_ZMDGJ_Record() {
        if(!App_ZMDGJ_Config.onTTMiniGame)return;                     
        TT_ZMDGJ_API.record_ZMDGJ_.stop();
    }

    //----------------------------------------------------------------------

    //---------------------分享录屏----------------------------------------
    public static share_ZMDGJ_Record(callback: Function = null, Failcallback: Function = null) {
        if (!App_ZMDGJ_Config.onTTMiniGame) return;
        if (TT_ZMDGJ_API.record_ZMDGJ_Res != "") {
            window["tt"].shareAppMessage({
                channel: "video",
                extra: {
                    videoPath: TT_ZMDGJ_API.record_ZMDGJ_Res, // 可替换成录屏得到的视频地址
                    videoTopics: [App_ZMDGJ_Config.Game_ZMDGJ_Name]
                },
                success() {
                    if (callback != null) {
                        callback();
                    }
                    console.log("分享视频成功");
                },
                fail(e) {
                    console.log("分享视频失败");
                    if (Failcallback != null) {
                        Failcallback();
                    }
                }
            });
        } else {
            if (Failcallback != null) {
                Failcallback();
            }
            console.log("分享视频为空");
        }
    }
    //----------------------------------------------------------------------


    //----------------------------------------------------------------------

    //---------------------分享好友----------------------------------------
    public static share_ZMDGJ_(complate:Function=null){
        if(!App_ZMDGJ_Config.onTTMiniGame && null == Laya.Browser.window["tt"])return;   
        window["tt"].shareAppMessage({
            templateId:TT_ZMDGJ_API._templateId_ZMDGJ_,
            success() {
                if(complate!=null){
                    complate();
                }
            },
            fail() {
                console.log("分享失败");
            }
            });

    }

    //------------------------------------------------------------------

    //-------------------------banner-------------------------------------------

    public static show_ZMDGJ_Banner():any
    {
        if(!App_ZMDGJ_Config.onTTMiniGame || null == Laya.Browser.window["tt"] || TT_ZMDGJ_API.banner_ZMDGJ_AdUnitId.length<=0)return;
        if(!TT_ZMDGJ_API._banner_ZMDGJ_){
            const { windowWidth, windowHeight } = Laya.Browser.window["tt"].getSystemInfoSync();
            var targetBannerAdWidth = 150;
            // 创建一个居于屏幕底部正中的广告
            TT_ZMDGJ_API._banner_ZMDGJ_ = Laya.Browser.window["tt"].createBannerAd({
                adUnitId: TT_ZMDGJ_API.banner_ZMDGJ_AdUnitId,
                adIntervals:30,                
                style: {
                    width: targetBannerAdWidth,
                    top: windowHeight - (targetBannerAdWidth / 16) * 9, // 根据系统约定尺寸计算出广告高度
                }
                });
            TT_ZMDGJ_API._banner_ZMDGJ_.onResize(size => {
                console.log(size.width, size.height);
                TT_ZMDGJ_API._banner_ZMDGJ_.style.top = windowHeight - size.height;
                TT_ZMDGJ_API._banner_ZMDGJ_.style.left = (windowWidth - size.width) / 2;
            });
            TT_ZMDGJ_API._banner_ZMDGJ_.show();
        }
    }

    public static hideBanner()
    {
        if(null != TT_ZMDGJ_API._banner_ZMDGJ_)
        {
            TT_ZMDGJ_API._banner_ZMDGJ_.hide();
        }
    }

    public static showMoreGamesModal(onSuccess : Function,onFail : Function)
    {
        const systemInfo = Laya.Browser.window["tt"].getSystemInfoSync();
        // iOS 不支持，建议先检测再使用
        if (systemInfo.platform !== "ios") {
            // 打开互跳弹窗
            Laya.Browser.window["tt"].showMoreGamesModal({
                appLaunchOptions: [
                    {
                        appId: App_ZMDGJ_Config.App_ZMDGJ_ID,
                        query: "foo=bar&baz=qux",
                        extraData: {}
                    }
                    // {...}
                ],
                success(res) {
                    console.log("success", res.errMsg);
                    if(onSuccess)
                    {
                        onSuccess();
                    }
                },
                fail(res) {
                    console.log("fail", res.errMsg);
                    if(onFail)
                    {
                        onFail();
                    }
                }
            });
        }
        else
        {
            if(onFail)
            {
                onFail();
            }
        }
    }


    //----------------------------------------------------------------------

    // //--------------------插屏幕广告---------------------------------------  
    // public static showInterstitialAd(onAdClose: Function, onFailed: Function)  {
    //     if (Laya.Browser.onMiniGame) {
    //         var interstitialAd = Laya.Browser.window["wx"].createInterstitialAd({
    //             adUnitId: TTAPI.InsAdUnitId,
    //         })

    //         interstitialAd.onLoad(() => {
    //             console.log('插屏广告 加载完成');
    //             interstitialAd.show().catch((err) => {
    //                 console.log('插屏广告 显示失败 ：' + err)
    //                 if (onFailed) {
    //                     onFailed();
    //                 }
    //             })
    //         })

    //         interstitialAd.onError((err) => {
    //             console.log('插屏广告 加载失败' + err);
    //             if (onFailed) {
    //                 onFailed();
    //             }
    //         })

    //         interstitialAd.onClose(() => {
    //             console.log('插屏广告 关闭');
    //             if (onAdClose) {
    //                 onAdClose();
    //             }
    //         })
    //     }
    //     else {
    //         onAdClose();
    //     }
    // }
    /**
     * 得到小程序启动参数的同步方法，可得到一个Object返回值，返回值具体的数据结构在下面的列表中
     * scene	number	启动小游戏的场景值
     * query	Object	启动小游戏的 query 参数
     * shareTicket	string	shareTicket，详见获取更多转发信息
     * referrerInfo	object	来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}
     * https://developers.weixin.qq.com/minigame/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html
     * @static
     * @returns {LaunchOptions} 
     * @memberof TTAPI
     */
    // public static getLaunchOptionsSync() {
    //     // let result = { scene: 0, query: null, shareTicket: "", referrerInfo: null };
    //     if (Laya.Browser.onMiniGame) {
    //         let obj = Laya.Browser.window["wx"].getLaunchOptionsSync()
    //         console.log("场景值 " + obj.scene);
    //         let str = JSON.stringify(obj.query);
    //         console.log("Query参数 " + str);
    //         let key = obj.query["key"];
    //         console.log("Query参数：key " + key);
    //         console.log("ShareTicket " + obj.shareTicket);
    //         console.log("ReferrerInfo.appId " + obj.referrerInfo.appId);
    //         console.log("ReferrerInfo.extraData " + obj.referrerInfo.extraData);
    //         return obj;
    //     }
    //     let obj = { scene: 1001, query: "", shareTicket: "", appId: "", extraData: "" }
    //     return obj;
    // }

    //----------------------------------------------------------------------
    // /**
    //  * 打开微信左上角分享转发点击事件,在游戏逻辑中调用一次即可
    //  * 注意此方法只会在真机上执行，在微信模拟器环境下点击转发按钮什么都不会发生
    //  * 
    //  * @static
    //  * @param {string} titel 分享标题
    //  * @param {string} imageUrl 分享图片地址
    //  * @param {Function} [success] 成功回调函数(可不填)
    //  * @param {Function} [fail] 失败回调函数(可不填)
    //  * @param {Function} [complate] 完成回调函数，成功失败都会执行(可不填)
    //  * @memberof TTAPI
    //  */
    // public static SetShareMenu(titel: string, imageUrl: string, success?: Function, fail?: Function, complate?: Function) {
    //     if (Laya.Browser.onMiniGame) {
    //         console.log("小游戏设置转发按钮");
    //         Laya.Browser.window["wx"].showShareMenu({
    //             withShareTicket: false,
    //             success: success,
    //             fail: fail,
    //             complete: complate
    //         });
    //         Laya.Browser.window["wx"].onShareAppMessage(function () {
    //             return {
    //                 title: titel,
    //                 imageUrl: imageUrl
    //             }
    //         });
    //     }
    // }


}