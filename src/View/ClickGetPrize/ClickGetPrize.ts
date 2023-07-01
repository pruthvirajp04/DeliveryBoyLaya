import View_ZMDGJ_Base from "../../View/ViewBase";
import { Event_ZMDGJ_Def } from "../../Event/EventDef";
import Event_ZMDGJ_Mgr from "../../Event/EventMgr";
import App_ZMDGJ_Switch_ZMDGJ_Config from "../../Config/AppSwitchConfig";
import Wu_ZMDGJ_dian_ZMDGJ_Mgr from "../../Mgr/WudianMgr";
import Cached_ZMDGJ_WX_ZMDGJ_BannerAd from "../../CachedWXBannerAd";
/**
 * 狂点窗口使用范例如下
    //首先判断狂点功能开关WudianMgr.WudianFlag是否打开，如果没打开就直接跳过整个逻辑
    WudianMgr.GetIpBlockState();//在游戏里初始化的时候调用这个方法初始化Ip屏蔽flag
    //将这段代码插入需要调用狂点窗口的地方
    let data : any = {};
    //狂点逻辑完成后的回调方法
    data.Complete = function(){
        console.log("狂点按钮结束");//在这里写入狂点窗口结束后需要调用的逻辑，例如弹出结算页面
    }
    // 完成点击之后获得的奖励数量，依照各项目不同自行实现
    data.PrizeCount = 30;
    // 在调用窗口前必须关闭当前正在显示的官方Banner广告，这个窗口才能正常运行，具体的逻辑各人需自行实现
    // 而且关闭官方Banner可以稍微提早一些，避免频繁调用出错或者不稳定
    Event_PK_Mgr.instance.dispatch(Event_PK_Def.AD_CloseBanner, true);//这句代码是我用来关闭官方Banner，各项目自行实现
    ViewMgr.instance.openView(ViewDef.ClickGetPrize,data);
 * 
 * @export
 * @class ClickGetPrize
 * @extends {View_ZMDGJ_Base}
 */
export default class Click_ZMDGJ_Get_ZMDGJ_Prize extends View_ZMDGJ_Base {
    constructor() {
        super();
    }
    private _click_ZMDGJ__Btn: Laya.Button;//给用户狂点的按钮
    private _arrow_ZMDGJ__Img: Laya.Image;//箭头，用于给用户提示
    private _open_ZMDGJ__Btn: Laya.Sprite;
    private _bannerAd_ZMDGJ__View: Laya.UIComponent;
    private _clickTime_ZMDGJ__PBar: Laya.Image;//进度条背景
    private _clickTime_ZMDGJ__PBar$Bar: Laya.Image;//进度条组件
    private _getPrize_ZMDGJ__View: Laya.UIComponent;
    private _prizeCount_ZMDGJ__Text: Laya.Text;
    private _confirm_ZMDGJ__Btn: Laya.Sprite;
    private _bg_ZMDGJ_: Laya.UIComponent;
    private _click_ZMDGJ_Progress: number;//进度条组件的宽度，注意Ide中一定要填写进度条组件的Width属性
    private _click_ZMDGJ_Bar_ZMDGJ_OriginalWidth: number;
    private _click_ZMDGJ_Time: number;//用来保存用户当前点击次数
    private _total_ZMDGJ_Click_ZMDGJ_Time: number;//用于计算客户总共点击了多少次按钮
    private _total_ZMDGJ_Click_ZMDGJ_Timer: number = 22;//用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
    private _need_ZMDGJ_Click_ZMDGJ_Time: number = 10;//一共点多少次能够获得奖励，用于显示进度条
    private _banner_ZMDGJ_ClickTime: number = 7;//点多少次开始显示bannerr套路用户，可微调    
    private _prize_ZMDGJ_Count: number;//获得的奖励数量，需要在打开窗口时传入参数
    private _arrowUp_ZMDGJ_: boolean;
    private _banner_ZMDGJ_Clicked: boolean;
    private _compelet_ZMDGJ_Function: Function;
    // private _wudianLoadFlag: boolean;
    onAwake() {
        this._click_ZMDGJ__Btn = this.owner.getChildByName("Click_Btn") as Laya.Button;
        this._click_ZMDGJ__Btn.on(Laya.Event.CLICK, this, this.Button_ZMDGJ_Clicked);
        this._arrow_ZMDGJ__Img = this._click_ZMDGJ__Btn.getChildByName("Arrow_Img") as Laya.Image;
        this._bg_ZMDGJ_ = this.owner.getChildByName("BG") as Laya.UIComponent;
        this._open_ZMDGJ__Btn = this._bg_ZMDGJ_.getChildByName("Open_Btn") as Laya.Sprite;
        this._getPrize_ZMDGJ__View = this.owner.getChildByName("GetPrize_View") as Laya.UIComponent;
        this._prizeCount_ZMDGJ__Text = this._getPrize_ZMDGJ__View.getChildByName("PrizeCount_Text") as Laya.Text;
        this._confirm_ZMDGJ__Btn = this._getPrize_ZMDGJ__View.getChildByName("Confirm_Btn") as Laya.Sprite;
        this._getPrize_ZMDGJ__View.visible = false;
        this._clickTime_ZMDGJ__PBar = this._bg_ZMDGJ_.getChildByName("ClickTime_PBar") as Laya.Image;
        this._clickTime_ZMDGJ__PBar$Bar = this._clickTime_ZMDGJ__PBar.getChildByName("ClickTime_PBar$Bar") as Laya.Image;
        this._click_ZMDGJ_Bar_ZMDGJ_OriginalWidth = this._clickTime_ZMDGJ__PBar$Bar.width;
        this._bannerAd_ZMDGJ__View = this.owner.getChildByName("BannerAd_View") as Laya.UIComponent;
        this._clickTime_ZMDGJ__PBar$Bar.width = 0;
        this._click_ZMDGJ_Time = 0;
        this._total_ZMDGJ_Click_ZMDGJ_Time = 0;
        //EventMgr.instance.regOnceEvent(EventDef.AD_WudianBanner_LoadComplete, this, this.WudianLoadComplete);
    }

