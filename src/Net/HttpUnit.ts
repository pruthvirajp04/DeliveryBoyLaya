import Net_ZMDGJ_Config from "./NetConfig";
import User_ZMDGJ_ from "../User/User";
import Aes_ZMDGJ_Tools from "./AesTools";
import App_ZMDGJ_Config from "../AppConfig";

export class request_ZMDGJ_Data
{
    public meth_ZMDGJ_ : string = "post";
    public readonly _ZMDGJ_data_ZMDGJ_ : any;
    public url_ZMDGJ_ : string = "";
    public on_ZMDGJ_Success : Function = null;
    public on_ZMDGJ_Fail : Function = null;

    constructor()
    {
        this._ZMDGJ_data_ZMDGJ_ = {};
    }
}

export default class Http_ZMDGJ_Unit 
{
    public static request_ZMDGJ_(req : request_ZMDGJ_Data) {
        if (req.url_ZMDGJ_.indexOf("https://") > -1 ||
            req.url_ZMDGJ_.indexOf("http://") > -1) {
            req.url_ZMDGJ_ = req.url_ZMDGJ_;
        } else {
            req.url_ZMDGJ_ = Net_ZMDGJ_Config.server_ZMDGJ_Url + req.url_ZMDGJ_;
        }

        var completeFunc = (res) => {
            console.log(res,"http Success")
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
        xhr.once(Laya.Event.COMPLETE, Http_ZMDGJ_Unit, completeFunc);
        xhr.once(Laya.Event.ERROR, Http_ZMDGJ_Unit, errorFunc);
        let dataStr:string = JSON.stringify(req._ZMDGJ_data_ZMDGJ_);

        if(Laya.Browser.onMiniGame || App_ZMDGJ_Config.onTTMiniGame)
        {
            req._ZMDGJ_data_ZMDGJ_.code = User_ZMDGJ_.code_ZMDGJ_;
        }
        else if(Laya.Browser.onQGMiniGame) //OPPO小游戏
        {
            req._ZMDGJ_data_ZMDGJ_.oppotoken = User_ZMDGJ_.code_ZMDGJ_;
        }
        else if(Laya.Browser.onQQMiniGame) //qq小游戏
        {
            req._ZMDGJ_data_ZMDGJ_.code = User_ZMDGJ_.code_ZMDGJ_;
        }
        else
        {
            req._ZMDGJ_data_ZMDGJ_.code = User_ZMDGJ_.code_ZMDGJ_;
        }

        var time = "time=" + String(Date.now());
        var header = 
        [
            "Content-Type", "application/json",
            "state" , Net_ZMDGJ_Config.state_ZMDGJ_,
            "gameid" ,Net_ZMDGJ_Config.game_ZMDGJ_id,
            "sign" ,Aes_ZMDGJ_Tools.en_ZMDGJ_crypt(time),
        ]
        if(User_ZMDGJ_._ZMDGJ_token)
        {
            header.push("token");
            header.push(User_ZMDGJ_._ZMDGJ_token);
        }

        xhr.send(req.url_ZMDGJ_, JSON.stringify(req._ZMDGJ_data_ZMDGJ_), req.meth_ZMDGJ_, "json",header);
    }

    //todo:这里添加你们和服务器相互的接口

    public static login_ZMDGJ_(onSuccess : Function,onFail : Function)
    {
        var req = new request_ZMDGJ_Data();
        req.url_ZMDGJ_ = Net_ZMDGJ_Config.Login_ZMDGJ_;
        req.on_ZMDGJ_Success = onSuccess;
        req.on_ZMDGJ_Fail = onFail;
        Http_ZMDGJ_Unit.request_ZMDGJ_(req);
    }
    
    public static save_ZMDGJ_Game_ZMDGJ_Data(gameData : any,onSuccess : Function,onFail : Function)
    {
        var req = new request_ZMDGJ_Data();
        req.url_ZMDGJ_ = Net_ZMDGJ_Config.Save_ZMDGJ_Game_ZMDGJ_Data;
        req._ZMDGJ_data_ZMDGJ_.gameData = gameData;
        req.on_ZMDGJ_Success = onSuccess;
        req.on_ZMDGJ_Fail = onFail;
        Http_ZMDGJ_Unit.request_ZMDGJ_(req);
    }
    
    public static get_ZMDGJ_Game_ZMDGJ_Data(onSuccess : Function,onFail : Function)
    {
        var req = new request_ZMDGJ_Data();
        req.url_ZMDGJ_ = Net_ZMDGJ_Config.Get_ZMDGJ_User;
        req.on_ZMDGJ_Success = onSuccess;
        req.on_ZMDGJ_Fail = onFail;
        Http_ZMDGJ_Unit.request_ZMDGJ_(req);
    }
    
    /**
     * IP屏蔽方法，需要在NetConfig类中设置IpBlock的接口地址
     * onSuccess方法返回参数的范例为 Object {code: 0, msg: "准一线", time: "1571034447", data: null}
     * @static
     * @memberof HttpUnit
     */
    public static Get_ZMDGJ_Ip_ZMDGJ_Block(onSuccess : Function,onFail : Function){
        if(-1 != Net_ZMDGJ_Config.game_ZMDGJ_id)
        {
            var req = new request_ZMDGJ_Data();
            req.url_ZMDGJ_ = Net_ZMDGJ_Config.Ip_ZMDGJ_Block;
            req.on_ZMDGJ_Success = onSuccess;
            req.on_ZMDGJ_Fail = onFail;
            Http_ZMDGJ_Unit.request_ZMDGJ_(req);
        }
    }

    public static report_ZMDGJ_Export(appid : string,game_name : string,onSuccess : Function,onFail : Function)
    {
        var req = new request_ZMDGJ_Data();
        req.url_ZMDGJ_ = Net_ZMDGJ_Config.report_ZMDGJ_Export;
        req._ZMDGJ_data_ZMDGJ_.wbappid = appid;
        req._ZMDGJ_data_ZMDGJ_.game_name = game_name;
        req.on_ZMDGJ_Success = onSuccess;
        req.on_ZMDGJ_Fail = onFail;
        Http_ZMDGJ_Unit.request_ZMDGJ_(req);
    }

    public static report_ZMDGJ_Import(appid : string,channel : string,onSuccess : Function,onFail : Function)
    {
        var req = new request_ZMDGJ_Data();
        req.url_ZMDGJ_ = Net_ZMDGJ_Config.report_ZMDGJ_Import;
        req._ZMDGJ_data_ZMDGJ_.wbappid = appid;
        req._ZMDGJ_data_ZMDGJ_.channel = channel;
        req.on_ZMDGJ_Success = onSuccess;
        req.on_ZMDGJ_Fail = onFail;
        Http_ZMDGJ_Unit.request_ZMDGJ_(req);
    }

    public static Get_ZMDGJ_user_ZMDGJ_ip(onSuccess : Function,onFail : Function)
    {
        var req = new request_ZMDGJ_Data();
        req.url_ZMDGJ_ = Net_ZMDGJ_Config.get_ZMDGJ_user_ZMDGJ_ip;
        req.on_ZMDGJ_Success = onSuccess;
        req.on_ZMDGJ_Fail = onFail;
        Http_ZMDGJ_Unit.request_ZMDGJ_(req);
    }
}
