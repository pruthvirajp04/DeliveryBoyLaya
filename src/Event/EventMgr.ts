import EventDispatcher = Laya.EventDispatcher;
export default class Event_ZMDGJ_Mgr extends EventDispatcher {
    static eventDispatcher: EventDispatcher = new EventDispatcher();
    public static readonly ins_ZMDGJ_tance: Event_ZMDGJ_Mgr = new Event_ZMDGJ_Mgr();;
    private constructor() {
        super();
    }

    //广播事件
    public dis_ZMDGJ_patch(InName, agv?: any) {
        Event_ZMDGJ_Mgr.eventDispatcher.event(InName, agv);
    }
    //注册事件
    public reg_ZMDGJ_Evemt(InName, caller, listener: Function, arg?: any[]): void {
        Event_ZMDGJ_Mgr.eventDispatcher.on(InName, caller, listener, (arg == null) ? null : ([arg]));
    }
    //注册单次事件
    public reg_ZMDGJ_OnceEvent(InName, caller, listener: Function, arg?: any[]): void {
        Event_ZMDGJ_Mgr.eventDispatcher.once(InName, caller, listener, (arg == null) ? null : ([arg]));
    }
    //移除事件注册
    public remove_ZMDGJ_Event(InName, caller, listener: Function, arg?: any[]): void {
        Event_ZMDGJ_Mgr.eventDispatcher.off(InName, caller, listener);
    }
}