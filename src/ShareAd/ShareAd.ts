import { request_ZMDGJ_Data } from "../Net/HttpUnit";
import App_ZMDGJ_Config from "../AppConfig";
import User_ZMDGJ_ from "../User/User";
import Utilit_ZMDGJ_ from "../Utilit";
import ALD from "../ALD";
import WX_ZMDGJ_API from "../WXAPI";
import Event_ZMDGJ_Mgr from "../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../Event/EventDef";
import App_ZMDGJ_Switch_ZMDGJ_Config from "../Config/AppSwitchConfig";
import QQ_ZMDGJ_Mini_ZMDGJ_GameAPI from "../QQMiniGameAPI";




export default class _ZMDGJ_ShareAd_ZMDGJ_ 
{
    public static readonly main_ZMDGJ_Url = "https://swwww.mrkzx.cn";
    public static readonly get_ZMDGJ_AdPostion = "/v1.1/api/getAdPosition.html";//获取广告位列表
    public static readonly get_ZMDGJ_Adv = "/v1.1/api/getAdv.html";//获取第三方广告列表
    public static readonly user_ZMDGJ_Click = "/v1.1/api/userclick.html";//用户点击上报

    public static readonly LoopAd_ZMDGJ_LocationID = 593;
    public static readonly Banner_ZMDGJ_AdLocationID = 595;
    public static readonly Insert_ZMDGJ_AdLocationID = -1;
    public static readonly AniAd_ZMDGJ_LocationID = -1;
    public static readonly History_ZMDGJ_LocationID = -1;
    public static readonly MoreGame_ZMDGJ_LocationID = 594;
    
    public static Use_ZMDGJ_Random_ZMDGJ_AdPos : boolean = true;
    public static readonly Ad_ZMDGJ_Locationids : Array<number> =
    [
        593,594
    ]

    protected static _ad_ZMDGJ_Position : any = {}
    protected static _adv_ZMDGJ_ : any = {}

    public static _iphone_ZMDGJ_Ignore_ZMDGJ_AppIds = 
    [
        "wx2d2acce3c45f4ddf",
        "wxeb93c1298ec7c62b"
    ]

    public static refresh_ZMDGJ_Ad(complate : Function)
    {
        _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_Ad_ZMDGJ_PosData((res)=>{
            if(1 == res.code)
            {
                console.log("获取分享广告数据成功");
                _ZMDGJ_ShareAd_ZMDGJ_._ad_ZMDGJ_Position = res.result;
                if(complate)
                {
                    complate(true)
                }
            }
            else
            {
                console.log("获取分享广告数据失败 ： " + res.msg);
                if(complate)
                {
                    complate(false)
                }
            }
        },(res)=>{
            console.log("获取分享广告数据失败");
            if(complate)
            {
                complate(false)
            }
        })
    }

    public static get_ZMDGJ_ADVs(locationid,complate : Function,useRandom? : boolean,useLocalRandom? : boolean)
    {
        if(!_ZMDGJ_ShareAd_ZMDGJ_.isNeed_ZMDGJ_ShowAd())
        {
            complate(null);
            return;
        }
        useRandom = null == useRandom ? _ZMDGJ_ShareAd_ZMDGJ_.Use_ZMDGJ_Random_ZMDGJ_AdPos : useRandom;
        useLocalRandom =  null == useLocalRandom ? true : useLocalRandom;
        if(useRandom)
        {
            locationid = _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_Random_ZMDGJ_ADPosID();
        }
        var datas = _ZMDGJ_ShareAd_ZMDGJ_._adv_ZMDGJ_[locationid];
        if(datas)
        {
            if(useLocalRandom)
            {
                datas = this.sort_ZMDGJ_Datas(datas);
            }
            complate(datas)
        }
        else
        {
            var self = _ZMDGJ_ShareAd_ZMDGJ_;
            _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_ADV_ZMDGJ_Data(locationid,(res)=>
            {
                if(1 == res.code)
                {
                    _ZMDGJ_ShareAd_ZMDGJ_._adv_ZMDGJ_[locationid] = res.result;
                    datas = _ZMDGJ_ShareAd_ZMDGJ_._adv_ZMDGJ_[locationid];
                    if(datas && Utilit_ZMDGJ_.is_ZMDGJ_Iphone())
                    {
                        for(var i=0;i< datas.length;++i)
                        {
                            var data = datas[i];
                            for(var j=0;j < _ZMDGJ_ShareAd_ZMDGJ_._iphone_ZMDGJ_Ignore_ZMDGJ_AppIds.length;++j)
                            {
                                if(data.appid == _ZMDGJ_ShareAd_ZMDGJ_._iphone_ZMDGJ_Ignore_ZMDGJ_AppIds[j])
                                {
                                    datas.splice(i,1);
                                    --i;
                                    break;
                                }
                            }
                        }
                    }
                    if(datas && useLocalRandom)
                    {
                        datas = self.sort_ZMDGJ_Datas(datas);
                    }
                    if(complate)
                    {
                        complate(datas);
                    }
                }
                else
                {
                    if(complate)
                    {
                        complate(null);
                    }
                }
            },(res)=>
            {
                if(complate)
                {
                    complate(null);
                }
            })
        }
    }

