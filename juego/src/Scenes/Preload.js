import 'phaser';
export default class PreloadScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }
  preload() {

    for (var i = 0; i < 500; i++) {
      this.load.image('logo' + i, 'assets/images/logo.png');
    }

    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0xffffff, 0.5);
    progressBox.fillRect(540, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    var loadingText = this.make.text({
      x: width / 2 - 5,
      y: height / 2 - 30,
      text: 'Cargando...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2 - 10,
      y: height / 2 - 2,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(550, 280, 300 * value, 30);
    });

    this.load.on('complete', function () {
      console.log('complete');
    });
  }
  create() {
    this.scene.start('Boot');
  }
}