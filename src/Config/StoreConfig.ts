import WXAPI from "../WXAPI";
import AppConfig from "../AppConfig";

export class StoreData
{
    public id : number = 0;//皮肤索引
    public icon : string = "";//皮肤地址
    public priceType : number = 0;//0:金币解锁，1:激励视频解锁
    public price : number = 0;//皮肤价格

    public clone() : StoreData
    {
        let t = new StoreData();
        t.id = this.id;
        t.icon = this.icon;
        t.priceType = this.priceType;
        t.price = this.price;
        return t;
    }
}

export default class StoreConfig
{   
    public static getInstance() : StoreConfig
    {
        if(null == StoreConfig._instance)
        {
            StoreConfig._instance = StoreConfig.load();
        }
        return StoreConfig._instance
    }
    protected static _instance: StoreConfig;

    protected static load() : StoreConfig
    {
        var config = new StoreConfig();
        var json: any = Laya.loader.getRes(AppConfig.Local_ZMDGJ_Test_ZMDGJ_ReServer + "/json/storeconfig.json");
        if(json){
            for(var i = 0;i < json.length;++i)
            {
                var row = json[i];
                var rowData: StoreData = new StoreData();
                rowData.id = Number(row["id"]);
                rowData.icon = String(row["icon"]);
                rowData.priceType = Number(row["priceType"]);
                rowData.price = Number(row["price"]);
                config._data.push(rowData);
            }
            return config;
        }
    }

    protected readonly _data : Array<StoreData> = new Array<StoreData>();

    public getStoreDatas(): Array<StoreData>
    {
        let datas = new Array<StoreData>();
        for(let i=0;i < this._data.length;++i)
        {
            datas.push(this._data[i].clone());
        }
        return datas;
    }
}