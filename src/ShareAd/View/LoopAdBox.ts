import WX_ZMDGJ_API from "../../WXAPI";
import _ZMDGJ_ShareAd_ZMDGJ_ from "../ShareAd";
import ALD from "../../ALD";
import Event_ZMDGJ_Mgr from "../../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../../Event/EventDef";
import OPPO_ZMDGJ_API from "../../OPPOAPI";
import QQ_ZMDGJ_Mini_ZMDGJ_GameAPI from "../../QQMiniGameAPI";

export default class LoopAd_ZMDGJ_Box extends Laya.Script 
{
    protected _display_ZMDGJ_Sp : Laya.Sprite;
    protected _dis_ZMDGJ_Text : Laya.Text;
    protected _data_ZMDGJ_ : any = null;
    protected _origin_ZMDGJ_W : number = 150;
    protected _origin_ZMDGJ_H : number = 150;
    protected _font_ZMDGJ_Size = 25;
    

    onAwake()
    {
        this._display_ZMDGJ_Sp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._origin_ZMDGJ_W = this._display_ZMDGJ_Sp.width;
        this._origin_ZMDGJ_H = this._display_ZMDGJ_Sp.height;
        this._dis_ZMDGJ_Text =  this.owner.getChildByName("TitelText") as Laya.Text;
        this._dis_ZMDGJ_Text.text = "";
        this._font_ZMDGJ_Size = this._dis_ZMDGJ_Text.fontSize;
    }
    
    onEnable(): void 
    {
        this._display_ZMDGJ_Sp.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Sp_ZMDGJ_Click);
    }

    onDisable(): void 
    {
        this._display_ZMDGJ_Sp.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Sp_ZMDGJ_Click);
    }

    public set_ZMDGJ_Data(data)
    {
        if(data)
        {
            var self = this;
            this._display_ZMDGJ_Sp.loadImage(data.logo,Laya.Handler.create(this,function()
            {
                if(!self._display_ZMDGJ_Sp.destroyed)
                {
                    self._display_ZMDGJ_Sp.width = self._origin_ZMDGJ_W;
                    self._display_ZMDGJ_Sp.height = self._origin_ZMDGJ_H;
                }
            }));
            var str = String(data.title);
            var num = str.length;
            num = Math.max(5,num);
            var fontSize = Math.floor((5 / num) * this._font_ZMDGJ_Size);
            this._dis_ZMDGJ_Text.fontSize = fontSize;
            this._dis_ZMDGJ_Text.text = str;
            this._data_ZMDGJ_ = data;
        }
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