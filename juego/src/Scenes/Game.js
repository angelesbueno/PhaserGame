import 'phaser';
import Player from '../Sprites/Player';
import Lifes from '../Groups/Lifes';
import Enemies from '../Groups/Enemies';
import Bullets from '../Groups/Bullets';

export default class GameScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  init(data) {
    //this.gameOver = true;
    this._NEWGAME = data.newGame;
    this.events.emit('newGame');
  }

  create() {

    var configMusic = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }
    this.musicGame = this.sound.add("musicGame", configMusic);
    this.musicGame.play(configMusic);

    this.laserAudio = this.sound.add("audioLaser");

    this.cameras.main.fadeIn(800, 255, 255, 255);
    // listen for the resize event
    this.events.on('resize', this.resize, this);
    // create our tilemap
    this.createMap();
    // listen for player input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    // create our player
    this.createPlayer();

    // create princess
    this.createPrincess();

    // create our lifes
    this.lifes = this.map.createFromObjects('Lifes', 'Life', { key: 'life' });
    this.lifesGroup = new Lifes(this.physics.world, this, [], this.lifes);

    // creating the enemies
    this.enemies = this.map.createFromObjects('Enemies', 'Enemy', {});
    this.enemiesGroup = new Enemies(this.physics.world, this, [], this.enemies);

    // creating the bullets
    this.bullets = new Bullets(this.physics.world, this, []);

    // add collisions
    this.addCollisions();
    // update our camera
    this.cameras.main.startFollow(this.player);

    // Player Animations
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('zelda', { start: 15, end: 19 }),
      frameRate: 10
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('zelda', { start: 10, end: 14 }),
      frameRate: 10
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('zelda', { start: 5, end: 9 }),
      frameRate: 10
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('zelda', { start: 0, end: 4 }),
      frameRate: 10
    });
  }
  addCollisions() {
    this.physics.add.collider(this.player, this.blockedLayer);
    this.physics.add.collider(this.enemiesGroup, this.blockedLayer);
    this.physics.add.collider(this.princess, this.enemiesGroup);
    this.physics.add.overlap(this.player, this.enemiesGroup, this.player.enemyCollision.bind(this.player));
    this.physics.add.overlap(this.lifesGroup, this.player, this.lifesGroup.collectLife.bind(this.lifesGroup));
    this.physics.add.overlap(this.bullets, this.enemiesGroup, this.bullets.enemyCollision);
    this.physics.add.overlap(this.player, this.princess, this.player.princessCollision.bind(this.player));
  }

  resize(width, height) {
    if (width === undefined) {
      width = this.sys.game.config.width;
    }
    if (height === undefined) {
      height = this.sys.game.config.height;
    }
    this.cameras.resize(width, height);
  }

  createMap() {

    // add lava background
    this.add.tileSprite(0, 0, 8000, 8000, 'lava', 0);
    //this.cameras.main.setBackgroundColor('#f96000')

    // create the tilemap
    this.map = this.make.tilemap({ key: 'map' });
    // add tileset image
    this.tiles = this.map.addTilesetImage('spritesheet');
    // create our layers
    this.backgroundLayer = this.map.createStaticLayer('Background', this.tiles, 0, 0);
    this.blockedLayer = this.map.createStaticLayer('Blocked', this.tiles, 0, 0);
    this.blockedLayer.setCollisionByExclusion([-1]);

  }

  update() {
    this.player.update(this.cursors);

    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.bullets.fireBullet(this.player.x, this.player.y, this.player.direction);
    }
  }

  createPlayer() {
    this.map.findObject('Player', (obj) => {
      if (obj.type === 'StartingPosition') {
        this.player = new Player(this, obj.x, obj.y)
      }
    });
  }

  createPrincess() {
    this.map.findObject('Goal', (obj) => {
      if (obj.type === 'GoalPosition') {
        this.princess = this.physics.add.staticImage(obj.x, obj.y, 'goal');
        this.princess.setScale(0.9);
      }
    });
  }



};
