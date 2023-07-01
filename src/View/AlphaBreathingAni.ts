export default class Alpha_ZMDGJ_Breathing_ZMDGJ_Ani extends Laya.Script 
{

    public breathing_ZMDGJ_Speed = 2000;
    protected _add_ZMDGJ_ : boolean = false;
    protected _owner_ZMDGJ_Sprite : Laya.Sprite;
    
    onAwake()
    {
        this._owner_ZMDGJ_Sprite = this.owner as Laya.Sprite;
    }
    
    onUpdate()
    {
        if(this._owner_ZMDGJ_Sprite.visible)
        {
            this.bg_ZMDGJ_Ani();
        }
    }

    protected bg_ZMDGJ_Ani()
    {
        if(!this._add_ZMDGJ_)
        {
            this._owner_ZMDGJ_Sprite.alpha = this._owner_ZMDGJ_Sprite.alpha - Math.min(50,Laya.timer.delta) / this.breathing_ZMDGJ_Speed  * 1
            if(this._owner_ZMDGJ_Sprite.alpha <= 0)
            {
                this._add_ZMDGJ_ = true;
            }
        }
        else
        {
            this._owner_ZMDGJ_Sprite.alpha = this._owner_ZMDGJ_Sprite.alpha + Math.min(50,Laya.timer.delta) / this.breathing_ZMDGJ_Speed  * 1 
            if(this._owner_ZMDGJ_Sprite.alpha >= 1)
            {
                this._add_ZMDGJ_ = false;
            }
        }
    }
}