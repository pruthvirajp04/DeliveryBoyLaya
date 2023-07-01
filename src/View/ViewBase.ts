import View_ZMDGJ_Mgr, { View_ZMDGJ_Def } from "../Mgr/ViewMgr";
import Event_ZMDGJ_Mgr from "../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../Event/EventDef";
import Utilit_ZMDGJ_ from "../Utilit";
import IView_ZMDGJ_State_ZMDGJ_Listener, { isIViewStateListener } from "./IViewStateListener";


//界面基类，所有功能模块界面继承于这个类。这种类型的界面不能嵌套。
export default class View_ZMDGJ_Base extends Laya.Script 
{
    public on_ZMDGJ_CloseEvent : Function = null;
    public on_ZMDGJ_OpenEvent : Function = null;
    
    public get View_ZMDGJ_()
    {
        return this.owner as Laya.View;
    }

    protected readonly _viewBase : boolean  = true
    protected _viewDef : View_ZMDGJ_Def = View_ZMDGJ_Def.None;
    protected _data : any = {};

    onAwake(): void {
        this.View_ZMDGJ_.autoDestroyAtClosed = true;
    }

    onEnable(): void {
        this.add_ZMDGJ_Event();
    }
    onDisable(): void {
        this.remove_ZMDGJ_Event();
    }
    onDestroy(): void {
        this.remove_ZMDGJ_Event();
    }
    
    public open_ZMDGJ_View(data?: any): void {
        this._data = data;
        this.show_ZMDGJ_()
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_On_ZMDGJ_View_ZMDGJ_Open,{view:this._viewDef})
        if(this.on_ZMDGJ_OpenEvent)
        {
            this.on_ZMDGJ_OpenEvent();
        }
    }

    public add_ZMDGJ_Event() {

    }

    public remove_ZMDGJ_Event() {
        Laya.timer.clearAll(this);
    }

    public close_ZMDGJ_View() 
    {
        View_ZMDGJ_Mgr.ins_ZMDGJ_tance.close_ZMDGJ_View(this._viewDef);
    }

    public hide_ZMDGJ_()
    {
        this.View_ZMDGJ_.visible = false;
        this.onHide();
        Utilit_ZMDGJ_.for_ZMDGJ_Each_ZMDGJ_Child(this.owner,(child : Laya.Node)=>
        {
            let coms = (child as any)._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(isIViewStateListener(element))
                    {
                        (element as IView_ZMDGJ_State_ZMDGJ_Listener).onViewHide(this);
                    }
                }
            }
        })
    }

    public show_ZMDGJ_()
    {
        this.View_ZMDGJ_.visible = true;
        this.onShow();
        Utilit_ZMDGJ_.for_ZMDGJ_Each_ZMDGJ_Child(this.owner,(child : Laya.Node)=>
        {
            let coms = (child as any)._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(isIViewStateListener(element))
                    {
                        (element as IView_ZMDGJ_State_ZMDGJ_Listener).onViewShow(this);
                    }
                }
            }
        })
    }

    public view_ZMDGJ_IsHide()
    {
        return this.View_ZMDGJ_.visible;
    }

    protected onHide(){}
    protected onShow(){}
    protected onClose()
    {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_On_ZMDGJ_View_ZMDGJ_Close,{view:this._viewDef})
        if(this.on_ZMDGJ_CloseEvent)
        {
            this.on_ZMDGJ_CloseEvent();
        }
    }
}