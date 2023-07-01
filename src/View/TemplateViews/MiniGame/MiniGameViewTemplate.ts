import View_ZMDGJ_Base from "../../ViewBase";
import KRQ_ZMDGJ__His_ZMDGJ_tory from "../../../KRQ/Com/KRQ_History/KRQ_History";

export default class Mini_ZMDGJ_Game_ZMDGJ_View_ZMDGJ_Template extends View_ZMDGJ_Base 
{
    protected _krq_ZMDGJ_history : KRQ_ZMDGJ__His_ZMDGJ_tory = null;

    onAwake()
    {
        super.onAwake();
        this._krq_ZMDGJ_history = this.View_ZMDGJ_.getChildByName("KRQ_History").getComponent(KRQ_ZMDGJ__His_ZMDGJ_tory);
        let self = this;
        this._krq_ZMDGJ_history.On_ZMDGJ_Back_ZMDGJ_Btn_ZMDGJ_Click = ()=>
        {
            self.close_ZMDGJ_View();
        }
    }

    onStart()
    {
        super.onStart();
    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
    }
}