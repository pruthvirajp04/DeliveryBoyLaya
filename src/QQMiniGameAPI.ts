import View_ZMDGJ_Mgr, { View_ZMDGJ_Def } from "./Mgr/ViewMgr";
import App_ZMDGJ_Switch_ZMDGJ_Config from "./Config/AppSwitchConfig";
import Wu_ZMDGJ_dian_ZMDGJ_Mgr from "./Mgr/WudianMgr";
import App_ZMDGJ_Config from "./AppConfig";

export default class QQ_ZMDGJ_Mini_ZMDGJ_GameAPI {
    public static readonly ad_ZMDGJ_UnitId = ""         //激励视频Id
    public static readonly banner_ZMDGJ_AdUnitId = ""   //banner广告Id
    public static readonly Ins_ZMDGJ_AdUnitId = ""      //插屏广告Id
    public static readonly App_ZMDGJ_BoxId = ""        //盒子广告Id

    public static _ZMDGJ_Login_ZMDGJ_(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onQQMiniGame) {    
            Laya.Browser.window["qq"].login(
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
    protected static _isReg_ZMDGJ_Rewarded_ZMDGJ_VideoAdEvent = false;
    protected static _onRewarded_ZMDGJ_VideoAd_ZMDGJ_Failed: Function = null;
    protected static _onRewarded_ZMDGJ_VideoAd_ZMDGJ_Close: Function = null;
    protected static onRewarded_ZMDGJ_VideoAd_ZMDGJ_Load() {
        console.log('激励视频 广告加载完成')
    }
    protected static onRewarded_ZMDGJ_VideoAd_ZMDGJ_Error(err) {
        console.log('激励视频 广告加载失败' + err)
        if (QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onRewarded_ZMDGJ_VideoAd_ZMDGJ_Failed) {
            QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onRewarded_ZMDGJ_VideoAd_ZMDGJ_Failed();
        }
    }
    protected static onRewarded_ZMDGJ_Video_ZMDGJ_AdClose(res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看')
            if (QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onRewarded_ZMDGJ_VideoAd_ZMDGJ_Close) {
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onRewarded_ZMDGJ_VideoAd_ZMDGJ_Close(true)
            }
        }
        else {
            console.log('激励视频 未完整观看')
            if (QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onRewarded_ZMDGJ_VideoAd_ZMDGJ_Close) {
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onRewarded_ZMDGJ_VideoAd_ZMDGJ_Close(false)
            }
        }
    }
    protected static reg_ZMDGJ_Rewarded_ZMDGJ_Video_ZMDGJ_AdEvent(rewardedVideoAd) {

        rewardedVideoAd.onLoad(QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.onRewarded_ZMDGJ_VideoAd_ZMDGJ_Load)
        rewardedVideoAd.onError(QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.onRewarded_ZMDGJ_VideoAd_ZMDGJ_Error)
        rewardedVideoAd.onClose(QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.onRewarded_ZMDGJ_Video_ZMDGJ_AdClose)

        QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._isReg_ZMDGJ_Rewarded_ZMDGJ_VideoAdEvent = true;
    }
    public static show_ZMDGJ_Rewarded_ZMDGJ_VideoAd(onAdClose: Function, onFailed: Function) {
        if (Laya.Browser.onQQMiniGame) {
            QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onRewarded_ZMDGJ_VideoAd_ZMDGJ_Close = onAdClose;
            QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onRewarded_ZMDGJ_VideoAd_ZMDGJ_Failed = onFailed;

            var rewardedVideoAd = Laya.Browser.window["qq"].createRewardedVideoAd(
                {
                    adUnitId: QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.ad_ZMDGJ_UnitId,
                }
            );

            if (!QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._isReg_ZMDGJ_Rewarded_ZMDGJ_VideoAdEvent) {
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.reg_ZMDGJ_Rewarded_ZMDGJ_Video_ZMDGJ_AdEvent(rewardedVideoAd);
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
    public static navigate_ZMDGJ_To_ZMDGJ_Mini_ZMDGJ_Program(appId: string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
        if (Laya.Browser.onQQMiniGame) {
            console.log("跳转游戏： " + appId);
            Laya.Browser.window["qq"].navigateToMiniProgram(
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
    protected static _onShow_ZMDGJ_: Function = null;
    protected static _last_ZMDGJ_Share_ZMDGJ_Time: number = 0;
    public static share_ZMDGJ_(complate: Function, titel: string, imageUrl: string) {
        if (Laya.Browser.onQQMiniGame) {
            QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onShow_ZMDGJ_ = () => {
                Laya.Browser.window["qq"].offShow(QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onShow_ZMDGJ_)
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onShow_ZMDGJ_ = null;
                var c = Date.now() - this._last_ZMDGJ_Share_ZMDGJ_Time;
                if (complate) {
                    if (Date.now() - this._last_ZMDGJ_Share_ZMDGJ_Time > 2000) {
                        complate(true)
                    }
                    else {
                        complate(false)
                    }
                }
            }
            Laya.Browser.window["qq"].onShow(QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onShow_ZMDGJ_)
            QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._last_ZMDGJ_Share_ZMDGJ_Time = Date.now();
            Laya.Browser.window["qq"].shareAppMessage(
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
        if (Laya.Browser.onQQMiniGame) {
            var interstitialAd = Laya.Browser.window["qq"].createInterstitialAd({
                adUnitId: QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.Ins_ZMDGJ_AdUnitId,
            })

            let _onLoad = () => {
                console.log('插屏广告 加载完成');
                interstitialAd.show().catch((err) => {
                    console.log('插屏广告 显示失败 ：' + err)
                    interstitialAd.offLoad(_onLoad);
                    interstitialAd.offError(_onError);
                    interstitialAd.offClose(_onClose);
                    interstitialAd.destroy();
                    if (onFailed) {
                        onFailed();
                    }
                })
            }
            interstitialAd.onLoad(_onLoad)

            let _onError = (err) => {
                console.log('插屏广告 加载失败' + err);
                interstitialAd.offLoad(_onLoad);
                interstitialAd.offError(_onError);
                interstitialAd.offClose(_onClose);
                interstitialAd.destroy();
                if (onFailed) {
                    onFailed();
                }
            }
            interstitialAd.onError(_onError)

            let _onClose = () => {
                console.log('插屏广告 关闭');
                interstitialAd.offLoad(_onLoad);
                interstitialAd.offError(_onError);
                interstitialAd.offClose(_onClose);
                interstitialAd.destroy();
                if (onAdClose) {
                    onAdClose();
                }
            }
            interstitialAd.onClose(_onClose)
        }
        else {
            onAdClose();
        }
    }

        //--------------------盒子广告---------------------------------------
        public static mApp_ZMDGJ_box_ZMDGJ_Ad = null;
        protected static on_ZMDGJ_BoxAd_ZMDGJ_Close : Function = null;
        
        public static Load_ZMDGJ_App_ZMDGJ_BoxAd(onAdClose: Function, onFailed: Function) {
            if (Laya.Browser.onQQMiniGame) {
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_box_ZMDGJ_Ad = Laya.Browser.window["qq"].createAppBox({
                    adUnitId: QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.App_ZMDGJ_BoxId,
                })
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_box_ZMDGJ_Ad.load().then(() => {
                    console.log('盒子广告 加载完成');
                })
    
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_box_ZMDGJ_Ad.onError((err) => {
                    console.log('盒子广告 加载失败' + err);
                    if (onFailed) {
                        onFailed();
                    }
                })
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.on_ZMDGJ_BoxAd_ZMDGJ_Close = () => {
                    console.log('盒子广告 关闭');
                    if (onAdClose) {
                        onAdClose();
                    }
                }
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_box_ZMDGJ_Ad.onClose(QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.on_ZMDGJ_BoxAd_ZMDGJ_Close);
            }
            else {
                onAdClose();
            }
        }
    
        public static show_ZMDGJ_App_ZMDGJ_BoxAd(onFailed: Function,onAdClose? : Function) {
            if(this.mApp_ZMDGJ_box_ZMDGJ_Ad){
                console.log("显示盒子广告");
                this.mApp_ZMDGJ_box_ZMDGJ_Ad.offClose(this.on_ZMDGJ_BoxAd_ZMDGJ_Close);
                this.on_ZMDGJ_BoxAd_ZMDGJ_Close = () => {
                    console.log('盒子广告 关闭');
                    if (onAdClose) {
                        onAdClose();
                    }
                }
                this.mApp_ZMDGJ_box_ZMDGJ_Ad.onClose(this.on_ZMDGJ_BoxAd_ZMDGJ_Close);
                this.mApp_ZMDGJ_box_ZMDGJ_Ad.show().catch((err) => {
                    console.log('盒子广告 显示失败 ：' + err);
                    if (onFailed) {
                        onFailed();
                    }
                })
            }else{
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.Load_ZMDGJ_App_ZMDGJ_BoxAd(onAdClose,onFailed);
            } 
        }
        
    /**
     * 得到小程序启动参数的同步方法，可得到一个Object返回值，返回值具体的数据结构在下面的列表中
     * scene	number	启动小游戏的场景值
     * query	Object	启动小游戏的 query 参数
     * shareTicket	string	shareTicket，详见获取更多转发信息
     * referrerInfo	object	来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}
     * https://developers.weixin.qq.com/minigame/dev/api/base/app/life-cycle/qq.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync.html
     * @static
     * @returns {LaunchOptions} 
     * @memberof QQ_ZMDGJ_Mini_ZMDGJ_GameAPI
     */
    public static get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync() {
        // let result = { scene: 0, query: null, shareTicket: "", referrerInfo: null };
        if (Laya.Browser.onQQMiniGame) {
            let obj = Laya.Browser.window["qq"].get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync()
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
     * @memberof QQ_ZMDGJ_Mini_ZMDGJ_GameAPI
     */
    public static Set_ZMDGJ_Share_ZMDGJ_Menu(titel: string, imageUrl: string, success?: Function, fail?: Function, complate?: Function) {
        if (Laya.Browser.onQQMiniGame) {
            console.log("小游戏设置转发按钮");
            Laya.Browser.window["qq"].showShareMenu({
                withShareTicket: false,
                success: success,
                fail: fail,
                complete: complate
            });
            Laya.Browser.window["qq"].onShareAppMessage(function () {
                return {
                    title: titel,
                    imageUrl: imageUrl
                }
            });
        }
    }


    //显示QQ狂点界面1，此接口添加了对场景值，IP地区的判断
    //data 传入界面的参数 格式 ：{ Complete : Function , PrizeCount : String | Number}
    //onSuccess 界面成功打开回调
    //onFail 界面打开失败回调
    public static showQQCreazyClick(data : any,onSuccess : Function,onFail : Function)
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
        let ipBlocked = Wu_ZMDGJ_dian_ZMDGJ_Mgr.Get_ZMDGJ_Ip_ZMDGJ_Blocked();
        let wudian =  App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wu_ZMDGJ_dian;
        let kuangdianBanner =  App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().qq_ZMDGJ_cfg.kuang_ZMDGJ_dian_ZMDGJ_Banner;
        if(App_ZMDGJ_Config.Versions_ZMDGJ_ ==  App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().qq_ZMDGJ_cfg.qq_ZMDGJ_versions
            && ipBlocked && noEnterBySearch && 1 == wudian && 1 == kuangdianBanner)
        {
            View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.QQCrazyClickView,data,()=>
            {
                if(null != onSuccess)
                {
                    onSuccess();
                }
            })
        }
        else
        {
            if(null != onFail)
            {
                onFail();
            }
        }
    }

    //显示QQ狂点界面2，此接口添加了对场景值，IP地区的判断
    //data 传入界面的参数 格式 ：{ Complete : Function , PrizeCount : String | Number}
    //onSuccess 界面成功打开回调
    //onFail 界面打开失败回调
    public static showQQCreazyClick2(data : any,onSuccess : Function,onFail : Function)
    {
        let launchScene = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene;
        let noEnterBySearch: boolean = true;
        let wudianSceneList =  App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wu_ZMDGJ_dian_ZMDGJ_Scene_ZMDGJ_List;
        for (let i = 0; i < wudianSceneList.length; ++i)  
        {
            let wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let ipBlocked = Wu_ZMDGJ_dian_ZMDGJ_Mgr.Get_ZMDGJ_Ip_ZMDGJ_Blocked();
        let wudian =  App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wu_ZMDGJ_dian;
        let kuangdianBox =  App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().qq_ZMDGJ_cfg.kuangdian_ZMDGJ_Box;
        if(App_ZMDGJ_Config.Versions_ZMDGJ_ ==  App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().qq_ZMDGJ_cfg.qq_ZMDGJ_versions
            && ipBlocked && noEnterBySearch && 1 == wudian && 1 == kuangdianBox)
        {
            View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.QQCrazyClickView2,data,()=>
            {
                if(null != onSuccess)
                {
                    onSuccess();
                }
            })
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