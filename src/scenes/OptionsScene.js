import "phaser";
import Button from "../components/Button";

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super("Options");
  }

  create() {
    // sound and audio manager
    this.saam = this.sys.game.globals.sc;

    this.text = this.add.text(300, 100, "Options", { fontSize: 40 });
    this.musicButton = this.add.image(200, 200, "checkedBox");
    this.musicText = this.add.text(250, 190, "Music Enabled", { fontSize: 24 });

    this.soundButton = this.add.image(200, 300, "checkedBox");
    this.soundText = this.add.text(250, 290, "Sound Enabled", { fontSize: 24 });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on(
      "pointerdown",
      function() {
        this.saam.musicOn = !this.saam.musicOn;
        this.updateAudio();
      }.bind(this)
    );

    this.soundButton.on(
      "pointerdown",
      function() {
        this.saam.soundOn = !this.saam.soundOn;
        this.updateAudio();
      }.bind(this)
    );

    this.menuButton = new Button(
      this,
      400,
      500,
      "button-one",
      "button-one-inverse",
      "Menu",
      "Title"
    );

    this.updateAudio();
  }

  updateAudio() {
    if (this.saam.musicOn === false) {
      this.musicButton.setTexture("box");
      this.sys.game.globals.bgMusic.stop();
      this.saam.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture("checkedBox");
      if (this.saam.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.saam.bgMusicPlaying = true;
      }
    }

    if (this.saam.soundOn === false) {
      this.soundButton.setTexture("box");
    } else {
      this.soundButton.setTexture("checkedBox");
    }
  }
}
