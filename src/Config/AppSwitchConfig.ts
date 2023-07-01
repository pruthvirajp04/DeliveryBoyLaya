import App_ZMDGJ_Config from "../AppConfig";
import WX_ZMDGJ_API from "../WXAPI";

export class App_ZMDGJ_Switch_ZMDGJ_Data
{
    public ver_ZMDGJ_sion : string = "";
    public ba_ZMDGJ_nner : number = 0;
    public wu_ZMDGJ_dian: number = 0;
    private wudianAvailableTime: object = {
        "0": 0, "1": 0, "2": 0, "3": 0,
        "4": 0, "5": 0, "6": 0, "7": 0,
        "8": 0, "9": 0, "10": 0, "11": 0,
        "12": 0, "13": 0, "14": 0, "15": 0,
        "16": 0, "17": 0, "18": 0, "19": 0,
        "20": 0, "21": 0, "22": 0, "23": 0
    }
    /**
     * 得到当前时间开关是否打开
     * 
     * @readonly
     * @type {boolean}
     * @memberof AppSwitchData
     */
    public get wudianTimeAvaliable(): boolean{
        return this.wudianAvailableTime[new Date().getHours()] == 1;
    }
    public mai_ZMDGJ_liang: number = 1;
    public readonly mailiang_ZMDGJ_list : Array<number> = new Array<number>();
    public readonly mailiang_ZMDGJ_Scene_ZMDGJ_List : Array<number> = new Array<number>();

    public readonly wx_ZMDGJ_Wu_ZMDGJ_Dian_ZMDGJ_Banners : Array<string> = new Array<string>();
    public readonly recreate_ZMDGJ_Banner_ZMDGJ_IDList : Array<string> = new Array<string>();
    public banner_ZMDGJ_Recreate_ZMDGJ_Time : number = 5;
    public kuang_ZMDGJ_dian_ZMDGJ_jiange : number = 0;

    public btn_ZMDGJ_Move_ZMDGJ_Timer : number = 1;
    public banner_ZMDGJ_Move_ZMDGJ_Timer : number = 0.5;
    public banner_ZMDGJ_Fresh_ZMDGJ_Timer : number = 200;
    public banner_ZMDGJ_Create_ZMDGJ_FailNum : number = 3;
    public banner_ZMDGJ_Today_ZMDGJ_Banner_ZMDGJ_Max : number = 10;

    public ad_ZMDGJ_Switch : number = 1;

    public readonly wu_ZMDGJ_dian_ZMDGJ_Scene_ZMDGJ_List : Array<number> = new Array<number>();

    public continue_ZMDGJ_Btn_ZMDGJ_DelayTime : number = 2;
    public banner_ZMDGJ_Show_ZMDGJ_Time : number = 30;

    public fakeBtn : number = 0;
    
    public readonly oppo_ZMDGJ_cfg = new OPPO_ZMDGJ_Cfg();
    public readonly qq_ZMDGJ_cfg = new QQ_ZMDGJ_Cfg();
    public readonly tt_ZMDGJ_cfg = new TT_ZMDGJ_Cfg();
}

export class OPPO_ZMDGJ_Cfg
{
    public yuan_ZMDGJ_sheng : number = 100;
    public yuan_ZMDGJ_sheng_ZMDGJ_Switch : number = 1;
    public add_ZMDGJ_To_ZMDGJ_Desktop : number = 0;
    public oppo_ZMDGJ_versions : string = "";
    public btn_ZMDGJ_Show_ZMDGJ_Timer : number = 0;
    public index_ZMDGJ_Ad_ZMDGJ_Switch : number = 0;
    public end_ZMDGJ_Ad_ZMDGJ_Switch : number = 0;
    public yuan_ZMDGJ_sheng2 : number = 100;
    public yuan_ZMDGJ_sheng_ZMDGJ_Switch2 : number = 1;
}

export class QQ_ZMDGJ_Cfg
{
    public kuang_ZMDGJ_dian_ZMDGJ_Banner : number = 0;
    public kuangdian_ZMDGJ_Box : number = 0;
    public box : number = 0;
    public wei_ZMDGJ_yi : number = 0;
    public qq_ZMDGJ_versions : string = "";
}

export class TT_ZMDGJ_Cfg
{
    public more_ZMDGJ_Game_ZMDGJ_Switch : number = 0;
    public kuang_ZMDGJ_dian_ZMDGJ_Banner : number = 0;
    public lu_ZMDGJ_ping : number = 0;
    public tt_ZMDGJ_versions : string = "";
}

