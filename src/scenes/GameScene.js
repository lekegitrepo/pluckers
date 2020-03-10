import "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.spritesheet("action", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 38
    });
  }

  create() {
    const { width, height } = this.sys.game.config;
    const bg = this.add.tileSprite(0, 0, width, height, "tile");
    bg.setOrigin(0, 0);
    this.add.image(400, 300, "logo");

    //this.physics.add.image(796, 300, "action");
    const player = this.physics.add.sprite(100, 450, "dude");

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }
}
