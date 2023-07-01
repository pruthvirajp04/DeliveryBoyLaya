import App_ZMDGJ_Switch_ZMDGJ_Config from "../Config/AppSwitchConfig";
import WX_ZMDGJ_API from "../WXAPI";

export class WX_ZMDGJ_BannderAd
{
    public static readonly MAX__ZMDGJ_RETRY_COUNT_ZMDGJ_ : number = 3;

    constructor(bannerid : string)
    {
        this._id_ZMDGJ_ = bannerid;
    }

    public get _ZMDGJ_Id_ZMDGJ_()
    {
        return this._id_ZMDGJ_;
    }
    protected _id_ZMDGJ_ : string = null;
    protected _banner_ZMDGJ_ : any = null;
    public get Create_ZMDGJ_Time()
    {
        return this._create_ZMDGJ_Time;
    }
    protected _create_ZMDGJ_Time : number = 0;

    public get Destroyed_ZMDGJ_()
    {
        return this._destroyed_ZMDGJ_;
    }
    protected _destroyed_ZMDGJ_: boolean = false;

    public get is_ZMDGJ_Ready()
    {
        return null != this._banner_ZMDGJ_;
    }
    public get is_ZMDGJ_Error()
    {
        return null != this._ZMDGJ__error_ZMDGJ_;
    }
    public get _ZMDGJ_Error_ZMDGJ_()
    {
        return this._ZMDGJ__error_ZMDGJ_;
    }
    protected _ZMDGJ__error_ZMDGJ_ : any = null;

    public get Load_ZMDGJ_ing()
    {
        return this._loading_ZMDGJ_;
    }
    protected _loading_ZMDGJ_ : boolean = false;

    public get Retry_ZMDGJ_Count()
    {
        return this._retry_ZMDGJ_Count;
    }
    protected _retry_ZMDGJ_Count : number = 0;

    public get Banner_ZMDGJ_Total_ZMDGJ_ShowTime()
    {
        return this._banner_ZMDGJ_Total_ZMDGJ_ShowTime;
    }
    protected _banner_ZMDGJ_Total_ZMDGJ_ShowTime : number = 0;
    protected _last_ZMDGJ_Show_ZMDGJ_Time : number = 0;

    public _ZMDGJ_show_ZMDGJ_() 
    {
        if(this.is_ZMDGJ_Ready)
        {
            this._banner_ZMDGJ_.hide();
            let self = this;
            let sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            let sw = sysInfo.screenWidth;
            let sh = sysInfo.screenHeight;
            let pos = new Laya.Point(0, 0);
            let width = 300;
            let left = sw / 2 - width / 2;
            let top = sh - 130;
            this._banner_ZMDGJ_.style.left = left;
            this._banner_ZMDGJ_.style.top = top;
            this._last_ZMDGJ_Show_ZMDGJ_Time = Laya.timer.currTimer;
            this._banner_ZMDGJ_.show();
        }
    }
    public _ZMDGJ_hide_ZMDGJ_() 
    {
        if(this.is_ZMDGJ_Ready)
        {
            this._banner_ZMDGJ_.hide();
            this._banner_ZMDGJ_Total_ZMDGJ_ShowTime += (Laya.timer.currTimer - this._last_ZMDGJ_Show_ZMDGJ_Time);
        }
    }
    public des_ZMDGJ_troy()
    {
        if(this._destroyed_ZMDGJ_)
        {
            console.log("BannerAd 已经被销毁");
            return;
        }
        if(this._loading_ZMDGJ_)
        {
            console.log("BannerAd 正在加载中，无法进行销毁");
            return;
        }
        if(null != this._banner_ZMDGJ_)
        {
            this._banner_ZMDGJ_.destroy();
        }
        this._banner_ZMDGJ_ = null;
        this._destroyed_ZMDGJ_ = true;
    }

    public _ZMDGJ_retry_ZMDGJ_(callBack? : Function)
    {
        if(this._destroyed_ZMDGJ_)
        {
            console.log("BannerAd 已被销毁，无法重试");
            return;
        }
        if(this.is_ZMDGJ_Ready)
        {
            console.log("BannerAd 已创建成功，无需重试");
            return;
        }
        if(this._loading_ZMDGJ_)
        {
            console.log("BannerAd 正在创建中");
            return;
        }
        if(this._retry_ZMDGJ_Count >= WX_ZMDGJ_BannderAd.MAX__ZMDGJ_RETRY_COUNT_ZMDGJ_)
        {
            console.log("此 BannerAd 重试次数已达最大");
            return;
        }
        let self = this;
        this._create_ZMDGJ_((isOk :boolean)=>
        {
            if(null != callBack)
            {
                callBack(isOk);
            }
            ++self._retry_ZMDGJ_Count;
        });
    }

