import KRQ__ZMDGJ_Com_ZMDGJ_Base from "../KRQ_ComBase";
import KRQ_ZMDGJ__Loop_ZMDGJ_Ad_ZMDGJ_Box from "./KRQ_LoopAdBox";
import _ZMDGJ_ShareAd_ZMDGJ_ from "../../../ShareAd/ShareAd";

export default class KRQ_ZMDGJ__H_ZMDGJ_Loop_ZMDGJ_Ad extends KRQ__ZMDGJ_Com_ZMDGJ_Base 
{
    public get _ZMDGJ_Clip_ZMDGJ_()
    {
        return this.owner as Laya.Clip;
    }

    protected _ZMDGJ__list_ZMDGJ_: Laya.List;
    protected _scroll_ZMDGJ_Forward = true;
    protected readonly _cell_ZMDGJ_Size : Laya.Point = new Laya.Point();
    public isEnable : boolean = true;
    public useMovePause : boolean = true;
    public use_ZMDGJ_Local_ZMDGJ_Random : boolean = true;
    public useRandom : boolean = true;
    
    onAwake()  {
        this.Ad_ZMDGJ_Pos_ZMDGJ_ID = _ZMDGJ_ShareAd_ZMDGJ_.LoopAd_ZMDGJ_LocationID;
        
        this._ZMDGJ__list_ZMDGJ_ = this.owner.getChildByName("List") as Laya.List;
        this._ZMDGJ__list_ZMDGJ_.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._ZMDGJ__list_ZMDGJ_.hScrollBarSkin = "";
    }
    
    public onStart() 
    {
        let self = this;
        this._ZMDGJ__list_ZMDGJ_.width = self._ZMDGJ_Clip_ZMDGJ_.width;
        this._ZMDGJ__list_ZMDGJ_.height = self._ZMDGJ_Clip_ZMDGJ_.height;
        self.ref_ZMDGJ_resh(() =>  {
            if (null != self._ZMDGJ__list_ZMDGJ_.cells && self._ZMDGJ__list_ZMDGJ_.cells.length > 0)  
            {
                let box = self._ZMDGJ__list_ZMDGJ_.cells[0] as Laya.Box;
                self._cell_ZMDGJ_Size.x = box.width;
                self._cell_ZMDGJ_Size.y = box.height;
                if (self.useMovePause)  
                {
                    setTimeout(() => 
                    {
                        if (self._ZMDGJ__list_ZMDGJ_.scrollBar) 
                        {
                            self._ZMDGJ__list_ZMDGJ_.scrollBar.value = 0
                            self.move()
                        }
                    }, 2000);
                }
            }
        })
    }

    public ref_ZMDGJ_resh(onComplate? : Function)
    {
        if(!this.isEnable)
        {
            if(null != onComplate)
            {
                onComplate();
            }
            return;
        }
        let self = this;
        _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_ADVs(this.Ad_ZMDGJ_Pos_ZMDGJ_ID,(datas)=>
        {
            if(null != datas && datas.length > 0)
            {
                self._datas = datas;
                self._ZMDGJ__list_ZMDGJ_.array = self._datas;
                if(null != self._ZMDGJ_Sprite_ZMDGJ_ && !self._ZMDGJ_Sprite_ZMDGJ_.destroyed)
                {
                    self._ZMDGJ_Sprite_ZMDGJ_.visible = true;
                }
                if(null != onComplate)
                {
                    onComplate();
                }
            }
            else
            {
                if(null != self._ZMDGJ_Sprite_ZMDGJ_ && !self._ZMDGJ_Sprite_ZMDGJ_.destroyed)
                {
                    self._ZMDGJ_Sprite_ZMDGJ_.visible = false;
                }
            }
        },this.useRandom,this.use_ZMDGJ_Local_ZMDGJ_Random)
    }

    protected onListRender(cell: Laya.Box, index: number): void {
        var data = this._ZMDGJ__list_ZMDGJ_.array[index];
        var loopAdBox : KRQ_ZMDGJ__Loop_ZMDGJ_Ad_ZMDGJ_Box = cell.getComponent(KRQ_ZMDGJ__Loop_ZMDGJ_Ad_ZMDGJ_Box);
        loopAdBox.set_ZMDGJ_Data(data);
    }

    protected move() {
        let tonum = this._cell_ZMDGJ_Size.x + this._ZMDGJ__list_ZMDGJ_.spaceX;
        let left = 0;
        if (!this._scroll_ZMDGJ_Forward) 
        {
            tonum *= -1;
            left = (this._ZMDGJ__list_ZMDGJ_.scrollBar.max - this._ZMDGJ__list_ZMDGJ_.scrollBar.value) % tonum * -1;
        }
        else
        {
            left = this._ZMDGJ__list_ZMDGJ_.scrollBar.value % tonum;
        }
        if (this._ZMDGJ__list_ZMDGJ_.scrollBar) {
            this._ZMDGJ__list_ZMDGJ_.scrollBar.stopScroll();
            let scrollDelta = tonum;
            if(0 != left)
            {
                scrollDelta =  2 * tonum - left;
            }
            let self = this;
            Laya.Tween.to(self._ZMDGJ__list_ZMDGJ_.scrollBar, { value: self._ZMDGJ__list_ZMDGJ_.scrollBar.value + scrollDelta }, 1000, null, Laya.Handler.create(self, () => {

            }))
            Laya.timer.once(1010, self, () => {
                if (self._ZMDGJ__list_ZMDGJ_.scrollBar.value >= self._ZMDGJ__list_ZMDGJ_.scrollBar.max) {
                    self._scroll_ZMDGJ_Forward = false;
                } else if (self._ZMDGJ__list_ZMDGJ_.scrollBar.value <= 0) {
                    self._scroll_ZMDGJ_Forward = true;
                }
                Laya.timer.once(3000, self, () => {
                    if (self._ZMDGJ__list_ZMDGJ_.scrollBar) {
                        self.move()
                    }
                });
            })
        }
    }


    onUpdate()  {
        if(this.useMovePause)
            return;
        if (this._scroll_ZMDGJ_Forward)  {
            this._ZMDGJ__list_ZMDGJ_.scrollBar.value += 100 * Laya.timer.delta / 1000;
            if (this._ZMDGJ__list_ZMDGJ_.scrollBar.value >= this._ZMDGJ__list_ZMDGJ_.scrollBar.max)  {
                this._scroll_ZMDGJ_Forward = false;
            }
        }
        else  {
            this._ZMDGJ__list_ZMDGJ_.scrollBar.value -= 100 * Laya.timer.delta / 1000;
            if (this._ZMDGJ__list_ZMDGJ_.scrollBar.value <= 0)  {
                this._scroll_ZMDGJ_Forward = true;
            }
        }
    }


} 