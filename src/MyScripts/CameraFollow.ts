import Utilit from "../Utilit";

export default class CameraFollow extends Laya.Script3D {

    constructor() { super(); }
    public _camera: Laya.Camera = null;
    public _spriteRole: Laya.Sprite3D = null;

    public _initPos = new Laya.Vector3(0, 47.5, -60);

    onAwake() {
        console.log("设置相机移动");
        this._camera = this.owner as Laya.Camera
        this._spriteRole = this.owner.scene.getChildByName("Role") as Laya.Sprite3D;
        this.InitCamera()
    }

    InitCamera() {//初始化相机和玩家的距离
        this._initPos = this._camera.transform.localPosition.clone();
    }

    onLateUpdate() {
        this._camera.transform.localPositionX = Utilit.Lerp_ZMDGJ_(this._camera.transform.localPositionX, this._initPos.x + this._spriteRole.transform.localPositionX, 0.2);
        this._camera.transform.localPositionZ = Utilit.Lerp_ZMDGJ_(this._camera.transform.localPositionZ, this._initPos.z + this._spriteRole.transform.localPositionZ, 0.2);
    }

}