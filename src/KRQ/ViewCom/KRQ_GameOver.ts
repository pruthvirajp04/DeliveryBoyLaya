import KRQ__ZMDGJ_View_ZMDGJ_Com_ZMDGJ_Base from "./KRQ_ViewComBase";
import KRQ_Roll_ZMDGJ_Single_ZMDGJ_Ad from "../Com/KRQ_RollSingleAd";

export default class KRQ_ZMDGJ__Game_ZMDGJ_Over extends KRQ__ZMDGJ_View_ZMDGJ_Com_ZMDGJ_Base
{
    protected _center_ZMDGJ_Zone : Laya.Clip = null;
    protected _roll_ZMDGJ_SingleAd_ZMDGJ_s : Array<KRQ_Roll_ZMDGJ_Single_ZMDGJ_Ad> = new Array<KRQ_Roll_ZMDGJ_Single_ZMDGJ_Ad>();
    
    onAwake()
    {
        this._center_ZMDGJ_Zone = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("CenterZone") as Laya.Clip;
        for (let i = 0; i < this._center_ZMDGJ_Zone.numChildren; ++i)  
        {
            let ad = this._center_ZMDGJ_Zone.getChildAt(i).getComponent(KRQ_Roll_ZMDGJ_Single_ZMDGJ_Ad) as KRQ_Roll_ZMDGJ_Single_ZMDGJ_Ad;
            this._roll_ZMDGJ_SingleAd_ZMDGJ_s.push(ad);
        }
    }

    onStart()
    {
        for (let i = 0; i < this._roll_ZMDGJ_SingleAd_ZMDGJ_s.length; ++i)  
        {
            let ad = this._roll_ZMDGJ_SingleAd_ZMDGJ_s[i];
            Laya.timer.once((this._roll_ZMDGJ_SingleAd_ZMDGJ_s.length - i) * 150,this,()=>
            {
                ad.play_ZMDGJ_Ani();
            })
        }
    }
}
