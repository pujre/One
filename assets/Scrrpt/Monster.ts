import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Monster')
export class Monster extends Component {
    @property({range:[30,250,1],slide:true,displayName:'怪物飞的速度'})
    Speed:number=40;
    @property({range:[1,10,0.1],slide:true,displayName:'怪物X秒后删除'})
    TimesOut:number=0;

    ReadyToDelete:number=0;//准备状态
    TimeTodiele=0;

    start() {

    }

    update(deltaTime: number) {
        if(this.ReadyToDelete==1){
            this.TimeTodiele+=deltaTime;
            this.node.position.add3f(0,this.Speed,0);
            if(this.TimeTodiele>this.TimesOut){
                this.ReadyToDelete=2;
                this.node.destroy();
            }
        }
    }
}

