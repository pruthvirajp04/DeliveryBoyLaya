import Template_ZMDGJ_View_ZMDGJ_Base from "../TemplateViews/TemplateViewBase";
import StoreConfig, { StoreData } from "../../Config/StoreConfig";
import WX_ZMDGJ_API from "../../WXAPI";
import Utilit from "../../Utilit";
import User_ZMDGJ_ from "../../User/User";
import Event_ZMDGJ_Mgr from "../../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../../Event/EventDef";
import View_ZMDGJ_Mgr, { View_ZMDGJ_Def } from "../../Mgr/ViewMgr";
import Wudian_ZMDGJ_Mgr from "../../Mgr/WudianMgr";
import Cached_ZMDGJ_WXBannerAd from "../../CachedWXBannerAd";
import AppSwitch_ZMDGJ_Config from "../../Config/AppSwitchConfig";
import App_ZMDGJ_Config from "../../AppConfig";

export default class SkinTips extends Template_ZMDGJ_View_ZMDGJ_Base
{
    protected _centerZone : Laya.Clip = null;
    protected _okBtn : Laya.Sprite = null;
    protected _skipBtn : Laya.Clip = null;
    protected _skinAnchor : Laya.Clip = null;

    protected _ading : boolean = false;//是否正在看视频中
    protected _skinID : number = 0;
    protected _bUp: boolean = true;
    protected _bBanner: boolean = true;

    onAwake()
    {
        this._centerZone = this.View_ZMDGJ_.getChildByName("CenterZone") as Laya.Clip;
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit.is_ZMDGJ_IphoneX())
            {
                this._centerZone.top =  this._centerZone.top + 75;
            }
        }

        this._okBtn = this._centerZone.getChildByName("OkBtn") as Laya.Sprite;
        this._skipBtn = this._centerZone.getChildByName("SkipBtn") as Laya.Clip;
        this._skinAnchor = this._centerZone.getChildByName("SkinAnchor") as Laya.Clip;

        this.InitSkin();

        if (Wudian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag) {
            this._skipBtn.bottom -= 200;
            this._bUp = false;
            this._bBanner = false;
            Cached_ZMDGJ_WXBannerAd._ZMDGJ_hide_ZMDGJ_();
            Laya.timer.once(AppSwitch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().btn_ZMDGJ_Move_ZMDGJ_Timer * 1000, this, this.BtnUp, null, false);
            Laya.timer.once(AppSwitch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Move_ZMDGJ_Timer * 1000, this, this.BannerUp, null, false);
        }
    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
        this._okBtn.on(Laya.Event.CLICK,this,this.onOkBtn);
        this._skipBtn.on(Laya.Event.CLICK,this,this.onSkipBtn);
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
        this._okBtn.off(Laya.Event.CLICK,this,this.onOkBtn);
        this._skipBtn.off(Laya.Event.CLICK,this,this.onSkipBtn);
        Cached_ZMDGJ_WXBannerAd._ZMDGJ_hide_ZMDGJ_();
    }

    InitSkin(){
        var skinAllDatas : Array<StoreData> = StoreConfig.getInstance().getStoreDatas();
        var skinIndex :number = Math.floor(Math.random() * (skinAllDatas.length - 1)) + 1;
        this._skinID = skinIndex;

        var self = this;
        Laya.Scene3D.load(App_ZMDGJ_Config.Res_ZMDGJ_Server +  "/LayaScene/Conventional/RoleShow.ls", Laya.Handler.create(this, (scene: Laya.Scene3D) => {
            console.log("LayaScene load RoleShow");
            this._skinAnchor.addChild(scene);
            var scale = Laya.stage.width / 750;
            var role: Laya.Sprite3D = scene.getChildByName("Role") as Laya.Sprite3D;

            role.transform.localScaleX = role.transform.localScaleX * scale;
            role.transform.localScaleY = role.transform.localScaleY * scale;
            role.transform.localScaleZ = role.transform.localScaleZ * scale;

            var animator:Laya.Animator = role.getComponent(Laya.Animator) as Laya.Animator;
            var skinMesh: Laya.SkinnedMeshSprite3D = role.getChildByName("Box001") as Laya.SkinnedMeshSprite3D;
            skinMesh.skinnedMeshRenderer.material = skinMesh.skinnedMeshRenderer.materials[skinIndex];
            for (var i = 0; i < role.numChildren; i++) {
                if (role.getChildAt(i).name.indexOf("Hat") == -1) {
                    continue;
                }
                role.getChildAt(i).active = role.getChildAt(i).name.indexOf("Hat" + (skinIndex + 1).toString()) > -1;
            }

            Laya.timer.loop(1,this,()=>{
                role.transform.localRotationEulerY += 2;
            });
            animator.play("Win2");
        }));
    }

    protected onOkBtn()  
    {
        if (this._ading)
            return;//看视频中点击无效
        this._ading = true;
        let self = this;
        WX_ZMDGJ_API.show_ZMDGJ_Rewarded_ZMDGJ_VideoAd((ok) =>  
        {
            if (ok)  {
                //todo:看视频成功
                //todo:试用皮肤
                Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_TrySkin, { SkinId: this._skinID });
                this.CloseSelf();
            }
            else  {
                //todo:未完整观看视频
                self._ading = false;
                this.CloseSelf();
            }
        }, 
        () =>  
        {
            //todo:看视屏失败
            self._ading = false;
            this.CloseSelf();
        })
    }

    protected onSkipBtn()
    {
        if (this._ading)
            return;//看视频中点击无效
        if (!this._bUp) {
            Laya.timer.once(AppSwitch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().btn_ZMDGJ_Move_ZMDGJ_Timer * 1000, this, this.BtnUp, null, false);
            Laya.timer.once(AppSwitch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Move_ZMDGJ_Timer * 1000, this, this.BannerUp, null, false);
            return;
        }
        this.CloseSelf();
    }
    
    protected BtnUp() {
        if (!this._bUp) {
            this._skipBtn.bottom += 200;
            this._bUp = true;
        }
    }

    protected BannerUp() {
        console.log("BannerUp");
        Cached_ZMDGJ_WXBannerAd._ZMDGJ_show_ZMDGJ_();
        this._bBanner = true;
    }

    protected CloseSelf(){
        View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.InGameView, null, () => {
            View_ZMDGJ_Mgr.ins_ZMDGJ_tance.close_ZMDGJ_View(View_ZMDGJ_Def.SkinTipsView);
        });
    }
}