/* eslint-disable spaced-comment */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable comma-dangle */

/* eslint-disable consistent-return*/

/* eslint-disable operator-linebreak*/

/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */

/* eslint-disable space-before-function-paren*/

import 'phaser';

export default class PlayerInfo extends Phaser.Scene {
  constructor() {
    super('PlayerInfo');
    this.playerOne;
    this.playerTwo;
    this.rounds;
  }

  preload() {
    this.load.html('info', '../src/form.html');
  }

  create() {
    const htmlDom = this.add.dom(400, 200).createFromCache('info');
    htmlDom.addListener('click');
    htmlDom.on('click', function(e) {
      if (e.target.name === 'submit') {
        this.playerOne = this.getChildByName('player-one');
        this.playerTwo = this.getChildByName('player-two');
        this.rounds = this.getChildByName('rounds');

        if (
          this.playerOne.value !== '' &&
          this.playerTwo.value !== '' &&
          this.rounds.value !== ''
        ) {
          this.removeListener('click');

          this.setVisible(false);
          game.scene.start('Title', {
            playerOne: this.playerOne.value,
            playerTwo: this.playerTwo.value,
            rounds: this.rounds.value
          });
        }
      }
    });
  }

  async getScoreboard() {
    try {
      const response = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/QMHf88FcU9wl842BCNG5/scores/'
      );

      const result = await response.json();
      return result;
    } catch (err) {
      console.log('error unable to fetch the data Please try again!');
    }
  }
}
