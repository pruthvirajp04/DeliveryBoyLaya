export default class Twinkle_ZMDGJ_Sprite extends Laya.Script {
    /** @prop {name:TwinkleSpeed, tips:"闪动速度", type:Number, default:1000}*/
    public TwinkleSpeed: number = 1000;
    /** @prop {name:TwinkleMinSize, tips:"最小缩放", type:Number, default:0.95}*/
    public TwinkleMinSize: number = 0.95;
    /** @prop {name:TwinkleMaxSize, tips:"最大缩放", type:Number, default:1.05}*/
    public TwinkleMaxSize: number = 1.05;

    protected _owner_ZMDGJ_Sprite: Laya.Sprite;
    protected _display_ZMDGJ_Sp: Laya.Sprite;
    protected _dis_ZMDGJ_Text: Laya.Text;
    protected _ani_ZMDGJ_Forward: boolean = false;
    protected _font_ZMDGJ_Size = 25;
    protected _origin_ZMDGJ_Size = 1;
    constructor() {
        super();
    }
    onAwake() {
        this._display_ZMDGJ_Sp = this.owner as Laya.Sprite;
        this._dis_ZMDGJ_Text = this.owner.getChildByName("TitelText") as Laya.Text;
        this._origin_ZMDGJ_Size = this._display_ZMDGJ_Sp.scaleX;
        if (this._dis_ZMDGJ_Text != null) {
            this._dis_ZMDGJ_Text.text = "";
            this._font_ZMDGJ_Size = this._dis_ZMDGJ_Text.fontSize;
        }
    }
    onEnable(): void {
        this._display_ZMDGJ_Sp.scale(this._origin_ZMDGJ_Size, this._origin_ZMDGJ_Size);
    }
    onDisable(): void {

    }
    onUpdate() {
        this.display_ZMDGJ_Ani();
    }

    protected display_ZMDGJ_Ani() {
        if (!this._ani_ZMDGJ_Forward) {
            var scale = this._display_ZMDGJ_Sp.scaleX - Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.max(scale, this.TwinkleMinSize * this._origin_ZMDGJ_Size);
            this._display_ZMDGJ_Sp.scale(scale, scale);
            if (this._display_ZMDGJ_Sp.scaleX <= this.TwinkleMinSize * this._origin_ZMDGJ_Size) {
                this._ani_ZMDGJ_Forward = true;
            }
        }
        else {
            var scale = this._display_ZMDGJ_Sp.scaleX + Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.min(scale, this.TwinkleMaxSize * this._origin_ZMDGJ_Size);
            this._display_ZMDGJ_Sp.scale(scale, scale);
            if (this._display_ZMDGJ_Sp.scaleX >= this.TwinkleMaxSize * this._origin_ZMDGJ_Size) {
                this._ani_ZMDGJ_Forward = false;
            }
        }
    }
}