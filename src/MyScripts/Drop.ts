export default class Drop extends Laya.Script3D {
    protected _sprite3D: Laya.Sprite3D = null;
    protected _collider: Laya.PhysicsCollider = null;
    protected _scene: Laya.Scene3D = null;
    protected _lines: Laya.PixelLineSprite3D = new Laya.PixelLineSprite3D();

    protected _lineStart: Laya.Vector3 = new Laya.Vector3(0, 0.5, 0);
    protected _lineEnd: Laya.Vector3 = new Laya.Vector3(4, 0.5, 0);
    protected _moveDir: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
    protected _gravity: number = -10;
    protected _highest: number = 0;
    protected _lowst: number = 0;
    protected _lowstZ: number = 0;
    protected _rotateY: number = 0;
    protected _rotateX: number = 0;
    protected _ShakeX: number = 0;
    protected _ShakeXPer: number = 0;
    protected _bStart: boolean = false;
    protected _bRotate: boolean = false;
    protected _bDrop: boolean = false;
    protected _bShake: boolean = false;
    protected _bShakeUp: boolean = true;

    onAwake() {
        this._sprite3D = this.owner as Laya.Sprite3D;
        this._scene = this.owner.scene as Laya.Scene3D;
        this._collider = this.owner.getComponent(Laya.PhysicsCollider);
        this._collider.enabled = false;
        this._highest = this._sprite3D.transform.localPositionY;
        // this._lowst = this._sprite3D.transform.scale.y / 2;
        this._lowst = 0;
        this._lowstZ = this._sprite3D.transform.scale.z / 2;

        this.InitLines();
    }

    onEnable(): void {
    }

    onDisable(): void {
    }

    onUpdate(): void {
        if (this._bStart) {
            if (this._bDrop) {
                if (this._sprite3D.transform.localPositionY <= this._lowst + Math.sin(Math.abs(this._sprite3D.transform.localRotationEulerX) * Math.PI / 180) * this._lowstZ) {
                    this._sprite3D.transform.localPositionY = this._lowst + Math.sin(Math.abs(this._sprite3D.transform.localRotationEulerX) * Math.PI / 180) * this._lowstZ;
                    this._bDrop = false;
                    this._bShake = true;
                }
                else {
                    this._moveDir.y += (this._gravity * Laya.timer.delta / 1000);
                    this._sprite3D.transform.translate(new Laya.Vector3(this._moveDir.x * Laya.timer.delta / 1000, this._moveDir.y * Laya.timer.delta / 1000, this._moveDir.z * Laya.timer.delta / 1000), false);
                    this._sprite3D.transform.localRotationEulerY += this._rotateY;
                    if (this._bRotate) {
                        this._sprite3D.transform.localRotationEulerX += this._rotateX;
                    }
                }

                this.CheckCollision();
            }

            if (this._bShake) {
                if (this._ShakeX < 2.5) {
                    this._sprite3D.transform.localPositionY = this._lowst;
                    this._sprite3D.transform.localRotationEulerX = 0;
                    this._bShake = false;
                    this.DropStop();
                }
                else {
                    if (this._bShakeUp) {
                        this._sprite3D.transform.localRotationEulerX += this._ShakeXPer;
                        if (this._sprite3D.transform.localRotationEulerX >= this._ShakeX) {
                            this._sprite3D.transform.localRotationEulerX = this._ShakeX;
                            this._bShakeUp = false;
                        }
                    }
                    else {
                        this._sprite3D.transform.localRotationEulerX -= this._ShakeXPer;
                        if (this._sprite3D.transform.localRotationEulerX <= this._ShakeX) {
                            this._sprite3D.transform.localRotationEulerX = -this._ShakeX;
                            this._ShakeX = this._ShakeX / 2;
                            this._ShakeXPer = this._ShakeX / 5 > 1 ? this._ShakeX / 5 : 1;
                            this._bShakeUp = true;
                        }
                    }
                    this._sprite3D.transform.localPositionY = this._lowst + Math.sin(Math.abs(this._sprite3D.transform.localRotationEulerX) * Math.PI / 180) * this._lowstZ;
                }
            }
        }
    }

    protected InitLines() {
        this._lines.maxLineCount = 1;
        this._scene.addChild(this._lines);
        this._lineStart = this._sprite3D.transform.position.clone();
        this._lineEnd = this._lineStart.clone();
        this._lines.addLine(this._lineStart, this._lineEnd, Laya.Color.WHITE, Laya.Color.WHITE);
    }

    public DropStart(initDir: Laya.Vector3, bRotate: boolean = false) {
        this._moveDir = initDir;
        this._bStart = true;
        this._bRotate = true;
        this._bDrop = true;
        this._rotateY = Math.random() * this._highest * 2 - this._highest;
        this._rotateX = (Math.random() * this._highest) * 10;
        this._ShakeX = (Math.random() * this._highest) * 10;
        this._ShakeXPer = this._ShakeX / 5 > 1 ? this._ShakeX / 5 : 1;
    }


    public DropStop() {
        this._collider.enabled = true;
        this.destroy();
    }

    protected CheckCollision() {
        this._lineStart = this._sprite3D.transform.position.clone();
        this._lineEnd = this._lineStart.clone();
        this._lineEnd.x += this._moveDir.x / 5;
        this._lineEnd.z += this._moveDir.z / 5;
        // this._lines.setLine(0, this._lineStart, this._lineEnd, Laya.Color.WHITE, Laya.Color.WHITE);

        var HitResult: Array<Laya.HitResult> = new Array<Laya.HitResult>();
        this._scene.physicsSimulation.raycastAllFromTo(this._lineStart, this._lineEnd, HitResult);
        for (var index = 0; index < HitResult.length; index++) {
            var other: Laya.Sprite3D = HitResult[index].collider.owner as Laya.Sprite3D;
            if (other.name.indexOf("Wall") > -1 || other.name == "Battery" || other.name.indexOf("Barrier") > -1) {
                var normal: Laya.Vector3 = HitResult[index].normal.clone();
                var IdotN = normal.x * this._moveDir.x + normal.y * this._moveDir.y + normal.z * this._moveDir.z;
                this._moveDir = new Laya.Vector3(this._moveDir.x - 2 * IdotN * normal.x, this._moveDir.y - 2 * IdotN * normal.y, this._moveDir.z - 2 * IdotN * normal.z);
            }
        }
    }

}