export default class BarrierStab extends Laya.Script {
    protected _sprite3D: Laya.Sprite3D = null;
    protected _rigid: Laya.Rigidbody3D = null;
    protected _nInitpos :Laya.Vector3  = new Laya.Vector3(0,0,0);
    protected _nInitRotion :Laya.Vector3  = new Laya.Vector3(0,0,0);
    
    onAwake() {
        this._sprite3D = this.owner.getChildByName("BarrierStab") as Laya.Sprite3D;
        this._rigid = this._sprite3D.getComponent(Laya.Rigidbody3D);
        this._nInitpos = this._sprite3D.transform.localPosition.clone();
        this._nInitRotion = this._sprite3D.transform.localRotationEuler.clone();

        this._rigid.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1;
        
    }

    onUpdate(){
        this._sprite3D.transform.localPositionX = this._nInitpos.x;
        this._sprite3D.transform.localPositionZ = this._nInitpos.z;
        this._sprite3D.transform.localRotationEuler = this._nInitRotion;
    }
}