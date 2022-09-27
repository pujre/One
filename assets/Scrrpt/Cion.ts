import { _decorator, Component, Node, random, randomRange, UIOpacity, Vec3 } from 'cc';
import { PropBase } from './PropBase';
const { ccclass, property } = _decorator;

@ccclass('Cion')
export class Cion extends PropBase {
    
    UIOpacity:UIOpacity=null;
    @property({range:[30,250,1],slide:true,displayName:'金币上跳的高度'})
    Distance:number=40;
    @property({range:[0.3,3,0.01],slide:true,displayName:'播放金币的动画时间'})
    AnimTime:number=0.4;//
    @property({range:[0.3,3,0.01],slide:true,displayName:'金币淡出的时间'})
    TransparentTime:number=0.4;
    opstDistance:number=0;
    ReadyToDelete:number=0;//准备状态

    update(deltaTime: number) {
        if(this.ReadyToDelete==1){
            if(this.opstDistance<this.Distance){
                var des=(this.Distance/this.AnimTime)/this.AnimTime * deltaTime;
                this.opstDistance+=des;
                this.node.position =new Vec3(this.node.position.x, this.node.position.y+des,this.node.position.z);
               
            } else if(this.opstDistance>=this.Distance){
                var opca=(255/this.TransparentTime) * deltaTime;
                if(this.UIOpacity.opacity>0){
                    this.UIOpacity.opacity-=opca;
                }else{
                    this.ReadyToDelete=2;
                    this.node.active=false;
                }
            }
        }
    }


    OnPropStart(pos: any, parent: any): void {
        this.node.setParent(parent);
        this.node.setPosition(pos.x,pos.y+60,pos.z);
        this.ReadyToDelete=1;
        this.UIOpacity=this.node.getComponent(UIOpacity);
        this.UIOpacity.opacity=255;
        this.opstDistance=0;
    }

}

