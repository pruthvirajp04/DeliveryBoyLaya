import CameraFollow from "../CameraFollow";
import Role from "../Role/Role";
import Battery from "../Prop/Battery";
import Event_ZMDGJ_Mgr from "../../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../../Event/EventDef";
import Game_ZMDGJ_Mgr from "../../Mgr/GameMgr";
import BarrierEnemy from "../Prop/BarrierEnemy";
import BarrierBull from "../Prop/BarrierBull";
import Goods from "../Prop/Goods";
import BarrierHammer from "../Prop/BarrierHammer";
import BarrierStab from "../Prop/BarrierStab";

export default class Level extends Laya.Script3D {
    protected _scene: Laya.Scene3D = null;
    protected _camera: Laya.Camera = null;
    protected _roleSprite: Laya.Sprite3D = null;
    protected _objectsSprite: Laya.Sprite3D = null;

    protected _role: Role = null;

    protected _isStart: boolean = false;
    public get IsStart(): boolean { return this._isStart; }
    protected _nAllBoxNum: number = 0;
    public get AllBoxNum(): number { return this._nAllBoxNum; }

    onAwake() {
        this._scene = this.owner as Laya.Scene3D;
        this._camera = this.owner.getChildByName("Main Camera") as Laya.Camera;
        this._roleSprite = this.owner.getChildByName("Role") as Laya.Sprite3D;
        this._objectsSprite = this.owner.getChildByName("Objects") as Laya.Sprite3D;

        this.InitCamera();
        this.InitRole();
        this.InitObjects();
    }

    onStart() {
        this.LevelStart();
    }

    onEnable(): void {
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_On_ZMDGJ_Level_ZMDGJ_Start, this, this.LevelStart);
    }

    onDisable(): void {
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_On_ZMDGJ_Level_ZMDGJ_Start, this, this.LevelStart);
    }

    protected InitCamera() {
        this._camera.addComponent(CameraFollow);
    }

    protected InitRole() {
        this._role = this._roleSprite.addComponent(Role);
    }

    protected InitObjects() {
        var GoodsAll: Laya.Sprite3D = this._objectsSprite.getChildByName("GoodsAll") as Laya.Sprite3D;
        var Coins: Laya.Sprite3D = this._objectsSprite.getChildByName("Coins") as Laya.Sprite3D;
        var Batterys: Laya.Sprite3D = this._objectsSprite.getChildByName("Batterys") as Laya.Sprite3D;
        var Barriers: Laya.Sprite3D = this._objectsSprite.getChildByName("Barriers") as Laya.Sprite3D;
        var i: number = 0;

        this._nAllBoxNum = GoodsAll.numChildren;

        for (i = 0; i < GoodsAll.numChildren; i++) {
            GoodsAll.getChildAt(i).addComponent(Goods);

        }

        for (i = 0; i < Coins.numChildren; i++) {
            if ((Coins.getChildAt(i).getComponent(Laya.PhysicsCollider) as Laya.PhysicsCollider) != null) {
                (Coins.getChildAt(i).getComponent(Laya.PhysicsCollider) as Laya.PhysicsCollider).collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;
                (Coins.getChildAt(i).getComponent(Laya.PhysicsCollider) as Laya.PhysicsCollider).isTrigger = true;
            }
        }


        for (i = 0; i < Batterys.numChildren; i++) {
            Batterys.getChildAt(i).addComponent(Battery);
        }

        for (i = 0; i < Barriers.numChildren; i++) {
            switch (Barriers.getChildAt(i).name) {
                case "BarrierEnemy": Barriers.getChildAt(i).addComponent(BarrierEnemy); break;
                case "BarrierBull": Barriers.getChildAt(i).addComponent(BarrierBull); break;
                case "BarrierRock": (Barriers.getChildAt(i).getComponent(Laya.Animator) as Laya.Animator).enabled = false;; break;
                case "BarrierHammer": Barriers.getChildAt(i).addComponent(BarrierHammer); break;
                case "BarrierStab": Barriers.getChildAt(i).addComponent(BarrierStab); break;
            }
        }
    }

    protected LevelStart() {
        this._isStart = true;
    }

    public LevelOver(isWin: boolean) {
        if (!this._isStart) {
            return
        }
        this._isStart = false;
        Game_ZMDGJ_Mgr.get_ZMDGJ_Instance().GameOver(isWin);
    }

    public DestroySelf() {
        if (this._scene) {
            this._scene.active = false;
            Laya.timer.frameOnce(1, this, () => {
                this._scene.removeSelf();
                this._scene.destroy();
            });
        }
    }
}