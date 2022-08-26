import { _decorator, Component, Node, Animation, input, Input, EventKeyboard, KeyCode, Vec2,  Vec3,  RigidBody2D, IPhysics2DContact, BoxCollider2D, Contact2DType, Button, EventTouch } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('Player')
export class Player extends Component {
    @property(Node)
    Player: Node = null;
    @property(Animation)
    Anim: Animation = null;
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
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        let collider = this.Player.getComponent(BoxCollider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.position.y <selfCollider.node.position.y && this.IsJump&&this.timeTidat<=0) {
            this.IsJump = false;
            //this.Player.getComponent(Sprite).color=Color.WHITE;
        }

    }
    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    start() {

    }

    callback(event: EventTouch) {
         switch (event.currentTarget.name) {
             case "Left":
                 this.Control("left","down");
                 break;
             case "Right":
                 this.Control("right","down");
                 break;
             case "Jump":
                 this.Control("jump","down");
                 break;
         }
    }
    cancelcallback(event: EventTouch) {
        switch (event.currentTarget.name) {
            case "Left":
                this.Control("left","up");
                break;
            case "Right":
                this.Control("right","up");
                break;
            case "Jump":
                this.Control("jump","up");
                break;
        }
   }

    update(deltaTime: number) {
        if(this.timeTidat>0){
            this.timeTidat-=deltaTime;
        }
        this.onMove(this.PlayerStatus, deltaTime);
    }

    Control(KeyCode:string,str:string) {
        if(str=="down"){
            switch (KeyCode) {
                case "left":
                    if (this.PlayerStatus == "right") {
                        this.Accel = 0;
                    }
                    this.PlayerStatus = "left";
                    this.AccelDirection = -1;
                    break;
                case "right":
                    if (this.PlayerStatus == "left") {
                        this.Accel = 0;
                    }
                    this.PlayerStatus = "right";
                    this.AccelDirection = 1;
                    break;
                case "jump":
                    if (!this.IsJump) {
                        this.jumpAction();
                    }
                    break;
            }
        }
        if(str=="up"){
            switch (KeyCode) {
                case "left":
                    if (this.PlayerStatus == "left") {
                        this.PlayerStatus = "Idel";
                        this.Accel = 0;
                    }
                    break;
                case "right":
                    if (this.PlayerStatus == "right") {
                        this.PlayerStatus = "Idel";
                        this.Accel = 0;
                    }
                    break;
                case "jump":
                    
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
            case "right":
            case "left":
                if (this.Accel < this.MaxMoveSpeed) {
                    this.Accel += dt * 6;
                }
                if(this.IsJump&&this.Anim.getState("Player_Jump").isPlaying){

                }else  if(!this.IsJump&&!this.Anim.getState("Player_Move").isPlaying){
                    this.Anim.play("Player_Move");
                }
                this.Player.setScale(new Vec3(this.AccelDirection * Math.abs(this.Player.scale.x), this.Player.scale.y, 1));
                this.Player.position = this.Player.position.add3f(this.AccelDirection * (5 + (this.Accel)), 0, 0);
                break;
            case "Idel":
                if(!this.IsJump&&!this.Anim.getState("Player_ider")){
                    this.Anim.play("Player_ider");
                }else if(!this.IsJump&&this.Anim.getState("Player_Jump")){
                    this.Anim.play("Player_ider");
                }
                break;
        }
    }

    jumpAction() {
        this.timeTidat=0.1;
        this.IsJump = true;
        this.Player.getComponent(RigidBody2D).linearVelocity=new Vec2(0,0);
        this.Player.getComponent(RigidBody2D).applyLinearImpulseToCenter(new Vec2(0, this.JumpMaxHight), true);
        this.Anim.play("Player_Jump");
        //this.Player.getComponent(Sprite).color=Color.RED;
    }

}

