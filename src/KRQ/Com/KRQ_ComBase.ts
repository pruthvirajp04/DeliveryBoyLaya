import WX_ZMDGJ_API from "../../WXAPI";
import _ZMDGJ_ShareAd_ZMDGJ_ from "../../ShareAd/ShareAd";
import ALD from "../../ALD";
import Event_ZMDGJ_Mgr from "../../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../../Event/EventDef";
import OPPO_ZMDGJ_API from "../../OPPOAPI";
import QQ_ZMDGJ_Mini_ZMDGJ_GameAPI from "../../QQMiniGameAPI";
import App_ZMDGJ_Config from "../../AppConfig";
import TT_ZMDGJ_API from "../../TTAPI";

export default class KRQ__ZMDGJ_Com_ZMDGJ_Base extends Laya.Script 
{
    public Ad_ZMDGJ_Pos_ZMDGJ_ID : number = -10086;

    public get _ZMDGJ_Sprite_ZMDGJ_()
    {
        return this.owner as Laya.Sprite;
    }

    protected _datas : Array<any> = [];

    public get _ZMDGJ_Data_ZMDGJ_()
    {
        return this._data;
    }
    protected _data : any = null;

    public ref_ZMDGJ_resh(onComplate? : Function)
    {
        let self = this;
        _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_ADVs(this.Ad_ZMDGJ_Pos_ZMDGJ_ID,(datas)=>
        {
            if(null != datas)
            {
                self._datas = datas;
                self._data = self._datas[Math.floor(Math.random() * datas.length)];
                if(null != onComplate)
                {
                    onComplate();
                }
            }
        },false)
    }

    protected navigate_ZMDGJ_To_ZMDGJ_Mini_ZMDGJ_Program(d? : any)
    {
        var data = null == d ? this._data : d;
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
            else if (Laya.Browser.onQQMiniGame)  //qq小游戏
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
            else if (App_ZMDGJ_Config.onTTMiniGame) {
                TT_ZMDGJ_API.showMoreGamesModal(() => {
                    console.log("跳转成功")
                    _ZMDGJ_ShareAd_ZMDGJ_.report_ZMDGJ_User_ZMDGJ_Click(data.appid);
                }, () => {
                    console.log("跳转失败")
                    Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.AD_On_ZMDGJ_ShareAd_ZMDGJ_Fail);
                });
            }
        }
    }

    
    public _ZMDGJ_show_ZMDGJ_()
    {
        this._ZMDGJ_Sprite_ZMDGJ_.visible = true;
    }

    public _ZMDGJ_hide_ZMDGJ_()
    {
        this._ZMDGJ_Sprite_ZMDGJ_.visible = false;
    }

    protected auto_ZMDGJ_Scroll_ZMDGJ_Text(text : Laya.Text)
    {
        if(text.overflow != Laya.Text.SCROLL)
            return;
        let forward : boolean = true;
        let deltaDis : number = 0;
        Laya.timer.frameLoop(1,text,()=>
        {
            let d = Laya.timer.delta / 1000 * 10;
            deltaDis += d;
            if(deltaDis >= text.textWidth / 2)
            {
                forward = !forward;
                deltaDis = 0;
            }
            if(forward)
            {
                text.scrollX += d;
            }
            else
            {
                text.scrollX -= d;
            }
        })
    }
}