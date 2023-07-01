import _ZMDGJ_ShareAd_ZMDGJ_ from "../ShareAd";
import WX_ZMDGJ_API from "../../WXAPI";
import ALD from "../../ALD";
import Event_ZMDGJ_Mgr from "../../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../../Event/EventDef";
import OPPO_ZMDGJ_API from "../../OPPOAPI";
import QQ_ZMDGJ_Mini_ZMDGJ_GameAPI from "../../QQMiniGameAPI";

export default class Insert_ZMDGJ_Ad_ZMDGJ_View extends Laya.Script 
{
    public Ad_ZMDGJ_Pos_ZMDGJ_ID : number = _ZMDGJ_ShareAd_ZMDGJ_.Insert_ZMDGJ_AdLocationID;
    protected _dis_ZMDGJ_play_ZMDGJ_Sp : Laya.Sprite;
    protected _ZMDGJ__data_ZMDGJ_ : any = null;

    onAwake()
    {
        this._dis_ZMDGJ_play_ZMDGJ_Sp = this.owner.getChildByName("Display") as Laya.Sprite;
        if(null == this._dis_ZMDGJ_play_ZMDGJ_Sp)
        {
            this._dis_ZMDGJ_play_ZMDGJ_Sp = this.owner as Laya.Sprite;
        }
    }
    
    onEnable(): void 
    {
        this.refresh_ZMDGJ_Banner_ZMDGJ_Dis();
        this._dis_ZMDGJ_play_ZMDGJ_Sp.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Sp_ZMDGJ_Click);
    }

    onDisable(): void 
    {
        this._dis_ZMDGJ_play_ZMDGJ_Sp.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Sp_ZMDGJ_Click);
    }

    protected refresh_ZMDGJ_Banner_ZMDGJ_Dis()
    {
        var self = this;
        _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_ADVs(this.Ad_ZMDGJ_Pos_ZMDGJ_ID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                var data = datas[Math.floor(Math.random() * datas.length)];

                self._dis_ZMDGJ_play_ZMDGJ_Sp.loadImage(data.logo,Laya.Handler.create(self,function()
                {
                    if(!self._dis_ZMDGJ_play_ZMDGJ_Sp.destroyed)
                    {
                        self._dis_ZMDGJ_play_ZMDGJ_Sp.width = 550;
                        self._dis_ZMDGJ_play_ZMDGJ_Sp.height = 670;
                        self._dis_ZMDGJ_play_ZMDGJ_Sp.scale(1,1);
                    }
                }));
                self._ZMDGJ__data_ZMDGJ_ = data;
            }
        },false)
    }

    protected on_ZMDGJ_Sp_ZMDGJ_Click()
    {
        var data = this._ZMDGJ__data_ZMDGJ_;
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
}