import "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
    this.player;
    this.cursors;
    this.bullets;
    this.shootTime = 0;
  }

  preload() {}

  create() {
    const { width, height } = this.sys.game.config;
    const bg = this.add.tileSprite(0, 0, width, height, "tile");
    bg.setOrigin(0, 0);

    console.log(this.time.now);

    this.add.image(100, 250, "bullet");

    this.bullets = this.physics.add.group();

    this.player = this.physics.add.sprite(750, 300, "dude");

    this.playerAnim();

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);

      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);

      this.player.anims.play("down", true);
    } else {
      this.player.setVelocityY(0);

      this.player.anims.play("turn");
    }

    if (this.cursors.left.isDown) {
      this.player.anims.play("left", true);
      this.fire();
    }
  }

  fire() {
    if (this.time.now > this.shootTime) {
      //let bullet = this.bullets.getFirstAlive(false);

      let bullet = this.bullets.create(
        this.player.x - 10,
        this.player.y + 15,
        "bullet"
      );
      console.log(bullet);
      if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.velocity.x = -400;
        this.shootTime = this.time.now + 900;
        setTimeout(function() {
          bullet.destroy();
        }, 5000);
      }
    }
  }

  playerAnim() {
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 0 }],
      frameRate: 20
    });

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
  }
}
