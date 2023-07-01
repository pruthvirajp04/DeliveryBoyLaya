export default class Goods extends Laya.Script3D {
    protected _sprite3D: Laya.Sprite3D = null;
    protected _nInitScal :Laya.Vector3  = new Laya.Vector3(1,1,1);

    onAwake() {
        this._sprite3D = this.owner as Laya.Sprite3D;
        this._nInitScal = this._sprite3D.transform.scale.clone();
    }

    onUpdate(){
        this._sprite3D.transform.scale = this._nInitScal;
    }
}