import User_ZMDGJ_ from "../../../User/User";
import Game_ZMDGJ_Mgr from "../../../Mgr/GameMgr";
import Event_ZMDGJ_Mgr from "../../../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../../../Event/EventDef";
import Utilit_ZMDGJ_ from "../../../Utilit";

export default class GameInfo extends Laya.Script {
    protected _center_ZMDGJ_Zone: Laya.Clip = null;
    protected _level_ZMDGJ_Num: Laya.FontClip = null;
    protected _AllBoxNum: Laya.FontClip = null;
    protected _BoxNum: Laya.FontClip = null;
    protected _CoinNum: Laya.FontClip = null;
    protected _BloodInfoBar: Laya.Clip = null;
    protected _HintInfo: Laya.Clip = null;
    protected _nBloodInfoBarWidth: number = 0;
    protected _scene: Laya.Scene3D = null;
    protected _goodsAllSprite: Laya.Sprite3D = null;
    protected _terminusSprite: Laya.Sprite3D = null;
    protected _targetSprite3D: Laya.Sprite3D = null;

    onAwake() {
        this._center_ZMDGJ_Zone = this.owner as Laya.Clip;
        this._level_ZMDGJ_Num = this._center_ZMDGJ_Zone.getChildByName("LevelInfo").getChildByName("LevelNum") as Laya.FontClip;
        this._AllBoxNum = this._center_ZMDGJ_Zone.getChildByName("BoxInfo").getChildByName("AllBoxNum") as Laya.FontClip;
        this._BoxNum = this._center_ZMDGJ_Zone.getChildByName("BoxInfo").getChildByName("BoxNum") as Laya.FontClip;
        this._CoinNum = this._center_ZMDGJ_Zone.getChildByName("CoinInfo").getChildByName("CoinNum") as Laya.FontClip;
        this._BloodInfoBar = this._center_ZMDGJ_Zone.getChildByName("BloodInfo").getChildByName("BloodInfoBar") as Laya.Clip;
        this._HintInfo = this._center_ZMDGJ_Zone.getChildByName("HintInfo") as Laya.Clip;

        this._scene = Game_ZMDGJ_Mgr.get_ZMDGJ_Instance().CurLevel.owner as Laya.Scene3D;
        this._goodsAllSprite = this._scene.getChildByName("Objects").getChildByName("GoodsAll") as Laya.Sprite3D;
        this._terminusSprite = this._scene.getChildByName("Objects").getChildByName("Terminus") as Laya.Sprite3D;
        this._targetSprite3D = this._scene.getChildByName("Role") as Laya.Sprite3D;

        if (Utilit_ZMDGJ_.is_ZMDGJ_IphoneX())  {
            (this._center_ZMDGJ_Zone.getChildByName("LevelInfo") as Laya.Clip).top += 75;
            (this._center_ZMDGJ_Zone.getChildByName("CoinInfo") as Laya.Clip).top += 75;
            (this._center_ZMDGJ_Zone.getChildByName("BoxInfo") as Laya.Clip).top += 75;
        }
        if(Laya.stage.width / Laya.stage.height  > 0.5) {
            (this._center_ZMDGJ_Zone.getChildByName("BloodInfo") as Laya.Clip).top -= 150;
            (this._center_ZMDGJ_Zone.getChildByName("HintInfo") as Laya.Clip).top -= 150;
        }
    }

    onStart() {
        this._level_ZMDGJ_Num.value = String(User_ZMDGJ_.get_ZMDGJ_LeveNum());
        this._AllBoxNum.value = String(Game_ZMDGJ_Mgr.get_ZMDGJ_Instance().CurLevel.AllBoxNum);
        this._BoxNum.value = String(0);
        this._CoinNum.value = String(User_ZMDGJ_.get_ZMDGJ_Money());
        this._nBloodInfoBarWidth = this._BloodInfoBar.width;
    }

    onEnable(): void {
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_BoxChange, this, this.BoxNumChange);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_BloodChange, this, this.BloodNumChange);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_On_ZMDGJ_User_ZMDGJ_Money_ZMDGJ_Change, this, this.CoinNumChange);
    }

    onDisable(): void {
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_BoxChange, this, this.BoxNumChange);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_BloodChange, this, this.BloodNumChange);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_On_ZMDGJ_User_ZMDGJ_Money_ZMDGJ_Change, this, this.CoinNumChange);
    }

    onUpdate(): void {
        this.HintChange();
    }

    protected BoxNumChange(para) {
        this._BoxNum.value = (para.RoleNum as number).toString();
    }

    protected BloodNumChange(para) {
        this._BloodInfoBar.width = this._nBloodInfoBarWidth * ((para.BloodNum as number) / 100);
    }

    protected CoinNumChange() {
        this._CoinNum.value = String(User_ZMDGJ_.get_ZMDGJ_Money());
    }

    protected HintChange(){
        var index: number = -1;
        var minDis: number = 99999;
        var dir: Laya.Vector2 = new Laya.Vector2(0, 0);

        for (var i: number = 0; i < this._goodsAllSprite.numChildren; i++) {
            dir.x = (this._goodsAllSprite.getChildAt(i) as Laya.Sprite3D).transform.position.x - this._targetSprite3D.transform.position.x;
            dir.y = (this._goodsAllSprite.getChildAt(i) as Laya.Sprite3D).transform.position.z - this._targetSprite3D.transform.position.z;
            var distance: number = Math.sqrt(dir.x * dir.x + dir.y * dir.y);

            if(distance < minDis){
                index =i;
                minDis = distance;
            }
        }

        if(index != -1){
            dir.x = (this._goodsAllSprite.getChildAt(index) as Laya.Sprite3D).transform.position.x - this._targetSprite3D.transform.position.x;
            dir.y = (this._goodsAllSprite.getChildAt(index) as Laya.Sprite3D).transform.position.z - this._targetSprite3D.transform.position.z;
        }
        else{
            dir.x = this._terminusSprite.transform.position.x - this._targetSprite3D.transform.position.x;
            dir.y = this._terminusSprite.transform.position.z - this._targetSprite3D.transform.position.z;
        }
        this._HintInfo.rotation = Math.atan2(-dir.y, -dir.x) * 180 / Math.PI;
    }
}