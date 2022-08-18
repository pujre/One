import { _decorator, Component, Node, animation, CCObject, ConeCollider, Animation,NodeEventType, SystemEvent, input,Input, EventTouch, EventKeyboard, KeyCode, v2, Vec2, v4, Vec3, math, RigidBody2D, tween, Tween, TweenAction } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('Player')
export class Player extends Component {
    @property(Node)
    Player:Node=null;
    @property(Animation)
    Anim:Animation=null;
    
    JumpTween:any=null;
    jumpDuration:number=0.25;//跳跃时间
    JumpMaxHight:number=250;//跳跃的最高值
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
            case KeyCode.SPACE:
                if(!this.IsJump){
                    this.IsJump=true;
                    this.jumpAction();
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
            case KeyCode.SPACE:
                //this.PlayerStatus = "Idel";
                break

        }
    }

    onMove(Status,dt) {
        switch(Status){
            case "right":
               if(this.Accel<this.MaxMoveSpeed){
                    this.Accel +=  dt*6;
                }
                if(this.Player.scale.x<0){
                    this.Player.setScale(new Vec3(Math.abs(this.Player.scale.x) ,this.Player.scale.y,1));
                }
                this.Player.position=this.Player.position.add3f(5+this.Accel,0,0);
                break;
            case "left":
                if(this.Accel<this.MaxMoveSpeed){
                    this.Accel +=  dt*6;
                }
                if(this.Player.scale.x>0){
                    this.Player.setScale(new Vec3(-Math.abs(this.Player.scale.x) ,this.Player.scale.y,1));
                }
               
                this.Player.position=this.Player.position.subtract3f(5+this.Accel,0,0);
                break;
            case "jump":
               
                break;
            case "Idel":
                break;
        }
    }

    jumpAction() {
        this.JumpTween = tween(this.Player)
        .by(this.jumpDuration, { position: new Vec3(100,this.JumpMaxHight, 0) },{easing:"sineOut"})
        .by(this.jumpDuration, { position: new Vec3(0,-this.JumpMaxHight, 0) },{easing:"sineOut"})
        .call(()=>{
            this.IsJump=false;
            this.JumpTween.stop();
        });
        this.JumpTween.start();
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

