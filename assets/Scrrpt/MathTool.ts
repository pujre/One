import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MathTool')
export class MathTool extends Component {
    /**
     * 两个box是否在x轴上相交，
     * player 在下方得box
     * box2 在上方得box
    */
    // static BoxXIsIntersect(player:Node,box2:Node){
    //     var pv=player.position;
    //     var bv=box2.position;
    //     var pSize=player.getComponent(UITransform).contentSize.x/2;
    //     var bSize=box2.getComponent(UITransform).contentSize.x/2;
    //     //p得最左边大于b得最左边，小于b得最右边，
    //     if((pv.x-pSize>bv.x-bSize&&pv.x-pSize<bv.x+bSize)||
    //     (pv.x+pSize>bv.x-bSize&&pv.x+pSize<bv.x+bSize)||
    //     (pv.x>bv.x-bSize&&pv.x<bv.x+bSize)){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }
}