    public static report_ZMDGJ_User_ZMDGJ_Click(advid)
    {
        _ZMDGJ_ShareAd_ZMDGJ_.req_ZMDGJ_User_ZMDGJ_Click(advid,(res)=>
        {
            if(1 == res.code)
            {
                console.log("点击广告上报成功");
            }
            else
            {
                console.log("点击广告上报失败");
            }
        },(res)=>
        {
            console.log("点击广告上报失败");
        });
    }

    public static get_ZMDGJ_Random_ZMDGJ_ADPosID() : number
    {
        return _ZMDGJ_ShareAd_ZMDGJ_.Ad_ZMDGJ_Locationids[Math.floor(Math.random() * _ZMDGJ_ShareAd_ZMDGJ_.Ad_ZMDGJ_Locationids.length)]
    }

    protected static request_ZMDGJ_(req : request_ZMDGJ_Data) {
        if (req.url_ZMDGJ_.indexOf("https://") > -1 ||
            req.url_ZMDGJ_.indexOf("http://") > -1) {
            req.url_ZMDGJ_ = req.url_ZMDGJ_;
        } else {
            req.url_ZMDGJ_ = _ZMDGJ_ShareAd_ZMDGJ_.main_ZMDGJ_Url + req.url_ZMDGJ_;
        }
        var completeFunc = (res) => {
            // console.log(res,"http Success")
            res = JSON.parse(res);
            if (req.on_ZMDGJ_Success) {
                req.on_ZMDGJ_Success(res);
            }
            req.on_ZMDGJ_Success = null;
            req = null;
        };
        var errorFunc = (res) => {
            console.log(res,"http fail")
            if (req.on_ZMDGJ_Fail)  {
                req.on_ZMDGJ_Fail(res);
            }
            req.on_ZMDGJ_Fail = null;
            req = null;
        };

        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, _ZMDGJ_ShareAd_ZMDGJ_, completeFunc);
        xhr.once(Laya.Event.ERROR, _ZMDGJ_ShareAd_ZMDGJ_, errorFunc);


