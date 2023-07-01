import { Event_ZMDGJ_Def } from "../../Event/EventDef";
import Event_ZMDGJ_Mgr from "../../Event/EventMgr";
import Vibrate_ZMDGJ_Mgr from "../../Mgr/VibrateMgr";
import Coin from "../Coin/Coin";
import Drop from "../Drop";
import User_ZMDGJ_ from "../../User/User";
import Game_ZMDGJ_Mgr from "../../Mgr/GameMgr";
import Sound_ZMDGJ_Mgr from "../../Mgr/SoundMgr";

export default class Role extends Laya.Script3D {
    protected _sprite3D: Laya.Sprite3D = null;
    protected _rigid: Laya.Rigidbody3D = null;
    protected _animator: Laya.Animator = null;
    protected _boxsSprite3D: Laya.Sprite3D = null;
    protected _effectsSprite3D: Laya.Sprite3D = null;
    protected _coinPre: Laya.Sprite3D = null;
    protected _boxsObects: Laya.Sprite3D = null;
    protected _coinsObects: Laya.Sprite3D = null;
    protected _roleMesh: Laya.Sprite3D = null;
    protected _skinMesh: Laya.SkinnedMeshSprite3D = null;
    protected _skinMaterials: Array<Laya.BaseMaterial> = [];

    protected _bHit: boolean = false;
    protected _moveDir: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
    protected _hittedMoveDir: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
    protected _moveSpeed: number = 0.06;
    protected _moveSpeedNormal: number = 0.06;
    protected _moveSpeedSlow: number = 0.04;
    protected _targetRotation: number = 1000;
    protected _nBlood: number = 100;

    protected _nScalMax: number = 1.5;
    protected _nScal: number = 1;
    protected _BoxPoint: Laya.Vector3 = new Laya.Vector3(1, 1, 1);
    protected _nSpeedPer: number = 1;
    protected _bSuperMan: boolean = false;

    onAwake() {
        this._sprite3D = this.owner as Laya.Sprite3D;
        this._rigid = this.owner.getComponent(Laya.Rigidbody3D);
        this._roleMesh = this._sprite3D.getChildByName("Role") as Laya.Sprite3D;
        this._animator = this._roleMesh.getComponent(Laya.Animator) as Laya.Animator;
        this._boxsSprite3D = this._sprite3D.getChildByName("Boxs") as Laya.Sprite3D;
        this._effectsSprite3D = this._sprite3D.getChildByName("Effects") as Laya.Sprite3D;
        this._coinPre = this._sprite3D.getChildByName("Coin") as Laya.Sprite3D;
        this._boxsObects = this._sprite3D.scene.getChildByName("Objects").getChildByName("GoodsAll") as Laya.Sprite3D;
        this._coinsObects = this._sprite3D.scene.getChildByName("Objects").getChildByName("Coins") as Laya.Sprite3D;
        this._BoxPoint = this._boxsSprite3D.transform.localPosition.clone();
        this._skinMesh = this._roleMesh.getChildByName("Box001") as Laya.SkinnedMeshSprite3D;
        this._skinMaterials = this._skinMesh.skinnedMeshRenderer.materials;

        this._animator.play("IdleNormal");
        this.InitRigid();
        this.ChangeSkin(User_ZMDGJ_.curUsedItem);
    }

    protected InitRigid() {
        this._rigid.restitution = 0;
        this._rigid.friction = 0;
        this._rigid.rollingFriction = 0;
        this._rigid.linearDamping = 0;
        this._rigid.angularDamping = 0;
        this._rigid.linearFactor = new Laya.Vector3(1, 0, 1);
        this._rigid.angularFactor = new Laya.Vector3(0, 0, 0);
        this._rigid.gravity = new Laya.Vector3(0, 0, 0);
        this._rigid.sleepLinearVelocity = -1;
        this._rigid.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1;
        (this._coinPre.getComponent(Laya.PhysicsCollider) as Laya.PhysicsCollider).collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;
    }

