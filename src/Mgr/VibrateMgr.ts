
export default class Vibrate_ZMDGJ_Mgr 
{
    public static is_ZMDGJ_Enable = true;

    //短震动
    public static vibrate_ZMDGJ_Short(): void 
    {
        if(!Vibrate_ZMDGJ_Mgr.is_ZMDGJ_Enable)
            return;
        if (Laya.Browser.onMiniGame)  {
            Laya.Browser.window["wx"].vibrateShort();
        }
        else if (Laya.Browser.onQGMiniGame) {
            Laya.Browser.window["qg"].vibrateShort();
        }
        else if (Laya.Browser.onQQMiniGame) { //qq小游戏
            Laya.Browser.window["qq"].vibrateShort();
        }
    }

    //长震动
    public static vibrate_ZMDGJ_Long(): void 
    {
        if(!Vibrate_ZMDGJ_Mgr.is_ZMDGJ_Enable)
            return;
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].vibrateLong();
        }
        else if (Laya.Browser.onQGMiniGame) {
            Laya.Browser.window["qg"].vibrateLong();
        }
        else if (Laya.Browser.onQQMiniGame) { //qq小游戏
            Laya.Browser.window["qq"].vibrateLong();
        }
    }

    //定时震动,毫秒
    public static vibrate_ZMDGJ_(time: number) 
    {
        if(!Vibrate_ZMDGJ_Mgr.is_ZMDGJ_Enable)
            return;
        if (Laya.Browser.onMiniGame)  
        {
            let count = time / 15; //微信小游戏中震动的时间是15毫秒的整数倍时间，本质是对短震动的封装
            let index = 0;
            let obj = { count: count, index: index };
            Laya.timer.loop(16, obj, function () {
                Vibrate_ZMDGJ_Mgr.vibrate_ZMDGJ_Short();
                index++;
                if (index > count) {
                        Laya.timer.clearAll(obj);
                }
            });    
        }
        else if (Laya.Browser.onQGMiniGame)  
        {
            let count = time / 20; //OPPO小游戏中震动的时间是20毫秒的整数倍时间，本质是对短震动的封装
            let index = 0;
            let obj = { count: count, index: index };
            Laya.timer.loop(21, obj, function () {
                Vibrate_ZMDGJ_Mgr.vibrate_ZMDGJ_Short();
                index++;
                if (index > count) {
                        Laya.timer.clearAll(obj);
                }
            });    
        }
        else if (Laya.Browser.onQQMiniGame)//qq小游戏
        {
            let count = time / 20; //OPPO小游戏中震动的时间是20毫秒的整数倍时间，本质是对短震动的封装
            let index = 0;
            let obj = { count: count, index: index };
            Laya.timer.loop(21, obj, function () {
                Vibrate_ZMDGJ_Mgr.vibrate_ZMDGJ_Short();
                index++;
                if (index > count) {
                        Laya.timer.clearAll(obj);
                }
            });    
        }
    }
}