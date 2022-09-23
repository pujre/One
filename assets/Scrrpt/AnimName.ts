import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum AnimName{ 
    _Color=1, 
    _Position=2,
    _Scale=3, 
    _Delete=4,
    _Hide,
}; 

///金币宝箱顶出物体
export enum CoinBOXGift{
    Coin,
    Monster,
}