        if(req.meth_ZMDGJ_ == "get")
        {
            var para = "";
            for(const key of Object.keys(req._ZMDGJ_data_ZMDGJ_)) 
            {
                var value = req._ZMDGJ_data_ZMDGJ_[key];
                para +=  key + "=" + value + "&";
            }
            req.url_ZMDGJ_ = req.url_ZMDGJ_ + "?" + para;
            var header =
                [
                    "versions", App_ZMDGJ_Config.Versions_ZMDGJ_,
                ]
            xhr.send(req.url_ZMDGJ_,null,req.meth_ZMDGJ_,null,header);
        }
        else
        {
            var para = "";
            for(const key of Object.keys(req._ZMDGJ_data_ZMDGJ_)) 
            {
                var value = req._ZMDGJ_data_ZMDGJ_[key];
                para +=  key + "=" + value + "&";
            }
            para += "ts=" + String(Date.now()) + "&";
            var header =
                [
                    "Content-Type", "application/x-www-form-urlencoded",
                    "versions", App_ZMDGJ_Config.Versions_ZMDGJ_,
                ]
            xhr.send(req.url_ZMDGJ_,para,req.meth_ZMDGJ_,null,header);
        }
    }

    protected static get_ZMDGJ_Ad_ZMDGJ_PosData(onSuccess : Function,onFail : Function)
    {
        var req = new request_ZMDGJ_Data();
        req.url_ZMDGJ_ = _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_AdPostion;
        req.on_ZMDGJ_Success = onSuccess;
        req.on_ZMDGJ_Fail = onFail;
        req._ZMDGJ_data_ZMDGJ_.softid = App_ZMDGJ_Config.App_ZMDGJ_ID;
        req.meth_ZMDGJ_ = "get";
        _ZMDGJ_ShareAd_ZMDGJ_.request_ZMDGJ_(req);
    }

    protected static req_ZMDGJ_User_ZMDGJ_Click(advid,onSuccess : Function,onFail : Function)
    {
        var req = new request_ZMDGJ_Data();
        req.url_ZMDGJ_ = _ZMDGJ_ShareAd_ZMDGJ_.user_ZMDGJ_Click;
        req.on_ZMDGJ_Success = onSuccess;
        req.on_ZMDGJ_Fail = onFail;

        req._ZMDGJ_data_ZMDGJ_.softid = App_ZMDGJ_Config.App_ZMDGJ_ID;
        req._ZMDGJ_data_ZMDGJ_.uid  = User_ZMDGJ_.openId_ZMDGJ_;
        req._ZMDGJ_data_ZMDGJ_.advid  = advid ;

        _ZMDGJ_ShareAd_ZMDGJ_.request_ZMDGJ_(req);
    }

    protected static get_ZMDGJ_ADV_ZMDGJ_Data(locationid,onSuccess : Function,onFail : Function)
    {
        var req = new request_ZMDGJ_Data();
        req.url_ZMDGJ_ = _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_Adv;
        req.on_ZMDGJ_Success = onSuccess;
        req.on_ZMDGJ_Fail = onFail;
        req._ZMDGJ_data_ZMDGJ_.softid = App_ZMDGJ_Config.App_ZMDGJ_ID;
        req._ZMDGJ_data_ZMDGJ_.locationid = locationid;
        req._ZMDGJ_data_ZMDGJ_.preview = 0;
        _ZMDGJ_ShareAd_ZMDGJ_.request_ZMDGJ_(req);
    }


