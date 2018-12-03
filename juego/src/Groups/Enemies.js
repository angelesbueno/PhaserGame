import 'phaser';
import Enemy from '../Sprites/Enemy';

export default class Enemies extends Phaser.Physics.Arcade.Group {
  constructor (world, scene, children, spriteArray) {
    super(world, scene, children);
    this.scene = scene;
    this.spriteFrames = [6, 7, 8];

    // create our enemies from the sprite array
    this.createEnemies(scene, spriteArray);
  }

  createEnemies (scene, spriteArray) {
    spriteArray.forEach((sprite) => {
      const randNumber = Math.floor(Math.random() * this.spriteFrames.length);
      // create a new enemy
      const enemy = new Enemy(scene, sprite.x, sprite.y, this.spriteFrames[randNumber]);
      // add to our group
      this.add(enemy);
      // destroy the sprite
      sprite.destroy();
    });
  }
}