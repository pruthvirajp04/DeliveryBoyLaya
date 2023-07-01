import _ZMDGJ_ShareAd_ZMDGJ_ from "../ShareAd";
import LoopAd_ZMDGJ_Box from "./LoopAdBox";

export default class Horizontal_ZMDGJ_LoopAd_ZMDGJ_View extends Laya.Script {
    public Ad_ZMDGJ_Pos_ZMDGJ_ID: number = _ZMDGJ_ShareAd_ZMDGJ_.LoopAd_ZMDGJ_LocationID;
    protected _list_ZMDGJ_: Laya.List;
    protected _scroll_ZMDGJ_Forward = true;

    onAwake()  {
        this._list_ZMDGJ_ = this.owner.getChildByName("List") as Laya.List;
        this._list_ZMDGJ_.renderHandler = Laya.Handler.create(this, this.on_ZMDGJ_List_ZMDGJ_Render, null, false)
        this._list_ZMDGJ_.hScrollBarSkin = "";
    }

    onEnable(): void {
        var self = this;
        _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_ADVs(this.Ad_ZMDGJ_Pos_ZMDGJ_ID, (datas) =>  {
            if (self.owner && !self.owner.destroyed)  {
                if (datas && datas.length > 0 && datas.length < 50)  {
                    var temp = []
                    var counter = 0;
                    for (var i = 0; i < 50; ++i)  {
                        if (counter >= datas.length)  {
                            counter = 0;
                        }
                        temp.push(datas[counter]);
                        ++counter;
                    }

                    var groupLen = datas.length;
                    for (var i = 0; i < temp.length; ++i) 
                    {
                        var group = Math.floor(i / groupLen);
                        var startIndex = group * groupLen;
                        var randomIndex = Math.floor(Math.random() * groupLen) + startIndex;
                        var curValue = temp[i];
                        var randomValue = temp[randomIndex];
                        temp[randomIndex] = curValue;
                        temp[i] = randomValue;
                    }
                    
                    this._list_ZMDGJ_.array = temp;
                }
                else {
                    this._list_ZMDGJ_.array = datas;
                }
            }
        })
    }

    onDisable(): void {

    }

    onUpdate()  {
        if (this._scroll_ZMDGJ_Forward)  {
            this._list_ZMDGJ_.scrollBar.value += 100 * Laya.timer.delta / 1000;
            if (this._list_ZMDGJ_.scrollBar.value >= this._list_ZMDGJ_.scrollBar.max)  {
                this._scroll_ZMDGJ_Forward = false;
            }
        }
        else  {
            this._list_ZMDGJ_.scrollBar.value -= 100 * Laya.timer.delta / 1000;
            if (this._list_ZMDGJ_.scrollBar.value <= 0)  {
                this._scroll_ZMDGJ_Forward = true;
            }
        }
    }

    protected on_ZMDGJ_List_ZMDGJ_Render(cell: Laya.Box, index: number): void {
        var data = this._list_ZMDGJ_.array[index];
        var loopAdBox: LoopAd_ZMDGJ_Box = cell.getComponent(LoopAd_ZMDGJ_Box);
        loopAdBox.set_ZMDGJ_Data(data);
    }
}