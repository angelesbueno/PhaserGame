import 'phaser';

export default class Lifes extends Phaser.Physics.Arcade.StaticGroup {
  constructor (world, scene, children, spriteArray) {
    super(world, scene, children);
    this.scene = scene;
    

    // add lifes to our group
    spriteArray.forEach((life) => {
      life.setScale(0.5);
      this.add(life);
    });
    this.refresh();
  }

  collectLife (player, life) {
    this.remove(life);
    life.destroy();
    player.health++;
    
    // dispatch an event
    this.scene.events.emit('lifeCollected', player.health, player.gameOver);
  }
}