export default class Scale_ZMDGJ_Breathing_ZMDGJ_Ani extends Laya.Script 
{

    public breathing_ZMDGJ_Speed = 500;
    public max_ZMDGJ_Scale = 1;
    public min_ZMDGJ_Scale = 0.9;
    protected _add_ZMDGJ_ : boolean = false;
    protected _owner_ZMDGJ_Sprite : Laya.Sprite;
    
    onAwake()
    {
        this._owner_ZMDGJ_Sprite = this.owner as Laya.Sprite;
    }

    onStart()
    {
        this._owner_ZMDGJ_Sprite.scale(this.max_ZMDGJ_Scale,this.max_ZMDGJ_Scale);
    }
    
    onEnable()
    {
        this._owner_ZMDGJ_Sprite.on(Laya.Event.FOCUS_CHANGE,this,this.on_ZMDGJ_Focus_ZMDGJ_Change);
    }

    onDisable()
    {
        this._owner_ZMDGJ_Sprite.off(Laya.Event.FOCUS_CHANGE,this,this.on_ZMDGJ_Focus_ZMDGJ_Change);
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
            var value = this._owner_ZMDGJ_Sprite.scaleX - Math.min(50,Laya.timer.delta) / this.breathing_ZMDGJ_Speed  * 1
            value = Math.max(this.min_ZMDGJ_Scale,value)
            this._owner_ZMDGJ_Sprite.scale(value,value);
            if(this._owner_ZMDGJ_Sprite.scaleX <= this.min_ZMDGJ_Scale)
            {
                this._add_ZMDGJ_ = true;
            }
        }
        else
        {
            var value = this._owner_ZMDGJ_Sprite.scaleX + Math.min(50,Laya.timer.delta) / this.breathing_ZMDGJ_Speed  * 1;
            value = Math.min(this.max_ZMDGJ_Scale,value)
            this._owner_ZMDGJ_Sprite.scale(value,value);
            if(this._owner_ZMDGJ_Sprite.scaleX >= this.max_ZMDGJ_Scale)
            {
                this._add_ZMDGJ_ = false;
            }
        }
    }

    protected on_ZMDGJ_Focus_ZMDGJ_Change()
    {
        this._owner_ZMDGJ_Sprite.scale(this.max_ZMDGJ_Scale,this.max_ZMDGJ_Scale);
        this._add_ZMDGJ_ = false;
    }
}