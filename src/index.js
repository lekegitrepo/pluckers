import "phaser";
import config from "./config/config";
import BootScene from "./scenes/BootScene";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add("Boot", BootScene);
  }
}

window.game = new Game();
