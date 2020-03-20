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

  preload() {
    this.load.scenePlugin({
      key: 'rexuiplugin',
      url:
        'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI'
    });
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

  scrollPanel() {
    this.print = this.add.text(0, 0, '');

    let scrollablePanel = this.rexUI.add
      .scrollablePanel({
        x: 400,
        y: 300,
        width: 250,
        height: 220,

        scrollMode: 0,

        background: this.rexUI.add.roundRectangle(
          0,
          0,
          2,
          2,
          10,
          COLOR_PRIMARY
        ),

        panel: {
          child: this.rexUI.add.fixWidthSizer({
            space: {
              left: 3,
              right: 3,
              top: 3,
              bottom: 3,
              item: 8,
              line: 8
            }
          }),

          mask: {
            padding: 1
          }
        },

        slider: {
          track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
          thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT)
        },

        space: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,

          panel: 10
        }
      })
      .layout();
    //.drawBounds(this.add.graphics(), 0xff0000);

    updatePanel(scrollablePanel, content);
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
