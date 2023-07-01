import Bullet from "./Bullet";
import Utilit_ZMDGJ_ from "../../Utilit";
import Event_ZMDGJ_Mgr from "../../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../../Event/EventDef";
import Sound_ZMDGJ_Mgr from "../../Mgr/SoundMgr";

export default class Battery extends Laya.Script3D {
    protected _sprite3D: Laya.Sprite3D = null;
    protected _rotateSprite3D: Laya.Sprite3D = null;
    protected _targetSprite3D: Laya.Sprite3D = null;
    protected _RayPoint1Sprite3D: Laya.Sprite3D = null;
    protected _RayPoint2Sprite3D: Laya.Sprite3D = null;

    protected _bulletPre: Laya.Sprite3D = null;
    protected _scene: Laya.Scene3D = null;

    protected _bRotate: boolean = false;
    protected _bStart: boolean = false;
    protected _nCDTime: number = 3000;
    protected _nBlood: number = 3;
    protected _targetRotation: number = 1000;
    protected _angleSpeed: number = 0.5;    
    protected _lineStart: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
    protected _lineEnd: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
    
    onAwake() {
        this._sprite3D = this.owner as Laya.Sprite3D;
        this._rotateSprite3D = this._sprite3D.getChildByName("Rotate") as Laya.Sprite3D;
        this._RayPoint1Sprite3D = this._sprite3D.getChildByName("RayPoint1") as Laya.Sprite3D;
        this._RayPoint2Sprite3D = this._sprite3D.getChildByName("RayPoint2") as Laya.Sprite3D;
        this._bulletPre = this._sprite3D.getChildByName("Bullet") as Laya.Sprite3D;
        this._scene = this._sprite3D.scene as Laya.Scene3D;
        this._targetSprite3D = this._scene.getChildByName("Role") as Laya.Sprite3D;

        this._bRotate = this._rotateSprite3D.active;
        this._bulletPre.active = false;

    }

    onEnable(): void {
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_On_ZMDGJ_Level_ZMDGJ_Start, this, this.ShootStart);
    }

    onDisable(): void {
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_On_ZMDGJ_Level_ZMDGJ_Start, this, this.ShootStart);
        Laya.timer.frameOnce(1, this, () => {
            this._sprite3D.destroy();
        })
    }

    onUpdate() {
        if (this._bRotate && this._bStart) {
            var dir: Laya.Vector2 = new Laya.Vector2(0, 0);
            dir.x = this._targetSprite3D.transform.position.x - this._sprite3D.transform.position.x;
            dir.y = this._targetSprite3D.transform.position.z - this._sprite3D.transform.position.z;
            this._targetRotation = Math.atan2(dir.y, -dir.x) * 180 / Math.PI;
            this._sprite3D.transform.localRotationEulerY = Utilit_ZMDGJ_.lerp_ZMDGJ_Euler_ZMDGJ_Angle(this._sprite3D.transform.localRotationEulerY, this._targetRotation, this._angleSpeed);
        }

        this.CheckCollision();
    }

    onDestroy() {
        Laya.timer.clearAll(this);
    }

    onCollisionEnter(collision: Laya.Collision) {
        var other: Laya.Sprite3D = collision.other.owner as Laya.Sprite3D;
        if (other.name == "Bullet") {
            this._nBlood--;
            if (this._nBlood <= 0) {
                this._sprite3D.active = false;
            }
        }
    }



    protected CheckCollision() {
        this._lineStart = this._RayPoint1Sprite3D.transform.position.clone();
        this._lineEnd = this._RayPoint2Sprite3D.transform.position.clone();

        var HitResult: Array<Laya.HitResult> = new Array<Laya.HitResult>();
        this._scene.physicsSimulation.raycastAllFromTo(this._lineStart, this._lineEnd, HitResult);
        for (var index = 0; index < HitResult.length; index++) {
            var other: Laya.Sprite3D = HitResult[index].collider.owner as Laya.Sprite3D;
            if (other.name == "Goods") {
                var moveX = this._RayPoint2Sprite3D.transform.position.x - this._RayPoint1Sprite3D.transform.position.x;
                var moveZ = this._RayPoint2Sprite3D.transform.position.z - this._RayPoint1Sprite3D.transform.position.z;
                other.transform.position = new Laya.Vector3(other.transform.position.x + 0.1 * moveX, other.transform.position.y, other.transform.position.z + 0.1 * moveZ);
            }
        }
    }

    protected ShootStart() {
        this.Shoot();
        Laya.timer.loop(this._nCDTime, this, this.Shoot);
        this._bStart = true;
    }

    protected Shoot() {
        var bulletIns: Laya.Sprite3D = Laya.Sprite3D.instantiate(this._bulletPre, this._scene);
        bulletIns.addComponent(Bullet);
        bulletIns.active = true;
        Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_Sound("Shoot");
    }
}