    protected _create_ZMDGJ_(callBack? : Function)
    {
        if(!Laya.Browser.onMiniGame)
        {
            if(null != callBack)
            {
                callBack(false);
            }
            return;
        }
        let banner = null;
        if(Laya.Browser.onMiniGame)
        {
            banner = Laya.Browser.window["wx"].createBannerAd(
                {
                    adUnitId : this._id_ZMDGJ_,
                    adIntervals : 30,
                    style : 
                    {
                        left : 0,
                        top : 0,
                        width : 300,
                    }
                })
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            banner = Laya.Browser.window["qq"].createBannerAd(
                {
                    adUnitId : this._id_ZMDGJ_,
                    adIntervals : 30,
                    style : 
                    {
                        left : 0,
                        top : 0,
                        width : 300,
                    }
                })
        }
        if(null != banner)
        {
            let self = this;
            this._loading_ZMDGJ_ = true;
            banner.onLoad((res) =>  {
                console.log("BannderAd 加载完成",self._id_ZMDGJ_,res);
                self._banner_ZMDGJ_ = banner;
                self._create_ZMDGJ_Time = Laya.timer.currTimer;
                self._loading_ZMDGJ_ = false;
                if(null != callBack)
                {
                    callBack(true);
                }
            })
            banner.onError((err) =>  {
                console.log("BannderAd 加载失败",self._id_ZMDGJ_,err);
                self._ZMDGJ__error_ZMDGJ_ = err;
                self._loading_ZMDGJ_ = false;
                banner.destroy();
                if(null != callBack)
                {
                    callBack(false);
                }
            })
        }
    }
}

export class WX_ZMDGJ_GridAd
{
    constructor(bannerid : string)
    {
        this._id_ZMDGJ_ = bannerid;
    }

    protected _id_ZMDGJ_ : string = null;
    protected _grid_ZMDGJ_Ad : any = null;
    public get Create_ZMDGJ_Time()
    {
        return this._create_ZMDGJ_Time;
    }
    protected _create_ZMDGJ_Time : number = 0;

    public get Des_ZMDGJ_troyed()
    {
        return this._des_ZMDGJ_troyed;
    }
    protected _des_ZMDGJ_troyed: boolean = false;

    public get is_ZMDGJ_Ready()
    {
        return null != this._grid_ZMDGJ_Ad;
    }
    public get is_ZMDGJ_Error()
    {
        return null != this._ZMDGJ__error_ZMDGJ_;
    }
    public get _ZMDGJ_Error_ZMDGJ_()
    {
        return this._ZMDGJ__error_ZMDGJ_;
    }
    protected _ZMDGJ__error_ZMDGJ_ : any = null;

    public get Load_ZMDGJ_ing()
    {
        return this._load_ZMDGJ_ing;
    }
    protected _load_ZMDGJ_ing : boolean = false;

    public _ZMDGJ_show_ZMDGJ_() 
    {
        if(this.is_ZMDGJ_Ready)
        {
            this._grid_ZMDGJ_Ad.show();
        }
    }
    public _ZMDGJ_hide_ZMDGJ_() 
    {
        if(this.is_ZMDGJ_Ready)
        {
            this._grid_ZMDGJ_Ad.hide();
        }
    }
    public des_ZMDGJ_troy()
    {
        if(this._des_ZMDGJ_troyed)
        {
            console.log("GridAD 已经被销毁");
            return;
        }
        if(this._load_ZMDGJ_ing)
        {
            console.log("GridAD 正在加载中，无法进行销毁");
            return;
        }
        if(null != this._grid_ZMDGJ_Ad)
        {
            this._grid_ZMDGJ_Ad.destroy();
        }
        this._grid_ZMDGJ_Ad = null;
        this._des_ZMDGJ_troyed = true;
    }

    public _ZMDGJ_retry_ZMDGJ_(callBack? : Function)
    {
        if(this._des_ZMDGJ_troyed)
        {
            console.log("GridAD 已被销毁，无法重试");
            return;
        }
        if(this.is_ZMDGJ_Ready)
        {
            console.log("GridAD 已创建成功，无需重试");
            return;
        }
        if(this._load_ZMDGJ_ing)
        {
            console.log("GridAD 正在创建中");
            return;
        }
        let self = this;
        this._ZMDGJ__create_ZMDGJ_((isOk :boolean)=>
        {
            if(null != callBack)
            {
                callBack(isOk);
            }
        });
    }

