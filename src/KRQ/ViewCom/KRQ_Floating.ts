import KRQ__ZMDGJ_View_ZMDGJ_Com_ZMDGJ_Base from "./KRQ_ViewComBase";
import KRQ_ZMDGJ__Rock_ZMDGJ_Single_ZMDGJ_Ad from "../Com/KRQ_RockSingleAd";

export default class KRQ_ZMDGJ__Floating_ZMDGJ_ extends KRQ__ZMDGJ_View_ZMDGJ_Com_ZMDGJ_Base
{
    protected _center_ZMDGJ_Zone : Laya.Clip = null;
    protected _rock_ZMDGJ_Single_ZMDGJ_Ads : Array<KRQ_ZMDGJ__Rock_ZMDGJ_Single_ZMDGJ_Ad> = new Array<KRQ_ZMDGJ__Rock_ZMDGJ_Single_ZMDGJ_Ad>();
    protected _ani_ZMDGJ_Spaceing : number = 3000;

    onAwake()
    {
        this._center_ZMDGJ_Zone = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("CenterZone") as Laya.Clip;
        for (let i = 0; i < this._center_ZMDGJ_Zone.numChildren; ++i)  
        {
            let child = this._center_ZMDGJ_Zone.getChildAt(i) as Laya.Sprite;
            if(child.visible)
            {
                let rockAd = child.getComponent(KRQ_ZMDGJ__Rock_ZMDGJ_Single_ZMDGJ_Ad) as KRQ_ZMDGJ__Rock_ZMDGJ_Single_ZMDGJ_Ad;
                this._rock_ZMDGJ_Single_ZMDGJ_Ads.push(rockAd);
            }
        }
    }

    onStart()
    {
        let self = this;
        self.play_ZMDGJ_Ani();
        Laya.timer.loop(this._rock_ZMDGJ_Single_ZMDGJ_Ads.length * (this._ani_ZMDGJ_Spaceing + 500),this,()=>
        {
            self.play_ZMDGJ_Ani(()=>
            {
                self.refresh_ZMDGJ_Ad();
            });
        })
    }

    public refresh_ZMDGJ_Ad()
    {
        for (let i = 0; i < this._rock_ZMDGJ_Single_ZMDGJ_Ads.length; ++i)  
        {
            let ad = this._rock_ZMDGJ_Single_ZMDGJ_Ads[i];
            if(null == ad._ZMDGJ_Data_ZMDGJ_)
            {
                ad._ZMDGJ_Sprite_ZMDGJ_.visible = false;
            }
            ad.ref_ZMDGJ_resh();
        }
    }

    protected play_ZMDGJ_Ani(onComplate? : Function)
    {
        let len = this._rock_ZMDGJ_Single_ZMDGJ_Ads.length;
        for (let i = 0; i < this._rock_ZMDGJ_Single_ZMDGJ_Ads.length; ++i)  
        {
            let index = i;
            let ad = this._rock_ZMDGJ_Single_ZMDGJ_Ads[index];
            Laya.timer.once(this._ani_ZMDGJ_Spaceing * i,ad,()=>
            {
                if(index == len - 1)
                {
                    ad.play_ZMDGJ_Ani(onComplate);
                }
                else
                {
                    ad.play_ZMDGJ_Ani();
                }
            })
        }
    }
}