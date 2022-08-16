import { _decorator, Component, Node, animation, CCObject, ConeCollider, Animation,NodeEventType } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('Player')
export class Player extends Component {
    @property(Animation)
    Anim:Animation=null;
    JumpMaxHight:number=100;//跳跃的最高值
    PlayerStatus:string="";//人物当前状态
    onLoad(){
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    
    start() {

    }

    update(deltaTime: number) {
        this.onMove(this.MoveDirection);
    }

    onKeyDown(event) {
        switch(event.keyCode){
            case cc.macro.KEY.left:
            case cc.macro.KEY.A:
                this.PlayerStatus="left";
                break;
            case cc.macro.KEY.right:
            case cc.macro.KEY.D:
                this.PlayerStatus="right";
                break;
            case cc.macro.KEY.up:
            case cc.macro.KEY.W:
                if(this.PlayerStatus!="jump"){
                    this.PlayerStatus="jump";
                }
               
                break
        }
    }

    onKeyUp(event){
        switch(event.keyCode){
            case cc.macro.KEY.left:
            case cc.macro.KEY.A:
                this.MoveDirection="Idel";
                break;
            case cc.macro.KEY.right:
            case cc.macro.KEY.D:
                this.MoveDirection="Idel";
                break;
            case cc.macro.KEY.up:
            case cc.macro.KEY.W:
                this.MoveDirection="Idel";
                break

        }
    }

    onMove(Status) {
        switch(Status){
            case "left":
                break;
            case "right":
                break;
            case "jump":
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

