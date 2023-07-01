export default class KRQ__ZMDGJ_View_ZMDGJ_Com_ZMDGJ_Base extends Laya.Script 
{
    public on_ZMDGJ_Show : Function = null;
    public on_ZMDGJ_Hide : Function = null;
    
    public get _ZMDGJ_Sprite_ZMDGJ_()
    {
        return this.owner as Laya.Sprite;
    }
    
    public _ZMDGJ_show_ZMDGJ_()
    {
        this._ZMDGJ_Sprite_ZMDGJ_.visible = true;
        if(null != this.on_ZMDGJ_Show)
        {
            this.on_ZMDGJ_Show();
        }
    }

    public _ZMDGJ_hide_ZMDGJ_()
    {
        this._ZMDGJ_Sprite_ZMDGJ_.visible = false;
        if(null != this.on_ZMDGJ_Hide)
        {
            this.on_ZMDGJ_Hide();
        }
    }
}