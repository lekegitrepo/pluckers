import 'phaser';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key, config.name);
    config.scene.add.existing(this);
    this.physics.add.sprite(config.x, config.y, config.key);
    this.score = 0;
  }

  getPlayer() {
    return this;
  }

  getScore() {
    return this.score;
  }
}
