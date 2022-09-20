import { _decorator, Component, Node, instantiate, resources, Prefab, Vec3, find, UITransform } from 'cc';
import { Control } from './Control';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
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
    CameraWPosition:Vec3;
    

    static Instance():GameManager{
        return GameManager._instance;
    }

    onLoad(){
        GameManager._instance=this;
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

    LoadLevel(level:number){
        this.LevelNode?.destroy();
        console.log("加载关卡—-----："+level.toString());
        resources.load("Level/Level_"+level.toString(),(err, data)=>{
            if(err==undefined){
                this.LevelNode=instantiate(data);
                this.LevelNode.setParent(this.GameNode);
                var Player_p=this.LevelNode.getChildByName('Player_p');
                this.LevelNodeSize=this.LevelNode.getChildByName('Size');
                this.CameraIsMove=this.LevelNodeSize?true:false;
                if(this.CameraIsMove){
                    this.LevelNodeSizeUITransform=this.LevelNodeSize.getComponent(UITransform);
                    
                }else{
                    this.GameCamera.position=new Vec3(0,0,0);
                }
                this.Control.PlayerScript.node.position=Player_p.position;
                Player_p.destroy();
            }
        })
    }
}

