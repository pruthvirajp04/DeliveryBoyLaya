import KRQ__ZMDGJ_View_ZMDGJ_Com_ZMDGJ_Base from "./KRQ_ViewComBase";
import KRQ_ZMDGJ__V_ZMDGJ_Loop_ZMDGJ_Ad from "../Com/KRQ_LoopAd/KRQ_VLoopAd";

export default class KRQ_ZMDGJ__Side_ZMDGJ_Pull extends KRQ__ZMDGJ_View_ZMDGJ_Com_ZMDGJ_Base
{
    protected _krq_ZMDGJ_VLoopAd : KRQ_ZMDGJ__V_ZMDGJ_Loop_ZMDGJ_Ad = null;
    protected _pull_ZMDGJ_Btn : Laya.Sprite = null;

    onAwake()
    {
        this._krq_ZMDGJ_VLoopAd = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("KRQ_VLoopAd").getComponent(KRQ_ZMDGJ__V_ZMDGJ_Loop_ZMDGJ_Ad);
        this._pull_ZMDGJ_Btn = this._krq_ZMDGJ_VLoopAd._ZMDGJ_Sprite_ZMDGJ_.getChildByName("PullBtn") as Laya.Sprite;
        this._krq_ZMDGJ_VLoopAd._ZMDGJ_Sprite_ZMDGJ_.x = -this._krq_ZMDGJ_VLoopAd._ZMDGJ_Sprite_ZMDGJ_.width;
    }   

    onEnable()
    {
        this._pull_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.onPull_ZMDGJ_Btn);
    }

    onDisable()
    {
        this._pull_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.onPull_ZMDGJ_Btn);
    }

    protected onPull_ZMDGJ_Btn()
    {
        if(this._krq_ZMDGJ_VLoopAd._ZMDGJ_Sprite_ZMDGJ_.x < 0)
        {
            this._ZMDGJ_pull_ZMDGJ_();
        }
        else
        {
            this._ZMDGJ_push_ZMDGJ_();
        }
    }

    public _ZMDGJ_pull_ZMDGJ_()
    {
        Laya.Tween.to(this._krq_ZMDGJ_VLoopAd._ZMDGJ_Sprite_ZMDGJ_,
            {
                x: 0
            }, 200, Laya.Ease.linearNone, null, 0, true)
    }

    public _ZMDGJ_push_ZMDGJ_()
    {
        Laya.Tween.to(this._krq_ZMDGJ_VLoopAd._ZMDGJ_Sprite_ZMDGJ_,
            {
                x: -this._krq_ZMDGJ_VLoopAd._ZMDGJ_Sprite_ZMDGJ_.width
            }, 200, Laya.Ease.linearNone, null, 0, true)
    }

    protected on_ZMDGJ_ShareAd_ZMDGJ_Fail()
    {
        this._ZMDGJ_pull_ZMDGJ_();
    }
}