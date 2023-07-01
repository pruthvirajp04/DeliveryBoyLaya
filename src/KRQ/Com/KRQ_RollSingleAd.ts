import KRQ_ZMDGJ__Single_ZMDGJ_Ad from "./KRQ_SingleAd";

export default class KRQ_Roll_ZMDGJ_Single_ZMDGJ_Ad extends KRQ_ZMDGJ__Single_ZMDGJ_Ad 
{
    protected _originX : number = null;

    onAwake()
    {
        super.onAwake();
        this._originX = this._ZMDGJ_Sprite_ZMDGJ_.x;
        this._ZMDGJ_Sprite_ZMDGJ_.x -= Laya.stage.width;
    }

    public play_ZMDGJ_Ani(onComplate? : Function)
    {
        // let cur = this._originX;
        // let next = cur - Laya.stage.width;
        // this._ZMDGJ_Sprite_ZMDGJ_.x = next;
        // Laya.Tween.to(this._ZMDGJ_Sprite_ZMDGJ_,
        //     {
        //         rotation : 360,
        //     }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, () =>  {
        //         this._ZMDGJ_Sprite_ZMDGJ_.rotation = 0;
        //     }))
        // Laya.Tween.to(this._ZMDGJ_Sprite_ZMDGJ_,
        //     {
        //         x : cur,
        //     },500,Laya.Ease.linearNone,Laya.Handler.create(this,()=>
        //     {
        //         this._ZMDGJ_Sprite_ZMDGJ_.x = cur;
        //         if(null != onComplate)
        //         {
        //             onComplate();
        //         }
        //     }))

        this._ZMDGJ_Sprite_ZMDGJ_.x = this._originX;
    }

}