/**
     * 随机跳转的方法，会从广告列表中随机得到一个AppId并且跳转,输入的参数为概率，大小在0-1之间
     * 如果概率大于1，则自动将其除以100，所以千万注意！
     * 
     * @static
     * @param {number} [rate=1] 
     * @memberof ShareAd
     */
    public static Random_ZMDGJ_Jump(rate: number = 1) 
    {
        console.log("随机跳转,rate：" + rate);
        if (rate > 1) {
            rate = rate / 100;
        }
        let rd = Math.random();
        if (rd <= rate) {
            var adLocationID = _ZMDGJ_ShareAd_ZMDGJ_.LoopAd_ZMDGJ_LocationID;
            var Locations = 
            [
                _ZMDGJ_ShareAd_ZMDGJ_.LoopAd_ZMDGJ_LocationID, 
                _ZMDGJ_ShareAd_ZMDGJ_.Insert_ZMDGJ_AdLocationID, 
                _ZMDGJ_ShareAd_ZMDGJ_.Banner_ZMDGJ_AdLocationID,
                _ZMDGJ_ShareAd_ZMDGJ_.AniAd_ZMDGJ_LocationID,
            ]
            if(_ZMDGJ_ShareAd_ZMDGJ_.Use_ZMDGJ_Random_ZMDGJ_AdPos)
            {
                for(var i=0;i < _ZMDGJ_ShareAd_ZMDGJ_.Ad_ZMDGJ_Locationids.length;++i)
                {
                    Locations.push(_ZMDGJ_ShareAd_ZMDGJ_.Ad_ZMDGJ_Locationids[i]);
                }
            }
            adLocationID = Locations[Math.floor(Math.random() * Locations.length)]
            var datas = _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_ADVs(adLocationID, function (datas: Array<any>) {
                if (datas) {
                    let rd = Math.floor(datas.length * Math.random());
                    let data = datas[rd];
                    console.log("跳转游戏： " + data.title);
                    WX_ZMDGJ_API.navigate_ZMDGJ_To_ZMDGJ_MiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功")
                        _ZMDGJ_ShareAd_ZMDGJ_.report_ZMDGJ_User_ZMDGJ_Click(data.appid);
                        ALD.ald_ZMDGJ_Send_ZMDGJ_ReportAdClickSuccess(data);
                    }, (res) => {
                        console.log("跳转失败")
                        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.AD_On_ZMDGJ_ShareAd_ZMDGJ_Fail);
                        if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                            console.log("用户取消跳转");
                            ALD.aldSend_ZMDGJ_ReportAd_ZMDGJ_ClickFail(data);
                        }
                    }, (res) => {
                        console.log("跳转完成")
                    });
                }
            }, true);
        }
    }

    public static isNeed_ZMDGJ_ShowAd() : boolean
    {
        if(0 == App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().ad_ZMDGJ_Switch)
            return false;
        if(Laya.Browser.onQGMiniGame)
        {
            if(App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().oppo_ZMDGJ_cfg.oppo_ZMDGJ_versions != App_ZMDGJ_Config.Versions_ZMDGJ_)
            {
                return false;
            }
        }
        var mailiang = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().mai_ZMDGJ_liang;
        var mailianglist = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().mailiang_ZMDGJ_list;
        var mailiangscenelist = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().mailiang_ZMDGJ_Scene_ZMDGJ_List;
        if(1 == mailiang)
        {
            var flag : number = null;
            var scene : number = null;
            if(Laya.Browser.onMiniGame)
            {
                flag = WX_ZMDGJ_API.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().query['chid'];
                scene  = WX_ZMDGJ_API.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene;             
            }
            else if(Laya.Browser.onQQMiniGame)
            {
                flag  = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().query['chid'];
                scene  = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene;
            }
            if(null != flag && null != mailianglist && mailianglist.length > 0)
            {
                for(var i=0;i < mailianglist.length;++i)
                {
                    if(flag == mailianglist[i])
                    {
                        return false;
                    }
                }
            }
            if(null != scene && null != mailiangscenelist && mailiangscenelist.length > 0)
            {
                for(var i=0;i < mailiangscenelist.length;++i)
                {
                    if(scene == mailiangscenelist[i])
                    {
                        return false;
                    }
                }
            }   
        }
        return true;
    }

    public static sort_ZMDGJ_Datas(datas: any): any 
    {
        if(null == datas || 0 == datas.length)
            return [];
        let dataDic: { [appid: string]: any[] } = {};
        let keys = new Array<string>();
        for (let i = 0; i < datas.length; ++i)  {
            let data = datas[i];
            if (dataDic[data.appid] == null) {
                dataDic[data.appid] = new Array();
                dataDic[data.appid].push(data);
                keys.push(data.appid);
            } else {
                dataDic[data.appid].push(data);
            }
        }
        for (let i = 0; i < keys.length; ++i)
        {
            let key = keys[i];
            let randomIndex = Math.floor(Math.random() * keys.length);
            let temp = keys[randomIndex];
            keys[randomIndex] = key;
            keys[i] = temp;
        }
        for (let i = 0; i < keys.length; ++i)
        {
            let key = keys[i];
            let dataArray = dataDic[key];
            for (let j = 0; j < dataArray.length; ++j)
            {
                let data = dataArray[j];
                let randomIndex = Math.floor(Math.random() * dataArray.length);
                let temp = dataArray[randomIndex];
                dataArray[randomIndex] = data;
                dataArray[j] = temp;
            }
        }
        let res = new Array<any>();
        while(keys.length > 0)
        {
            if(keys.length == 1)
            {
                let key = keys[0];
                let isOk = false;
                let dataArray = dataDic[key];
                for (let i = 0; i < res.length; ++i)
                {
                    let curData = res[i];
                    let nextData = res[i + 1];
                    if(null != nextData)
                    {
                        if(curData.appid != key && nextData.appid != key)
                        {
                            let data = dataArray.shift();
                            if (null != data)  
                            {
                                let f = res.slice(0, i + 1);
                                let b = res.slice(i + 1, res.length);
                                res = f;
                                res.push(data);
                                for (let k = 0; k < b.length; ++k)  {
                                    res.push(b[k]);
                                }
                            }
                            isOk = true;
                            break;
                        }
                    }
                    else
                    {
                        if(curData.appid != key)
                        {
                            let data = dataArray.shift();
                            if(null != data)
                            {
                                let f = res.slice(0, i + 1);
                                let b = res.slice(i + 1, res.length);
                                res = f;
                                res.push(data);
                                for (let k = 0; k < b.length; ++k)  {
                                    res.push(b[k]);
                                }
                            }
                            isOk = true;
                            break;
                        }
                    }
                }
                if(!isOk || dataArray.length <= 0)
                {
                    keys.splice(0,1);
                }
            }
            else
            {
                for (let i = 0; i < keys.length; ++i)
                {
                    let key = keys[i];
                    let dataArray = dataDic[key];
                    let data = dataArray.shift();
                    res.push(data);
                    if(dataArray.length <= 0)
                    {
                        keys.splice(i,1);
                        --i;
                    }
                }
            }
        }
        return res;
    }
}