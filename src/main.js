import Phaser from 'phaser'
import MenuScene from './scenes/MenuScene.js'
import GameScene from './scenes/GameScene.js'

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 854,       // portrait ratio for mobile feel
  backgroundColor: '#ede4cc',
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: document.body,
  },
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scene: [MenuScene, GameScene]
}

export default new Phaser.Game(config)