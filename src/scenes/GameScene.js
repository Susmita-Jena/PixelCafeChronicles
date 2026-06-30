export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    const { width, height } = this.scale;

    this.add.text(width / 2, height / 2, '🌱 Café coming soon...', {
      fontSize: '10px',
      fill: '#f5deb3',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    console.log('🎮 GameScene loaded!');
  }
}