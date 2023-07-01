import Event_ZMDGJ_Mgr from "../Event/EventMgr";
import { Event_ZMDGJ_Def } from "../Event/EventDef";

//游戏数据,为保持版本兼容，建议不要删除和修改字段名
export class User_ZMDGJ_Game_ZMDGJ_Data
{
    public  levelNum: number = 1;//当前关卡
    public  moneyNum: number = 0;//金币数量
    public  crystalNum: number = 0;//钻石数量  
    public  unlockedItem: Array<number> = [0];//道具当前解锁的ID
    public  usedItem: number = 0;//当前使用的道具ID  
}

export default class User_ZMDGJ_ extends Laya.Script 
{
    public static code_ZMDGJ_: string = "";
    public static openId_ZMDGJ_: string = "";
    public static _ZMDGJ_token: string = null;
    public static nick_ZMDGJ_Name: string = "";
    public static gender_ZMDGJ_:number = 0;

    public static maxLeveNum:number = 20;
    public static fakerLeveNum:number = 1;
    public static fakerNextLeveNum:number = 1;

    public static get is_ZMDGJ_Login()
    {
        return (User_ZMDGJ_.code_ZMDGJ_ != "") || (User_ZMDGJ_._ZMDGJ_token != "");
    }

    private static readonly _game_ZMDGJ_Data : User_ZMDGJ_Game_ZMDGJ_Data = new User_ZMDGJ_Game_ZMDGJ_Data();

    public static get_ZMDGJ_Save_ZMDGJ_Data() : string
    {
        return JSON.stringify(User_ZMDGJ_._game_ZMDGJ_Data);
    }


    public static test_ZMDGJ_InitUser()
    {
        User_ZMDGJ_._game_ZMDGJ_Data.levelNum = 1;
        User_ZMDGJ_._game_ZMDGJ_Data.moneyNum = 0;
        User_ZMDGJ_._game_ZMDGJ_Data.crystalNum = 1000;
        this.set_ZMDGJ_FakerLeveNum();
    }

    public static initi_ZMDGJ_User(data)
    {
        if(data && 0 != data)
        {
            User_ZMDGJ_._game_ZMDGJ_Data.levelNum = data.levelNum;
            User_ZMDGJ_._game_ZMDGJ_Data.moneyNum = data.moneyNum;
            User_ZMDGJ_._game_ZMDGJ_Data.crystalNum = data.crystalNum;
            if(null != data.unlockedItem)
            {
                let unlockedItem : Array<number> =  data.unlockedItem;
                for(let i=0;i < unlockedItem.length;++i)
                {
                    User_ZMDGJ_._game_ZMDGJ_Data.unlockedItem.push(unlockedItem[i]);
                }
            }
            if(null != data.usedItem)
            {
                User_ZMDGJ_._game_ZMDGJ_Data.usedItem = data.usedItem;
            }
        }
        else
        {
            //todo：处理没有获取到玩家数据的情况
        }
        this.set_ZMDGJ_FakerLeveNum();     
    }

    public static set_ZMDGJ_LeveNum(levelNum : number)
    {
        User_ZMDGJ_._game_ZMDGJ_Data.levelNum = levelNum;
        this.set_ZMDGJ_FakerLeveNum();   
    }

    public static get_ZMDGJ_LeveNum() : number
    {
        return User_ZMDGJ_._game_ZMDGJ_Data.levelNum;
    }

    public static set_ZMDGJ_FakerLeveNum() {
        if (User_ZMDGJ_.fakerLeveNum != User_ZMDGJ_.fakerNextLeveNum)  {
            User_ZMDGJ_.fakerLeveNum = User_ZMDGJ_._game_ZMDGJ_Data.levelNum <= User_ZMDGJ_.maxLeveNum ? User_ZMDGJ_._game_ZMDGJ_Data.levelNum : User_ZMDGJ_.fakerNextLeveNum;
        }
        else {
            if (User_ZMDGJ_._game_ZMDGJ_Data.levelNum <= User_ZMDGJ_.maxLeveNum) {
                User_ZMDGJ_.fakerLeveNum = User_ZMDGJ_._game_ZMDGJ_Data.levelNum;
            }

            else {
                var tempNum: number = 1;
                do {
                    tempNum = Math.ceil(Math.random() * User_ZMDGJ_.maxLeveNum);
                } while (tempNum <= 0 || tempNum > User_ZMDGJ_.maxLeveNum);

                User_ZMDGJ_.fakerLeveNum = tempNum;
            }
        }

        if (User_ZMDGJ_._game_ZMDGJ_Data.levelNum < User_ZMDGJ_.maxLeveNum) {
            User_ZMDGJ_.fakerNextLeveNum = User_ZMDGJ_._game_ZMDGJ_Data.levelNum + 1;
        }

        else {
            var tempNum: number = 1;
            do {
                tempNum = Math.ceil(Math.random() * User_ZMDGJ_.maxLeveNum);
            } while (tempNum <= 0 || tempNum > User_ZMDGJ_.maxLeveNum || tempNum == User_ZMDGJ_.fakerLeveNum);

            User_ZMDGJ_.fakerNextLeveNum = tempNum;
        }
    }

