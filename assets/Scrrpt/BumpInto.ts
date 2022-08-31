import { _decorator, Component, Node, BoxCollider2D, IPhysics2DContact, Sprite, Color, tween, Enum } from 'cc';
import { AnimName } from './AnimName';
const { ccclass, property } = _decorator;

@ccclass('BumpInto')
export class BumpInto extends Component {
    @property({type:Enum,displayName:'碰到后的动作'})
    NodeAnimName:AnimName=AnimName._Color;

    @property({range:[0.1,3,0.1],slide:true,displayName:'完成动作的时间'})
    tweenDuration:number=0.5;
    start() {

    }

    update(deltaTime: number) {
       
    }

    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.name == 'Player') {
            switch (this.NodeAnimName) {
                case AnimName._Color:
                    let sprite : Sprite = this.node.getComponent(Sprite) ;
                    tween(this.node.getComponent(Sprite))
                    .by( this.tweenDuration, { color: Color.WHITE }, {
                        onUpdate(tar:Sprite){
                            sprite.color = tar.color;  // 设置精灵的为 BindTarget 内的颜色
                        }
                }).start()
                break;
            }
        }
    }
}

