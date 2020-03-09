import "phaser";
import BootScene from "./scenes/BootScene";
import config from "./game-config/config";
import PreloaderScene from "./Scenes/PreloaderScene";
import TitleScene from "./Scenes/TitleScene";
import GameScene from "./Scenes/GameScene";
import OptionsScene from "./Scenes/OptionsScene";
import CreditsScene from "./Scenes/CreditsScene";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add("Boot", BootScene);
    this.scene.add("Preloader", PreloaderScene);
    this.scene.add("Title", TitleScene);
    this.scene.add("Options", OptionsScene);
    this.scene.add("Credits", CreditsScene);
    this.scene.add("Game", GameScene);
    this.scene.start("Boot");
  }
}

window.game = new Game();
