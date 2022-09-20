import { _decorator, Component, Node, BoxCollider2D, IPhysics2DContact, Prefab, instantiate, Vec3, Animation, Contact2DType, SpriteFrame, Sprite, color, Color, TweenAction, Tween, tween } from 'cc';
import { Cion } from './Cion';
const { ccclass, property } = _decorator;

@ccclass('CoinBox')
export class CoinBox extends Component {
    @property()
    CoinFrequency:number=1;
    @property(Prefab)
    Coin:Prefab=null;
    collider:BoxCollider2D=null;

    Oef:number=0.2;

    start() {
         this.collider = this.node.getComponent(BoxCollider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    update(deltaTime: number) {
        if(this.Oef>0){
            this.Oef-=deltaTime;
        }
    }

    onDestroy(){
        this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if (this.Oef<=0&&this.CoinFrequency>0&&otherCollider.node.name == 'Player' && otherCollider.node.position.y < selfCollider.node.position.y) {
            //往上移动
            console.log('AON');
            this.CoinFrequency--;
            var ofe=instantiate(this.Coin)
            ofe.setParent(selfCollider.node.parent);
        //     setTimeout(() => {
        //         ofe.setPosition(selfCollider.node.position.add3f(0,60,0));
        // }, 0.1);
            // ofe.getComponent(Cion).ReadyToDelete=1;
            // setTimeout(() => {
            //     ofe.getComponent(Animation).play();
            //     this.Oef=0.2;
            //     let t1 = tween(this.node).to(0.05, { scale: new Vec3(1.4, 1.4, 0) })
            //     let t2 = tween(this.node).to(0.05, { scale: new Vec3(1, 1, 1) })
            //     tween(this.node).sequence(t1, t2).start();
            //     if(this.CoinFrequency<=0){
            //         this.node.getComponent(Sprite).color=new Color(70,70,70,255);
            //     }
            // }, 5);
        }
    }



}

