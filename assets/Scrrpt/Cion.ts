import { _decorator, Component, Node, random, randomRange, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Cion')
export class Cion extends Component {
    @property(UIOpacity)
    UIOpacity:UIOpacity=null;
    @property({range:[30,250,1],slide:true,displayName:'金币上跳的高度'})
    Distance:number=70;
    @property({range:[0.3,3,0.01],slide:true,displayName:'播放金币的动画时间'})
    AnimTime:number=0.4;//
    @property({range:[0.3,3,0.01],slide:true,displayName:'金币淡出的时间'})
    TransparentTime:number=0.4;
    opstDistance:number=0;
    start() {
        this.opstDistance=0;
        this.UIOpacity.opacity=255;
    }

    update(deltaTime: number) {
        if(this.opstDistance<this.Distance){
            var des=(this.Distance/this.AnimTime)/this.AnimTime * deltaTime;
            this.opstDistance+=des;
            this.node.position = this.node.position.add3f(0,des,0);
            if(this.opstDistance>=this.Distance){
                var opca=(255/this.TransparentTime) * deltaTime;
                if(this.UIOpacity.opacity>0){
                    this.UIOpacity.opacity-=opca
                }else{
                    this.node.active=false;
                }
            }
        }
    }
}

