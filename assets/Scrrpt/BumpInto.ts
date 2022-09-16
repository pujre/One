import { _decorator, Component, Node, BoxCollider2D, IPhysics2DContact, Sprite, Color, tween, Enum, Contact2DType } from 'cc';
import { AnimName } from './AnimName';
const { ccclass, property } = _decorator;

@ccclass('BumpInto')
export class BumpInto extends Component {
    @property({range:[0.1,3,0.1],slide:true,displayName:'完成动作的时间'})
    tweenDuration:number=0.5;
    @property({type:Enum(AnimName),displayName:'碰到后的动作'})
    NodeAnimName:AnimName=AnimName._Color;

   
    start() {
        let collider = this.node.getComponent(BoxCollider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    update(deltaTime: number) {
       
    }

    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        console.log('otherCollider.node.name:'+otherCollider.node.name);
        if (otherCollider.node.name == 'Player') {
            switch (this.NodeAnimName) {
                case AnimName._Color:
                        this.node.getComponent(Sprite).color=Color.WHITE;
                //     let sprite : Sprite = this.node.getComponent(Sprite) ;
                //     tween(this.node.getComponent(Sprite))
                //     .by( this.tweenDuration, { color: Color.WHITE }, {
                //         onUpdate(tar:Sprite){
                //             sprite.color = tar.color;  // 设置精灵的为 BindTarget 内的颜色
                //         }
                // }).start()
                break;
            }
        }
    }
}

