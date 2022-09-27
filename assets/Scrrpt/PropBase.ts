import { _decorator, Component, Node, BoxCollider2D, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PropBase')
export  class PropBase extends Component {
    collider:BoxCollider2D=null;
    onContact:any=null;

    /** a,b的值自定义，可以为null*/
    OnPropStart(a,b){

    }

    OncolliderStart(selfNode:Node,onContact:any){
        this.collider =selfNode.getComponent(BoxCollider2D);
        this.onContact=onContact;
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onContact, this);
        }
    }

    onDestroy(){
        this.collider.off(Contact2DType.BEGIN_CONTACT, this.onContact, this);
    }


}

