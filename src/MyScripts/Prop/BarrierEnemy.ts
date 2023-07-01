
import Event_ZMDGJ_Mgr from "../../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../../Event/EventDef";
import Utilit_ZMDGJ_ from "../../Utilit";
import Sound_ZMDGJ_Mgr from "../../Mgr/SoundMgr";

export default class BarrierEnemy extends Laya.Script3D {
    protected _sprite3D: Laya.Sprite3D = null;
    protected _rigid: Laya.Rigidbody3D = null;
    protected _animator: Laya.Animator = null;
    protected _followSprite3D: Laya.Sprite3D = null;
    protected _targetSprite3D: Laya.Sprite3D = null;
    protected _scene: Laya.Scene3D = null;

    protected _bStart: boolean = false;
    protected _bFollow: boolean = false;
    protected _bMove: boolean = false;
    protected _bCollision: boolean = false;
    protected _nTriggerDis: number = 2;
    protected _moveSpeed: number = 1.5;
    protected _moveDir: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
    protected _targetRotation: number = 1000;
    protected _angleSpeed: number = 4;

    onAwake() {
        this._sprite3D = this.owner as Laya.Sprite3D;
        this._rigid = this.owner.getComponent(Laya.Rigidbody3D);
        this._animator = this._sprite3D.getChildByName("BarrierEnemy").getComponent(Laya.Animator) as Laya.Animator;
        this._followSprite3D = this._sprite3D.getChildByName("IsFollow") as Laya.Sprite3D;
        this._scene = this._sprite3D.scene as Laya.Scene3D;
        this._targetSprite3D = this._scene.getChildByName("Role") as Laya.Sprite3D;

        this._bFollow = this._followSprite3D.active;
        this._animator.enabled = false;
        this.InitRigid();
    }

    onEnable(): void {
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_On_ZMDGJ_Level_ZMDGJ_Start, this, this.LevelStart);
    }

    onDisable(): void {
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_On_ZMDGJ_Level_ZMDGJ_Start, this, this.LevelStart);
        Laya.timer.frameOnce(1, this, () => {
            this._sprite3D.destroy();
        })
    }

    onDestroy() {
        Laya.timer.clearAll(this);
    }

    onUpdate() {
        var dir: Laya.Vector2 = new Laya.Vector2(0, 0);
        dir.x = this._targetSprite3D.transform.position.x - this._sprite3D.transform.position.x;
        dir.y = this._targetSprite3D.transform.position.z - this._sprite3D.transform.position.z;
        var distance: number = Math.sqrt(dir.x * dir.x + dir.y * dir.y);

        this.CheckMove(distance);
        if (!this._bMove || !this._bStart || this._bCollision) {
            this._moveDir = new Laya.Vector3(0, 0, 0);
            this._rigid.linearVelocity = this._moveDir;
            this._animator.enabled = false;
            return;
        }

        this._targetRotation = Math.atan2(dir.y, -dir.x) * 180 / Math.PI;
        this._sprite3D.transform.localRotationEulerY = Utilit_ZMDGJ_.lerp_ZMDGJ_Euler_ZMDGJ_Angle(this._sprite3D.transform.localRotationEulerY, this._targetRotation, this._angleSpeed);

        this._moveDir.x = -this._moveSpeed * Math.cos(this._sprite3D.transform.localRotationEulerY * Math.PI / 180);
        this._moveDir.z = this._moveSpeed * Math.sin(this._sprite3D.transform.localRotationEulerY * Math.PI / 180);
        this._moveDir.y = 0;
        this._rigid.linearVelocity = this._moveDir;
        if(!this._animator.enabled){
            this._animator.enabled = true;
            Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_Sound("Snake");
        }
    }

    onCollisionEnter(collision: Laya.Collision) {
        var other: Laya.Sprite3D = collision.other.owner as Laya.Sprite3D;
        console.log(other.name);

        if(other.name == "Role"){
            this._bCollision = true;
            Laya.timer.once(2000,this,()=>{
                this._bCollision = false; 
            })
        }
        else if(other.name == "Bullet"){
            this._sprite3D.active = false;
        }
        
    }

    protected InitRigid() {
        this._rigid.restitution = 0;
        this._rigid.friction = 0;
        this._rigid.rollingFriction = 0;
        this._rigid.linearDamping = 0;
        this._rigid.angularDamping = 0;
        this._rigid.gravity = new Laya.Vector3(0, 0, 0);
        this._rigid.linearFactor = new Laya.Vector3(1, 0, 1);
        this._rigid.angularFactor = new Laya.Vector3(0, 0, 0);
        this._rigid.sleepLinearVelocity = -1;
        this._rigid.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER | Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1;
    }

    protected LevelStart() {
        this._bStart= true;
    }

    protected CheckMove(distance: number) {
        if (this._bFollow || (!this._bFollow && distance < this._nTriggerDis)) {
            this._bMove = true;
        }
        else {
            this._bMove = false;
        }
    }
}