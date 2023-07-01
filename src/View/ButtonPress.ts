export default class Button_ZMDGJ_Press extends Laya.Script 
{
    public on_ZMDGJ_Press : Function = null; 
    constructor() { super(); }
    protected _owner_ZMDGJ_Sp : Laya.Sprite;
    protected _press_ZMDGJ_: boolean  = false;
    onAwake()
    {
        this._owner_ZMDGJ_Sp = this.owner as Laya.Sprite;
    }
    
    onEnable(): void 
    {
        this._press_ZMDGJ_ = false;
        this._owner_ZMDGJ_Sp.on(Laya.Event.MOUSE_DOWN,this,this.on_ZMDGJ_Down)
        this._owner_ZMDGJ_Sp.on(Laya.Event.MOUSE_UP,this,this.on_ZMDGJ_Up)
        this._owner_ZMDGJ_Sp.on(Laya.Event.MOUSE_OUT,this,this.on_ZMDGJ_Out)
        
    }

    
    onDisable(): void 
    {
        this._press_ZMDGJ_ = false;
        this._owner_ZMDGJ_Sp.off(Laya.Event.MOUSE_DOWN,this,this.on_ZMDGJ_Down)
        this._owner_ZMDGJ_Sp.off(Laya.Event.MOUSE_UP,this,this.on_ZMDGJ_Up)
        this._owner_ZMDGJ_Sp.off(Laya.Event.MOUSE_OUT,this,this.on_ZMDGJ_Out)
    }

    onUpdate()
    {
        if(this._press_ZMDGJ_ && this.on_ZMDGJ_Press)
        {
            this.on_ZMDGJ_Press();
        }
    }
    protected on_ZMDGJ_Down()
    {
        this._press_ZMDGJ_ = true;
    }
    protected on_ZMDGJ_Up()
    {
        this._press_ZMDGJ_ = false;
    }

    protected on_ZMDGJ_Out()
    {
        this._press_ZMDGJ_ = false;
    }
}