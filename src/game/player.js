/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable spaced-comment */
/* eslint-disable consistent-return*/

import 'phaser';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(config, cursor) {
    super(
      config.scene,
      config.x,
      config.y,
      config.key,
      config.orient,
      config.name
    );
    config.scene.physics.world.enableBody(this);
    config.scene.add.existing(this);
    this.body.setCollideWorldBounds(true)
    this.score = 0;
    this.cursors = cursor;
    this.shootTime;
    this.orien = config.orient;
    this.turn = false;
    this.name = config.name;
    this.playerXYPoint = [config.x, config.y];
    this.roundPlayed = 0;
    this.eligibleToPlay = true;

    this.scoreText = config.scene.add.text(
      config.x - 45,
      config.y - 290,
      `Score: ${this.score}`,
      {
        fontSize: '12px',
        fill: '#fff'
      }
    );
  }

  update() {
    if (this.orien === 'left') {
      if (this.cursors.up.isDown && this.turn) {
        this.body.setVelocityY(-160);

        this.anims.play('upLeft', true);
      } else if (this.cursors.down.isDown && this.turn) {
        this.body.setVelocityY(160);

        this.anims.play('downLeft', true);
      } else {
        this.body.setVelocityY(0);

        this.anims.play('turnLeft');
      }
    } else if (this.orien === 'right') {
      if (this.cursors.up.isDown && this.turn) {
        this.body.setVelocityY(-160);

        this.anims.play('upRight', true);
      } else if (this.cursors.down.isDown && this.turn) {
        this.body.setVelocityY(160);

        this.anims.play('downRight', true);
      } else {
        this.body.setVelocityY(0);

        this.anims.play('turnRight');
      }
    }
  }

  getPlayer() {
    return this;
  }

  getScore() {
    return this.score;
  }

  setScore(score) {
    this.score = score;
  }

  getPlayerTurn() {
    return this.turn;
  }

  setPlayerTurn(turn) {
    this.turn = turn;
  }

  getPlayerName() {
    return this.name;
  }

  getPlayerXYPoint() {
    return this.playerXYPoint;
  }

  updateScore() {
    this.scoreText.setText(`Score: ${this.score}`);
  }

  updateRoundPlayed(played) {
    this.roundPlayed = played;
  }

  getRoundPlayed() {
    return this.roundPlayed;
  }

  getEligibilityToPlay() {
    return this.eligibleToPlay;
  }

  setEligibilityToPlay(status) {
    this.eligibleToPlay = status;
  }

  async uploadScore() {
    const player = {
      user: this.getPlayerName(),
      score: this.getScore()
    };
    try {
      const response = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/QMHf88FcU9wl842BCNG5/scores/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(player)
        }
      );

      const result = await response.json();
      return result;
    } catch (err) {
      console.log('error unable to fetch the data Please try again!');
    }
  }
}
