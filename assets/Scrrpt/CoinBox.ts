import { _decorator, Component, Node, BoxCollider2D, IPhysics2DContact, Prefab, instantiate, Vec3, Animation, Contact2DType, SpriteFrame, Sprite, color, Color, TweenAction, Tween, tween, UITransform, Enum, resources, RigidBody, RigidBody2D, CCInteger } from 'cc';
import { Cion } from './Cion';
import { CoinBOXGift, MonsterBehavior } from './AnimName';
import { Monster } from './Monster';
import { PropBase } from './PropBase';
import { MathTool } from './MathTool';
import { Spikes } from './Spikes';
const { ccclass, property } = _decorator;

@ccclass('CoinBox')
export class CoinBox extends PropBase {
    
    @property({type:Enum(CoinBOXGift),displayName:'顶出来的东西类型'})
    BoxType:CoinBOXGift=CoinBOXGift.Coin;
    @property({range:[0,5,1],slide:true,type:CCInteger,displayName:'可以顶的次数'})
    CoinFrequency:number=1;

    PropCNode=null;
    collider:BoxCollider2D=null;
    Oef:number=0.2;//防止短时间内多次触发

    start() {
        this.OncolliderStart(this.node,this.onBeginContact);
    }

    OnPropStart(): void {
        
    }

    update(deltaTime: number) {
        if(this.Oef>0){
            this.Oef-=deltaTime;
        }
    }

    

    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if (this.Oef <= 0 &&this.CoinFrequency >0 && otherCollider.node.name == 'Player' &&otherCollider.node.position.y < selfCollider.node.position.y ) {
            switch (this.BoxType) {
                case CoinBOXGift.Coin:
                    this.CoinFrequency--; 
                    resources.load('Props/Cion', (err, data) => {
                        if (err == undefined||err == null) {
                            this.PropCNode=instantiate(data);
                            this.PropCNode.setParent(this.node.parent);
                            this.PropCNode.getComponent(PropBase).OnPropStart(selfCollider.node.position, selfCollider.node.parent);
                            setTimeout(() => {
                                this.PropCNode.getComponent(Animation).play();
                                this.CnodeTimeAnim();
                            }, 0.1);
                        }
                    })
                    break;
                case CoinBOXGift.Monster:
                    this.CoinFrequency--;
                    resources.load('Props/Monster', (err, data) => {
                        if (err == undefined||err == null) {
                            this.PropCNode=instantiate(data);
                            this.PropCNode.getComponent(Monster).MonsterBehaviorType=MonsterBehavior._Prop_1;
                            this.PropCNode.getComponent(Monster).OnPropStart(selfCollider.node,null);
                            this.CnodeTimeAnim();
                        }
                    })
                    break;
                case CoinBOXGift.Spikes:
                    this.CoinFrequency--;
                    resources.load('Props/Spikes',(err,data)=>{
                        if (err == undefined||err == null) {
                            this.PropCNode=instantiate(data);
                            this.PropCNode.getComponent(Spikes).OnPropStart(selfCollider.node,null);
                            this.CnodeTimeAnim();
                        }
                    })
            }
           
        }
    }


    CnodeTimeAnim() {
        this.Oef = 0.2;
        let t1 = tween(this.node).to(0.05, { scale: new Vec3(1.4, 1.4, 0) })
        let t2 = tween(this.node).to(0.05, { scale: new Vec3(1, 1, 1) })
        tween(this.node).sequence(t1, t2).start();
        if (this.CoinFrequency <= 0) {
            this.node.getComponent(Sprite).color = new Color(70, 70, 70, 255);//变灰色
        }
    }

    onDestroy(){
        super.onDestroy;
    }


}

