import { _decorator, Component, Node, instantiate, resources, Prefab, Vec3, find } from 'cc';
import { Control } from './Control';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    static _instance:GameManager=null;
    @property(Control)
    Control:Control=null;
    @property(Node)
    GameNode:Node=null;
    LevelNode:any=null;

    

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

    }

    LoadLevel(level:number){
        this.LevelNode?.destroy();
        console.log("加载关卡—-----："+level.toString());
        resources.load("Level/Level_"+level.toString(),(err, data)=>{
            if(err==undefined){
                this.LevelNode=instantiate(data);
                this.LevelNode.setParent(this.GameNode);
                var Player_p=this.LevelNode.getChildByName('Player_p');
                this.Control.PlayerScript.node.position=Player_p.position;
                Player_p.destroy();
            }
        })
    }
}

