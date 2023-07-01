import KRQ__ZMDGJ_History_ZMDGJ_Box from "./KRQ_HistoryBox";
import KRQ__ZMDGJ_Com_ZMDGJ_Base from "../KRQ_ComBase";
import _ZMDGJ_ShareAd_ZMDGJ_ from "../../../ShareAd/ShareAd";

export default class KRQ_ZMDGJ__His_ZMDGJ_tory extends KRQ__ZMDGJ_Com_ZMDGJ_Base
{
    public On_ZMDGJ_Back_ZMDGJ_Btn_ZMDGJ_Click : Function = null;

    protected _top_ZMDGJ_Zone : Laya.Clip = null;
    protected _back_ZMDGJ_Btn : Laya.Sprite = null;
    protected _list : Laya.List;
    protected readonly _start_ZMDGJ_List : Array<boolean> = new Array<boolean>();
    
    onAwake()
    {
        this.Ad_ZMDGJ_Pos_ZMDGJ_ID = _ZMDGJ_ShareAd_ZMDGJ_.History_ZMDGJ_LocationID;

        this._top_ZMDGJ_Zone = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("TopZone") as Laya.Clip;
        this._back_ZMDGJ_Btn = this._top_ZMDGJ_Zone.getChildByName("BackBtn") as Laya.Sprite;

        this._list = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("List") as Laya.List;
        this._list.renderHandler = Laya.Handler.create(this, this.on_ZMDGJ_List_ZMDGJ_Render, null, false);
        this._list.vScrollBarSkin = "";
    }   

    onStart()
    {
        this.ref_ZMDGJ_resh();
    }

    onEnable()
    {
        this._back_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_Back_ZMDGJ_Btn);
    }

    onDisable()
    {
        this._back_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_Back_ZMDGJ_Btn);
    }

    public ref_ZMDGJ_resh(onComplate? : Function)
    {
        let self = this;
        _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_ADVs(this.Ad_ZMDGJ_Pos_ZMDGJ_ID,(datas)=>
        {
            if(null != datas)
            {
                self._datas = datas;
                self._start_ZMDGJ_List.splice(0);
                for (let i = 0; i <self._datas.length; ++i)
                {
                    self._start_ZMDGJ_List.push(false);
                }
                let num = Math.floor(self._start_ZMDGJ_List.length * 0.33);
                while(num > 0)
                {
                    let index = Math.floor(Math.random() * self._start_ZMDGJ_List.length);
                    if(false == self._start_ZMDGJ_List[index])
                    {
                        self._start_ZMDGJ_List[index] = true;
                        --num;
                    }
                }
                self._list.array = self._datas;
            }
        },false)        
    }

    protected on_ZMDGJ_List_ZMDGJ_Render(cell: Laya.Box, index: number): void 
    {
        let data = this._list.array[index];
        let star = this._start_ZMDGJ_List[index];
        let historyBox : KRQ__ZMDGJ_History_ZMDGJ_Box = cell.getComponent(KRQ__ZMDGJ_History_ZMDGJ_Box);
        historyBox.setData(data,star);
    }
    
    protected on_ZMDGJ_Back_ZMDGJ_Btn()
    {
        this._ZMDGJ_hide_ZMDGJ_();
        if(null != this.On_ZMDGJ_Back_ZMDGJ_Btn_ZMDGJ_Click)
        {
            this.On_ZMDGJ_Back_ZMDGJ_Btn_ZMDGJ_Click();
        }
    }

    public _ZMDGJ_show_ZMDGJ_()
    {
        super._ZMDGJ_show_ZMDGJ_();
        this.ref_ZMDGJ_resh();
    }
}