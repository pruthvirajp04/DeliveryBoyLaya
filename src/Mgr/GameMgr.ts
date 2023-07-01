import Utilit_ZMDGJ_ from "../Utilit";
import View_ZMDGJ_Mgr, { View_ZMDGJ_Def } from "./ViewMgr";
import User_ZMDGJ_ from "../User/User";
import Http_ZMDGJ_Unit from "../Net/HttpUnit";
import Mai_ZMDGJ_Liang from "../MaiLiangAPI/MaiLiang";
import Event_ZMDGJ_Mgr from "../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../Event/EventDef";
import WX_ZMDGJ_API from "../WXAPI";
import App_ZMDGJ_Switch_ZMDGJ_Config from "../Config/AppSwitchConfig";
import Wu_ZMDGJ_dian_ZMDGJ_Mgr from "./WudianMgr";
import Cached_ZMDGJ_WX_ZMDGJ_BannerAd from "../CachedWXBannerAd";
import ALD, { ALD_ZMDGJ_Event_ZMDGJ_Def } from "../ALD";
import QQ_ZMDGJ_Mini_ZMDGJ_GameAPI from "../QQMiniGameAPI";
import WX_ZMDGJ_ADMgr from "./WXADMgr";
import Cached_ZMDGJ_QQ_ZMDGJ_BannerAd from "../CachedQQBannerAd";
import App_ZMDGJ_Config from "../AppConfig";
import Level from "../MyScripts/Level/Level";
import Sound_ZMDGJ_Mgr from "./SoundMgr";

//游戏管理器，游戏代码的入口
export default class Game_ZMDGJ_Mgr extends Laya.Script {

    private static _instance: Game_ZMDGJ_Mgr = null;
    public static get_ZMDGJ_Instance(): Game_ZMDGJ_Mgr { return Game_ZMDGJ_Mgr._instance; }    

    protected _curLevel: Level = null;
    public get CurLevel(): Level { return this._curLevel; }

    protected _bSceneOpen: boolean = false;
    
    constructor() {
        super();
        Game_ZMDGJ_Mgr._instance = this;
    }

    onAwake()  {
        Mai_ZMDGJ_Liang.Get_ZMDGJ_Mai_ZMDGJ_Liang_ZMDGJ_OpenId(function (res) {
            console.log("GameUI 买量数据上报成功");
            Laya.Browser.window["wx"].onShow(function () {
                Mai_ZMDGJ_Liang.Get_ZMDGJ_Mai_ZMDGJ_Liang_ZMDGJ_OpenId(null, null);
            })
            Laya.Browser.window["wx"].onHide(function () {
                Mai_ZMDGJ_Liang.Report_ZMDGJ_Stay_ZMDGJ_Time(null, null);
            })
        },
            function (res) {
                console.log("GameUI 买量数据上报失败");
            }
        );

        WX_ZMDGJ_API.Set_ZMDGJ_Share_ZMDGJ_Menu("", "",
            () =>  {

            },
            () =>  {

            },
            () =>  {

            })
        

        Wu_ZMDGJ_dian_ZMDGJ_Mgr.Update_ZMDGJ_IpBlock_ZMDGJ_State();
        this.report_ZMDGJ_Launch_ZMDGJ_Options();
        
        if(Laya.Browser.onMiniGame)
        {
            //Cached_ZMDGJ_WX_ZMDGJ_BannerAd.pre_ZMDGJ_load_ZMDGJ_Banner(); 如果是老项目使用了 CachedWXBannerAd 这个类，请打开这一行注释
            WX_ZMDGJ_ADMgr._ZMDGJ_init_ZMDGJ_();//如果不是老项目，没有使用 WXADMgr 这个类, 请注释这一行。
        }
        else if (Laya.Browser.onQQMiniGame)
        {
            Cached_ZMDGJ_QQ_ZMDGJ_BannerAd.pre_ZMDGJ_load_ZMDGJ_Banner();
            QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.Load_ZMDGJ_App_ZMDGJ_BoxAd(()=>{},()=>{});
        }
        else if(Laya.Browser.onQGMiniGame)
        {
            if(null != Laya.Browser.window["qg"].reportMonitor && typeof(Laya.Browser.window["qg"].reportMonitor) == 'function')
            {
                Laya.Browser.window["qg"].reportMonitor('game_scene', 0);
            }
        }
    }

    onStart()  {
        this.pre_ZMDGJ_Create_ZMDGJ_Game();
    }

