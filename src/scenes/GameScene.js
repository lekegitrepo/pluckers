/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.player;
    this.cursors;
    this.bullets;
    this.shootTime = 0;
    this.fruits;
  }

  create() {
    const { width, height } = this.sys.game.config;
    const bg = this.add.tileSprite(0, 0, width, height, 'tile');
    bg.setOrigin(0, 0);

    this.player = this.physics.add.sprite(750, 300, 'dude');

    this.bullets = this.physics.add.group();
    this.fruits = this.physics.add.group();

    this.playerAnim();

    this.spawnBatch();

    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.overlap(
      this.bullets,
      this.fruits,
      this.shotFruit,
      null,
      this
    );
  }

  update() {
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);

      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);

      this.player.anims.play('down', true);
    } else {
      this.player.setVelocityY(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.left.isDown) {
      this.player.anims.play('left', true);
      this.fire();
    }
  }

  fire() {
    if (this.time.now > this.shootTime) {
      const bullet = this.bullets.create(
        this.player.x - 10,
        this.player.y + 15,
        'bullet'
      );

      if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.velocity.x = -400;
        this.shootTime = this.time.now + 900;
        setTimeout(() => {
          bullet.destroy();
        }, 5000);
      }
    }
  }

  playerAnim() {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 0 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
  }

  shotFruit(bullet, fruit) {
    fruit.disableBody(true, true);
    bullet.disableBody(true, true);
  }

  spawnFruit() {
    this.fruits.create(Phaser.Math.Between(370, 430), -2, 'fruit');

    this.fruits.children.iterate(child => {
      child.setGravityY(30);
    });
  }

  spawnBatch() {
    this.time.addEvent({
      delay: 30,
      loop: true,
      callback: this.spawnFruit(),
      callbackScope: this
    });
  }
}