    protected _ZMDGJ__create_ZMDGJ_(callBack? : Function)
    {
        if(!Laya.Browser.onMiniGame)
        {
            if(null != callBack)
            {
                callBack(false);
            }
            return;
        }
        let gridAd = Laya.Browser.window["wx"].createGridAd(
            {
                adUnitId : this._id_ZMDGJ_,
                adIntervals : 30,
                style : 
                {
                    left : 0,
                    top : 0,
                    width : 300,
                    height : 150,
                }
            })
        if(null != gridAd)
        {
            let self = this;
            this._load_ZMDGJ_ing = true;
            gridAd.onLoad((res) =>  {
                console.log("GridAD 加载完成",self._id_ZMDGJ_,res);
                self._grid_ZMDGJ_Ad = gridAd;
                self._create_ZMDGJ_Time = Laya.timer.currTimer;
                self._load_ZMDGJ_ing = false;
                if(null != callBack)
                {
                    callBack(true);
                }
            })
            gridAd.onError((err) =>  {
                console.log("GridAD 加载失败",self._id_ZMDGJ_,err);
                self._ZMDGJ__error_ZMDGJ_ = err;
                self._load_ZMDGJ_ing = false;
                gridAd.destroy();
                if(null != callBack)
                {
                    callBack(false);
                }
            })
        }
    }
}

export default class WX_ZMDGJ_ADMgr 
{
    protected static _inited_ZMDGJ_ : boolean = false;
    protected static readonly _banner_ZMDGJ_Ids : Array<string> = new Array<string>();
    protected static readonly _banners_ZMDGJ_ : Array<WX_ZMDGJ_BannderAd> = new Array<any>();
    protected static _cur_ZMDGJ_Banner_ZMDGJ_CreateIndex : number = 0;
    protected static _cur_ZMDGJ_Banner_ZMDGJ_GetIndex : number = 0;

    protected static _wx_ZMDGJ_GridAd : WX_ZMDGJ_GridAd = null;
    
    public static _ZMDGJ_init_ZMDGJ_()
    {
        if(WX_ZMDGJ_ADMgr._inited_ZMDGJ_)
            return;
        let banners = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wx_ZMDGJ_Wu_ZMDGJ_Dian_ZMDGJ_Banners;
        for (let i = 0; i < banners.length; ++i)
        {
            WX_ZMDGJ_ADMgr._banner_ZMDGJ_Ids.push(banners[i]);
        }
        for(let i=0;i < WX_ZMDGJ_ADMgr._banner_ZMDGJ_Ids.length;++i)
        {
            let cur = WX_ZMDGJ_ADMgr._banner_ZMDGJ_Ids[i];
            WX_ZMDGJ_ADMgr._banner_ZMDGJ_Ids[i] = banners[Math.floor(Math.random() * banners.length)];
        }

        WX_ZMDGJ_ADMgr._create_ZMDGJ_BannerAd_ZMDGJ_();
        let bannerRecreateTime = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Create_ZMDGJ_FailNum * 1000;
        Laya.timer.loop(bannerRecreateTime,WX_ZMDGJ_ADMgr,()=>
        {
            WX_ZMDGJ_ADMgr._check_ZMDGJ_BannerAd_ZMDGJ_();
            WX_ZMDGJ_ADMgr._create_ZMDGJ_BannerAd_ZMDGJ_();
        });

        //WX_ZMDGJ_ADMgr._create_ZMDGJ_GirdAd();

        WX_ZMDGJ_ADMgr._inited_ZMDGJ_ = true;
    }

    public static get_ZMDGJ_Banner(callBack : Function)
    {
        let readyBannerAd :Array<WX_ZMDGJ_BannderAd> = [];
        let UnreadyBannerAd :Array<WX_ZMDGJ_BannderAd> = [];
        for(let i=0; i < WX_ZMDGJ_ADMgr._banners_ZMDGJ_.length;++i)
        {
            let bannerAd = WX_ZMDGJ_ADMgr._banners_ZMDGJ_[i];
            if(!bannerAd.Destroyed_ZMDGJ_)
            {
                if(bannerAd.is_ZMDGJ_Ready)
                {
                    readyBannerAd.push(bannerAd);
                }
                else
                {
                    UnreadyBannerAd.push(bannerAd);
                }
            }
        }
        
        if(WX_ZMDGJ_ADMgr._cur_ZMDGJ_Banner_ZMDGJ_GetIndex >= readyBannerAd.length)
        {
            WX_ZMDGJ_ADMgr._cur_ZMDGJ_Banner_ZMDGJ_GetIndex = 0;
        }
        let bannerAd = readyBannerAd[WX_ZMDGJ_ADMgr._cur_ZMDGJ_Banner_ZMDGJ_GetIndex];
        ++WX_ZMDGJ_ADMgr._cur_ZMDGJ_Banner_ZMDGJ_GetIndex;

        if(null != bannerAd)
        {
            callBack(bannerAd);
        }
        else
        {
            bannerAd = WX_ZMDGJ_ADMgr._create_ZMDGJ_BannerAd_ZMDGJ_();
            if(null == bannerAd)
            {
                bannerAd = WX_ZMDGJ_ADMgr._banners_ZMDGJ_[Math.floor(Math.random() * WX_ZMDGJ_ADMgr._banners_ZMDGJ_.length)];
            }
            if(null == bannerAd)
            {
                callBack(null);
            }
            else
            {
                bannerAd._ZMDGJ_retry_ZMDGJ_((ok : boolean)=>
                {
                    if(ok)
                    {
                        callBack(bannerAd);
                    }
                    else
                    {
                        callBack(null);
                    }
                });
            }
        }
    }   

