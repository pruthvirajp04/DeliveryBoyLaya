import Open_ZMDGJ_Msg from "./OpenMsg";
import { Open_ZMDGJ_Data_ZMDGJ_Msg_ZMDGJ_Def } from "./OpenDataMsgDef";
import { Open_ZMDGJ_DataKey_ZMDGJ_Def } from "./OpenDataKeyDef";

export default class Open_ZMDGJ_Data_ZMDGJ_Bridge 
{

    public static post_ZMDGJ_Self_ZMDGJ_Data(key : Open_ZMDGJ_DataKey_ZMDGJ_Def,value : any)
    {
        var msg = new Open_ZMDGJ_Msg(Open_ZMDGJ_Data_ZMDGJ_Msg_ZMDGJ_Def.set_ZMDGJ_Self_ZMDGJ_Data);
        msg._ZMDGJ_data_ZMDGJ_.key = key;
        msg._ZMDGJ_data_ZMDGJ_.value = value;
        Open_ZMDGJ_Data_ZMDGJ_Bridge.send_ZMDGJ_Msg_ZMDGJ_To_ZMDGJ_OpenData_ZMDGJ_Context(msg);
    }

    public static open_ZMDGJ_Friend_ZMDGJ_Rank()
    {
        var msg = new Open_ZMDGJ_Msg(Open_ZMDGJ_Data_ZMDGJ_Msg_ZMDGJ_Def.Open_ZMDGJ_Friend_ZMDGJ_Rank);
        msg._ZMDGJ_data_ZMDGJ_.width = Laya.stage.width;
        msg._ZMDGJ_data_ZMDGJ_.height = Laya.stage.height;
        Open_ZMDGJ_Data_ZMDGJ_Bridge.send_ZMDGJ_Msg_ZMDGJ_To_ZMDGJ_OpenData_ZMDGJ_Context(msg);
    }

    public static send_ZMDGJ_Msg_ZMDGJ_To_ZMDGJ_OpenData_ZMDGJ_Context(msg : Open_ZMDGJ_Msg)
    {
        if (Laya.Browser.onMiniGame)
        {
            let openDataContext = Laya.Browser.window.wx.getOpenDataContext();
            openDataContext.postMessage(msg);
        }
    }
}