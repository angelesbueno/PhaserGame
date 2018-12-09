import 'phaser';

export default class UIScene extends Phaser.Scene {
  constructor () {
    super({ key: 'UI', active: true });
  }

  init () {
    this.lifesCollected = 0;
  }

  preload () {
    this.load.audio("winner", 'assets/audio/winner.wav');
    this.load.audio("looser", 'assets/audio/gameover.mp3')
    this.load.bitmapFont('desyrel', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
  }

  create () {
    
    //create winner and looser audios
    this.musicWinner = this.sound.add("winner");
    this.musicLooser = this.sound.add("looser");

    // create SPACE text
    this.spaceText = this.add.text(12, 50, `Presiona SPACE para disparar`, { fontSize: '32px', fill: '#252850' });
    this.spaceText.visible = false;

    // create winner text
    this.winnerText = this.add.dynamicBitmapText(100, 370, 'desyrel', '¡HAS RESCATADO A LA PRINCESA!', 65);

    this.tweens.add({
      targets: this.winnerText,
      scaleX: '+=.1',
      scaleY: '+=.3',
      duration: 800,
      ease: 'Sine.easeInOut',
      repeat: -1,
      yoyo: true
    });

    this.winnerText.visible = false;

    // create health text
    this.healthText = this.add.text(12, 12, `Vidas: 3`, { fontSize: '32px', fill: '#252850' });
    this.healthText.visible = false;

    // get a reference to the game scene
    this.gameScene = this.scene.get('Game');
    
    // listen for events from that scene
    this.gameScene.events.on('lifeCollected', (health, gameOver) => {
      this.lifesCollected++;
      this.healthText.setText(`Vidas: ${health}`);
    });

    this.gameScene.events.on('loseHealth', (health, gameOver) => {
      this.healthText.setText(`Vidas: ${health}`);

      if (gameOver) {
        this.musicLooser.play();
        self.game.scene.keys.Game.musicGame.stop();
        this.gameScene.scene.restart();
        this.cameras.main.flash(500, 255, 0, 0);
      }
    });

    this.gameScene.events.on('newGame', () => {
      this.lifesCollected = 0;
      this.healthText.visible = true;
      this.spaceText.visible = true;
      this.healthText.setText(`Vidas: 3`);
    });

    this.gameScene.events.on('playerWins', (winner, player) => {
      if (winner) {
        this.winnerText.visible = true;
        this.musicWinner.play();
        self.game.scene.keys.Game.musicGame.stop();
        this.gameScene.scene.pause();
        setTimeout(function(){
          self.game.scene.keys.UI.winnerText.visible=false;
          self.game.scene.keys.Game.scene.restart();}, 6000);
      }
    });
  }
};
