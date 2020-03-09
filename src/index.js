import "phaser";
import BootScene from "./scenes/BootScene";
import config from "./config/config";
import PreloaderScene from "./Scenes/PreloaderScene";
import TitleScene from "./Scenes/TitleScene";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add("Boot", BootScene);
    this.scene.add("Preloader", PreloaderScene);
    this.scene.add("Title", TitleScene);
  }
}

window.game = new Game();
