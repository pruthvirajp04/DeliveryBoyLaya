import View_ZMDGJ_Base from "../ViewBase";

export default class Tips_ZMDGJ_View extends View_ZMDGJ_Base
{
    protected _ZMDGJ__bg_ZMDGJ_ : Laya.Sprite;
    protected _tips_ZMDGJ_Text : Laya.Text;

    constructor() { super(); }

    onAwake()
    {
        this._ZMDGJ__bg_ZMDGJ_ = this.owner.getChildByName("Bg") as Laya.Sprite;
        this._ZMDGJ__bg_ZMDGJ_.x = Laya.stage.width / 2 - this._ZMDGJ__bg_ZMDGJ_.width / 2;
        this._tips_ZMDGJ_Text = this._ZMDGJ__bg_ZMDGJ_.getChildByName("Text") as Laya.Text;
    }

    public open_ZMDGJ_View(data?: any): void 
    {
        super.open_ZMDGJ_View(data);
        this.set_ZMDGJ_Tips_ZMDGJ_Msg(data);
        Laya.timer.clearAll(this);
        var self = this;
        Laya.timer.once(3000,this,function()
        {   
            self.close_ZMDGJ_View();
        })
    }

    public set_ZMDGJ_Tips_ZMDGJ_Msg(msg : string)
    {
        this._tips_ZMDGJ_Text.text = msg;
    }
}