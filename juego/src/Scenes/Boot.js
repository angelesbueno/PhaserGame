import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  preload () {
    
    // load in the tilemap
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/map.json');
    // load in the spritesheet
    this.load.spritesheet('spritesheet', 'assets/tilemaps/spritesheet.png', { frameWidth: 32, frameHeight: 32 });

    // load in our life sprite
    this.load.image('life', 'assets/images/heart.png');
    
    // load lava background
    this.load.spritesheet('lava', 'assets/images/lava.png', { frameWidth: 32, frameHeight: 32 });
    // // load in our zelda spritesheet
    this.load.spritesheet('zelda', 'assets/images/zelda.png', { frameWidth: 90, frameHeight: 90});
    // load in our life sprite
    this.load.image('life', 'assets/images/heart.png');
    // load in our character spritesheet
    this.load.spritesheet('characters', 'assets/images/enemies.png', { frameWidth: 60, frameHeight: 60 });
    // load in our bullet sprite
    this.load.image('bullet', 'assets/images/laser.png');
    // load goal
    this.load.image('goal', 'assets/images/princess.png');
    // audio game
    this.load.audio("musicGame", 'assets/audio/music2.ogg');
    // audio laser
    this.load.audio("audioLaser", 'assets/audio/laser.wav')
  }

  create () {
    this.scene.start('Game', { newGame: true });
  }
};
