import { _decorator, Component, Node, instantiate, resources, Prefab, Vec3, find, UITransform, PhysicsSystem2D, EPhysics2DDrawFlags, CCBoolean, Vec2, Rect, Size } from 'cc';
import { Control } from './Control';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(CCBoolean)
    IsdebugDrawFlags:boolean=false;
    static _instance:GameManager=null;
    Control:Control=null;
    @property(Node)
    GameCamera:Node=null;
    @property({displayName:'摄像机跟随'})
    CameraIsMove:boolean=false;
    @property(Node)
    GameNode:Node=null;
    LevelNode:any=null;

    LevelNodeSize:Node=null;
    LevelNodeSizeUITransform:UITransform=null;
    NowLevel:number=0;
    CameraWPosition:Vec3;
    

    static Instance():GameManager{
        return GameManager._instance;
    }

    onLoad() {
        GameManager._instance = this;
        if(this.IsdebugDrawFlags){
            PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
            EPhysics2DDrawFlags.Pair |
            EPhysics2DDrawFlags.CenterOfMass |
            EPhysics2DDrawFlags.Joint |
            EPhysics2DDrawFlags.Shape;
        }
       
    }
    start() {
        if(this.Control==null){
            this.Control=this.node.getComponent(Control);
        }

    }

    update(deltaTime: number) {
        if(this.CameraIsMove){
            this.CameraWPosition=new Vec3(this.Control.PlayerScript.node.position.x,this.GameCamera.position.y,this.GameCamera.position.z);
            if(this.CameraWPosition.x-1170>this.LevelNodeSize.position.x-(this.LevelNodeSizeUITransform.contentSize.x/2)&&
            this.CameraWPosition.x+1170<this.LevelNodeSize.position.x+(this.LevelNodeSizeUITransform.contentSize.x/2)){
                this.GameCamera.position=this.CameraWPosition;
            }
            
        }
    }

    LoadNextLevel(){
        this.LoadLevel(this.NowLevel+1);
    }

    LoadLevel(level:number){
        this.LevelNode?.destroy();
        console.log("加载关卡—-----："+level.toString());
        resources.load("Level/Level_"+level.toString(),(err, data)=>{
            if(err==undefined){
                this.LevelNode=instantiate(data);
                this.LevelNode.setParent(this.GameNode);
                var Player_p=this.LevelNode.getChildByName('Player_p');
                this.GameCamera.position=Vec3.ZERO;
                this.LevelNodeSize=this.LevelNode.getChildByName('Size');
                this.CameraIsMove=this.LevelNodeSize?true:false;
                if(this.CameraIsMove){
                    this.LevelNodeSizeUITransform=this.LevelNodeSize.getComponent(UITransform);
                }
                this.Control.PlayerScript.node.position=Player_p.position;
                Player_p.destroy();
            }else{
                console.log('未找到第 '+level+' 关卡Prefab');
            }
        })
    }


    GteCollior(P0:Vec2,P1:Vec2):number{
        var dx = P0.x - P1.x;
        var dy = P0.y - P1.y;
        var dir = new Vec2(dx,dy);
        //根据朝向计算出夹角弧度
        var angle = dir.signAngle(new Vec2(1,0));
        //将弧度转换为欧拉角
        return angle / Math.PI * 180;
    }
}

