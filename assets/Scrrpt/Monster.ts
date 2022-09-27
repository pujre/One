import { _decorator, Component, Node, Enum, BoxCollider2D, Contact2DType, IPhysics2DContact, RigidBody2D } from 'cc';
import { MonsterBehavior } from './AnimName';
import { PropBase } from './PropBase';
const { ccclass, property } = _decorator;

@ccclass('Monster')
export class Monster extends PropBase {
    @property({type:Enum(MonsterBehavior)})
    MonsterBehaviorType:MonsterBehavior=MonsterBehavior._Prop_1;
    @property({range:[1,250,1],slide:true,displayName:'怪物飞的速度',visible () {return this.MonsterBehaviorType==MonsterBehavior._Prop_1}})
    Speed:number=1;
    @property({range:[1,10,0.1],slide:true,displayName:'怪物X秒后删除',visible () {return this.MonsterBehaviorType==MonsterBehavior._Prop_1}})
    TimesOut:number=10;

    ReadyToDelete:number=0;//准备状态
    TimeTodiele=0;
    AccelDirection=1;
    

    start() {
        this.OncolliderStart(this.node,this.onBeginContact);
    }

    onDestroy(){
       super.onDestroy;
    }

    OnPropStart(a,b){
        this.node.setParent(a.parent);
        this.ReadyToDelete=1;
        this.node.position=a.position.add3f(0,50,0);
        console.log(this.node.worldPosition);
        this.node.getComponent(BoxCollider2D).sensor=true;
        this.node.getComponent(RigidBody2D).gravityScale=0;
        this.Speed=560;
        this.TimesOut=10;
    }

    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        // if(this.MonsterBehaviorType==MonsterBehavior._Move){

        // }
    }

    update(deltaTime: number) {
        if (this.ReadyToDelete == 1) {
            switch (this.MonsterBehaviorType) {
                case MonsterBehavior._Prop_1:
                    this.TimeTodiele += deltaTime;
                    this.node.position=this.node.position.add3f(0,1.7, 0);
                    if (this.TimeTodiele > this.TimesOut) {
                        this.ReadyToDelete = 2;
                        this.node.destroy();
                    }
                    break
                case MonsterBehavior._Move:
                    this.node.position = this.node.position.add3f(this.AccelDirection * 5, 0, 0);
                    break;
            }
        }
    }
}

