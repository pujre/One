import { _decorator, Component, Node, animation, CCObject, ConeCollider, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property(Animation)
    Anim:Animation=null;
    start() {

    }

    update(deltaTime: number) {
        
    }

    PlayerControl(str: string) {
        switch (str) {
            case "Left":
                break;
            case "Right":
                break
            case "Jump":
                break;
            default:
                break;
        }
    }
}

