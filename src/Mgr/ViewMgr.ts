
import View_ZMDGJ_Base from "../View/ViewBase";

export enum View_ZMDGJ_Def
{
    None = "",
    TipsView = "View/TipsView.json",
    ClickGetPrize = "View/ClickGetPrize.json",
    MainView = "View/Template/MainViewTemplate.json",
    MiniGameView = "View/Template/MiniGameViewTemplate.json",
    RewardView = "View/Template/RewardViewTemplate.json",
    InGameView = "View/Template/InGameViewTemplate.json",
    GameWinView = "View/Template/GameWinViewTemplate.json",
    GameFailView = "View/Template/GameFailViewTemplate.json",
    ExportView = "View/Template/ExportViewTemplate.json",
    Export2View = "View/Template/Export2ViewTemplate.json",
    OPPONativeView = "View/Template/OPPONativeViewTemplate.json",
    
    QQCrazyClickView = "View/Template/QQ/QQCrazyClick.json",
    QQCrazyClickView2 = "View/Template/QQ/QQCrazyClick2.json",
    
    
    //todo:添加你的界面
    SkinTipsView = "View/SkinTips.json"
}

//界面管理器
export default class View_ZMDGJ_Mgr 
{
    public static readonly ins_ZMDGJ_tance: View_ZMDGJ_Mgr = new View_ZMDGJ_Mgr();
    protected readonly _ZMDGJ__views_ZMDGJ_ : any = {};
    protected readonly _loading_ZMDGJ_List : Array<View_ZMDGJ_Def> = new Array<View_ZMDGJ_Def>();

    public open_ZMDGJ_View(viewType :View_ZMDGJ_Def,data? : any,oncomplate? : Function): void 
    {
        if(this._ZMDGJ__views_ZMDGJ_[viewType])
        {  
            var view = this._ZMDGJ__views_ZMDGJ_[viewType];
            let coms = view._components;
            let viewBase : View_ZMDGJ_Base = null;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        viewBase = element as View_ZMDGJ_Base
                        viewBase.open_ZMDGJ_View(data);
                        break;
                    }
                }
            }
            if(oncomplate)
            {
                oncomplate(viewBase);
            }
            return;
        }
        for (let i = 0; i < this._loading_ZMDGJ_List.length; ++i)
        {
            let def = this._loading_ZMDGJ_List[i];
            if(def == viewType)
            {
                console.log("界面 : " + String(def) + " 正在加载中，请不要重复加载");
                return;
            }
        }
        var viewUrl = String(viewType)
        var self = this;
        this._loading_ZMDGJ_List.push(viewType);
        Laya.Scene.load(viewUrl,Laya.Handler.create(this, function (owner: any) {
            Laya.stage.addChild(owner);
            var view = owner as Laya.View;
            self._ZMDGJ__views_ZMDGJ_[viewType] = view;
            let coms = owner._components;
            let viewBase : View_ZMDGJ_Base = null;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        viewBase = element as View_ZMDGJ_Base;
                        element._viewDef = viewType;
                        viewBase.open_ZMDGJ_View(data);
                        break;
                    }
                }
            }

            for (let i = 0; i < self._loading_ZMDGJ_List.length; ++i)  
            {
                let def = self._loading_ZMDGJ_List[i];
                if(def == viewType)
                {
                    self._loading_ZMDGJ_List.splice(i,1);
                    break;
                }
            }

            if(oncomplate)
            {
                oncomplate(viewBase);
            }
        }));
    }

    public close_ZMDGJ_View(viewType :View_ZMDGJ_Def) 
    {
        var view : Laya.View = this._ZMDGJ__views_ZMDGJ_[viewType];
        if(view)
        {
            var owner = view as any;
            let coms = owner._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        element.onClose();
                        break;
                    }
                }
            }
            view.removeSelf();
            view.destroy();
            this._ZMDGJ__views_ZMDGJ_[viewType] = null;
        }
    }

    public Show_ZMDGJ_View(viewType :View_ZMDGJ_Def) 
    {
        var view  = this._ZMDGJ__views_ZMDGJ_[viewType];
        if(view)
        {
            let coms = view._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        element.show();
                        break;
                    }
                }
            }
        }
    }

    public hide_ZMDGJ_View(viewType :View_ZMDGJ_Def) 
    {
        var view = this._ZMDGJ__views_ZMDGJ_[viewType];
        if(view)
        {
            let coms = view._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        element.hide();
                        break;
                    }
                }
            }
        }
    }

    public get_ZMDGJ_View(viewType :View_ZMDGJ_Def) : Laya.View
    {
        return this._ZMDGJ__views_ZMDGJ_[viewType];
    }

    public show_ZMDGJ_Tips(msg : string)
    {
        this.open_ZMDGJ_View(View_ZMDGJ_Def.TipsView,msg);
    }
}