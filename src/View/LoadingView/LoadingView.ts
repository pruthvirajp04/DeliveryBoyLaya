import View_ZMDGJ_Base from "../ViewBase";
import Logo_ZMDGJ_Ani from "./LogoAni";

export default class Loading_ZMDGJ_View extends View_ZMDGJ_Base
{
    protected _process_ZMDGJ_BarBg : Laya.Clip;
    protected _process_ZMDGJ_Bar : Laya.Clip;
    protected _bg_ZMDGJ_ : Laya.Clip;
    protected _bottom_ZMDGJ_Zone : Laya.Clip;

    protected _process_ZMDGJ_Width : number = 0;


    onAwake()
    {
        this._bg_ZMDGJ_ = this.owner.getChildByName("Bg") as Laya.Clip;
        this._bottom_ZMDGJ_Zone = this._bg_ZMDGJ_.getChildByName("BottomZone") as Laya.Clip;
        this._process_ZMDGJ_BarBg = this._bottom_ZMDGJ_Zone.getChildByName("processBarBg") as Laya.Clip;
        this._process_ZMDGJ_Bar = this._process_ZMDGJ_BarBg.getChildByName("processBar") as Laya.Clip;
        this._process_ZMDGJ_Width = this._process_ZMDGJ_Bar.width;
    }

    onStart()
    {
        Laya.timer.once(250,this,()=>
        {
        })
    }

    onEnable()
    {
        super.onEnable();
    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
    }

    onUpdate()
    {
        this._bg_ZMDGJ_.width = Laya.stage.width;
        this._bg_ZMDGJ_.height = Laya.stage.height;
    }

    public set_ZMDGJ_Process(process : number)
    {
        if(process < 0 )
            process = 0;
        if(process > 1 )
            process = 1;
        var width = this._process_ZMDGJ_Width * process;
        if(width < 1)
            width = 1;
        this._process_ZMDGJ_Bar.width = width;
    }
    
}