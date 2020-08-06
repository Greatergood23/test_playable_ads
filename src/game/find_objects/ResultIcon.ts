import { Sprite, Texture } from 'pixi.js';
import { Easing, Tweener } from "pixi-tweener";

export default class ResultIcon extends Sprite {
    private check: Sprite;

    constructor(texture: Texture, posX: number, posY: number, checkTexture: Texture) {
        super(texture);
        this.check = new Sprite(checkTexture);
        this.check.y = -this.check.getBounds().height;
        this.addChild(this.check);
        this.check.visible = false;
        this.anchor.set(0.5, 0.5);
        this.x = posX + this.getBounds().width / 2;
        this.y = posY + this.getBounds().height / 2;
        this.animate();
    }

    private animate = () => {
        Tweener.add({ target: this.scale, duration: 0.5 }, { x: 1.1, y: 1.1 }).then(() => {
            Tweener.add({ target: this.scale, duration: 0.5 }, { x: 1, y: 1 }).then(this.animate);
        });
    }

    public setComplete(): void {
        Tweener.killTweensOf(this.scale, true);
        this.scale.set(1, 1);
        this.check.visible = true;
    }

    public completeAllAnimate(counter: number): Promise<void> {
        return Tweener.add({
            target: this.check,
            duration: 0.3,
            delay: counter * 0.3,
        }, { y: this.check.y - 30 }).then(() => {
            Tweener.add({ target: this.check, duration: 0.3 }, { y: this.check.y + 30 })
        });
    }
}