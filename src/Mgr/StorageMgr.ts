

export class Storage_ZMDGJ_Req
{
    public key_ZMDGJ_ : string = null;
    public data_ZMDGJ_ : any = {};
    public _ZMDGJ_success_ZMDGJ_ : ()=> void = null;
    public _ZMDGJ_fail_ZMDGJ_ :  ()=> void = null;
    public _ZMDGJ_complete_ZMDGJ_ : ()=> void = null;
}

//数据本地持久化保存
export default class Storage_ZMDGJ_Mgr {
    
    public static set_ZMDGJ_Storage(req : Storage_ZMDGJ_Req) {
        let dataStr:string = JSON.stringify(req.data_ZMDGJ_);
        if (!Laya.Browser.onMiniGame) {
            localStorage.setItem(req.key_ZMDGJ_,dataStr);
            return;
        } 
        wx.setStorage({
            key : req.key_ZMDGJ_,
            data : dataStr,
            success : req._ZMDGJ_success_ZMDGJ_,
            fail: req._ZMDGJ_fail_ZMDGJ_,
            complete: req._ZMDGJ_complete_ZMDGJ_
        });
    }

    public static get_ZMDGJ_Storage(key): any {
        var value = null;
        try {
            if (!Laya.Browser.onMiniGame) {
                value = localStorage.getItem(key);
            }else{
                value = wx.getStorageSync(key);
            }
        } catch (e) {
        }
        return value;
    }
}