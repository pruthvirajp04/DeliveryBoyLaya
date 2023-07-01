import Http_ZMDGJ_Unit, { request_ZMDGJ_Data } from "../Net/HttpUnit";
import App_ZMDGJ_Config from "../AppConfig";
import WX_ZMDGJ_API from "../WXAPI";
import User_ZMDGJ_ from "../User/User";
import OPPO_ZMDGJ_API from "../OPPOAPI";

/**
 * 用于买量上报,以及停留时间上报的的类，本质上是对wx和买量接口做一个集成化的封装方便使用
 * 
 * @export
 * @class MaiLiang
 */
export default class Mai_ZMDGJ_Liang {
    public static _ZMDGJ_mainUr_ZMDGJ_l: string = "https://swtj.mrkzx.cn";
    public static u_ZMDGJ_click: string = "/v1.1/api/Activity/uclick.html";
    public static _ZMDGJ_stay_ZMDGJ_: string = "/v1.1/api/Activity/stay.html";

    public static _ZMDGJ_key_ZMDGJ_: string = "";//推广路径中同名参数，需要调用方法WXAPi.getLaunchOptionsSync()，从返回的参数中获得。
    public static Mai_ZMDGJ_Liang_ZMDGJ_OpenId: string = "";//买量系统唯一标识,执行GetMaiLiangOpenId()方法成功后自动获得。
    private static _ZMDGJ_time_ZMDGJ_: number = 0;//买量系统唯一标识后，记录当前时间（精确到秒）。

    /**
     * 发送数据的类
     * 
     * @protected
     * @static
     * @param {request_ZMDGJ_Data} req 
     * @memberof MaiLiang
     */
    protected static req_ZMDGJ_uest(req: request_ZMDGJ_Data) {
        if (req.url_ZMDGJ_.indexOf("https://") > -1 ||
            req.url_ZMDGJ_.indexOf("http://") > -1) {
            req.url_ZMDGJ_ = req.url_ZMDGJ_;
        } else {
            req.url_ZMDGJ_ = Mai_ZMDGJ_Liang._ZMDGJ_mainUr_ZMDGJ_l + req.url_ZMDGJ_;
        }
        var completeFunc = (res) => {
            console.log(res, "MaiLiang http Success")
            res = JSON.parse(res);
            if (res.Status == "200") {
                if (res.Result["OpenId"] != null && res.Result["OpenId"] != "") {
                    Mai_ZMDGJ_Liang.Mai_ZMDGJ_Liang_ZMDGJ_OpenId = res.Result["OpenId"];
                    Mai_ZMDGJ_Liang._ZMDGJ_time_ZMDGJ_ = req._ZMDGJ_data_ZMDGJ_.posttime;
                    console.log("获得买量系统OpenId " + Mai_ZMDGJ_Liang.Mai_ZMDGJ_Liang_ZMDGJ_OpenId);

                }
                else {
                    console.log("上报买量系统停留时间成功");
                }
                if (req.on_ZMDGJ_Success) {
                    req.on_ZMDGJ_Success(res);
                }
            }
            else {
                if (req.on_ZMDGJ_Fail) {
                    req.on_ZMDGJ_Fail(res);
                }
            }

            req.on_ZMDGJ_Success = null;
            req = null;
        };
        var errorFunc = (res) => {
            console.log(res, "MaiLiang http fail")
            if (req.on_ZMDGJ_Fail) {
                req.on_ZMDGJ_Fail(res);
            }
            req.on_ZMDGJ_Fail = null;
            req = null;
        };

        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, Mai_ZMDGJ_Liang, completeFunc);
        xhr.once(Laya.Event.ERROR, Mai_ZMDGJ_Liang, errorFunc);

