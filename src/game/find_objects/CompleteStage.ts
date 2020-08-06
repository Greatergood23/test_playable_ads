import { Container, Loader, Sprite } from 'pixi.js';
import assets from "./Assets";
import app from "../../main";

export default class CompleteStage extends Container {
    constructor() {
        super();
        this.interactive = true;
        const background = new Sprite(app.loader.resources[assets.background_finish.name].texture);
        this.addChild(background);
        const button = new Sprite(app.loader.resources[assets.button.name].texture);
        button.x = (background.getBounds().width - button.getBounds().width) / 2;
        button.y = (background.getBounds().height - button.getBounds().height) / 2 + 200;
        button.interactive = true;
        button.addListener("pointerdown", () => {
            window["FBPlayableOnCTAClick"].call();
        });
        this.addChild(button);
    }
}