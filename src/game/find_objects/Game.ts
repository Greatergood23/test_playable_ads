import { Tweener } from "pixi-tweener";
import Preloader from "./Preloader";
import ActiveStage from "./ActiveStage";
import CompleteStage from "./CompleteStage";
import assets from "./Assets";
import app from "../../main";

export default class Game {
    private activeStage: ActiveStage;
    private completeStage: CompleteStage;

    constructor() {
        Tweener.init(app.ticker);
        const preloader = new Preloader();
        preloader.load(this.init);
    }

    private init = () => {
        this.activeStage = new ActiveStage();

        this.completeStage = new CompleteStage();
        app.stage.addChild(this.activeStage);
        this.playBgSound();
        this.activeStage.addListener("complete_searching", () => {
            assets.backgroundSound.pause();
            app.stage.removeChild(this.activeStage);
            app.stage.addChild(this.completeStage);
            assets.completeSound.play();
        });
    }

    private playBgSound(): void {
        const bgPromise = assets.backgroundSound.play();
        if (bgPromise !== undefined) {
            bgPromise.catch(() => {
                app.view.addEventListener("pointerdown", this.bgSoundPlay);
            })
        }
    }

    private bgSoundPlay = () => {
        app.view.removeEventListener("pointerdown", this.bgSoundPlay);
        assets.backgroundSound.play();
    }
}