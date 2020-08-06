import { Container, Sprite } from 'pixi.js';
import { Tweener } from "pixi-tweener";
import LandIcon from "./LandIcon";
import assets from "./Assets";
import ResultIcon from "./ResultIcon";
import app from "../../main";

export default class ActiveStage extends Container {
    private landIcons: LandIcon[];
    private mistake: Sprite;
    private completeCount: number = 0;

    constructor() {
        super();
        this.interactive = true;
        this.on("pointerdown", this.onStageClick);
        const background = new Sprite(app.loader.resources[assets.background.name].texture);
        this.addChild(background);
        this.landIcons = [];
        for (let i: number = 0; i < assets.result_icons.length; i++) {
            const resultAsset = assets.result_icons[i];
            const landAsset = assets.land_icons[i];
            const resultIcon = new ResultIcon(app.loader.resources[resultAsset.name].texture, background.x + resultAsset.posX, background.y + resultAsset.posY, app.loader.resources[assets.check.name].texture);
            this.addChild(resultIcon);
            const landIcon = new LandIcon(app.loader.resources[landAsset.name].texture, background.x + landAsset.posX, background.y + landAsset.posY, resultIcon);
            this.addChild(landIcon);
            this.landIcons[this.landIcons.length] = landIcon;
        }

        this.mistake = new Sprite(app.loader.resources[assets.mistake.name].texture);
        this.mistake.visible = false;
        this.addChild(this.mistake);
    }

    private onStageClick = (event) => {
        for (const icon of this.landIcons) {
            if (icon.rolled) {
                icon.animate().then(() => {
                    this.completeCount += 1;
                    if (this.completeCount == this.landIcons.length) {
                        this.completeAll();
                    }
                });
                assets.clickTrueSound.play();
                return;
            }
        }
        assets.clickFalseSound.play();
        const mousePosition = event.data.getLocalPosition(this);
        this.mistake.x = mousePosition.x - this.mistake.getBounds().width / 2;
        this.mistake.y = mousePosition.y - this.mistake.getBounds().height / 2;
        this.mistake.visible = true;
        Tweener.add({ target: this.mistake, duration: 0.2 }, { visible: false });
    }

    private completeAll(): void {
        Promise.all(this.landIcons.map((icon, index) => icon.completeAll(index))).then(() => {
            setTimeout(() => this.emit("complete_searching"), 800);
        });
    }
}