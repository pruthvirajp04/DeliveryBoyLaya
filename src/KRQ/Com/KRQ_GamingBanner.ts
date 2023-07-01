import KRQ_ZMDGJ__Banner_ZMDGJ_ from "./KRQ_Banner";
import WX_ZMDGJ_API from "../../WXAPI";
import QQ_ZMDGJ_Mini_ZMDGJ_GameAPI from "../../QQMiniGameAPI";
import App_ZMDGJ_Switch_ZMDGJ_Config from "../../Config/AppSwitchConfig";
import Wu_ZMDGJ_dian_ZMDGJ_Mgr from "../../Mgr/WudianMgr";

export default class KRQ_Gaming_ZMDGJ_Banner extends KRQ_ZMDGJ__Banner_ZMDGJ_
{
    public ref_ZMDGJ_resh(onComplate? : Function)
    {
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
        let wudianSceneList = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wu_ZMDGJ_dian_ZMDGJ_Scene_ZMDGJ_List;
        for (let i = 0; i < wudianSceneList.length; ++i)  
        {
            let wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let ipBlocked = Wu_ZMDGJ_dian_ZMDGJ_Mgr.Get_ZMDGJ_Ip_ZMDGJ_Blocked();
        if(!ipBlocked || !noEnterBySearch)
        {
            this._ZMDGJ_Sprite_ZMDGJ_.visible = false;
            if(null != onComplate)
            {
                onComplate();
            }
            return;
        }
        let banner = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().ba_ZMDGJ_nner;
        if (1 == banner)
        {
            this.refresh_ZMDGJ_WXBanner();
        }
        else
        {
            super.ref_ZMDGJ_resh(()=>
            {
                this.refresh_ZMDGJ_Banner();
                if(null != onComplate)
                {
                    onComplate();
                }
            })
        }
    }
}