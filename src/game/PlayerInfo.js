import 'phaser';

export default class PlayerInfo extends Phaser.Scene {
  constructor() {
    super('PlayerInfo');
    this.playerOne;
    this.playerTwo;
  }

  preload() {
    this.load.html('info', '../src/form.html');
  }

  create() {
    let htmlDom = this.add.dom(400, 200).createFromCache('info');
    htmlDom.addListener('click');
    htmlDom.on('click', function(e) {
      if (e.target.name === 'submit') {
        //this.getChildByName
        this.playerOne = this.getChildByName('player-one');
        this.playerTwo = this.getChildByName('player-two');

        if (this.playerOne.value !== '' && this.playerTwo.value !== '') {
          //  Turn off the click events
          this.removeListener('click');

          //  Hide the login element
          this.setVisible(false);
          //console.log(this.playerOne.value, this.playerTwo.value);
          game.scene.start('Title', {
            playerOne: this.playerOne.value,
            playerTwo: this.playerTwo.value
          });
        }
      }
      //this.scene.start('Title');
    });
    //this.scene.start('Title');
  }
}

/*getApi.addEventListener('click', async () => {
  let response = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(game)
    }
  );

  let result = await response.json();

  display(result);
});

const display = data => {
  console.log(data);
};*/
