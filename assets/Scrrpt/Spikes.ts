import { _decorator, Component, Node, BoxCollider2D, IPhysics2DContact, UITransform, size, Size, PhysicsSystem2D } from 'cc';
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

    OnPropStart(a:Node,b){
        this.node.setParent(a.parent);
        this.node.position=a.position.subtract3f(0,a.getComponent(UITransform).contentSize.y/2+this.node.getComponent(UITransform).contentSize.y/2,0);
        let NewSize=new Size(a.getComponent(UITransform).contentSize.width,this.node.getComponent(UITransform).contentSize.height);
        this.node.getComponent(UITransform).contentSize.set(NewSize.width,NewSize.height);
        this.node.getComponent(BoxCollider2D).size.set(NewSize.width,NewSize.height);
        this.node.getComponent(BoxCollider2D).apply();        
    }

    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if(otherCollider.node.name=='Player'){
            console.log('玩家死亡，游戏结束');
        }
    }

    update(deltaTime: number) {
        
    }
}

