import "phaser";
import BootScene from "./scenes/BootScene";
import config from "./config/config";
import PreloaderScene from "./Scenes/PreloaderScene";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add("Boot", BootScene);
    this.scene.add("Preloader", PreloaderScene);
  }
}

window.game = new Game();
