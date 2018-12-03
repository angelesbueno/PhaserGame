import 'phaser';
import config from './config';
import GameScene from './Scenes/Game';
import BootScene from './Scenes/Boot';
import UIScene from './Scenes/UI';
import TitleScene from './Scenes/Title';
import PreloadScene from './Scenes/Preload';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Game', GameScene);
    this.scene.add('UI', UIScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Preload', PreloadScene);
    this.scene.start('Title');
  }
}

window.game = new Game();
window.addEventListener('resize', (event) => {
  window.game.resize(window.innerWidth, window.innerHeight);
});
