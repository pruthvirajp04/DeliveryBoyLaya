import _ZMDGJ_ShareAd_ZMDGJ_ from "../ShareAd";
import Utilit_ZMDGJ_ from "../../Utilit";
import WX_ZMDGJ_API from "../../WXAPI";
import ALD from "../../ALD";
import Event_ZMDGJ_Mgr from "../../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../../Event/EventDef";
import OPPO_ZMDGJ_API from "../../OPPOAPI";
import QQ_ZMDGJ_Mini_ZMDGJ_GameAPI from "../../QQMiniGameAPI";

export default class Single_ZMDGJ_Ad_ZMDGJ_View extends Laya.Script 
{
    public Ad_ZMDGJ_Pos_ZMDGJ_ID : number = _ZMDGJ_ShareAd_ZMDGJ_.LoopAd_ZMDGJ_LocationID;
    protected _owner_ZMDGJ_Sprite :Laya.Sprite;
    protected _display_ZMDGJ_Sp : Laya.Sprite;
    protected _dis_ZMDGJ_Text : Laya.Text;
    protected _ani_ZMDGJ_Forward : boolean = false;
    protected _data_ZMDGJ_ : any = null;
    protected _font_ZMDGJ_Size = 25;
    protected _origin_ZMDGJ_Size = 1;
    protected _origin_ZMDGJ_W : number = 150;
    protected _origin_ZMDGJ_H : number = 150;

    onAwake()
    {
        this._owner_ZMDGJ_Sprite = this.owner as Laya.Sprite;
        this._display_ZMDGJ_Sp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._origin_ZMDGJ_W = this._display_ZMDGJ_Sp.width;
        this._origin_ZMDGJ_H = this._display_ZMDGJ_Sp.height;
        this._dis_ZMDGJ_Text =  this.owner.getChildByName("TitelText") as Laya.Text;
        this._dis_ZMDGJ_Text.text = "";
        this._font_ZMDGJ_Size = this._dis_ZMDGJ_Text.fontSize;
        this._origin_ZMDGJ_Size =  this._display_ZMDGJ_Sp.scaleX;
    }
    
    onEnable(): void 
    {
        this.refresh_ZMDGJ_AD_ZMDGJ_VDis();
        Laya.timer.loop(3000,this,this.refresh_ZMDGJ_AD_ZMDGJ_VDis);

        this._owner_ZMDGJ_Sprite.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Sp_ZMDGJ_Click);
    }

    onDisable(): void 
    {
        Laya.timer.clearAll(this);
        this._owner_ZMDGJ_Sprite.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Sp_ZMDGJ_Click);
    }

    protected refresh_ZMDGJ_AD_ZMDGJ_VDis()
    {
        var self = this;
        _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_ADVs(this.Ad_ZMDGJ_Pos_ZMDGJ_ID,(datas)=>
        {
            if(self.owner && !self.owner.destroyed)
            {
                if(datas && datas.length > 0)
                {
                    (self.owner as Laya.Sprite).visible = true;
                    var data = datas[Math.floor(Math.random() * datas.length)];
    
                    self._display_ZMDGJ_Sp.loadImage(data.logo,Laya.Handler.create(self,function()
                    {
                        if(!self._display_ZMDGJ_Sp.destroyed)
                        {
                            self._display_ZMDGJ_Sp.width = self._origin_ZMDGJ_W;
                            self._display_ZMDGJ_Sp.height = self._origin_ZMDGJ_H;
                            self._display_ZMDGJ_Sp.scale(self._origin_ZMDGJ_Size,self._origin_ZMDGJ_Size);
                        }
                    }));
                    var str = String(data.title);
                    var num = str.length;
                    var fontSize = Math.floor((5 / num) * this._font_ZMDGJ_Size);
                    self._dis_ZMDGJ_Text.fontSize = fontSize;
                    self._dis_ZMDGJ_Text.text = str;
                    self._data_ZMDGJ_ = data;
                }
                else
                {
                    (this.owner as Laya.Sprite).visible = false;
                }
            }
        })
    }

    onUpdate()
    {
        this.display_ZMDGJ_Ani();
    }

    protected display_ZMDGJ_Ani()
    {
        if(!this._ani_ZMDGJ_Forward)
        {
            var scale = this._display_ZMDGJ_Sp.scaleX - Laya.timer.delta / 3000  * 1;
            scale = Math.max(scale,0);
            this._display_ZMDGJ_Sp.scale(scale,scale);
            if(this._display_ZMDGJ_Sp.scaleX <= 0.95 * this._origin_ZMDGJ_Size)
            {
                this._ani_ZMDGJ_Forward = true;
            }
        }
        else
        {
            var scale = this._display_ZMDGJ_Sp.scaleX + Laya.timer.delta / 3000  * 1;
            scale = Math.min(scale,1 * this._origin_ZMDGJ_Size);
            this._display_ZMDGJ_Sp.scale(scale,scale);
            if(this._display_ZMDGJ_Sp.scaleX >= this._origin_ZMDGJ_Size)
            {
                this._ani_ZMDGJ_Forward = false;
            }
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