export default class App_ZMDGJ_Switch_ZMDGJ_Config
{   
    public static get_ZMDGJ_Instance() : App_ZMDGJ_Switch_ZMDGJ_Config
    {
        if(null == App_ZMDGJ_Switch_ZMDGJ_Config._instance)
        {
            App_ZMDGJ_Switch_ZMDGJ_Config._instance = App_ZMDGJ_Switch_ZMDGJ_Config.lo_ZMDGJ_ad();
        }
        return App_ZMDGJ_Switch_ZMDGJ_Config._instance
    }
    protected static _instance: App_ZMDGJ_Switch_ZMDGJ_Config;

    protected static lo_ZMDGJ_ad() : App_ZMDGJ_Switch_ZMDGJ_Config
    {
        var config = new App_ZMDGJ_Switch_ZMDGJ_Config();
        var json: any = Laya.loader.getRes(App_ZMDGJ_Config.Res_ZMDGJ_Server + "/json/appswitch.json");
        if(json){
            for(var i = 0;i < json.length;++i)
            {
                var row = json[i];
                var rowData: App_ZMDGJ_Switch_ZMDGJ_Data = new App_ZMDGJ_Switch_ZMDGJ_Data();
                rowData.ver_ZMDGJ_sion = String(row["version"]);
                rowData.ba_ZMDGJ_nner = Number(row["banner"]);
                rowData.wu_ZMDGJ_dian = Number(row["wudian"]);
                (rowData as any).wudianAvailableTime = Object(row["wudianTime"]);
                rowData.mai_ZMDGJ_liang =  Number(row["mailiang"]);
                var mailianglist = row["mailianglist"];
                if(null != mailianglist)
                {
                    for (var j = 0; j < mailianglist.length; ++j)  
                    {
                        var flag = Number(mailianglist[j]);
                        rowData.mailiang_ZMDGJ_list.push(flag);
                    }
                }
                var mailiangScenelist = row["mailiangScenelist"];
                if(null != mailiangScenelist)
                {
                    for (var j = 0; j < mailiangScenelist.length; ++j)  
                    {
                        var sceneValue = Number(mailiangScenelist[j]);
                        rowData.mailiang_ZMDGJ_Scene_ZMDGJ_List.push(sceneValue);
                    }
                }

                var wxwudianbanners = row["wxwudianbanners"];
                if(null != wxwudianbanners)
                {
                    for (var j = 0; j < wxwudianbanners.length; ++j)  
                    {
                        var bannerid = String(wxwudianbanners[j]);
                        rowData.wx_ZMDGJ_Wu_ZMDGJ_Dian_ZMDGJ_Banners.push(bannerid);
                    }
                }

                var recreateBannerIDList = row["recreateBannerIDList"];
                if(null != recreateBannerIDList)
                {
                    for (var j = 0; j < recreateBannerIDList.length; ++j)  
                    {
                        let bannerid = String(recreateBannerIDList[j]);
                        rowData.recreate_ZMDGJ_Banner_ZMDGJ_IDList.push(bannerid);
                    }
                }

                rowData.banner_ZMDGJ_Recreate_ZMDGJ_Time = null != row["bannerRecreateTime"] ?  Number(row["bannerRecreateTime"]) : rowData.banner_ZMDGJ_Recreate_ZMDGJ_Time;
                rowData.kuang_ZMDGJ_dian_ZMDGJ_jiange = null != row["kuangdianjiange"] ?  Number(row["kuangdianjiange"]) : rowData.kuang_ZMDGJ_dian_ZMDGJ_jiange;
                rowData.btn_ZMDGJ_Move_ZMDGJ_Timer = Number(row["btnMoveTimer"]);
                rowData.banner_ZMDGJ_Move_ZMDGJ_Timer = Number(row["bannerMoveTimer"]);
                rowData.banner_ZMDGJ_Create_ZMDGJ_FailNum = Number(row["createFailNum"]);
                rowData.banner_ZMDGJ_Fresh_ZMDGJ_Timer = Number(row["bannerFreshTimer"]);
                rowData.banner_ZMDGJ_Today_ZMDGJ_Banner_ZMDGJ_Max = Number(row["todayBannerMax"]);
                
                rowData.ad_ZMDGJ_Switch = Number(row["adSwitch"]);

                var wudianSceneList = row["wudianSceneList"];
                if(null != wudianSceneList)
                {
                    for (var j = 0; j < wudianSceneList.length; ++j)  
                    {
                        var wudianSceneValue = Number(wudianSceneList[j]);
                        rowData.wu_ZMDGJ_dian_ZMDGJ_Scene_ZMDGJ_List.push(wudianSceneValue);
                    }
                }

                rowData.continue_ZMDGJ_Btn_ZMDGJ_DelayTime =  Number(row["continueBtnDelayTime"]);
                rowData.banner_ZMDGJ_Show_ZMDGJ_Time =  Number(row["bannerShowTime"]);

                rowData.fakeBtn = null != row["fakeBtn"] ? Number(row["fakeBtn"]) : rowData.fakeBtn;

                if(null != row["oppocfg"])
                {
                    let cfg = row["oppocfg"];
                    rowData.oppo_ZMDGJ_cfg.yuan_ZMDGJ_sheng = Number(cfg["yuansheng"]);
                    rowData.oppo_ZMDGJ_cfg.yuan_ZMDGJ_sheng_ZMDGJ_Switch = Number(cfg["yuanshengSwitch"]);
                    rowData.oppo_ZMDGJ_cfg.add_ZMDGJ_To_ZMDGJ_Desktop = Number(cfg["addToDesktop"]);
                    rowData.oppo_ZMDGJ_cfg.oppo_ZMDGJ_versions = String(cfg["oppoversions"]);
                    rowData.oppo_ZMDGJ_cfg.btn_ZMDGJ_Show_ZMDGJ_Timer = Number(cfg["btnShowTimer"]);
                    rowData.oppo_ZMDGJ_cfg.index_ZMDGJ_Ad_ZMDGJ_Switch = Number(cfg["indexAdSwitch"]);
                    rowData.oppo_ZMDGJ_cfg.end_ZMDGJ_Ad_ZMDGJ_Switch = Number(cfg["endAdSwitch"]);
                    rowData.oppo_ZMDGJ_cfg.yuan_ZMDGJ_sheng2 = null != cfg["yuansheng2"] ?  Number(cfg["yuansheng2"]) : rowData.oppo_ZMDGJ_cfg.yuan_ZMDGJ_sheng2;
                    rowData.oppo_ZMDGJ_cfg.yuan_ZMDGJ_sheng_ZMDGJ_Switch2 =null != cfg["yuanshengSwitch2"] ?  Number(cfg["yuanshengSwitch2"]) : rowData.oppo_ZMDGJ_cfg.yuan_ZMDGJ_sheng_ZMDGJ_Switch2;
                }

                if(null != row["qqcfg"])
                {
                    let cfg = row["qqcfg"];
                    rowData.qq_ZMDGJ_cfg.kuang_ZMDGJ_dian_ZMDGJ_Banner = Number(cfg["kuangdianBanner"]);
                    rowData.qq_ZMDGJ_cfg.kuangdian_ZMDGJ_Box = Number(cfg["kuangdianBox"]);
                    rowData.qq_ZMDGJ_cfg.box = Number(cfg["box"]);
                    rowData.qq_ZMDGJ_cfg.wei_ZMDGJ_yi = Number(cfg["weiyi"]);
                    rowData.qq_ZMDGJ_cfg.qq_ZMDGJ_versions = String(cfg["qqversions"]);
                }

                if(null != row["ttcfg"])
                {
                    let cfg = row["ttcfg"];
                    rowData.tt_ZMDGJ_cfg.more_ZMDGJ_Game_ZMDGJ_Switch = Number(cfg["moreGameSwitch"]);
                    rowData.tt_ZMDGJ_cfg.kuang_ZMDGJ_dian_ZMDGJ_Banner = Number(cfg["kuangdianBanner"]);
                    rowData.tt_ZMDGJ_cfg.lu_ZMDGJ_ping = Number(cfg["luping"]);
                    rowData.tt_ZMDGJ_cfg.tt_ZMDGJ_versions = String(cfg["ttversions"]);
                }

                config._data.push(rowData);
            }
            return config;
        }
        else{
            config._data.push(new App_ZMDGJ_Switch_ZMDGJ_Data());
            return config;
        }
    }

    protected readonly _data : Array<App_ZMDGJ_Switch_ZMDGJ_Data> = new Array<App_ZMDGJ_Switch_ZMDGJ_Data>();

    public get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data(): App_ZMDGJ_Switch_ZMDGJ_Data
    {
        return this._data[0];
    }
}