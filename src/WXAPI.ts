export default class WX_ZMDGJ_API {
    public static readonly ad_ZMDGJ_UnitId = "adunit-34eb7092cc7ab967"
    public static readonly banner_ZMDGJ_AdUnitId = "adunit-ddfa85bf4306713f"
    public static readonly Ins_ZMDGJ_AdUnitId = "adunit-ddfa85bf4306713f"
    

    public static _ZMDGJ_wxLogin_ZMDGJ_(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window.wx.login(
                {
                    success: (res) => {
                        if (res.code) {
                            let code = res.code;
                            onSuccess(code);
                            console.log("登陆成功,获取到code : " + code)
                        }
                    }
                })
        }
    }


    //-------------------------激励视频---------------------------------
    protected static _isReg_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Event = false;
    protected static _on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Failed: Function = null;
    protected static _on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close: Function = null;
    protected static on_ZMDGJ_Rewarded_ZMDGJ_VideoAdLoad() {
        console.log('激励视频 广告加载完成')
    }
    protected static onRewarded_ZMDGJ_Video_ZMDGJ_AdError(err) {
        console.log('激励视频 广告加载失败' + err)
        if (WX_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Failed) {
            WX_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Failed();
        }
    }
    protected static on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close(res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看')
            if (WX_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close) {
                WX_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close(true)
            }
        }
        else {
            console.log('激励视频 未完整观看')
            if (WX_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close) {
                WX_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close(false)
            }
        }
    }
    protected static reg_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Event(rewardedVideoAd) {

        rewardedVideoAd.onLoad(WX_ZMDGJ_API.on_ZMDGJ_Rewarded_ZMDGJ_VideoAdLoad)
        rewardedVideoAd.onError(WX_ZMDGJ_API.onRewarded_ZMDGJ_Video_ZMDGJ_AdError)
        rewardedVideoAd.onClose(WX_ZMDGJ_API.on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close)

        WX_ZMDGJ_API._isReg_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Event = true;
    }
    public static show_ZMDGJ_Rewarded_ZMDGJ_VideoAd(onAdClose: Function, onFailed: Function) {
        if (Laya.Browser.onMiniGame) {
            WX_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close = onAdClose;
            WX_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Failed = onFailed;

            var rewardedVideoAd = Laya.Browser.window["wx"].createRewardedVideoAd(
                {
                    adUnitId: WX_ZMDGJ_API.ad_ZMDGJ_UnitId,
                }
            );

            if (!WX_ZMDGJ_API._isReg_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Event) {
                WX_ZMDGJ_API.reg_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Event(rewardedVideoAd);
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


    //-------------------------小游戏跳转---------------------------
    public static navigate_ZMDGJ_To_ZMDGJ_MiniProgram(appId: string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
        if (Laya.Browser.onMiniGame) {
            console.log("跳转游戏： " + appId);
            Laya.Browser.window["wx"].navigateToMiniProgram(
                {
                    appId: appId,
                    path: path,
                    extraData: {
                        foo: 'bar'
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
                    complete(res) {
                        if (onComplate) {
                            onComplate(res)
                        }
                    }
                })

        }
    }
    //----------------------------------------------------------------------

    //---------------------分享----------------------------------------
    protected static _onShow: Function = null;
    protected static _lastShareTime: number = 0;
    public static share_ZMDGJ_(complate: Function, titel: string, imageUrl: string) {
        if (Laya.Browser.onMiniGame) {
            WX_ZMDGJ_API._onShow = () => {
                Laya.Browser.window["wx"].offShow(WX_ZMDGJ_API._onShow)
                WX_ZMDGJ_API._onShow = null;
                var c = Date.now() - this._lastShareTime;
                if (complate) {
                    if (Date.now() - this._lastShareTime > 2000) {
                        complate(true)
                    }
                    else {
                        complate(false)
                    }
                }
            }
            Laya.Browser.window["wx"].onShow(WX_ZMDGJ_API._onShow)
            WX_ZMDGJ_API._lastShareTime = Date.now();
            Laya.Browser.window["wx"].shareAppMessage(
                {
                    title: titel,
                    imageUrl: imageUrl
                }
            );
        }
    }
    //----------------------------------------------------------------------


    //--------------------插屏幕广告---------------------------------------
    public static show_ZMDGJ_Interstitial_ZMDGJ_Ad(onAdClose: Function, onFailed: Function)  {
        if (Laya.Browser.onMiniGame) {
            var interstitialAd = Laya.Browser.window["wx"].createInterstitialAd({
                adUnitId: WX_ZMDGJ_API.Ins_ZMDGJ_AdUnitId,
            })

            interstitialAd.onLoad(() => {
                console.log('插屏广告 加载完成');
                interstitialAd.show().catch((err) => {
                    console.log('插屏广告 显示失败 ：' + err)
                    if (onFailed) {
                        onFailed();
                    }
                })
            })

            interstitialAd.onError((err) => {
                console.log('插屏广告 加载失败' + err);
                if (onFailed) {
                    onFailed();
                }
            })

            interstitialAd.onClose(() => {
                console.log('插屏广告 关闭');
                if (onAdClose) {
                    onAdClose();
                }
            })
        }
        else {
            onAdClose();
        }
    }
    /**
     * 得到小程序启动参数的同步方法，可得到一个Object返回值，返回值具体的数据结构在下面的列表中
     * scene	number	启动小游戏的场景值
     * query	Object	启动小游戏的 query 参数
     * shareTicket	string	shareTicket，详见获取更多转发信息
     * referrerInfo	object	来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}
     * https://developers.weixin.qq.com/minigame/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html
     * @static
     * @returns {LaunchOptions} 
     * @memberof WXAPI
     */
    public static get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync() {
        // let result = { scene: 0, query: null, shareTicket: "", referrerInfo: null };
        if (Laya.Browser.onMiniGame) {
            let obj = Laya.Browser.window["wx"].getLaunchOptionsSync()
            console.log("场景值 " + obj.scene);
            let str = JSON.stringify(obj.query);
            console.log("Query参数 " + str);
            let key = obj.query["key"];
            console.log("Query参数：key " + key);
            console.log("ShareTicket " + obj.shareTicket);
            console.log("ReferrerInfo.appId " + obj.referrerInfo.appId);
            console.log("ReferrerInfo.extraData " + obj.referrerInfo.extraData);
            return obj;
        }
        let obj = { scene: 1001, query: "", shareTicket: "", appId: "", extraData: "" }
        return obj;
    }

    //----------------------------------------------------------------------
    /**
     * 打开微信左上角分享转发点击事件,在游戏逻辑中调用一次即可
     * 注意此方法只会在真机上执行，在微信模拟器环境下点击转发按钮什么都不会发生
     * 
     * @static
     * @param {string} titel 分享标题
     * @param {string} imageUrl 分享图片地址
     * @param {Function} [success] 成功回调函数(可不填)
     * @param {Function} [fail] 失败回调函数(可不填)
     * @param {Function} [complate] 完成回调函数，成功失败都会执行(可不填)
     * @memberof WXAPI
     */
    public static Set_ZMDGJ_Share_ZMDGJ_Menu(titel: string, imageUrl: string, success?: Function, fail?: Function, complate?: Function) {
        if (Laya.Browser.onMiniGame) {
            console.log("小游戏设置转发按钮");
            Laya.Browser.window["wx"].showShareMenu({
                withShareTicket: false,
                success: success,
                fail: fail,
                complete: complate
            });
            Laya.Browser.window["wx"].onShareAppMessage(function () {
                return {
                    title: titel,
                    imageUrl: imageUrl
                }
            });
        }
    }

    //检测更新
    public static check_ZMDGJ_Update()
    {
        if (Laya.Browser.onMiniGame) 
        {
            var updateManager = Laya.Browser.window["wx"].getUpdateManager()
            updateManager.onCheckForUpdate(function (res) 
            {
                console.log("是否需要更新 : ",res.hasUpdate)
            })
            updateManager.onUpdateReady(function () {
                Laya.Browser.window["wx"].showModal({
                    title: '更新提示',
                    content: '新版本已经准备好，是否重启小游戏？',
                    success: function (res) 
                    {
                        if (res.confirm) 
                        {
                            updateManager.applyUpdate()
                        }
                    }
                })
            })
            updateManager.onUpdateFailed(function () {
                console.log("新版本下载失败!!!")
            })
        }
    }
}