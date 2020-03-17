import 'phaser';
import SoundController from './sound-controller/SoundAndAudioManager';
import BootScene from './scenes/BootScene';
import config from './game-config/config';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';
import OptionsScene from './scenes/OptionsScene';
import CreditsScene from './scenes/CreditScene';
import PlayerInfo from './game/PlayerInfo';
import ScoreBoard from './scenes/ScoreBoard';

class Game extends Phaser.Game {
  constructor() {
    super(config);

    const sc = new SoundController();

    this.globals = { sc, bgMusic: null };

    this.scene.add('Scores', ScoreBoard);
    this.scene.add('PlayerInfo', PlayerInfo);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