    protected static _create_ZMDGJ_BannerAd_ZMDGJ_() : WX_ZMDGJ_BannderAd
    {
        if(WX_ZMDGJ_ADMgr._cur_ZMDGJ_Banner_ZMDGJ_CreateIndex >= WX_ZMDGJ_ADMgr._banner_ZMDGJ_Ids.length)
            return null;
        let bannerAd = new WX_ZMDGJ_BannderAd(WX_ZMDGJ_ADMgr._banner_ZMDGJ_Ids[WX_ZMDGJ_ADMgr._cur_ZMDGJ_Banner_ZMDGJ_CreateIndex]);
        WX_ZMDGJ_ADMgr._banners_ZMDGJ_.push(bannerAd);
        bannerAd._ZMDGJ_retry_ZMDGJ_();
        ++WX_ZMDGJ_ADMgr._cur_ZMDGJ_Banner_ZMDGJ_CreateIndex;
        return bannerAd;
    }

    protected static _check_ZMDGJ_BannerAd_ZMDGJ_()
    {
        let readyBannerAd :Array<WX_ZMDGJ_BannderAd> = [];
        let UnreadyBannerAd :Array<WX_ZMDGJ_BannderAd> = [];
        for(let i=0; i < WX_ZMDGJ_ADMgr._banners_ZMDGJ_.length;++i)
        {
            let bannerAd = WX_ZMDGJ_ADMgr._banners_ZMDGJ_[i];
            if(!bannerAd.Destroyed_ZMDGJ_)
            {
                if(bannerAd.is_ZMDGJ_Ready)
                {
                    readyBannerAd.push(bannerAd);
                }
                else
                {
                    UnreadyBannerAd.push(bannerAd);
                }
            }
        }

        for(let i=0;i < WX_ZMDGJ_ADMgr._banners_ZMDGJ_.length;++i)
        {
            let bannerAd: WX_ZMDGJ_BannderAd = WX_ZMDGJ_ADMgr._banners_ZMDGJ_[i];
            let bannerShowTime = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Show_ZMDGJ_Time;
            if(!bannerAd.is_ZMDGJ_Ready)
            {
                if(bannerAd.Retry_ZMDGJ_Count >= WX_ZMDGJ_BannderAd.MAX__ZMDGJ_RETRY_COUNT_ZMDGJ_)
                {
                    console.log("BannerAd 超过重试次数，销毁 : ",bannerAd._ZMDGJ_Id_ZMDGJ_);
                    bannerAd.des_ZMDGJ_troy();
                }
                else
                {
                    bannerAd._ZMDGJ_retry_ZMDGJ_();
                }
            }
            else if(readyBannerAd.length >= 2 && bannerAd.Banner_ZMDGJ_Total_ZMDGJ_ShowTime >= bannerShowTime * 1000)
            {
                console.log("BannerAd 展示时间超过限制，销毁 : ",bannerAd._ZMDGJ_Id_ZMDGJ_);
                bannerAd.des_ZMDGJ_troy();
            }
        }
    }

    public static get_ZMDGJ_Box_ZMDGJ_Ad(callBack : Function)
    {
        if(WX_ZMDGJ_ADMgr._wx_ZMDGJ_GridAd.is_ZMDGJ_Ready)
        {
            callBack(WX_ZMDGJ_ADMgr._wx_ZMDGJ_GridAd);
        }
        else
        {
            let gridAd = WX_ZMDGJ_ADMgr._wx_ZMDGJ_GridAd;
            gridAd._ZMDGJ_retry_ZMDGJ_((isOk:boolean)=>
            {
                if(isOk)
                {
                    callBack(gridAd);
                }
                else
                {
                    callBack(null);
                }
            })
        }
    }

    protected static _create_ZMDGJ_GirdAd()
    {
        if(null != WX_ZMDGJ_ADMgr._wx_ZMDGJ_GridAd)
            return;
        let gridAd = new WX_ZMDGJ_GridAd("");
        gridAd._ZMDGJ_retry_ZMDGJ_();
        WX_ZMDGJ_ADMgr._wx_ZMDGJ_GridAd = gridAd;
    }
}