import 'phaser';


export default class Player extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y) {
    super(scene, x, y, 'zelda');
    this.scene = scene;
    this.direction = 'up';
    this.health = 3;
    this.hitDelay = false;
    this.gameOver = false;
    this.winner = false;
    
    // enable physics
    this.scene.physics.world.enable(this);
    // add our player to the scene
    this.scene.add.existing(this);
    // scale our player
    this.setScale(0.75);
  }

  update(cursors) {
    this.setVelocity(0);
    // check if the up or down key is pressed
    if (cursors.up.isDown) {
      this.direction = 'up';
      this.setVelocityY(-150);
      this.anims.play('up', true);
    } else if (cursors.down.isDown) {
      this.direction = 'down';
      this.setVelocityY(150);
      this.anims.play('down', true);
    }
    // check if the left or right key is pressed
    if (cursors.left.isDown) {
      this.direction = 'left';
      this.setVelocityX(-150);
      this.anims.play('left', true);
    } else if (cursors.right.isDown) {
      this.direction = 'right';
      this.setVelocityX(150);
      this.anims.play('right', true);
    }
  }

  loseHealth() {
    this.health--;
    this.scene.events.emit('loseHealth', this.health, this.gameOver);
    if (this.health === 0) {
      this.gameOver = true;
    }
  }

  enemyCollision(player, enemy) {
    if (!this.hitDelay) {
      this.loseHealth();
      this.hitDelay = true;
      this.tint = 0xff0000;
      if (this.scene) {
        this.scene.time.addEvent({
          delay: 1200,
          callback: () => {
            this.hitDelay = false;
            this.tint = 0xffffff;
          },
          callbackScope: this
        });
      }
    }
  }

  princessCollision (player, princess) {
    this.winner = true;
    if (this.winner) {
      this.scene.events.emit('playerWins', this.winner, player);
    }
  }
}