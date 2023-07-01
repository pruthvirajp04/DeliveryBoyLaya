import Sound_ZMDGJ_Mgr from "../Mgr/SoundMgr";

export default class Button_ZMDGJ_Anim extends Laya.Script {

    public use_ZMDGJ_Sound : boolean  = true;

    constructor() { super(); }

    onAwake(): void {
        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.on_ZMDGJ_Down);
        this.owner.on(Laya.Event.MOUSE_UP, this, this.on_ZMDGJ_Up);
        this.owner.on(Laya.Event.MOUSE_OUT, this, this.on_ZMDGJ_Up);
    }

    onDisable(): void {
        this.owner.offAll();
        Laya.Tween.clearAll(this);
    }

    public on_ZMDGJ_Down(): void {
        Laya.Tween.to(this.owner, { scaleX: 0.9, scaleY: 0.9 }, 50);
        if(this.use_ZMDGJ_Sound)
        {
            Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_Sound("anniu");
        }
    }

    private on_ZMDGJ_Up(): void {
        Laya.Tween.to(this.owner, { scaleX: 1, scaleY: 1 }, 50);
    }
}