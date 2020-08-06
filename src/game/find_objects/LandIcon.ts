import { Sprite, Texture } from 'pixi.js';
import { Easing, Tweener } from "pixi-tweener";
import ResultIcon from "./ResultIcon";

export default class LandIcon extends Sprite {
    public rolled: boolean = false;

    constructor(texture: Texture, posX: number, posY: number, private resultIcon: ResultIcon) {
        super(texture);
        this.x = posX;
        this.y = posY;
        this.interactive = true;
        this.addListener("mouseover", () => this.rolled = true);
        this.addListener("mouseout", () => this.rolled = false);
    }

    public animate(): Promise<void> {
        this.interactive = false;
        this.rolled = false;
        return Tweener.add({ target: this, duration: 0.5 }, { alpha: 0 }).then(() => {
            this.visible = false;
            this.resultIcon.setComplete();
        });
    }

    public completeAll(counter: number): Promise<void> {
        return this.resultIcon.completeAllAnimate(counter);
    }
}