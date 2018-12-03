import 'phaser';
export default class PreloadScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }
  preload() {
    this.load.image('background', 'assets/images/backgroundZelda.jpg')
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
      //console.log(value);
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(550, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function (file) {
      //console.log(file.src);
    });

    this.load.on('complete', function () {
      console.log('complete');
      //progressBar.destroy();
      //progressBox.destroy();
      //loadingText.destroy();
      //percentText.destroy();
    });
  }
  create() {
    this.scene.start('Boot');
    //this.scene.stop();
    // this.image = this.add.image(0, 0, 'background');
    // this.image.setOrigin(0, 0);
    // this.image.setScale(1.05);
  }
}