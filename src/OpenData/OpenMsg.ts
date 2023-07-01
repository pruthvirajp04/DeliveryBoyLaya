import { Open_ZMDGJ_Data_ZMDGJ_Msg_ZMDGJ_Def } from "./OpenDataMsgDef";

export default class Open_ZMDGJ_Msg 
{
    constructor(type : Open_ZMDGJ_Data_ZMDGJ_Msg_ZMDGJ_Def)
    {
        this._ZMDGJ_cmd_ZMDGJ_ = type;
    }
    public readonly _ZMDGJ_cmd_ZMDGJ_ : Open_ZMDGJ_Data_ZMDGJ_Msg_ZMDGJ_Def = Open_ZMDGJ_Data_ZMDGJ_Msg_ZMDGJ_Def.None;
    public _ZMDGJ_data_ZMDGJ_ : any = {};
}