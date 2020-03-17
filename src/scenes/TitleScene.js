/* eslint-disable class-methods-use-this */
import 'phaser';
import config from '../game-config/config';
import Button from '../components/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  init(data) {
    this.playerOne = data.playerOne;
    this.playerTwo = data.playerTwo;
    this.rounds = data.rounds;
  }

  create() {
    this.add.text(230, 60, 'PLUCKERS', { fontSize: '70px', fill: '#fff' });
    // Game
    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 100,
      'btn-one',
      'btn-one-inverse',
      'Play',
      'Game',
      {
        playerOne: this.playerOne,
        playerTwo: this.playerTwo,
        rounds: this.rounds
      }
    );

    // Options
    this.optionsButton = new Button(
      this,
      config.width / 2,
      config.height / 2,
      'btn-one',
      'btn-one-inverse',
      'Options',
      'Options'
    );

    // Credits
    this.creditsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 100,
      'btn-one',
      'btn-one-inverse',
      'Credits',
      'Credits'
    );

    this.sm = this.sys.game.globals.sc;
    if (this.sm.musicOn === true && this.sm.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.1, loop: true });
      this.bgMusic.resume();
      this.bgMusic.play();
      this.sm.bgMusicPlaying = true;
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
