/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
import 'phaser';
import PlayerInfo from '../game/PlayerInfo';
import config from '../game-config/config';
import Button from '../components/Button';

export default class ScoreBoard extends Phaser.Scene {
  constructor() {
    super('Scores');
    this.game;
    this.menuButton;
  }

  create() {
    this.add.text(80, 10, 'Leaderboard', { fontSize: '32px', fill: 'green' });
    this.getScore();

    this.game = new Button(
      this,
      600,
      100,
      'btn-one',
      'btn-one-inverse',
      'Game',
      'Game'
    );

    this.menuButton = new Button(
      this,
      600,
      200,
      'btn-one',
      'btn-one-inverse',
      'Menu',
      'Title'
    );
  }

  async getScore() {
    let y = 50;
    const scores = new PlayerInfo();
    const scoreBoard = await scores.getScoreboard();
    const scoreArr = scoreBoard.result;
    for (let i = 0; i < scoreArr.length; i += 1) {
      y += 20;
      this.add.text(
        80,
        y,
        `User: ${scoreArr[i].user},  Score: ${scoreArr[i].score}`,
        { fontSize: '18px', fill: '#fff', paddingTop: '4px' }
      );
    }
  }
}
