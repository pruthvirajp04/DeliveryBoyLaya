import Template_ZMDGJ_View_ZMDGJ_Base from "../TemplateViewBase";

export default class Reward_ZMDGJ_View_ZMDGJ_Template extends Template_ZMDGJ_View_ZMDGJ_Base
{
    protected _center_ZMDGJ_Zone : Laya.Clip = null;
    protected _reward_ZMDGJ_Btn : Laya.Sprite = null;
    protected _skip_ZMDGJ_Btn : Laya.Sprite = null;

    onAwake()
    {
        super.onAwake();
        this._center_ZMDGJ_Zone = this.View_ZMDGJ_.getChildByName("CenterZone") as Laya.Clip; 
        this._reward_ZMDGJ_Btn = this._center_ZMDGJ_Zone.getChildByName("RewradBtn") as Laya.Sprite;
        this._skip_ZMDGJ_Btn = this._center_ZMDGJ_Zone.getChildByName("SkipBtn") as Laya.Sprite;
    }

    onStart()
    {
        super.onStart();
    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
        this._reward_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.onRewardBtn);
        this._skip_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.onSkipBtn);
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
        this._reward_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.onRewardBtn);
        this._skip_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.onSkipBtn);
    }

    protected onRewardBtn()
    {
        
    }

    protected onSkipBtn()
    {

    }
}