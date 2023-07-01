import _ZMDGJ_ShareAd_ZMDGJ_ from "../ShareAd";
import Utilit_ZMDGJ_ from "../../Utilit";
import WX_ZMDGJ_API from "../../WXAPI";
import ALD from "../../ALD";
import Event_ZMDGJ_Mgr from "../../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../../Event/EventDef";
import OPPO_ZMDGJ_API from "../../OPPOAPI";
import QQ_ZMDGJ_Mini_ZMDGJ_GameAPI from "../../QQMiniGameAPI";

export default class Single_ZMDGJ_Ani_ZMDGJ_ADView extends Laya.Script 
{
    public Ad_ZMDGJ_Pos_ZMDGJ_ID : number = _ZMDGJ_ShareAd_ZMDGJ_.AniAd_ZMDGJ_LocationID;
    protected _owner_ZMDGJ_Sprite :Laya.Sprite;
    protected _animation_ZMDGJ_ : Laya.Animation;
    protected _data_ZMDGJ_ : any = null;

    onAwake()
    {
        this._owner_ZMDGJ_Sprite = this.owner as Laya.Sprite;
        this._animation_ZMDGJ_ = this.owner.getChildByName("Animation") as Laya.Animation;
    }
    
    onEnable(): void 
    {
        this.refresh_ZMDGJ_ADVD_ZMDGJ_is();
        this._owner_ZMDGJ_Sprite.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Sp_ZMDGJ_Click);
    }

    onDisable(): void 
    {
        Laya.timer.clearAll(this);
        this._owner_ZMDGJ_Sprite.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Sp_ZMDGJ_Click);
    }

    protected refresh_ZMDGJ_ADVD_ZMDGJ_is()
    {
        var self = this;
        _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_ADVs(this.Ad_ZMDGJ_Pos_ZMDGJ_ID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                self._owner_ZMDGJ_Sprite.visible = true;
                var data = datas[Math.floor(Math.random() * datas.length)];
                self._animation_ZMDGJ_.loadAtlas(data.atlas,Laya.Handler.create(self,function()
                {
                    self._animation_ZMDGJ_.play(0,true);
                }));
                self._data_ZMDGJ_ = data;
            }
            else
            {
                self._owner_ZMDGJ_Sprite.visible = false;
            }
        },false)
    }

    protected on_ZMDGJ_Sp_ZMDGJ_Click()
    {
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
}