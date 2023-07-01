export enum Event_ZMDGJ_Def 
{
    None = 0,
    App_Close_ZMDGJ_First_ZMDGJ_Loading_ZMDGJ_View = 500,
    AD_On_ZMDGJ_ShareAd_ZMDGJ_Fail = 501,

    //当界面打开
    Game_On_ZMDGJ_View_ZMDGJ_Open = 600,//{view : ViewDef}
    //当界面关闭
    Game_On_ZMDGJ_View_ZMDGJ_Close = 601,//{view : ViewDef}
    //当玩家金币变动
    Game_On_ZMDGJ_User_ZMDGJ_Money_ZMDGJ_Change = 701,//{curr:number,last:number}
    //当玩家钻石变动
    Game_On_ZMDGJ_User_ZMDGJ_Crystal_ZMDGJ_Change = 702,//{curr:number,last:number}
    //当玩家商店解锁
    Game_OnUserUnlockedStore = 703,//{unlocked:number}
    //当关卡开始
    Game_On_ZMDGJ_Level_ZMDGJ_Start = 1000,
    //当关卡结束
    Game_On_ZMDGJ_Level_ZMDGJ_Complate = 1001,
    //误点预加载完毕
    AD_Wu_ZMDGJ_dianBanner_Load_ZMDGJ_Complete = 2217,
    //显示误点Banner
    AD_Wu_ZMDGJ_dian_ZMDGJ_Banner_Show = 2218,
    //影藏误点Banner
    AD_Wu_ZMDGJ_dian_ZMDGJ_Banner__ZMDGJ_Hide = 2219,
    //预加载Banner
    AD_Wu_ZMDGJ_dian_ZMDGJ_Banner_Pre_ZMDGJ_Load =2220,    
    //当IP屏蔽状态更新
    App_On_ZMDGJ_Update_ZMDGJ_IpBlockState = 2221,//{ipBlockFlag : number}
    //Tips:在这条添加定义你自己需要的事件，从10000号开始。记得分段分类管理不同类型事件。如果事件有传递参数 "必须" 在事件后面用注释写明事件参数结构。
    
    Game_OnInputMove = 10000,//{dir : Laya.Vector2}
    Game_OnInputStart = 10001,
    Game_OnInputRelease = 10002,
    Game_TrySkin = 10003,//{SkinId : number}

    Game_BoxChange = 20001,//{BoxNum : number}
    Game_BloodChange = 20002,//{BloodNum : number}
}