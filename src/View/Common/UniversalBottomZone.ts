import Banner_ZMDGJ_Ad_ZMDGJ_View from "../../ShareAd/View/BannerAdView";

export default class Universal_ZMDGJ_BottomZone extends Laya.Script 
{

    protected _owner_ZMDGJ_Sprite : Laya.Sprite;
    protected _auto_ZMDGJ_Zone: Laya.UIComponent;
    protected _loop_ZMDGJ_ADZone: Laya.UIComponent;
    protected _banner_ZMDGJ_ADZone: Laya.UIComponent;
    protected _banner_ZMDGJ_Ad : Banner_ZMDGJ_Ad_ZMDGJ_View;

    onAwake()
    {
        this._owner_ZMDGJ_Sprite = this.owner as Laya.Sprite;
        this._auto_ZMDGJ_Zone = this._owner_ZMDGJ_Sprite.getChildByName("AutoZone") as Laya.UIComponent;
        this._loop_ZMDGJ_ADZone = this._owner_ZMDGJ_Sprite.getChildByName("LoopAD") as Laya.UIComponent; 
        this._banner_ZMDGJ_ADZone = this._owner_ZMDGJ_Sprite.getChildByName("BannerAD") as Laya.UIComponent; 
        this._banner_ZMDGJ_Ad = this._banner_ZMDGJ_ADZone.getComponent(Banner_ZMDGJ_Ad_ZMDGJ_View);
    }
    
    onEnable(): void 
    {
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5)
        {
            this._auto_ZMDGJ_Zone.bottom = this._loop_ZMDGJ_ADZone.height + this._banner_ZMDGJ_ADZone.height;
            this._loop_ZMDGJ_ADZone.bottom = this._banner_ZMDGJ_ADZone.height;
            this._banner_ZMDGJ_ADZone.visible = true;
        }
        else
        {
            this._auto_ZMDGJ_Zone.bottom = this._loop_ZMDGJ_ADZone.height;
            this._loop_ZMDGJ_ADZone.bottom = 0;
            this._banner_ZMDGJ_ADZone.visible = false;
        }
    }

    onDisable(): void 
    {

    }

    onUpdate()
    {
        if(!this._banner_ZMDGJ_ADZone.visible)
        {
            this._banner_ZMDGJ_Ad.clear_ZMDGJ_WXBaner();
        }
    }
}