    onEnable() {
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_OnInputStart, this, this.onMoveStart);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_OnInputRelease, this, this.onMoveStop);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_OnInputMove, this, this.onMoving);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_TrySkin, this, this.TrySkin);
    }

    onDisable() {
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_OnInputStart, this, this.onMoveStart);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_OnInputRelease, this, this.onMoveStop);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_OnInputMove, this, this.onMoving);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_TrySkin, this, this.TrySkin);
        Laya.timer.frameOnce(1, this, () => {
            this._sprite3D.destroy();
        })
    }

    onDestroy() {
        Laya.timer.clearAll(this);
    }

    onUpdate() {
        this._rigid.wakeUp();
        this._rigid.linearVelocity = this._bHit ? this._hittedMoveDir : this._moveDir;
    }

    onCollisionEnter(collision: Laya.Collision) {
        this.Collision(collision);
    }

    onCollisionStay(collision: Laya.Collision) {
        // this.Collision(collision);
    }

    protected Collision(collision: Laya.Collision) {
        var other: Laya.Sprite3D = collision.other.owner as Laya.Sprite3D;
        collision.other.enabled = false;

        switch (other.name) {
            case "Goods": {
                this._boxsSprite3D.addChild(other);
                other.transform.localPosition = new Laya.Vector3(Math.random() * 0.1 - 0.03, (this._boxsSprite3D.numChildren - 1) * 0.6, Math.random() * 0.1 - 0.03);
                other.transform.localRotationEulerY = 0;

                this._moveSpeed = this._moveSpeedSlow;
                if (this._moveDir.x != 0 || this._moveDir.z != 0) {
                    this._animator.play("Walk");
                }
                else {
                    this._animator.play("IdleBoxs");
                }

                Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_BoxChange, { RoleNum: this._boxsSprite3D.numChildren })
                Vibrate_ZMDGJ_Mgr.vibrate_ZMDGJ_(250);
                break;
            }
            case "SpeedUp": {
                this._nSpeedPer = 1.5;
                Laya.timer.once(5000, this, () => {
                    this._nSpeedPer = 1;
                });
                other.removeSelf();
                break;
            }
            case "SuperMan": {
                this._bSuperMan = true;
                console.log("SuperMan");
                Laya.timer.once(3000, this, () => {
                    this._bSuperMan = false;
                });
                other.removeSelf();
                break;
            }
            case "Blood": {
                this._nBlood += 20;
                this._nBlood = this._nBlood > 100 ? 100 : this._nBlood;
                other.removeSelf();
                Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_BloodChange, { BloodNum: this._nBlood });
                break;
            }
            case "Coin":
            case "Mail":
            case "Diamond": {
                var award = other.name == "Coin" ? 1 : 10;
                other.addComponent(Coin);
                User_ZMDGJ_.add_ZMDGJ_Money(award);
                Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_Sound("Coin");
                if (this._nScal < 1.5) {
                    this._nScal += 0.01;
                    this._sprite3D.transform.localScaleZ = this._sprite3D.transform.localScaleY = this._sprite3D.transform.localScaleX = this._nScal;
                    this._boxsSprite3D.transform.localPosition = new Laya.Vector3(this._BoxPoint.x + 0.3 * (this._nScal - 1), this._BoxPoint.y + 0.3 * (this._nScal - 1), this._BoxPoint.z);
                }
                break;
            }
            case "Bullet":
            case "BarrierBall":
            case "BarrierEnemy":
            case "BarrierBull": {
                collision.other.enabled = other.name != "Bullet";
                var normal: Laya.Vector3 = collision.contacts[0].normal.clone();
                this.beHitted(normal, true);
                Vibrate_ZMDGJ_Mgr.vibrate_ZMDGJ_(300);
                break;
            }
            case "BarrierHammer":{
                collision.other.enabled = true;
                var normal: Laya.Vector3 = collision.contacts[0].normal.clone();
                this.beHitted(normal, false);
                this._hittedMoveDir = new Laya.Vector3(0,0,0);
                this._effectsSprite3D.getChildByName("EffectHitted").active = true;
                Laya.timer.once(1500,this,()=>{
                    this._effectsSprite3D.getChildByName("EffectHitted").active = false;
                });
                Vibrate_ZMDGJ_Mgr.vibrate_ZMDGJ_(300);
                break;
            }
            case "BarrierStab":{
                collision.other.enabled = true;
                var normal: Laya.Vector3 = collision.contacts[0].normal.clone();
                this.beHitted(normal, false);
                this._hittedMoveDir = new Laya.Vector3(0,0,0);
                Vibrate_ZMDGJ_Mgr.vibrate_ZMDGJ_(300);
                break;
            }
            case "Terminus": {
                collision.other.enabled = true;
                if (this._boxsObects.numChildren <= 0) {
                    Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_Sound("Win");
                    Vibrate_ZMDGJ_Mgr.vibrate_ZMDGJ_(500);
                    Game_ZMDGJ_Mgr.get_ZMDGJ_Instance().CurLevel.LevelOver(true);
                }
                break;
            }

            default: {
                collision.other.enabled = true;
                break;
            }

        }
        this._rigid.linearVelocity = this._bHit ? this._hittedMoveDir : this._moveDir;
    }

    protected beHitted(normal: Laya.Vector3, bReflect: boolean = false) {
        if (this._bHit || this._bSuperMan) {
            return;
        }

        this._nBlood -= 20;
        this._nScal = 1;
        this._sprite3D.transform.localScaleZ = this._sprite3D.transform.localScaleY = this._sprite3D.transform.localScaleX = this._nScal;
        this._boxsSprite3D.transform.localPosition = this._BoxPoint;
        if (this._nBlood <= 0) {
            Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_Sound("Fail");
            Game_ZMDGJ_Mgr.get_ZMDGJ_Instance().CurLevel.LevelOver(false)
        }
        this._bHit = true;
        this._moveSpeed = this._moveSpeedNormal;
        this._hittedMoveDir = bReflect ? new Laya.Vector3(100 * normal.x * this._moveSpeed, 0, 100 * normal.z * this._moveSpeed) : this._moveDir;

        if (this._boxsSprite3D.numChildren > 0) {
            this._animator.play("HittedBoxs");
        }
        else {
            this._animator.play("HittedNormal");
        }
        Laya.timer.once(300, this, () => {
            this._bHit = false;
            this._rigid.linearVelocity = this._moveDir;
        });

        this.GoodsDrop(normal);
        this.CoinDrop();
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_BoxChange, { RoleNum: this._boxsSprite3D.numChildren })
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_BloodChange, { BloodNum: this._nBlood })
    }

    protected GoodsDrop(normal: Laya.Vector3) {
        for (var i = 0; this._boxsSprite3D.numChildren > 0; i++) {
            var good: Laya.Sprite3D = this._boxsSprite3D.getChildAt(0) as Laya.Sprite3D;
            var pos: Laya.Vector3 = good.transform.position.clone();
            var rotate: Laya.Vector3 = good.transform.rotationEuler.clone();

            this._boxsObects.addChild(good);
            good.transform.localPosition = pos;
            good.transform.localRotationEuler = rotate;

            var speedRandom: number = Math.random() + i * 2;
            (good.addComponent(Drop) as Drop).DropStart(new Laya.Vector3(speedRandom * normal.x, 0, speedRandom * normal.z));
        }
        Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_Sound("Drop");
    }

    protected CoinDrop() {
        var dropCoinNum: number = 0;
        dropCoinNum = User_ZMDGJ_.get_ZMDGJ_Money() > 10 ? Math.floor(Math.random() * 5) + 5 : User_ZMDGJ_.get_ZMDGJ_Money();
        User_ZMDGJ_.sub_ZMDGJ_Money(dropCoinNum);

        for (var i = 0; i < dropCoinNum; i++) {
            var coin: Laya.Sprite3D = Laya.Sprite3D.instantiate(this._coinPre, this._coinsObects);
            var pos: Laya.Vector3 = this._coinPre.transform.position.clone();
            var rotate: Laya.Vector3 = this._coinPre.transform.rotationEuler.clone();

            coin.transform.localPosition = pos;
            coin.transform.localRotationEuler = rotate;
            coin.active = true;

            var numPer: number = i <= 5 ? i : 5;
            var speedRandomX: number = Math.random() * (1 + numPer) * 3 - (1 + numPer) * 1.5;
            var speedRandomZ: number = Math.random() * (1 + numPer) * 3 - (1 + numPer) * 1.5;
            var speedRandomY: number = Math.random() * 7.5;
            speedRandomX = speedRandomX < 1 ? speedRandomX + 1 : speedRandomX;
            speedRandomZ = speedRandomZ < 1 ? speedRandomZ + 1 : speedRandomZ;

            (coin.addComponent(Drop) as Drop).DropStart(new Laya.Vector3(speedRandomX, speedRandomY, speedRandomZ), true);
        }
    }

    protected onMoveStart() {
    }

    protected onMoveStop() {
        if (!this._bHit) {
            if (this._boxsSprite3D.numChildren > 0) {
                this._animator.play("IdleBoxs");
            }
            else {
                this._animator.play("IdleNormal");
            }
        }

        this._moveDir = new Laya.Vector3(0, 0, 0);
        this._rigid.linearVelocity = this._bHit ? this._hittedMoveDir : this._moveDir;
        Laya.timer.clear(this, this.RotationChange);
    }

    protected onMoving(para) {
        if (!this._bHit) {
            if (this._boxsSprite3D.numChildren > 0) {
                this._animator.play("Walk");
            }
            else {
                this._animator.play("Run");
            }
        }

        var dir: Laya.Vector2 = para.dir;
        this._targetRotation = Math.atan2(-dir.y, dir.x) * 180 / Math.PI;
        this._moveDir = new Laya.Vector3(-dir.x * this._moveSpeed * this._nScal * this._nSpeedPer, 0, -dir.y * this._moveSpeed * 1.1 * this._nScal * this._nSpeedPer);
        this._rigid.linearVelocity = this._bHit ? this._hittedMoveDir : this._moveDir;

        var nMaxChange: number = this._targetRotation - this._sprite3D.transform.localRotationEulerY;
        if (Math.abs(nMaxChange) > 180) {
            nMaxChange = nMaxChange > 0 ? nMaxChange - 360 : nMaxChange + 360;
        }

        // 插值转向 
        if (Math.abs(nMaxChange) <= 10) {
            this._sprite3D.transform.localRotationEulerY = this._targetRotation;
        }
        else {
            var nFrameChange = nMaxChange > 0 ? 10 : -10;
            Laya.timer.frameLoop(1, this, this.RotationChange, [nFrameChange]);
        }
    }

    protected RotationChange(nChange: number) {
        if (Math.abs(this._sprite3D.transform.localRotationEulerY - this._targetRotation) <= 10) {
            this._sprite3D.transform.localRotationEulerY = this._targetRotation;
            Laya.timer.clear(this, this.RotationChange);
            return;
        }
        this._sprite3D.transform.localRotationEulerY += nChange;
    }

    protected ChangeSkin(index: number) {
        this._skinMesh.skinnedMeshRenderer.material = this._skinMaterials[index];
        for (var i = 0; i < this._roleMesh.numChildren; i++) {
            if (this._roleMesh.getChildAt(i).name.indexOf("Hat") == -1) {
                continue;
            }
            this._roleMesh.getChildAt(i).active = this._roleMesh.getChildAt(i).name.indexOf("Hat" + (index + 1).toString()) > -1;
        }
    }

    protected TrySkin(para){
        var skinID: number = para.SkinId;
        this.ChangeSkin(skinID);
    }
}