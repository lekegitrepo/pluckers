import "phaser";
import config from "../game-config/config";
import Button from "../components/Button";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  create() {
    // Game
    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 100,
      "btn-one",
      "btn-one-inverse",
      "Play",
      "Game"
    );

    // Options
    this.optionsButton = new Button(
      this,
      config.width / 2,
      config.height / 2,
      "btn-one",
      "btn-one-inverse",
      "Options",
      "Options"
    );

    // Credits
    this.creditsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 100,
      "btn-one",
      "btn-one-inverse",
      "Credits",
      "Credits"
    );

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add("bgMusic", { volume: 0.5, loop: true });
      this.bgMusic.resume();
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(
        config.width / 2,
        config.height / 2 - offset * 100,
        config.width,
        config.height
      )
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(gameText, gameButton);
  }
}