    private pre_ZMDGJ_Create_ZMDGJ_Game(): void {
        
        //todo：这里添加初始化主场景的代码。Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.App_CloseFirstLoadingView); 添加到你的关卡加载完成的回调中，关闭加载界面
        //自定义加载器,使模型文件保存在本地,关卡文件放在云端,整局游戏只需要加载一次
        Laya.URL.customFormat = (url: string) => {
            if (url.indexOf(".ls") == -1 && url.indexOf("https://oss.renyouwangluo.cn/zmdgj-test/LayaScene") > -1) {
                console.log("origin url: ", url);
                url = url.replace("https://oss.renyouwangluo.cn/zmdgj-test/LayaScene", "subRes/LayaScene");
                console.log("replace url: ", url);
            }
            // if (url.indexOf(".lm") > -1 && url.indexOf(".lmat") == -1 && url.indexOf("subRes1") == -1 && url.indexOf("subRes") > -1) {
            //     url = url.replace("subRes", "subRes1");
            // }
            return url;
        }
        
        Laya.MouseManager.multiTouchEnabled = false;//关闭多点触控
        // User_ZMDGJ_.set_ZMDGJ_LeveNum(15);
        this.EnterGameScene(() => {
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.App_Close_ZMDGJ_First_ZMDGJ_Loading_ZMDGJ_View);
        });

    }

    //游戏存档,仅当作示例，实际存档根据实际项目各自实现
    public save_ZMDGJ_Game_ZMDGJ_Data()  {
        Http_ZMDGJ_Unit.save_ZMDGJ_Game_ZMDGJ_Data(User_ZMDGJ_.get_ZMDGJ_Save_ZMDGJ_Data(),
            (res) => {
                if (res.code == 1) {
                    console.log("存档成功")
                }
                else {
                    console.log("存档失败")
                }
            },
            (res) => {
                console.log("存档失败")
            })
    }

    protected report_ZMDGJ_Launch_ZMDGJ_Options()
    {
        Http_ZMDGJ_Unit.Get_ZMDGJ_user_ZMDGJ_ip((res)=>
        {
            if(1 == res.code)
            {
                console.log("获取玩家ip,地区成功 ：",res.data.dqip,res.data.ipxq);
                let opt : any = null;
                if(Laya.Browser.onMiniGame)
                {
                    opt = WX_ZMDGJ_API.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync();
                }
                else if(Laya.Browser.onQQMiniGame)
                {
                    opt = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync();
                }
                if(null != opt)
                {
                    ALD.ald_ZMDGJ_Send_ZMDGJ_Report_ZMDGJ_LaunchOptions(opt.scene,res.data.dqip,res.data.ipxq);
                }
            }
        },(res)=>
        {
            console.log("获取玩家ip,地区失败");
            let opt : any = null;
            if(Laya.Browser.onMiniGame)
            {
                opt = WX_ZMDGJ_API.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync();
            }
            else if(Laya.Browser.onQQMiniGame)
            {
                opt = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync();
            }
            if(null != opt)
            {
                ALD.ald_ZMDGJ_Send_ZMDGJ_Report_ZMDGJ_LaunchOptions(opt.scene,"","");
            }
        })
    }

    public EnterGameScene(onComplate?: Function) {
        if (this._bSceneOpen) {
            return;
        }

        var levelScene: string = App_ZMDGJ_Config.Res_ZMDGJ_Server + "/LayaScene/Conventional/" + User_ZMDGJ_.get_ZMDGJ_FakerLeveNum().toString() + ".ls";
        Laya.Scene3D.load(levelScene, Laya.Handler.create(this, (scene: Laya.Scene3D) => {
            console.log("GameMgr.EnterGameScene : " + levelScene + " loaded");
            Laya.stage.addChild(scene);
            this._curLevel = scene.addComponent(Level);
            View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.MainView, null, onComplate);
            this._bSceneOpen = true;
        }));

        Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_BGM("BGM");
    }

    public GameOver(bWin: boolean) {
        if (!this._bSceneOpen) {
            return;
        }
        var gameOverView: View_ZMDGJ_Def = bWin ? View_ZMDGJ_Def.GameWinView : View_ZMDGJ_Def.GameFailView;
        View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(gameOverView, { bWin: bWin }, () => {
            ALD.aldSendOnlySingleReport(ALD_ZMDGJ_Event_ZMDGJ_Def.EnterGameComplateView);
            View_ZMDGJ_Mgr.ins_ZMDGJ_tance.close_ZMDGJ_View(View_ZMDGJ_Def.InGameView);
            this._curLevel.DestroySelf();
            this._bSceneOpen = false;
        });

        Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.stop_ZMDGJ_BGM();
    }

    public PreLoadScene(level: string) {
        if(Utilit_ZMDGJ_.is_ZMDGJ_Iphone6()){
            console.log("is_ZMDGJ_Iphone6 不预加载远程场景关卡");
            return ;
        }
        let levelScene = App_ZMDGJ_Config.Res_ZMDGJ_Server + "/LayaScene/Conventional/" + level + ".ls";
        Laya.Scene3D.load(levelScene, Laya.Handler.create(this, function (scene) {
            console.log("预加载远程场景关卡" + levelScene + "  加载完成")
        }));
    }
}