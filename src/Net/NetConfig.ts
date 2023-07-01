export default class Net_ZMDGJ_Config
{
    public static readonly state_ZMDGJ_ = 0;
    public static readonly game_ZMDGJ_id : number = 68;
    public static readonly server_ZMDGJ_Url : string = "https://javaapi.renyouwangluo.cn";
    public static readonly Login_ZMDGJ_ : string = "/api/user/login";
    public static readonly Save_ZMDGJ_Game_ZMDGJ_Data : string = "/api/user/game/data/write";
    public static readonly Get_ZMDGJ_User = "/api/user/game/data/read";
    /* 用来对IP地址进行屏蔽的接口地址，可以使用接口的返回值让某些广告逻辑在微信的审核地区(广州)发生变化 */
    public static readonly Ip_ZMDGJ_Block = "https://javaapi.renyouwangluo.cn/api/user/ip/select";
    public static readonly report_ZMDGJ_Export = "/api/share/getwaibuad";
    public static readonly report_ZMDGJ_Import = "/api/share/getzjadml";
    public static readonly get_ZMDGJ_user_ZMDGJ_ip = "/api/user/ip";
}