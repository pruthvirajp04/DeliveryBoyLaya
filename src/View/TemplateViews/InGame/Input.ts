import Event_ZMDGJ_Mgr from "../../../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../../../Event/EventDef";

export default class Input extends Laya.Script {
    protected _ownerSp: Laya.Sprite = null;
    protected _centerPoint: Laya.Vector2 = new Laya.Vector2(0, 0);

    onAwake() {
        this._ownerSp = this.owner as Laya.Sprite;
    }

    onEnable(): void {
        this._ownerSp.on(Laya.Event.MOUSE_DOWN, this, this.onDown);
    }

    onDisable(): void {
        this._ownerSp.off(Laya.Event.MOUSE_DOWN, this, this.onDown);
        this._ownerSp.off(Laya.Event.MOUSE_UP, this, this.onClickUp);
        this._ownerSp.off(Laya.Event.MOUSE_MOVE, this, this.onMove);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_OnInputRelease);
    }

    protected onDown() {
        var point = this._ownerSp.globalToLocal(new Laya.Point(this._ownerSp.mouseX, this._ownerSp.mouseY));
        this._centerPoint = new Laya.Vector2(point.x, point.y);

        this._ownerSp.on(Laya.Event.MOUSE_MOVE, this, this.onMove);
        this._ownerSp.on(Laya.Event.MOUSE_UP, this, this.onClickUp);
        this._ownerSp.on(Laya.Event.MOUSE_OUT, this, this.onClickUp);

        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_OnInputStart);
    }

    protected onClickUp() {
        this._ownerSp.off(Laya.Event.MOUSE_MOVE, this, this.onMove);
        this._ownerSp.off(Laya.Event.MOUSE_UP, this, this.onClickUp);
        this._ownerSp.off(Laya.Event.MOUSE_OUT, this, this.onClickUp);

        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_OnInputRelease);
    }

    protected onMove() {
        var mouseLocalPoint = this._ownerSp.globalToLocal(new Laya.Point(this._ownerSp.mouseX, this._ownerSp.mouseY));
        var moveX = mouseLocalPoint.x - this._centerPoint.x;
        var moveY = mouseLocalPoint.y - this._centerPoint.y;
        var dirTemp: Laya.Vector2 = new Laya.Vector2(moveX, moveY);

        if (moveX * moveX + moveY * moveY <= 10){
            return;
        }
        
        if (moveX * moveX + moveY * moveY >= 10000) {
            dirTemp.x = 100 * Math.cos(Math.atan2(moveY, moveX));
            dirTemp.y = 100 * Math.sin(Math.atan2(moveY, moveX));
            this._centerPoint = new Laya.Vector2(mouseLocalPoint.x - dirTemp.x, mouseLocalPoint.y - dirTemp.y);
        }
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_OnInputMove, { dir: dirTemp });
    }
}