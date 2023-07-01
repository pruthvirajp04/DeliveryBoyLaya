//环形进度条，只支持纯色
export default class Circular_ZMDGJ_ProcessBar extends Laya.Script
{
    public color_ZMDGJ_ : string = "#7CFC00";
    public line_ZMDGJ_Color : string = "";
    public line_ZMDGJ_Width : number = 0;
    protected _owner_ZMDGJ_Sprite : Laya.Sprite = null;
    protected _value_ZMDGJ_ = 0;

    onAwake()
    {
        this._owner_ZMDGJ_Sprite = this.owner as Laya.Sprite;
    }
    
    onEnable(): void 
    {

    }

    onDisable(): void 
    {

    }

    public set_ZMDGJ_Value(value : number)
    {
        if(value > 1)
            value = 1;
        if(value < 0)
            value = 0;
        var angle = 360 * (1 -  value) - 90;
        if(null == this._owner_ZMDGJ_Sprite)
            this._owner_ZMDGJ_Sprite =  this.owner as Laya.Sprite;
        this._owner_ZMDGJ_Sprite.graphics.clear();
        this._owner_ZMDGJ_Sprite.graphics.drawPie(this._owner_ZMDGJ_Sprite.width/ 2,this._owner_ZMDGJ_Sprite.height / 2,this._owner_ZMDGJ_Sprite.width / 2,
                angle,
                270,
                this.color_ZMDGJ_,this.line_ZMDGJ_Color,this.line_ZMDGJ_Width);
    }
}