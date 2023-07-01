import IO_ZMDGJ_bj from "./IObj";

export default class Obj_ZMDGJ_Pool 
{
    protected readonly _pool_ZMDGJ_ : Array<IO_ZMDGJ_bj> = new Array<IO_ZMDGJ_bj>();

    protected _create_ZMDGJ_Caller : any = null;
    protected _create_ZMDGJ_Func : Function = null;

    //从对象池中获取对象,如果不传入key，则直接返回池中最后一个对象
    //如果对象池为空，并没有 create 函数，则返回 null
    //如果对象池为空，有 create 函数，则调用  create 实例化对象并返回。
    public get_ZMDGJ_(key? : any) : IO_ZMDGJ_bj
    {
        var obj : IO_ZMDGJ_bj = null;
        if(null == key)
        {
            obj = this._pool_ZMDGJ_.pop();
        }
        else
        {
            for(var i=0;i < this._pool_ZMDGJ_.length;++i)
            {
                if(this._pool_ZMDGJ_[i].OP_Key() == key)
                {
                    obj = this._pool_ZMDGJ_[i];
                    this._pool_ZMDGJ_.splice(i,1);
                    break;
                }
            }
        }

        if(obj)
        {
            obj.OP_Init();
        }
        else
        {
            if(this._create_ZMDGJ_Func)
            {
                obj = this._create_ZMDGJ_Func.call(this._create_ZMDGJ_Caller,[key])
                obj.OP_Init();
            }
        }
        return obj;
    }

    //回收对象
    public recover_ZMDGJ_(o : IO_ZMDGJ_bj)
    {
        o.OP_Reset();
        for(var i=0;i < this._pool_ZMDGJ_.length;++i)
        {
            if(this._pool_ZMDGJ_[i] == o)
            {
                return;
            }
        }
        this._pool_ZMDGJ_.push(o);
    }

    //清空对象池
    public clear_ZMDGJ_()
    {
        for(var i=0;i < this._pool_ZMDGJ_.length;++i)
        {
            this._pool_ZMDGJ_[i].OP_OnClear();//调用对象的清理函数，释放对象自身维护的资源
        }
        this._pool_ZMDGJ_.splice(0);
    }

    public set_ZMDGJ_Create_ZMDGJ_Func(caller : any,createFunc : Function)
    {
        this._create_ZMDGJ_Caller = caller;
        this._create_ZMDGJ_Func = createFunc;
    }
}