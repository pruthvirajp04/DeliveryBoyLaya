export enum ALD_ZMDGJ_Event_ZMDGJ_Def
{
    None = "",
    Report_ZMDGJ_AdClickSuccess = "广告导出成功",
    Report_ZMDGJ_AdClickFail = "广告导出失败",
    Report_ZMDGJ_LaunchOptions = "用户启动参数",
    //todo:添加你自己的阿拉丁事件
    EnterMainView = "进入主界面",
    EnterGameView = "进入游戏界面",
    EnterGameComplateView = "进入游戏结束界面",
    EnterGameOverMoreGame = "游戏结束进入导出界面",
}

//阿拉丁相关接口
export default class ALD 
{
    public static ald_ZMDGJ_Send_ZMDGJ_OpenId(openid : string)
    {   
        if(Laya.Browser.onMiniGame)
        {
            Laya.Browser.window["wx"].aldSendOpenid(openid);
            console.log("ALD 上报 openid : ",openid);
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            Laya.Browser.window["qq"].aldSendOpenid(openid);
            console.log("ALD 上报 openid : ",openid);
        }
    }

    public static ald_ZMDGJ_Send_ZMDGJ_Event(event : ALD_ZMDGJ_Event_ZMDGJ_Def | string,data : any)
    {
        var eventName : string = event;
        if(Laya.Browser.onMiniGame)
        {
            Laya.Browser.window["wx"].aldSendEvent(eventName,data);
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            Laya.Browser.window["qq"].aldSendEvent(eventName,data);
        }
    }

    public static ald_ZMDGJ_Send_ZMDGJ_ReportAdClickSuccess(data : any)
    {
        var type = ALD_ZMDGJ_Event_ZMDGJ_Def.Report_ZMDGJ_AdClickSuccess  + " " +  data.title + ":" + String(data.appid)
        ALD.ald_ZMDGJ_Send_ZMDGJ_Event(type,
            {
                "导出成功" : data.title + ":" + String(data.appid)
            })
    }

    public static aldSend_ZMDGJ_ReportAd_ZMDGJ_ClickFail(data : any)
    {
        var type = ALD_ZMDGJ_Event_ZMDGJ_Def.Report_ZMDGJ_AdClickFail  + " " +  data.title + ":" + String(data.appid)
        ALD.ald_ZMDGJ_Send_ZMDGJ_Event(type,
            {
                "导出失败"  :  data.title + ":" + String(data.appid)
            })
    }

    public static ald_ZMDGJ_Send_ZMDGJ_Report_ZMDGJ_LaunchOptions(sceneid : string,ip : string,location : Object)
    {
        var type = ALD_ZMDGJ_Event_ZMDGJ_Def.Report_ZMDGJ_LaunchOptions;
        ALD.ald_ZMDGJ_Send_ZMDGJ_Event(type,
            {
                "场景值："  : String(sceneid),
                "Ip："  : String(ip),
                "地区：" : JSON.stringify(location)
            })
    }
    public static aldSendOnlySingleReport(eventType : ALD_ZMDGJ_Event_ZMDGJ_Def,reportData? : any)
    {
        ALD.ald_ZMDGJ_Send_ZMDGJ_Event(eventType,reportData);
    }
}