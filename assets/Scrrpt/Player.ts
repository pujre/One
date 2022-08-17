import { _decorator, Component, Node, animation, CCObject, ConeCollider, Animation,NodeEventType, SystemEvent, input,Input, EventTouch, EventKeyboard, KeyCode, v2, Vec2, v4, Vec3, math } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('Player')
export class Player extends Component {
    @property(Node)
    Player:Node=null;
    @property(Animation)
    Anim:Animation=null;

    JumpMaxHight:number=100;//跳跃的最高值
    MaxMoveSpeed: Number=5;//最大速度
    PlayerStatus:string="";//人物当前状态
    Accel:number=0;//加速度
    IsJump:boolean=false;//是否正在跳跃
    onLoad(){
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }
    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }
    
    start() {

    }

    update(deltaTime: number) {
        this.onMove(this.PlayerStatus,deltaTime);
    }

    onKeyDown(event:EventKeyboard) {
        console.log("A___"+(event.keyCode==KeyCode.KEY_A).toString());
        console.log("D___"+(event.keyCode==KeyCode.KEY_D).toString());
        switch(event.keyCode){
            case KeyCode.KEY_A:
                if(this.PlayerStatus=="right"){
                    console.log("设置了右加速值为0:");
                    this.Accel = 0;
                    }
                this.PlayerStatus="left";
                break;
            case KeyCode.KEY_D:
                if(this.PlayerStatus=="left"){
                    console.log("设置了左加速值为0:");
                    this.Accel = 0;
                    }
                this.PlayerStatus="right";
                break;
            case KeyCode.KEY_W:
                if(this.PlayerStatus!="jump"){
                    this.PlayerStatus="jump";
                }
               
                break
        }
    }

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                if(this.PlayerStatus=="left"){
                    this.PlayerStatus = "Idel";
                     this.Accel = 0;
                }
                break;
            case KeyCode.KEY_D:
                if(this.PlayerStatus=="right"){
                    this.PlayerStatus = "Idel";
                    this.Accel = 0;
                }
                
                break;
            case KeyCode.KEY_W:
                this.PlayerStatus = "Idel";
                break

        }
    }

    onMove(Status,dt) {
        switch(Status){
            case "right":
               if(this.Accel<this.MaxMoveSpeed){
                    this.Accel +=  dt*4;
                }
                this.Player.position=this.Player.position.add3f(5+this.Accel,0,0);
                console.log("right:"+this.Accel);
                break;
            case "left":
                if(this.Accel<this.MaxMoveSpeed){
                    this.Accel +=  dt*4;
                }
                this.Player.position=this.Player.position.subtract3f(5+this.Accel,0,0);
                console.log("left:"+this.Accel);
                break;
            case "jump":
                if(!this.IsJump){
                    moveBy(this.Player.position.x,this.JumpMaxHight);
                }
                break;
            case "Idel":
                break;
        }
    }


    PlayerControl(str: string) {
        switch (str) {
            case "Left":
                break;
            case "Right":
                break
            case "Jump":
                break;
            default:
                break;
        }
    }
}

