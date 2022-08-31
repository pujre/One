import { _decorator, Component, Node, BoxCollider2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CoinBox')
export class CoinBox extends Component {
    @property(Node)
    Coin:Node=null;
    start() {

    }

    update(deltaTime: number) {
        
    }

    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.name == 'Player' && otherCollider.node.position.y < selfCollider.node.position.y) {
            console.log("顶出金币");
        }
    }
}

