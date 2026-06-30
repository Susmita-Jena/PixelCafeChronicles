export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    console.log('🌸 Loading assets...');
  }

  create() {
    console.log('✅ Assets loaded!');
    this.scene.start('MenuScene');
  }
}