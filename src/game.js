import Phaser from "phaser";
import MenuScene from "./scenes/MenuScene";

export const config = {
    type: Phaser.AUTO,

    width: 1280,
    height: 720,

    backgroundColor: "#F6E8DA",

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    scene: [MenuScene]
};