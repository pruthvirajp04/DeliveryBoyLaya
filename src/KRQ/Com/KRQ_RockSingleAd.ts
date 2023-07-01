import KRQ_ZMDGJ__Single_ZMDGJ_Ad from "./KRQ_SingleAd";

export default class KRQ_ZMDGJ__Rock_ZMDGJ_Single_ZMDGJ_Ad extends KRQ_ZMDGJ__Single_ZMDGJ_Ad
{
    public play_ZMDGJ_Ani(onComplate?: Function)  
    {
        let self = this;
        self._ZMDGJ_Sprite_ZMDGJ_.rotation = 0;
        Laya.Tween.to(self._ZMDGJ_Sprite_ZMDGJ_,
            {
                rotation: 20,
            }, 250, Laya.Ease.linearNone, Laya.Handler.create(self, () => {
                Laya.Tween.to(self._ZMDGJ_Sprite_ZMDGJ_,
                    {
                        rotation: 0,
                    }, 250, Laya.Ease.linearNone, Laya.Handler.create(self, () => {
                        self._ZMDGJ_Sprite_ZMDGJ_.rotation = 0;
                        if(null != onComplate)
                        {
                            onComplate();
                        }
                    }))
            }))
    }
}