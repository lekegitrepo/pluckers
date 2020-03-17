import 'phaser';
import PlayerInfo from '../game/PlayerInfo';

export default class ScoreBoard extends Phaser.Scene {
  constructor() {
    super('Scores');
  }

  preload() {}

  create() {
    let y = 0;
    const scores = new PlayerInfo();
    const scoreBoard = scores.getScoreboard();
    for (let i = 0; i < scoreBoard.length; i++) {
      this.add.text(
        80,
        (y += 10),
        `Name: ${scoreBoard[i].name} Score: ${scoreBoard[i].name}`,
        { fontSize: '18px', fill: '#fff' }
      );
    }
  }
}
