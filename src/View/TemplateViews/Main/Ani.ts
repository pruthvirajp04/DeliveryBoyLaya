export default class Ani extends Laya.Script {
    protected _mArmature: Laya.Skeleton = null;

    onEnable(): void {
        var _name = "subRes/Ani/NewProject.sk";
        this._mArmature = new Laya.Skeleton();
        this.owner.addChild(this._mArmature);
        this._mArmature.load(_name, Laya.Handler.create(this, (res) => {
            res.lock = true;
        }));
    }

    onDisable(): void {
    }
}