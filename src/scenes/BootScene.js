export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // minimal assets for loading screen go here later
  }

  create() {
    console.log('☕ BootScene loaded');
    this.scene.start('PreloadScene');
  }
}