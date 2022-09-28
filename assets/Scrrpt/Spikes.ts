import { _decorator, Component, Node, BoxCollider2D, IPhysics2DContact } from 'cc';
import { PropBase } from './PropBase';
const { ccclass, property } = _decorator;

@ccclass('Spikes')
export class Spikes extends PropBase {
    start() {
        this.OncolliderStart(this.node,this.onBeginContact);
    }

    onDestroy(){
       super.onDestroy;
    }

    OnPropStart(a,b){
       
    }

    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if(selfCollider.node.name=='Player'){
            console.log('玩家死亡，游戏结束');
            
        }
    }

    update(deltaTime: number) {
        
    }
}

