import "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {}

  create() {
    const { width, height } = this.sys.game.config;
    const bg = this.add.tileSprite(0, 0, width, height, "tile");
    bg.setOrigin(0, 0);
    this.add.image(400, 300, "logo");
  }
}
