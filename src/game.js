import Phaser from "phaser";
import MenuScene from "./scenes/MenuScene";

export const config = {
    type: Phaser.AUTO,

    // Internal game resolution
    width: 320,
    height: 180,

    backgroundColor: "#F6E8DA",

    pixelArt: true,
    antialias: false,
    roundPixels: true,

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    scene: [MenuScene]
};

export default new Phaser.Game(config);