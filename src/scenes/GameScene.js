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

    this.bullets = this.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    this.bullets.createMultiple(50, "bullet");
    this.bullets.setAll("checkWorldBounds", true);
    this.bullets.setAll("outOfBoundsKill", true);

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
      let bullet = bullets.getFirstExists(false);

      if (bullet) {
        bullet.reset(this.player.x, this.player.y);
        bullet.body.setVelocityY(160);
        shootTime = game.time.now + 900;
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
