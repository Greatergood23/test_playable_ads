import { Application, ApplicationOptions } from 'pixi.js';
import { Tweener } from "pixi-tweener";
import Game from "./game/find_objects/Game";
const settings = {
    backgroundColor: 0xFFFFFF,
    antialias: true,
    width: 800,
    height: 800,
}

const app = new Application(settings);
export default app;

new class Main {
    constructor() {
        document.body.appendChild(app.view);
        app.stage.interactive = app.stage.interactiveChildren = true;
        this.resize();
        window.onresize = this.resize;
        const game = new Game();
    }

    private resize = () => {
        let w = 0;
        let h = 0;
        if (window.innerWidth / window.innerHeight >= 1) {
            w = window.innerHeight;
            h = window.innerHeight;
        } else {
            w = window.innerWidth;
            h = window.innerWidth;
        }
        app.view.style.width = w + 'px';
        app.view.style.height = h + 'px';
        app.view.style.marginLeft = Math.max(0, ((window.innerWidth - w) / 2) | 0) + "px";
        app.view.style.marginTop = Math.max(0, ((window.innerHeight - h) / 2) | 0) + "px";
    }
}


