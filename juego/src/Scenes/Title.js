import 'phaser';
export default class TitleScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }
  preload() {
    //this.load.image('logo', 'assets/images/logo.png');
    this.load.image('background', 'assets/images/backgroundZelda.jpg');

    this.load.audio("musicTitle", 'assets/audio/music1.mp3');
  }
  create() {

    var configMusicTitle = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }

    this.musicTitle = this.sound.add("musicTitle", configMusicTitle);
    this.musicTitle.play(configMusicTitle);

    this.image = this.add.image(0, 0, 'background');
    this.image.setOrigin(0, 0);
    this.image.setScale(1.05);
    
    this.pressX = this.add.text(390,390, 'PULSA X PARA INICIAR EL JUEGO', { 
      fontSize: '40px', 
      fill: '#f0f', 
      backgroundColor: '#'
    });

    this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    this.cameras.main.fadeIn(500);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.startKey)) {
      this.scene.start('Preload');
      this.musicTitle.stop();
    }
  }
}