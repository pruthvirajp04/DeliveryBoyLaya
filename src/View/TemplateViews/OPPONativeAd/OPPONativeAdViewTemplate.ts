import View_ZMDGJ_Base from "../../ViewBase";
import App_ZMDGJ_Switch_ZMDGJ_Config from "../../../Config/AppSwitchConfig";
import OPPO_ZMDGJ_API from "../../../OPPOAPI";
import Wu_ZMDGJ_dian_ZMDGJ_Mgr from "../../../Mgr/WudianMgr";

export default class OPPO_ZMDGJ_NativeAd_ZMDGJ_ViewTemplate extends View_ZMDGJ_Base 
{

    protected _center_ZMDGJ_Zone : Laya.Sprite;
    protected _dis_ZMDGJ_play : Laya.Sprite;
    protected _ok_ZMDGJ_Btn : Laya.Sprite;
    protected _close_ZMDGJ_Btn : Laya.Sprite;

    protected _native_ZMDGJ_Ad : any = null;
    protected _cur_ZMDGJ_AdItem : any = null;

    protected _bg_ZMDGJ_:Laya.Sprite;

    onAwake()
    {
        this._center_ZMDGJ_Zone = this.owner.getChildByName("CenterZone") as Laya.Sprite;
        this._dis_ZMDGJ_play = this._center_ZMDGJ_Zone.getChildByName("Display") as Laya.Sprite;
        this._ok_ZMDGJ_Btn = this._center_ZMDGJ_Zone.getChildByName("OkBtn") as Laya.Sprite;
        this._close_ZMDGJ_Btn = this._center_ZMDGJ_Zone.getChildByName("CloseBtn") as Laya.Sprite;
        this._bg_ZMDGJ_ = this.owner.getChildByName("BG") as Laya.Sprite;
    }

    onEnable()
    {
        super.onEnable();
        this.load_ZMDGJ_Ad();
        this._bg_ZMDGJ_.height = Laya.stage.height;
        this._close_ZMDGJ_Btn.visible = false;
        Laya.timer.once(App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().oppo_ZMDGJ_cfg.btn_ZMDGJ_Show_ZMDGJ_Timer,this,()=>{
            this._close_ZMDGJ_Btn.visible = true;
        })
    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
        this._ok_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Ok_ZMDGJ_Btn);
        this._close_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Close_ZMDGJ_Btn);
        this._dis_ZMDGJ_play.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Display_ZMDGJ_Click);
        
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
        this._ok_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Ok_ZMDGJ_Btn);
        this._close_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Close_ZMDGJ_Btn);
        this._dis_ZMDGJ_play.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Display_ZMDGJ_Click);
    }

    protected load_ZMDGJ_Ad()
    {
        var self = this;
        let ipBlocked = Wu_ZMDGJ_dian_ZMDGJ_Mgr.Get_ZMDGJ_Ip_ZMDGJ_Blocked();
        if(!ipBlocked)
        {
            self.close_ZMDGJ_View();
            return;
        }
        if(Laya.Browser.onQGMiniGame)
        {
            if(this._native_ZMDGJ_Ad)
            {
                this._native_ZMDGJ_Ad.destroy();
                this._native_ZMDGJ_Ad = null;
            }
            this._cur_ZMDGJ_AdItem = null;
            
            this._native_ZMDGJ_Ad = qg.createNativeAd({ 
                posId: OPPO_ZMDGJ_API.Native_ZMDGJ_AdId 
            })
            this._native_ZMDGJ_Ad.load();
            this._native_ZMDGJ_Ad.onLoad((res)=>
            {
                console.log("原生广告加载成功：",res);
                var adlist = res.adList;
                for (var i = 0; i < adlist.length; ++i)  
                {
                    var ad = adlist[i];
                    console.log("原生广告数据：",i);
                    for(var key in ad)
                    {
                        console.log(key,ad[key]);
                    }
                }
                self._cur_ZMDGJ_AdItem = adlist[Math.floor(Math.random() * adlist.length)];
                if(null != self._cur_ZMDGJ_AdItem)
                {
                    for (var i = 0; i < self._cur_ZMDGJ_AdItem.imgUrlList.length; ++i)
                    {
                        console.log("imgUrlList : ",i + " ",self._cur_ZMDGJ_AdItem.imgUrlList[i])
                    }
                    var imgulr = self._cur_ZMDGJ_AdItem.imgUrlList[Math.floor(Math.random() * self._cur_ZMDGJ_AdItem.imgUrlList.length)];
                    self._dis_ZMDGJ_play.loadImage(imgulr);
                    self._native_ZMDGJ_Ad.reportAdShow({
                        adId: self._cur_ZMDGJ_AdItem.adId
                    })
                    console.log("加载图片",imgulr);
                    console.log("点击上报！！！")
                }
                self._center_ZMDGJ_Zone.visible = true;
            })
            this._native_ZMDGJ_Ad.onError((res)=>
            {
                console.log("原生广告加载失败：",res);
                for(var key in res)
                {
                    console.log(key,res[key]);
                }
                self.close_ZMDGJ_View();
            })

            this._center_ZMDGJ_Zone.visible = false;
        }
    }

    protected on_ZMDGJ_Close_ZMDGJ_Btn()
    {
        this.close_ZMDGJ_View();
    }

    protected on_ZMDGJ_Ok_ZMDGJ_Btn()
    {
        if (Math.random() * 100 <= App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().oppo_ZMDGJ_cfg.yuan_ZMDGJ_sheng) {
            console.log("进入变态广告");
            this.on_ZMDGJ_Display_ZMDGJ_Click();
        }   
        this.close_ZMDGJ_View();
    }

    protected on_ZMDGJ_Display_ZMDGJ_Click()
    {
        if(null != this._native_ZMDGJ_Ad && null != this._cur_ZMDGJ_AdItem)
        {
            console.log("点击上报！！！")
            this._native_ZMDGJ_Ad.reportAdClick({
                adId: this._cur_ZMDGJ_AdItem.adId
            })
        }
    }

    onDestroy()
    {
        super.onDestroy();
        if(Laya.Browser.onQGMiniGame)
        {
            if(this._native_ZMDGJ_Ad)
            {
                this._native_ZMDGJ_Ad.destroy();
            }
            this._native_ZMDGJ_Ad = null;
            this._cur_ZMDGJ_AdItem = null;
        }
    }
}