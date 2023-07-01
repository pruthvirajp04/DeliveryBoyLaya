export default class Coin extends Laya.Script3D {
    protected _sprite3D: Laya.Sprite3D = null;
    protected _bUp: boolean = true;
    protected _bRotate: boolean = true;
    protected _bSmaller: boolean = true;
    protected _nScal: number = 1;
    protected _nInitScal: Laya.Vector3 = new Laya.Vector3(1, 0.1, 1);

    onAwake() {
        this._sprite3D = this.owner as Laya.Sprite3D;
        this._nInitScal = this._sprite3D.transform.localScale.clone();
    }

    onUpdate() {
        if (this._bUp) {
            if (this._sprite3D.transform.localRotationEulerX < 90) {
                this._sprite3D.transform.localRotationEulerX += 18;
                this._sprite3D.transform.localPositionY += 0.18;
            }
            else {
                this._bUp = false;
                this._bRotate = true;
                if(this.owner.name == "Coin"){
                    if(this._sprite3D.getChildByName("EffectCoin")!=null){
                        this._sprite3D.getChildByName("EffectCoin").active = true;
                    }
                }
                Laya.timer.once(500, this, () => {
                    this._bRotate = false;
                    this._bSmaller = true;
                });
            }
        }
        else if (this._bRotate) {
            this._sprite3D.transform.localRotationEulerY += 30;
        }
        else if (this._bSmaller) {
            if (this._nScal <= 0.1) {
                this._sprite3D.active = false;
            }
            else {
                this._nScal -= 0.1;
                this._sprite3D.transform.localScale = new Laya.Vector3(this._nInitScal.x * this._nScal, this._nInitScal.y * this._nScal, this._nInitScal.z * this._nScal)
            }
        }
    }

    onEnable(): void {
    }

    onDisable() {
        Laya.timer.frameOnce(1, this, () => {
            this._sprite3D.destroy();
        })
    }

    onDestroy() {
        Laya.timer.clearAll(this);
    }
}