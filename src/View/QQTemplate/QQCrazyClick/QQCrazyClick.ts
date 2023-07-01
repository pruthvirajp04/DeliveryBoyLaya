import ViewBase from "../../../View/ViewBase";
import { Event_ZMDGJ_Def } from "../../../Event/EventDef";
import Event_ZMDGJ_Mgr from "../../../Event/EventMgr";
import App_ZMDGJ_Switch_ZMDGJ_Config from "../../../Config/AppSwitchConfig";
import Wu_ZMDGJ_dian_ZMDGJ_Mgr from "../../../Mgr/WudianMgr";
import Cached_ZMDGJ_WX_ZMDGJ_BannerAd from "../../../CachedWXBannerAd";
import QQ_ZMDGJ_Mini_ZMDGJ_GameAPI from "../../../QQMiniGameAPI";
import Cached_ZMDGJ_QQ_ZMDGJ_BannerAd from "../../../CachedQQBannerAd";
import App_ZMDGJ_Config from "../../../AppConfig";

export default class QQ_ZMDGJ_Crazy_ZMDGJ_Click extends ViewBase {

    protected _click_ZMDGJ__Btn: Laya.Button;//给用户狂点的按钮
    protected _arrow_ZMDGJ__Img: Laya.Image;//箭头，用于给用户提示
    protected _getPrize_ZMDGJ__View: Laya.UIComponent;
    protected _prizeCount_ZMDGJ__Text: Laya.Text;
    protected _confirm__ZMDGJ_Btn: Laya.Sprite;

    protected _click_ZMDGJ_Bar : Laya.Clip = null;
    protected _click_ZMDGJ_BarOriginal_ZMDGJ_Width: number;
    protected _click_ZMDGJ_Time: number;//用来保存用户当前点击次数
    protected _total_ZMDGJ_Click_ZMDGJ_Time: number;//用于计算客户总共点击了多少次按钮
    protected _total_ZMDGJ_Click_ZMDGJ_Timer: number = 15;//用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
    protected _need_ZMDGJ_Click_ZMDGJ_Time: number = 10;//一共点多少次能够获得奖励，用于显示进度条
    protected readonly _banner_ZMDGJ_ClickTime: number = Math.floor(Math.random() * 5) + 2;//点多少次开始显示bannerr套路用户 

    protected _arrow_ZMDGJ_Up: boolean;
    protected _banner_ZMDGJ_Clicked: boolean;

    protected _compelet_ZMDGJ_Function: Function;
    protected _prize_ZMDGJ_Count: number;
    

    protected drgon_ZMDGJ_: Laya.Skeleton;


    onAwake() {
        this._click_ZMDGJ__Btn = this.owner.getChildByName("Click_Btn") as Laya.Button;
        this._click_ZMDGJ__Btn.on(Laya.Event.CLICK, this, this.ButtonClicked);
        this._arrow_ZMDGJ__Img = this._click_ZMDGJ__Btn.getChildByName("Arrow_Img") as Laya.Image;
        this._getPrize_ZMDGJ__View = this.owner.getChildByName("GetPrize_View") as Laya.UIComponent;
        this._prizeCount_ZMDGJ__Text = this._getPrize_ZMDGJ__View.getChildByName("PrizeCount_Text") as Laya.Text;
        this._confirm__ZMDGJ_Btn = this._getPrize_ZMDGJ__View.getChildByName("Confirm_Btn") as Laya.Sprite;
        this._getPrize_ZMDGJ__View.visible = false;

        this._click_ZMDGJ_Bar = this.owner.getChildByName("ClickBar").getChildByName("ClickBar") as Laya.Clip;
        this._click_ZMDGJ_BarOriginal_ZMDGJ_Width = this._click_ZMDGJ_Bar.width;
        this._click_ZMDGJ_Bar.width = 0;

        this._click_ZMDGJ_Time = 0;
        this._total_ZMDGJ_Click_ZMDGJ_Time = 0;

        let self = this;
        Laya.loader.load("ClickGetPrize/quanji.png",Laya.Handler.create(this,(texture : Laya.Texture)=>
        {
            texture.bitmap.lock = true;
            Laya.loader.load("ClickGetPrize/quanji.sk",Laya.Handler.create(this,(bytes)=>
            {
                console.log("texture",texture);
                console.log("bytes",bytes);
                let template = new Laya.Templet()
                template.parseData(texture,bytes);
                self.drgon_ZMDGJ_ = template.buildArmature();
                self.owner.addChild(self.drgon_ZMDGJ_);
                self.drgon_ZMDGJ_.x = 375;
                self.drgon_ZMDGJ_.y = 610;
                self.drgon_ZMDGJ_.scaleX = 2;
                self.drgon_ZMDGJ_.scaleY = 2;
                self.drgon_ZMDGJ_.parent.setChildIndex(self.drgon_ZMDGJ_,1);
                self.drgon_ZMDGJ_.play(0, true);
                console.log("quanji 加载完成!!!!",template);
            }),Laya.Handler.create(this,()=>{}),"",0,false,"",true)
        }),Laya.Handler.create(this,()=>{}),"",0,false,"",true);
    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
        Laya.stage.on(Laya.Event.FOCUS_CHANGE,this,this.onFocusChange);
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
        Laya.stage.off(Laya.Event.FOCUS_CHANGE,this,this.onFocusChange);
    }

