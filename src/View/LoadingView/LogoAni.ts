export default class Logo_ZMDGJ_Ani extends Laya.Script 
{
    protected readonly _ani_ZMDGJ_Sprites : Array<Laya.Sprite> = [];
    protected readonly _ani_ZMDGJ_SpriteOriginPos : Array<Laya.Point> = [];

    onAwake()
    {
        for (let i = 0; i < this.owner.numChildren; ++i)  
        {
            let child = this.owner.getChildAt(i) as Laya.Sprite;
            child.alpha = 0;
            this._ani_ZMDGJ_Sprites.push(child);
            this._ani_ZMDGJ_SpriteOriginPos.push(new Laya.Point(child.x,child.y));
        }
    }

    public play_ZMDGJ_Ani()
    {
        if(Laya.Browser.onQGMiniGame)
        {
            for (let i = 0; i < this._ani_ZMDGJ_Sprites.length; ++i)  
            { 
                this._ani_ZMDGJ_Sprites[i].visible = false;
            }
            return;
        }
        for (let i = 0; i < this._ani_ZMDGJ_Sprites.length; ++i)  
        {   
            let isLast = i == (this._ani_ZMDGJ_Sprites.length - 1) ? true : false;
            let sp = this._ani_ZMDGJ_Sprites[i];
            let originPos = this._ani_ZMDGJ_SpriteOriginPos[i];
            sp.alpha = 0;
            sp.y += originPos.y + 50;
            let self = this;
            Laya.Tween.to(sp,
                {
                    y: originPos.y,
                    alpha: 1
                },
                450, Laya.Ease.elasticOut, Laya.Handler.create(this, () => {
                    if(isLast)
                    {
                        Laya.timer.once(300,self,()=>
                        {
                            self.play_ZMDGJ_Ani();
                        })
                    }
                }),i * 80)
        }
    }
}