    onUpdate() {
        /* 箭头上下移动 */
        if (this._arrowUp_ZMDGJ_) {
            this._arrow_ZMDGJ__Img.top += Laya.timer.delta / 5;
            if (this._arrow_ZMDGJ__Img.top > -140) {
                this._arrowUp_ZMDGJ_ = false;
            }
        }
        else {
            this._arrow_ZMDGJ__Img.top -= Laya.timer.delta / 5;
            if (this._arrow_ZMDGJ__Img.top < -180) {
                this._arrowUp_ZMDGJ_ = true;
            }
        }
        /* 按钮不按，进度条自动退回 */
        if (!this._banner_ZMDGJ_Clicked) {
            let spd = 2 + (this._clickTime_ZMDGJ__PBar$Bar.width / this._click_ZMDGJ_Bar_ZMDGJ_OriginalWidth) * 6;
            if (this._clickTime_ZMDGJ__PBar$Bar.width >= spd) {
                this._clickTime_ZMDGJ__PBar$Bar.width -= spd;
            }
            if ((this._clickTime_ZMDGJ__PBar$Bar.width / this._click_ZMDGJ_Bar_ZMDGJ_OriginalWidth) + 0.1 < (this._click_ZMDGJ_Time / this._need_ZMDGJ_Click_ZMDGJ_Time)) {
                this._click_ZMDGJ_Time--;
            }
        }
        // else {
        //     if (this._clickTime_PBar$Bar.width <= this._clickBarOriginalWidth) {
        //         this._clickTime_PBar$Bar.width += 2;
        //         if (this._clickTime_PBar$Bar.width > this._clickBarOriginalWidth) {
        //             this._clickTime_PBar$Bar.width = this._clickBarOriginalWidth
        //         }
        //     }
        // }
    }
    /**
     * 打开Banner
     * 
     * @param {*} [data] 
     * @memberof ClickGetPrize
     */
    open_ZMDGJ_View(data?: any) {
        this._compelet_ZMDGJ_Function = data.Complete;
        this._prize_ZMDGJ_Count = data.PrizeCount;
        super.open_ZMDGJ_View(data);
    }
    /**
     * 用户成功获得奖励
     * 
     * @memberof ClickGetPrize
     */
    Open_ZMDGJ_PrizeWindow() {
        this._bg_ZMDGJ_.visible = false;
        let self = this;
        this._prizeCount_ZMDGJ__Text.text = this._prize_ZMDGJ_Count.toString();
        this._getPrize_ZMDGJ__View.visible = true;
        /* 确认按钮 */
        this._confirm_ZMDGJ__Btn.once(Laya.Event.CLICK, this, function () {
            if (self._compelet_ZMDGJ_Function) {
                self._compelet_ZMDGJ_Function();
            }
            self.close_ZMDGJ_View();
        });
    }
    /**
     * 误点预加载完成
     * 
     * @memberof ClickGetPrize
     */
    // WudianLoadComplete() {
    //     console.log("WudianBanner预加载完毕");
    //     this._wudianLoadFlag = true;
    // }
    /**
     * 将Banner显示
     * 
     * @memberof ClickGetPrize
     */
    Show_ZMDGJ_Banner() {
        console.log("AD_WudianBanner_Show");
        Cached_ZMDGJ_WX_ZMDGJ_BannerAd._ZMDGJ_show_ZMDGJ_();
    }
    /**
     * 狂点按钮逻辑
     * 
     * 
     * @memberof ClickGetPrize
     */
    Button_ZMDGJ_Clicked() {
        this._click_ZMDGJ_Time++;
        this._total_ZMDGJ_Click_ZMDGJ_Time++;
        //nanner一直没加载成功,保持进度条
        if (this._click_ZMDGJ_Time > this._need_ZMDGJ_Click_ZMDGJ_Time) {
            this._click_ZMDGJ_Time = this._need_ZMDGJ_Click_ZMDGJ_Time;
        }
        if (this._click_ZMDGJ_Time >= this._banner_ZMDGJ_ClickTime /*&& this._wudianLoadFlag*/) {
            if (this._click_ZMDGJ_Time >= this._need_ZMDGJ_Click_ZMDGJ_Time) {
                this._click_ZMDGJ_Time = this._need_ZMDGJ_Click_ZMDGJ_Time - 1;
            }
            this._banner_ZMDGJ_Clicked = true;
            console.log("误点Banner套路启动");
            //用户连点，出banner
            this.Show_ZMDGJ_Banner();
            Laya.timer.once(2000, this, function () {
                this.BannerClicked();
            });
        }
        //用户一直没被套路到，让他继续玩
        else if (this._total_ZMDGJ_Click_ZMDGJ_Time > this._total_ZMDGJ_Click_ZMDGJ_Timer) {
            console.log("用户一直没点到，放他一马", this._total_ZMDGJ_Click_ZMDGJ_Time);
            this.Banner_ZMDGJ_Clicked();
        }
        let progress = (this._click_ZMDGJ_Time / this._need_ZMDGJ_Click_ZMDGJ_Time) * this._click_ZMDGJ_Bar_ZMDGJ_OriginalWidth;
        this._clickTime_ZMDGJ__PBar$Bar.width = progress;
    }
    /**
     * Banner已经点击之后，让用户获得奖励
     * 
     * @memberof ClickGetPrize
     */
    Banner_ZMDGJ_Clicked() {
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.AD_Wu_ZMDGJ_dian_ZMDGJ_Banner__ZMDGJ_Hide);
        this._banner_ZMDGJ_Clicked = true;
        this._click_ZMDGJ_Time = this._need_ZMDGJ_Click_ZMDGJ_Time;
        this._clickTime_ZMDGJ__PBar$Bar.width = this._click_ZMDGJ_Bar_ZMDGJ_OriginalWidth;
        this._click_ZMDGJ__Btn.visible = false;
        this._open_ZMDGJ__Btn.visible = true;
        // this._bannerAd_View.visible = false;
        // this._bannerAd_View.active = false;
        this.Open_ZMDGJ_PrizeWindow();
    }

    onDestroy()
    {
        super.onDestroy();
        Cached_ZMDGJ_WX_ZMDGJ_BannerAd._ZMDGJ_hide_ZMDGJ_();
    }
}