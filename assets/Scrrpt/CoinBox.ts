import { _decorator, Component, Node, BoxCollider2D, IPhysics2DContact, Prefab, instantiate, Vec3, Animation, Contact2DType, SpriteFrame, Sprite, color, Color, TweenAction, Tween, tween, UITransform } from 'cc';
import { Cion } from './Cion';
const { ccclass, property } = _decorator;

@ccclass('CoinBox')
export class CoinBox extends Component {
    @property()
    CoinFrequency:number=1;
    @property(Node)
    Coin:Node=null;
    collider:BoxCollider2D=null;

    Oef:number=0.2;//防止短时间内多次触发

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
        if (this.Oef<=0&&this.CoinFrequency>0&&otherCollider.node.name == 'Player' && 
            otherCollider.node.position.y < selfCollider.node.position.y&&this.BoxXIsIntersect(otherCollider.node,this.node)) {
            //往上移动
            this.CoinFrequency--;
            this.Coin.active=true;
            this.Coin.getComponent(Cion).CoinReset(selfCollider.node.position,selfCollider.node.parent);
            setTimeout(() => {
                this.Coin.getComponent(Animation).play();
                this.Oef=0.2;
                let t1 = tween(this.node).to(0.05, { scale: new Vec3(1.4, 1.4, 0) })
                let t2 = tween(this.node).to(0.05, { scale: new Vec3(1, 1, 1) })
                tween(this.node).sequence(t1, t2).start();
                if(this.CoinFrequency<=0){
                    this.node.getComponent(Sprite).color=new Color(70,70,70,255);//变灰色
                }
            }, 0.1);
        }
    }



    /**
     * 两个box是否在x轴上相交，
     * player 在下方得box
     * box2 在上方得box
    */
    BoxXIsIntersect(player:Node,box2:Node){
        var pv=player.position;
        var bv=box2.position;
        var pSize=player.getComponent(UITransform).contentSize.x/2;
        var bSize=box2.getComponent(UITransform).contentSize.x/2;
        //p得最左边大于b得最左边，小于b得最右边，
        if((pv.x-pSize>=bv.x-bSize&&pv.x-pSize<=bv.x+bSize)||
        (pv.x+pSize>=bv.x-bSize&&pv.x+pSize<=bv.x+bSize)||
        (pv.x>=bv.x-bSize&&pv.x<=bv.x+bSize)){
            return true;
        }else{
            return false;
        }
    }


}

