import Http_ZMDGJ_Unit from "../Net/HttpUnit";
import App_ZMDGJ_Switch_ZMDGJ_Config from "../Config/AppSwitchConfig";
import WX_ZMDGJ_API from "../WXAPI";
import QQ_ZMDGJ_Mini_ZMDGJ_GameAPI from "../QQMiniGameAPI";
import Event_ZMDGJ_Mgr from "../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../Event/EventDef";

export default class Wu_ZMDGJ_dian_ZMDGJ_Mgr {
    private static _ipBlockFlag: number = -1;
    public static Ip_ZMDGJ_Block_ZMDGJ_Flag(): number {
        return Wu_ZMDGJ_dian_ZMDGJ_Mgr._ipBlockFlag;
    }
    /**
     * 此方法调用很慢，所以要在游戏初始化的时候调用一次此方法
     * 
     * @static
     * @memberof WudianMgr
     */
    public static Update_ZMDGJ_IpBlock_ZMDGJ_State() {
        Http_ZMDGJ_Unit.Get_ZMDGJ_Ip_ZMDGJ_Block(
            function (res) {
                console.log("调用IpBlock接口成功,结果为:", res);
                Wu_ZMDGJ_dian_ZMDGJ_Mgr._ipBlockFlag = res.code;
                Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.App_On_ZMDGJ_Update_ZMDGJ_IpBlockState,{ipBlockFlag : Wu_ZMDGJ_dian_ZMDGJ_Mgr._ipBlockFlag});
            },
            null
        )
    }
    /**
     * IP是否被屏蔽
     * 
     * @static
     * @returns {boolean} 
     * @memberof WudianMgr
     */
    public static Get_ZMDGJ_Ip_ZMDGJ_Blocked(): boolean {
        return Wu_ZMDGJ_dian_ZMDGJ_Mgr._ipBlockFlag == 0;
    }
    /**
     * 得到用户进入的场景值
     * 
     * @static
     * @returns {number} 
     * @memberof WudianMgr
     */
    public static Get_ZMDGJ_Entry_ZMDGJ_Scene(): boolean {
        return WX_ZMDGJ_API.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene == 1006;
    }
    /**
     * 误点开关是否打开，包括了总开关和分时开关
     * 
     * @static
     * @returns {boolean} 
     * @memberof WudianMgr
     */
    public static Is_ZMDGJ_Switch_ZMDGJ_Open(): boolean {
        let mainSwitch = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wu_ZMDGJ_dian == 1;
        let isOpenTime = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wudianTimeAvaliable;
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "打开时间", isOpenTime);
        return mainSwitch && isOpenTime;
    }
    /**
     * 完全封装好的误点Flag
     * 
     * @readonly
     * @static
     * @type {boolean}
     * @memberof WudianMgr
     */
    public static get Wu_ZMDGJ_dian_ZMDGJ_Flag(): boolean {
        let mainSwitch = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wu_ZMDGJ_dian == 1;

        let launchScene = null;
        if(Laya.Browser.onMiniGame)
        {
            launchScene = WX_ZMDGJ_API.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene;
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            launchScene = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene;
        }

        let noEnterBySearch: boolean = true;
        var wudianSceneList = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wu_ZMDGJ_dian_ZMDGJ_Scene_ZMDGJ_List;
        for (var i = 0; i < wudianSceneList.length; ++i)  
        {
            var wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let isOpenTime = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wudianTimeAvaliable;
        let ipnotBlock = Wu_ZMDGJ_dian_ZMDGJ_Mgr._ipBlockFlag == 0;
        /* 测试功能，等删 */
        // ipnotBlock = true;
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽", ipnotBlock, "打开时间",
            isOpenTime);
        return mainSwitch && noEnterBySearch && ipnotBlock && isOpenTime;
    }
    /**
     * 没有涉及到定时开关的wudianFlag,自行整合按照时间开关的效果
     * 
     * @static
     * @returns {boolean} 
     * @memberof WudianMgr
     */
    public static get No_ZMDGJ_Time_ZMDGJ_Wudian_ZMDGJ_Flag(): boolean {
        let mainSwitch = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wu_ZMDGJ_dian == 1;
        let launchScene = null;
        if(Laya.Browser.onMiniGame)
        {
            launchScene = WX_ZMDGJ_API.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene;
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            launchScene = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene;
        }
        
        let noEnterBySearch: boolean = true;
        var wudianSceneList = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wu_ZMDGJ_dian_ZMDGJ_Scene_ZMDGJ_List;
        for (var i = 0; i < wudianSceneList.length; ++i)  
        {
            var wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let ipnotBlock = Wu_ZMDGJ_dian_ZMDGJ_Mgr._ipBlockFlag == 0;
        /* 测试功能，等删 */
        // ipnotBlock = true;
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽");
        return mainSwitch && noEnterBySearch && ipnotBlock;
    }
}