    onUpdate() {
        if (this._arrow_ZMDGJ_Up) {
            this._arrow_ZMDGJ__Img.top += Laya.timer.delta / 5;
            if (this._arrow_ZMDGJ__Img.top > -140) {
                this._arrow_ZMDGJ_Up = false;
            }
        }
        else {
            this._arrow_ZMDGJ__Img.top -= Laya.timer.delta / 5;
            if (this._arrow_ZMDGJ__Img.top < -180) {
                this._arrow_ZMDGJ_Up = true;
            }
        }
        if (!this._banner_ZMDGJ_Clicked) {
            let spd = 2 + (this._click_ZMDGJ_Bar.width / this._click_ZMDGJ_BarOriginal_ZMDGJ_Width) * 4;
            if (this._click_ZMDGJ_Bar.width >= spd) {
                this._click_ZMDGJ_Bar.width -= spd;
            }
            if ((this._click_ZMDGJ_Bar.width / this._click_ZMDGJ_BarOriginal_ZMDGJ_Width) + 0.1 < (this._click_ZMDGJ_Time / this._need_ZMDGJ_Click_ZMDGJ_Time)) {
                this._click_ZMDGJ_Time--;
            }
        }
    }

    open_ZMDGJ_View(data?: any) {
        this._compelet_ZMDGJ_Function = data.Complete;
        this._prize_ZMDGJ_Count = data.PrizeCount;
        super.open_ZMDGJ_View(data);
    }

    Open_ZMDGJ_PrizeWindow() {
        let self = this;
        this._prizeCount_ZMDGJ__Text.text = this._prize_ZMDGJ_Count.toString();
        this._getPrize_ZMDGJ__View.visible = true;
        this._confirm__ZMDGJ_Btn.once(Laya.Event.CLICK, this, function () {
            Cached_ZMDGJ_QQ_ZMDGJ_BannerAd.hide();
            if (self._compelet_ZMDGJ_Function) {
                self._compelet_ZMDGJ_Function();
            }
            self.close_ZMDGJ_View();
        });
    }

    Show_ZMDGJ_Banner() {
        if(App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().qq_ZMDGJ_cfg.kuang_ZMDGJ_dian_ZMDGJ_Banner == 1
            && App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().qq_ZMDGJ_cfg.qq_ZMDGJ_versions)
        {
            Cached_ZMDGJ_QQ_ZMDGJ_BannerAd._ZMDGJ_show_ZMDGJ_();
        }
    }

    ButtonClicked() {
        this._click_ZMDGJ_Time++;
        this._total_ZMDGJ_Click_ZMDGJ_Time++;
        if(null != this.drgon_ZMDGJ_)
        {
            this.drgon_ZMDGJ_.play(1, false)
            this.drgon_ZMDGJ_.once(Laya.Event.STOPPED, this, () => {
                this.drgon_ZMDGJ_.play(0, true)
            });
        }
        if (this._click_ZMDGJ_Time > this._need_ZMDGJ_Click_ZMDGJ_Time) {
            this._click_ZMDGJ_Time = this._need_ZMDGJ_Click_ZMDGJ_Time;
        }
        if (this._click_ZMDGJ_Time >= this._banner_ZMDGJ_ClickTime) {
            if (this._click_ZMDGJ_Time >= this._need_ZMDGJ_Click_ZMDGJ_Time) {
                this._click_ZMDGJ_Time = this._need_ZMDGJ_Click_ZMDGJ_Time - 1;
            }
            if (this._banner_ZMDGJ_Clicked) {
                return;
            }
            this._banner_ZMDGJ_Clicked = true;
            this.Show_ZMDGJ_Banner();
            Laya.timer.once(2000, this, function () {
                this.BannerClicked();
            });
        }
        else if (this._total_ZMDGJ_Click_ZMDGJ_Time > this._total_ZMDGJ_Click_ZMDGJ_Timer) {
            this.Show_ZMDGJ_Banner();
            this.Banner_ZMDGJ_Clicked();
        }
        let progress = (this._click_ZMDGJ_Time / this._need_ZMDGJ_Click_ZMDGJ_Time) * this._click_ZMDGJ_BarOriginal_ZMDGJ_Width;
        this._click_ZMDGJ_Bar.width = progress;
    }

    Banner_ZMDGJ_Clicked() {
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.AD_Wu_ZMDGJ_dian_ZMDGJ_Banner__ZMDGJ_Hide);
        this._banner_ZMDGJ_Clicked = true;
        this._click_ZMDGJ_Time = this._need_ZMDGJ_Click_ZMDGJ_Time;
        this._click_ZMDGJ_Bar.width = this._click_ZMDGJ_BarOriginal_ZMDGJ_Width;
        this._click_ZMDGJ__Btn.visible = false;
        this.Open_ZMDGJ_PrizeWindow();
    }

    onDestroy() {
        if(App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().qq_ZMDGJ_cfg.kuang_ZMDGJ_dian_ZMDGJ_Banner == 1
            && App_ZMDGJ_Config.Versions_ZMDGJ_ == App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().qq_ZMDGJ_cfg.qq_ZMDGJ_versions)
        {
            Cached_ZMDGJ_QQ_ZMDGJ_BannerAd.hide();
        }
    }

    protected onFocusChange()
    {
        if(null != this.drgon_ZMDGJ_)
        {
            this.drgon_ZMDGJ_.play(0, true);
        }
    }
}