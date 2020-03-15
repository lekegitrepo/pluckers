import 'phaser';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(config, cursor) {
    super(config.scene, config.x, config.y, config.key, config.name);
    config.scene.physics.world.enableBody(this);
    config.scene.add.existing(this);
    this.score = 0;
    this.cursors = cursor;
    this.shootTime;
    this.scene = config.scene;
  }

  update() {
    if (this.cursors.up.isDown) {
      this.body.setVelocityY(-160);

      this.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.body.setVelocityY(160);

      this.anims.play('down', true);
    } else {
      this.body.setVelocityY(0);

      this.anims.play('turn');
    }

    /*if (this.cursors.left.isDown) {
      this.anims.play('left', true);
      this.fire();
    }*/
  }

  getPlayer() {
    return this;
  }

  getScore() {
    return this.score;
  }
}