    public static get_ZMDGJ_FakerNextLeveNum(): number {
        return User_ZMDGJ_.fakerNextLeveNum;
    }

    public static get_ZMDGJ_FakerLeveNum(): number {
        return User_ZMDGJ_.fakerLeveNum;
    }

    public static add_ZMDGJ_Money(add : number)
    {
        add = Math.ceil(add)
        var last = User_ZMDGJ_._game_ZMDGJ_Data.moneyNum
        User_ZMDGJ_._game_ZMDGJ_Data.moneyNum += add;
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_On_ZMDGJ_User_ZMDGJ_Money_ZMDGJ_Change,
            {
                curr : User_ZMDGJ_._game_ZMDGJ_Data.moneyNum,
                last : last
            })
    }
    public static sub_ZMDGJ_Money(sub : number)
    {
        sub = Math.ceil(sub)
        var last = User_ZMDGJ_._game_ZMDGJ_Data.moneyNum
        User_ZMDGJ_._game_ZMDGJ_Data.moneyNum -= sub;
        if(User_ZMDGJ_._game_ZMDGJ_Data.moneyNum < 0)
        {
            User_ZMDGJ_._game_ZMDGJ_Data.moneyNum = 0;
        }
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_On_ZMDGJ_User_ZMDGJ_Money_ZMDGJ_Change,
            {
                curr : User_ZMDGJ_._game_ZMDGJ_Data.moneyNum,
                last : last
            })
    }
    public static get_ZMDGJ_Money()
    {
        return User_ZMDGJ_._game_ZMDGJ_Data.moneyNum;
    }

    public static add_ZMDGJ_Crystal(add : number)
    {
        add = Math.ceil(add)
        var last = User_ZMDGJ_._game_ZMDGJ_Data.crystalNum
        User_ZMDGJ_._game_ZMDGJ_Data.crystalNum += add;
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_On_ZMDGJ_User_ZMDGJ_Crystal_ZMDGJ_Change,
            {
                curr : User_ZMDGJ_._game_ZMDGJ_Data.crystalNum,
                last : last
            })
    }
    public static sub_ZMDGJ_Crystal(sub : number)
    {
        sub = Math.ceil(sub)
        var last = User_ZMDGJ_._game_ZMDGJ_Data.crystalNum
        User_ZMDGJ_._game_ZMDGJ_Data.crystalNum -= sub;
        if(User_ZMDGJ_._game_ZMDGJ_Data.crystalNum < 0)
        {
            User_ZMDGJ_._game_ZMDGJ_Data.crystalNum = 0;
        }
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_On_ZMDGJ_User_ZMDGJ_Crystal_ZMDGJ_Change,
            {
                curr : User_ZMDGJ_._game_ZMDGJ_Data.crystalNum,
                last : last
            })
    }
    public static get_ZMDGJ_Crystal()
    {
        return User_ZMDGJ_._game_ZMDGJ_Data.crystalNum;
    }
    
    //获取当前商店解锁的道具
    public static getItemUnlocked() : Array<number>
    {
        let unlocked = new Array<number>();
        for (let i = 0; i < User_ZMDGJ_._game_ZMDGJ_Data.unlockedItem.length; ++i)  
        {
            unlocked.push(User_ZMDGJ_._game_ZMDGJ_Data.unlockedItem[i]);
        }
        return unlocked;
    }

    //商店道具是否解锁
    public static itemIsUnlocked(id : number) : boolean
    {
        for (let i = 0; i < User_ZMDGJ_._game_ZMDGJ_Data.unlockedItem.length; ++i)  
        {
            if(User_ZMDGJ_._game_ZMDGJ_Data.unlockedItem[i] == id)
            {
                return true;
            }
        } 
        return false;
    }

    //解锁商店道具
    public static unlockItem(id : number)
    {
        if(User_ZMDGJ_.itemIsUnlocked(id))
        {
            console.log("商店重复解锁 id : ",id);
            return;
        }
        User_ZMDGJ_._game_ZMDGJ_Data.unlockedItem.push(id);
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_OnUserUnlockedStore,{unlocked : id})
    }

    //当前正在使用的道具
    public static get curUsedItem()
    {
        return User_ZMDGJ_._game_ZMDGJ_Data.usedItem;
    }
    //当前正在使用的道具
    public static set curUsedItem(value : number)  
    {
        User_ZMDGJ_._game_ZMDGJ_Data.usedItem = value;
    }
}

