import { _decorator, Component, Node, instantiate, resources, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    static _instance:GameManager=null;
    LevelNode:Node=null;
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

        //this.LevelNode=instantiate();

    }
}

