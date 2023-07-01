import KRQ_Main from "../../../KRQ/ViewCom/KRQ_Main";
import Utilit from "../../../Utilit";
import QQ_ZMDGJ_Template_ZMDGJ_ViewBase from "../QQTemplateViewBase";

export default class QQ_ZMDGJ_InGame_ZMDGJ_ViewTemplate extends QQ_ZMDGJ_Template_ZMDGJ_ViewBase
{
    protected _center_ZMDGJ_Zone : Laya.Clip = null;

    onAwake()
    {
        super.onAwake();
        this._center_ZMDGJ_Zone = this.View_ZMDGJ_.getChildByName("CenterZone") as Laya.Clip;

        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit.is_ZMDGJ_IphoneX())
            {
                this._center_ZMDGJ_Zone.top =  this._center_ZMDGJ_Zone.top + 75;
            }
        }
        else
        {
            this._center_ZMDGJ_Zone.top =  this._center_ZMDGJ_Zone.top - 200;
            if(Utilit.is_ZMDGJ_IphoneX())
            {
                this._center_ZMDGJ_Zone.top =  this._center_ZMDGJ_Zone.top + 75;
            }
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