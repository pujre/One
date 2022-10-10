import { _decorator, Component, Node, BoxCollider2D, IPhysics2DContact, Sprite, Color, tween, Enum, Contact2DType, animation, color, Vec3, Vec2, Size, math, PolygonCollider2D } from 'cc';
import { AnimName } from './AnimName';
const { ccclass, property } = _decorator;

@ccclass('BumpInto')
export class BumpInto extends Component {
   
    @property({type:Enum(AnimName),displayName:'碰到后的动作'})
    NodeAnimName:AnimName=AnimName._Color;
    @property({displayName:'碰到后变得颜色',visible(){return this.NodeAnimName==AnimName._Color}})
    AnimColor:Color= new Color(255,255,255,255);
    @property({displayName:'移动到的位置',visible(){return this.NodeAnimName==AnimName._Position}})
    TagPosition:Vec2= new Vec2(0,0);
    @property({displayName:'移动速度',visible(){return this.NodeAnimName==AnimName._Position}})
    MoveSpeed:number= 1;
    @property({displayName:'是否启动触发器',visible(){return this.NodeAnimName==AnimName._Position}})
    IsTrigger:boolean= false;
    @property({displayName:'触发次数',visible(){return this.NodeAnimName==AnimName._Position}})
    TriggerNumber:number= 1;
    @property({type:Node,displayName:'要删除的物品',visible(){return this.NodeAnimName==AnimName._Delete}})
    AnimDeleteNode:Node=null;
    @property({displayName:'是否触发',visible () {return this.NodeAnimName==AnimName._Delete&&false}})
    WhetherToTrigger:boolean=false;
    @property({type:Node,displayName:'需要隐藏得物品',visible () {return this.NodeAnimName==AnimName._Hide}})
    HideNode:Node=null;
    @property({range:[0,5,0.1],slide:true,displayName:'多久后从新显示，0则不再显示',visible () {return this.NodeAnimName==AnimName._Hide}})
    TimeAction:number=0;
    


    start() {
        let collider = this.node.getComponent(BoxCollider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        if(this.IsTrigger){
            let Triggercollider = this.node.getComponent(PolygonCollider2D);
            if (Triggercollider) {
                Triggercollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginTriggerContact, this);
            }
        }
    }

    update(deltaTime: number) {
       
    }

    onBeginTriggerContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if(this.TriggerNumber>0){
            this.TriggerNumber--;
            let t1 = tween(this.node).to(this.MoveSpeed, { position: new Vec3(this.TagPosition.x, this.TagPosition.y, 0)})
            t1.start();
        }
    }


    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.name == 'Player') {
            switch (this.NodeAnimName) {
                case AnimName._Color:
                    this.node.getComponent(Sprite).color = this.AnimColor;
                    break;
                case AnimName._Delete:
                    if (this.WhetherToTrigger) return;
                    this.WhetherToTrigger = true;
                    setTimeout(() => {
                        this.node.destroy();
                        this.AnimDeleteNode.destroy();
                    }, 0.1);
                    break;
                case AnimName._Hide:
                    break;
            }
        }
    }
}

