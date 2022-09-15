import { _decorator, Component, Node, instantiate, resources, Prefab, Vec3 } from 'cc';
import { Control } from './Control';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    static _instance:GameManager=null;
    @property(Control)
    Control:Control=null;
    LevelNode=null;
    static Instance(){
        if(this._instance==null){
            this._instance=new GameManager();
        }
        return this._instance;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    LoadLevel(level:number){
        this.LevelNode?.destroy();
        var levels=resources.load<Prefab>("Level/Level_"+level.toString())
        this.LevelNode=instantiate(levels);
        this.LevelNode.position=new Vec3(0,0,0);
        var Player_p=this.LevelNode.getChildByName('Player_p');
        this.Control.PlayerScript.node.position=Player_p.position;
        Player_p.destroy();
    }
}

