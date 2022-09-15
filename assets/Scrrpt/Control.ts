import { _decorator, Component, Node, Button, NodeEventType, EventTouch } from 'cc';
import { GameManager } from './GameManager';
import { Player } from './Player';
const { ccclass, property } = _decorator;
@ccclass('Control')
export class Control extends Component {
    @property(Node)
    Left:Node=null;
    @property(Node)
    Right:Node=null;
    @property(Node)
    Up:Node=null;
    @property(Player)
    PlayerScript:Player=null;

    start() {
        if(this.PlayerScript!=null){
            this.Left.on(NodeEventType.TOUCH_START, this.PlayerScript.callback, this.PlayerScript);
            this.Right.on(NodeEventType.TOUCH_START, this.PlayerScript.callback, this.PlayerScript);
            this.Up.on(NodeEventType.TOUCH_START, this.PlayerScript.callback, this.PlayerScript);
            this.Left.on(NodeEventType.TOUCH_END, this.PlayerScript.cancelcallback, this.PlayerScript);
            this.Right.on(NodeEventType.TOUCH_END, this.PlayerScript.cancelcallback, this.PlayerScript);
            this.Up.on(NodeEventType.TOUCH_END, this.PlayerScript.cancelcallback, this.PlayerScript);
        }
    }





    update(deltaTime: number) {
        
    }
}

