export default class Utilit_ZMDGJ_
{
    public static readonly Origin_ZMDGJ_StageWidth = 1334;
    public static readonly Origin_ZMDGJ_StageHeight = 750;


    public static readonly grayscale_ZMDGJ_Mat: Array<number> =
        [0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0, 0, 0, 1, 0];
    
    public static readonly grayscale_ZMDGJ_Filter: Laya.ColorFilter = new Laya.ColorFilter(Utilit_ZMDGJ_.grayscale_ZMDGJ_Mat);


    protected static poin_ZMDGJ_Down : Laya.Point = new Laya.Point(0,-1);
    protected static poin_ZMDGJ_Up : Laya.Point = new Laya.Point(0,1);

    
    public static Lerp_ZMDGJ_(form : number,to : number,delta : number) : number
    {
        if(form == to)
            return to;
        if(form > to)
        {
            var next = form - delta;
            if(next <= to)
                return to;
            return next;
        }
        else if(form < to)
        {
            var next = form + delta;
            if(next >= to)
                return to;
            return next;
        }
    }

    public static lerp_ZMDGJ_Euler_ZMDGJ_Angle(form : number,to : number,delta) : number
    {
        var form = form % 360;
        form = form >= 0 ? form : (360 + form);
        var to = to % 360;
        to = to >= 0 ? to : (360 + to);
        var dis = Math.abs(to - form);
        if(dis > 180)
        {
            if(form < to)
                to = to - 360
            else if(form > to)
                to = to + 360
        }
        var next = Utilit_ZMDGJ_.Lerp_ZMDGJ_(form,to,delta);
        return next;
    }

    public static get_ZMDGJ_RotationBy_ZMDGJ_Dir(v : Laya.Point) : number
    {   
        var dotValue = (v.x * Utilit_ZMDGJ_.poin_ZMDGJ_Down.x) + (v.y *  Utilit_ZMDGJ_.poin_ZMDGJ_Down.y);
        var cos = dotValue / (v.distance(0,0)  * Utilit_ZMDGJ_.poin_ZMDGJ_Down.distance(0,0));
        var radian = Math.acos(cos)
        var rotation = radian / (2 * Math.PI)  * 360;
        if(v.x < 0)
        {
            rotation = -rotation;
        }
        return rotation;
    }

    public static get_ZMDGJ_Rotation_ZMDGJ_ByDirOn3DSpace(v : Laya.Point)
    {
        var dotValue = (v.x * Utilit_ZMDGJ_.poin_ZMDGJ_Up.x) + (v.y *  Utilit_ZMDGJ_.poin_ZMDGJ_Up.y);
        var cos = dotValue / (v.distance(0,0)  * Utilit_ZMDGJ_.poin_ZMDGJ_Up.distance(0,0));
        var radian = Math.acos(cos)
        var rotation = radian / (2 * Math.PI)  * 360;
        if(v.x < 0)
        {
            rotation = rotation + (180 - rotation) * 2;
        }
        return rotation;
    }

    public static get_ZMDGJ_DirBy_ZMDGJ_Rotation(rotation : number) : Laya.Point
    {   
        var radian = (rotation - 90) * Math.PI / 180;// -90 是转换到场景坐标系
        var x = Math.cos(radian);
        var y = Math.sin(radian);
        var point = new Laya.Point(x,y);
        point.normalize();
        return point;
    }

    public static get_ZMDGJ_DirDir_ZMDGJ_Angle(dir1 : Laya.Point,dir2 : Laya.Point) : number
    {   
        var dotValue = (dir1.x * dir2.x) + (dir1.y *  dir2.y);
        var cos = dotValue / (dir1.distance(0,0)  * dir2.distance(0,0));
        var radian = Math.acos(cos)
        var angle = radian / (2 * Math.PI)  * 360;
        return angle;
    }

    public static get_ZMDGJ_Dir_ZMDGJ_ScalarLength(dir : Laya.Point) : number
    {
        var sl = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
        return sl;
    }

    public static set_ZMDGJ_SpOn_ZMDGJ_ParentCenter(sp : Laya.Sprite)
    {
        if(null == sp.parent)
            return;
        var psp = sp.parent as Laya.Sprite;
        var x  = 0;
        var y  = 0;
        var x  = x - sp.width / 2 * sp.scaleX + psp.width / 2;
        var y  = y - sp.height / 2  * sp.scaleY  + psp.height / 2;
        sp.x = x;
        sp.y = y;
    }

    public static get_ZMDGJ_Point_ZMDGJ_To_ZMDGJ_Line_ZMDGJ_Distance(x : number,y : number,LineStart : Laya.Point,LineEnd : Laya.Point) : number
    {
        var toStartDir = new Laya.Point(x  - LineStart.x,y - LineStart.y);
        var toEndDir = new Laya.Point(x  - LineEnd.x,y - LineEnd.y);
        var lineDir = new Laya.Point(LineEnd.x - LineStart.y,LineEnd.y - LineStart.y)
        var dotToStartDir = (lineDir.x * toStartDir.x) + (lineDir.y * toStartDir.y)
        if(dotToStartDir <= 0)
        {
            return toStartDir.distance(0,0);
        }
        var dotToEndDir = (lineDir.x * toEndDir.x) + (lineDir.y * toEndDir.y)
        if (dotToEndDir <= 0)
        {
            return toEndDir.distance(0,0);
        }
        var toStartDis = toStartDir.distance(0,0);
        var lineDirDis = lineDir.distance(0,0);
        var cos = dotToStartDir / (toStartDis * lineDirDis);
        var radians = Math.acos(cos)
        var dis = Math.sin(radians) * toStartDis
        return dis;
    }


    public static is_ZMDGJ_IphoneX()
    {
        if(!Laya.Browser.onIPhone)
            return false;
        if((Laya.Browser.width == 2436 && Laya.Browser.height == 1125) 
            || (Laya.Browser.height == 2436 && Laya.Browser.width == 1125))
        {
            return true
        }
        return false
    } 

    public static is_ZMDGJ_Iphone6()
    {
        if (!Laya.Browser.onIPhone)
            return false;
        if (Laya.Browser.onMiniGame)  {
            var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            if(sysInfo.model.indexOf("iPhone 6") > -1){
                return true;
            }
        }
        return false
    } 
    
    public static is_ZMDGJ_Iphone()
    {
        return Laya.Browser.onIPhone
    }


    public static get_ZMDGJ_Child(node : Laya.Node,name : string) : Laya.Node
    {
        for(var i=0;i < node.numChildren;++i)
        {
            var child = node.getChildAt(i);
            if(child.name == name)
            {
                return child;
            }
            else
            {
                var target = Utilit_ZMDGJ_.get_ZMDGJ_Child(child,name);
                if(target)
                    return target;
            }
        }
        return null;
    }

    public static for_ZMDGJ_Each_ZMDGJ_Child(node : Laya.Node,each : Function)
    {
        for(let i=0;i < node.numChildren;++i)
        {
            let child = node.getChildAt(i);
            each(child);
            Utilit_ZMDGJ_.for_ZMDGJ_Each_ZMDGJ_Child(child,each);
        }
    }
}