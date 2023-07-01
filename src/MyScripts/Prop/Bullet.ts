export default class Bullet extends Laya.Script3D {
    protected _sprite3D: Laya.MeshSprite3D = null;
    protected _rigid: Laya.Rigidbody3D = null;

    protected _moveDir: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
    protected _moveSpeed: number = 6;

    onAwake() {
        this._sprite3D = this.owner as Laya.MeshSprite3D;
        this._rigid = this.owner.getComponent(Laya.Rigidbody3D);

        this.InitRigid();
    }

    onEnable(): void {
    }


    onDisable() {
        Laya.timer.frameOnce(1, this, () => {
            this._sprite3D.destroy();
        })
    }

    onUpdate() {
        this._rigid.wakeUp();
    }

    onDestroy() {
        Laya.timer.clearAll(this);
    }

    onCollisionEnter(collision: Laya.Collision) {
        var other: Laya.Sprite3D = collision.other.owner as Laya.Sprite3D;
        // console.log("Bullet : onCollisionEnter : other.name  = " + other.name);
        if (other.name == "Goods") {
            var normal: Laya.Vector3 = collision.contacts[0].normal.clone();
            var IdotN = normal.x * this._moveDir.x + normal.y * this._moveDir.y + normal.z * this._moveDir.z;
            this._moveDir = new Laya.Vector3(this._moveDir.x - 2 * IdotN * normal.x,
                this._moveDir.y - 2 * IdotN * normal.y, this._moveDir.z - 2 * IdotN * normal.z);
            this._rigid.linearVelocity = this._moveDir;
        }
        else {
            this._sprite3D.meshRenderer.enable = false;
            this._sprite3D.getChildByName("EffectBoom").active = true;
            this._moveDir = new Laya.Vector3(0, 0, 0);
            this._rigid.linearVelocity = this._moveDir;
            this._rigid.enabled = false;
            Laya.timer.once(1500, this, () => {
                this._sprite3D.active = false;
            })
        }
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
        this._rigid.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER | Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1;

        this._moveDir.x = -this._moveSpeed * Math.cos(this._sprite3D.transform.localRotationEulerY * Math.PI / 180);
        this._moveDir.z = this._moveSpeed * Math.sin(this._sprite3D.transform.localRotationEulerY * Math.PI / 180);
        this._moveDir.y = 0;
        this._rigid.linearVelocity = this._moveDir;
    }
}