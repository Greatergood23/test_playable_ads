const background: string = "background";
const background_finish: string = "background_finish";
const button: string = "button";
const check: string = "check";
const mistake: string = "mistake";
const land_icons: string[] = ["first_icon_land", "second_icon_land", "third_icon_land", "fourth_icon_land"];
const result_icons: string[] = ["first_icon", "second_icon", "third_icon", "fourth_icon"];
const allResources: string[] = [background, background_finish, button, check, mistake].concat(land_icons).concat(result_icons);
const positions = {
    0: { "land": [470, 430], "result": [300, 670] },
    1: { "land": [350, 470], "result": [420, 670] },
    2: { "land": [145, 310], "result": [540, 670] },
    3: { "land": [210, 415], "result": [660, 670] }
};
const clickTrueSound: string = require("../../assets/sound/click_true.mp3");
const clickFalseSound: string = require("../../assets/sound/click_false.mp3");
const completeSound: string = require("../../assets/sound/complete.mp3");
const backgroundSound: string = require("../../assets/sound/background.mp3");

for (const icon of allResources) {
    window[icon + "_resource"] = require("../../assets/" + icon + ".png");
}

class Assets {
    public readonly background: ResourceIcon;
    public readonly background_finish: ResourceIcon;
    public readonly button: ResourceIcon;
    public readonly check: ResourceIcon;
    public readonly mistake: ResourceIcon;
    public readonly land_icons: ResourceIcon[] = [];
    public readonly result_icons: ResourceIcon[] = [];
    public readonly clickTrueSoundUrl: string;
    public readonly clickFalseSoundUrl: string;
    public readonly completeSoundUrl: string;
    public readonly backgroundSoundUrl: string;
    private _clickTrueSound;
    private _clickFalseSound;
    private _completeSound;
    private _backgroundSound;

    constructor() {
        this.clickTrueSoundUrl = clickTrueSound["default"];
        this.clickFalseSoundUrl = clickFalseSound["default"];
        this.completeSoundUrl = completeSound["default"];
        this.backgroundSoundUrl = backgroundSound["default"];
        this.background = new ResourceIcon(background, window[background + "_resource"]["default"]);
        this.background_finish = new ResourceIcon(background_finish, window[background_finish + "_resource"]["default"]);
        this.button = new ResourceIcon(button, window[button + "_resource"]["default"]);
        this.check = new ResourceIcon(check, window[check + "_resource"]["default"]);
        this.mistake = new ResourceIcon(mistake, window[mistake + "_resource"]["default"]);
        for (let i: number = 0; i < result_icons.length; i++) {
            const position = positions[i];
            this.result_icons[this.result_icons.length] = new ResourceIcon(result_icons[i], window[result_icons[i] + "_resource"]["default"], position.result[0], position.result[1]);
            this.land_icons[this.land_icons.length] = new ResourceIcon(land_icons[i], window[land_icons[i] + "_resource"]["default"], position.land[0], position.land[1]);
        }
    }

    public get clickTrueSound() {
        return new Audio(this.clickTrueSoundUrl);
    }

    public get clickFalseSound() {
        return new Audio(this.clickFalseSoundUrl);
    }

    public get completeSound() {
        if (!this._completeSound) {
            this._completeSound = new Audio(this.completeSoundUrl);
        }
        return this._completeSound;
    }

    public get backgroundSound() {
        if (!this._backgroundSound) {
            this._backgroundSound = new Audio(this.backgroundSoundUrl);
        }
        return this._backgroundSound;
    }
}

class ResourceIcon {
    constructor(public readonly name: string, public readonly url: string, public readonly posX?: number, public readonly posY?: number) {
    }
}

const assets = new Assets();
export default assets;


