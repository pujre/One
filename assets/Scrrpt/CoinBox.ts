import { _decorator, Component, Node, BoxCollider2D, IPhysics2DContact, Prefab, instantiate, Vec3, Animation, Contact2DType, SpriteFrame, Sprite, color, Color, TweenAction, Tween, tween, UITransform, Enum } from 'cc';
import { Cion } from './Cion';
import { CoinBOXGift } from './AnimName';
const { ccclass, property } = _decorator;

@ccclass('CoinBox')
export class CoinBox extends Component {
    @property({type:Enum(CoinBOXGift),displayName:'顶出来的东西类型'})
    BoxType:CoinBOXGift=CoinBOXGift.Coin;

    @property({range:[0,5,0.1],slide:true,type:Number,displayName:'可以顶的次数',visible () {return this.BoxType==CoinBOXGift.Coin}})
    CoinFrequency:number=1;
    @property({type:Node,displayName:'金币',visible () {return this.BoxType==CoinBOXGift.Coin}})
    Coin:Node=null;

    @property({type:Node,displayName:'怪兽',visible () {return this.BoxType==CoinBOXGift.Monster}})
    Monster:Node=null;

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
        if (this.Oef <= 0 && this.CoinFrequency > 0 && otherCollider.node.name == 'Player' &&
            otherCollider.node.position.y < selfCollider.node.position.y && this.BoxXIsIntersect(otherCollider.node, this.node)) {
            switch (this.BoxType) {
                case CoinBOXGift.Coin:
                    //往上移动
                    this.CoinFrequency--;
                    this.Coin.active = true;
                    this.Coin.getComponent(Cion).CoinReset(selfCollider.node.position, selfCollider.node.parent);
                    setTimeout(() => {
                        this.Coin.getComponent(Animation).play();
                        this.Oef = 0.2;
                        let t1 = tween(this.node).to(0.05, { scale: new Vec3(1.4, 1.4, 0) })
                        let t2 = tween(this.node).to(0.05, { scale: new Vec3(1, 1, 1) })
                        tween(this.node).sequence(t1, t2).start();
                        if (this.CoinFrequency <= 0) {
                            this.node.getComponent(Sprite).color = new Color(70, 70, 70, 255);//变灰色
                        }
                    }, 0.1);
                    break;
                case CoinBOXGift.Monster:
                    this.Monster.active = true;
                    break;
            }
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

