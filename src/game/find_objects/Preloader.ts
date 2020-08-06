import assets from "./Assets";
import app from "../../main";

export default class Preloader {
    constructor() {

        app.loader.add(assets.background.name, assets.background.url)
            .add(assets.button.name, assets.button.url)
            .add(assets.check.name, assets.check.url)
            .add(assets.mistake.name, assets.mistake.url)
            .add(assets.background_finish.name, assets.background_finish.url);
        for (const icon of assets.land_icons) {
            app.loader.add(icon.name, icon.url)
        }
        for (const icon of assets.result_icons) {
            app.loader.add(icon.name, icon.url)
        }
    }

    public load(callback: () => void): void {
        app.loader.load(callback)
    }
}