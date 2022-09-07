import { _decorator, Component, Node, Animation, input, Input, EventKeyboard, KeyCode, Vec2,  Vec3,  RigidBody2D, IPhysics2DContact, BoxCollider2D, Contact2DType, Button, EventTouch } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('Player')
export class Player extends Component {
    AnimName:Array<string>=['Player_ider','Player_Move','Player_Jump'];
    StatusName:Array<string>=['left','right','down','up','jump','idel'];
    Player: Node = null;
    PlayerAnim: Animation = null;
    PlayerRigidBody2D:RigidBody2D=null;
    UpDownTime:number=0.35;
    timeTidat:number=0;
    JumpTween: any = null;
    jumpDuration: number = 0.25;//跳跃时间
    JumpMaxHight: number = 120;//跳跃的最高值
    MaxMoveSpeed: Number = 5;//最大速度
    Accel: number = 0;//加速度
    AccelDirection: number = 1;//加速度方向
    IsJump: boolean = false;//是否正在跳跃
    PlayerStatus: string = "";//人物当前状态（左还是右）
    onLoad() {
       
        this.Player=this.node;
        this.PlayerAnim=this.Player.getComponent(Animation);
        this.PlayerRigidBody2D=this.Player.getComponent(RigidBody2D);

        let collider = this.Player.getComponent(BoxCollider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.position.y <selfCollider.node.position.y && this.IsJump&&this.timeTidat<=0) {
            this.IsJump = false;
            this. PlayerAnim.play("Player_ider");
            //this.Player.getComponent(Sprite).color=Color.WHITE;
        }else if(otherCollider.node.name=='Player_g'){
            console.log('游戏通关');
        }
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    start() {

    }

    //#region 控制函数
   
    callback(event: EventTouch) {
         switch (event.currentTarget.name) {
             case "Left":
                 this.Control(this.StatusName[0],this.StatusName[2]);
                 break;
             case "Right":
                 this.Control(this.StatusName[1],this.StatusName[2]);
                 break;
             case "Jump":
                 this.Control(this.StatusName[4],this.StatusName[2]);
                 break;
         }
    }
    cancelcallback(event: EventTouch) {
        switch (event.currentTarget.name) {
            case "Left":
                this.Control(this.StatusName[0],this.StatusName[3]);
                break;
            case "Right":
                this.Control(this.StatusName[1],this.StatusName[3]);
                break;
            case "Jump":
                this.Control(this.StatusName[4],this.StatusName[3]);
                break;
        }
   }

    update(deltaTime: number) {
        if(this.timeTidat>0){
            this.timeTidat-=deltaTime;
        }
        this.onMove(this.PlayerStatus, deltaTime);
        if(this.IsJump){
            // this.UpDownTime+=deltaTime;
            // if(this.UpDownTime<0.35){
            //     this.PlayerRigidBody2D.applyLinearImpulseToCenter(new Vec2(0, this.JumpMaxHight-=deltaTime*12), true);
            // }else{
            //     this.PlayerRigidBody2D.applyLinearImpulseToCenter(new Vec2(0, -1), true);
            // }
        }
    }

    Control(KeyCode:string,str:string) {
        if(str==this.StatusName[2]){
            switch (KeyCode) {
                case this.StatusName[0]:
                    if (this.PlayerStatus == this.StatusName[1]) {
                        this.Accel = 0;
                    }
                    this.PlayerStatus = this.StatusName[0];
                    this.AccelDirection = -1;
                    break;
                case this.StatusName[1]:
                    if (this.PlayerStatus == this.StatusName[0]) {
                        this.Accel = 0;
                    }
                    this.PlayerStatus = this.StatusName[1];
                    this.AccelDirection = 1;
                    break;
                case this.StatusName[4]:
                    if (!this.IsJump) {
                        this.jumpAction();
                    }
                    break;
            }
        }
        if(str==this.StatusName[3]){
            switch (KeyCode) {
                case this.StatusName[0]:
                    if (this.PlayerStatus == this.StatusName[0]) {
                        this.PlayerStatus = this.StatusName[5];
                        this.Accel = 0;
                    }
                    break;
                case this.StatusName[1]:
                    if (this.PlayerStatus == this.StatusName[1]) {
                        this.PlayerStatus = this.StatusName[5];
                        this.Accel = 0;
                    }
                    break;
                case this.StatusName[4]:
                    
                    break;
            }
        }
       
    }



    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
               this.Control("left","down");
                break;
            case KeyCode.KEY_D:
                this.Control("right","down");
                break;
            case KeyCode.KEY_W:
            case KeyCode.SPACE:
                this.Control("jump","down");
                break
        }
    }

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.Control("left","up");
                break;
            case KeyCode.KEY_D:
                this.Control("right","up");
                break;
            case KeyCode.KEY_W:
            case KeyCode.SPACE:
                this.Control("jump","up");
                break

        }
    }

    onMove(Status, dt) {
        switch (Status) {
            case this.StatusName[0]:
            case this.StatusName[1]:
                if (this.Accel < this.MaxMoveSpeed) {
                    this.Accel += dt * 6;
                }
                if(this.IsJump&&this. PlayerAnim.getState(this.AnimName[2]).isPlaying){

                }else  if(!this.IsJump&&!this. PlayerAnim.getState(this.AnimName[1]).isPlaying){
                    this.PlayerAnim.play(this.AnimName[1]);
                }
                this.Player.setScale(new Vec3(this.AccelDirection * Math.abs(this.Player.scale.x), this.Player.scale.y, 1));
                this.Player.position = this.Player.position.add3f(this.AccelDirection * (5 + (this.Accel)), 0, 0);
                break;
            case "idel":
                if(!this.IsJump&&!this. PlayerAnim.getState(this.AnimName[0])){
                    this. PlayerAnim.play(this.AnimName[0]);
                }else if(!this.IsJump&&this. PlayerAnim.getState(this.AnimName[2])){
                    this. PlayerAnim.play(this.AnimName[0]);
                }
                break;
        }
    }

    jumpAction() {
        this.timeTidat=0.15;
        this.PlayerRigidBody2D.linearVelocity=new Vec2(0,0);
        this.UpDownTime=0;
        this.IsJump = true;
        this.PlayerRigidBody2D.applyLinearImpulseToCenter(new Vec2(0, this.JumpMaxHight), true);
        this. PlayerAnim.play(this.AnimName[2]);
        //this.Player.getComponent(Sprite).color=Color.RED;
    }
     //#endregion

}

