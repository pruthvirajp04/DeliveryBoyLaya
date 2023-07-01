import View_ZMDGJ_Base from "./ViewBase";

export default interface IView_ZMDGJ_State_ZMDGJ_Listener
{
    onViewShow(view : View_ZMDGJ_Base) : void;
    onViewHide(view : View_ZMDGJ_Base) : void;
}

export function isIViewStateListener(element : any)
{
    if((null != element.onViewShow && typeof(element.onViewShow) == "function")
        && (null != element.onViewHide && typeof(element.onViewHide) == "function") )
    {
        return true;
    }
    return false;
}

