import KRQ_ZMDGJ__H_ZMDGJ_Loop_ZMDGJ_Ad from "./KRQ_HLoopAd";
import _ZMDGJ_ShareAd_ZMDGJ_ from "../../../ShareAd/ShareAd";

export default class KRQ_ZMDGJ__V_ZMDGJ_Loop_ZMDGJ_Ad extends KRQ_ZMDGJ__H_ZMDGJ_Loop_ZMDGJ_Ad
{

    onAwake()  {
        this.Ad_ZMDGJ_Pos_ZMDGJ_ID = _ZMDGJ_ShareAd_ZMDGJ_.LoopAd_ZMDGJ_LocationID;

        this._ZMDGJ__list_ZMDGJ_ = this.owner.getChildByName("List") as Laya.List;
        this._ZMDGJ__list_ZMDGJ_.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._ZMDGJ__list_ZMDGJ_.vScrollBarSkin = "";
    }

    protected move() {
        let tonum = this._cell_ZMDGJ_Size.y + this._ZMDGJ__list_ZMDGJ_.spaceY;
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
            Laya.timer.once(1010,self,() => {
                if (self._ZMDGJ__list_ZMDGJ_.scrollBar.value >= self._ZMDGJ__list_ZMDGJ_.scrollBar.max) {
                    self._scroll_ZMDGJ_Forward = false;
                } else if (self._ZMDGJ__list_ZMDGJ_.scrollBar.value <= 0) {
                    self._scroll_ZMDGJ_Forward = true;
                }
                Laya.timer.once(3000,self,() => {
                    if (self._ZMDGJ__list_ZMDGJ_.scrollBar) {
                        self.move()
                    }
                });
            });
        }
    }
}