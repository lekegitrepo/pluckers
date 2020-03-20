/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable class-methods-use-this */
import 'phaser';
import PlayerInfo from '../game/PlayerInfo';
import Button from '../components/Button';

export default class ScoreBoard extends Phaser.Scene {
  constructor() {
    super('Scores');
    this.game;
    this.menuButton;
    this.COLOR_PRIMARY = 0x3d85c6;
    this.COLOR_LIGHT = 0x59a3e7;
    this.COLOR_DARK = 0x86bdee;
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
    this.add.text(80, 10, 'Leaderboard', { fontSize: '32px', fill: '#3D85C6' });

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
    this.scrollPanel();
  }

  scrollPanel() {
    const scrollablePanel = this.rexUI.add
      .scrollablePanel({
        x: 250,
        y: 300,
        width: 400,
        height: 380,

        scrollMode: 0,

        background: this.rexUI.add.roundRectangle(
          0,
          0,
          2,
          2,
          10,
          this.COLOR_PRIMARY
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
          track: this.rexUI.add.roundRectangle(
            0,
            0,
            20,
            10,
            10,
            this.COLOR_DARK
          ),
          thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, this.COLOR_LIGHT)
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
    this.getScore(scrollablePanel);
  }

  async getScore(panel) {
    const sizer = panel.getElement('panel');
    const scene = panel.scene;

    sizer.clear(true);

    const scores = new PlayerInfo();
    const scoreBoard = await scores.getScoreboard();
    const scoreArr = scoreBoard.result;

    for (let i = 0; i < scoreArr.length; i += 1) {
      sizer.add(
        scene.add.text(
          0,
          0,
          `${scoreArr[i].user},  Score: ${scoreArr[i].score}`,
          { fontSize: '18px', fill: '#fff', paddingTop: '4px' }
        )
      );
    }
    panel.layout();
    return panel;
  }
}