        if (req.meth_ZMDGJ_ == "get") {
            var para = "";
            for (const key of Object.keys(req._ZMDGJ_data_ZMDGJ_)) {
                var value = req._ZMDGJ_data_ZMDGJ_[key];
                para += key + "=" + value + "&";
            }
            req.url_ZMDGJ_ = req.url_ZMDGJ_ + "?" + para;
            xhr.send(req.url_ZMDGJ_, null, req.meth_ZMDGJ_);
        }
        else {
            var para = "";
            for (const key of Object.keys(req._ZMDGJ_data_ZMDGJ_)) {
                var value = req._ZMDGJ_data_ZMDGJ_[key];
                para += key + "=" + value + "&";
            }
            xhr.send(req.url_ZMDGJ_, para, req.meth_ZMDGJ_, null, ["Content-Type", "application/x-www-form-urlencoded"]);
        }

    }
    /**
     * 获得买量系统唯一标识ID,此ID的作用是用来上报游戏时间
     * 
     * @param {Function} res 
     * @memberof MaiLiang
     */
    public static Get_ZMDGJ_Mai_ZMDGJ_Liang_ZMDGJ_OpenId(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onMiniGame) {
            let option = WX_ZMDGJ_API.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync();
            if (option != null) {
                let key = option.query["key"];
                if (key != null && key != "" && User_ZMDGJ_.openId_ZMDGJ_ != "") {
                    Mai_ZMDGJ_Liang._ZMDGJ_key_ZMDGJ_ = key;
                    let req = new request_ZMDGJ_Data();
                    req.url_ZMDGJ_ = Mai_ZMDGJ_Liang.u_ZMDGJ_click;
                    req.on_ZMDGJ_Success = onSuccess;
                    req.on_ZMDGJ_Fail = onFail;
                    req._ZMDGJ_data_ZMDGJ_.appid = App_ZMDGJ_Config.App_ZMDGJ_ID;
                    req._ZMDGJ_data_ZMDGJ_.openid = "";
                    let time = new Date().getTime() / 1000;
                    req._ZMDGJ_data_ZMDGJ_.posttime = time;
                    req._ZMDGJ_data_ZMDGJ_.auth = 0;
                    req._ZMDGJ_data_ZMDGJ_.key = key;
                    req._ZMDGJ_data_ZMDGJ_.wxopenid = User_ZMDGJ_.openId_ZMDGJ_;
                    req.meth_ZMDGJ_ = "POST";
                    console.log("发送买量数据接口")
                    Mai_ZMDGJ_Liang.req_ZMDGJ_uest(req);
                }
            }
            else {
                console.log("上报买量数据失败")
                onFail(null);
            }
        }
        else if(Laya.Browser.onQGMiniGame)
        {
            let option = OPPO_ZMDGJ_API.get_ZMDGJ_LaunchOpt_ZMDGJ_ionsSync();
            Http_ZMDGJ_Unit.report_ZMDGJ_Import(option.referrerInfo.package,option.referrerInfo.extraData.appid,(result)=>
            {
                if(1 == result.code)
                {
                    console.log("OPPO 上报买量数据成功");
                }
                else
                {
                    console.log("OPPO 上报买量数据失败",result.msg);
                }
            },(result)=>
            {
                console.log("OPPO 上报买量数据失败");
                for(var key in result)
                {
                    console.log(key, result[key]);
                }
            });
        }
        else {
            console.log("不在微信模式下调用，默认上报买量数据失败")
            onFail(null);
        }
    }
    /**
     * 上报买量接口停留时间
     * 
        appid －主体小程序appid
        openid －买量系统唯一标识（不可空）
        posttime － 请求时间刻度（精确到秒）
        time － 停留时长（精确到秒）
     * @static
     * @memberof MaiLiang
     */
    public static Report_ZMDGJ_Stay_ZMDGJ_Time(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onMiniGame) {
            if (Mai_ZMDGJ_Liang.Mai_ZMDGJ_Liang_ZMDGJ_OpenId != "") {
                let req = new request_ZMDGJ_Data();
                req.url_ZMDGJ_ = Mai_ZMDGJ_Liang._ZMDGJ_stay_ZMDGJ_;
                req.on_ZMDGJ_Success = onSuccess;
                req.on_ZMDGJ_Fail = onFail;
                req._ZMDGJ_data_ZMDGJ_.appid = App_ZMDGJ_Config.App_ZMDGJ_ID;
                req._ZMDGJ_data_ZMDGJ_.openid = Mai_ZMDGJ_Liang.Mai_ZMDGJ_Liang_ZMDGJ_OpenId;
                let time = new Date().getTime() / 1000;
                req._ZMDGJ_data_ZMDGJ_.posttime = time;
                let staytime = Mai_ZMDGJ_Liang._ZMDGJ_time_ZMDGJ_ != 0 ? time - Mai_ZMDGJ_Liang._ZMDGJ_time_ZMDGJ_ : 0;
                req._ZMDGJ_data_ZMDGJ_.time = staytime;
                req.meth_ZMDGJ_ = "POST";
                console.log("发送停留时间至买量接口")
                Mai_ZMDGJ_Liang.req_ZMDGJ_uest(req);
            }
        }
        else {
            console.log("不在微信模式下调用，默认发送停留时间至买量接口失败")
            onFail(null);
        }
    }

}