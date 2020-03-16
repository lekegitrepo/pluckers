import 'phaser';

console.log('this PlayerInfo class');

export default class PlayerInfo extends Phaser.Scene {
  constructor() {
    super('PlayerInfo');
  }

  preload() {
    this.load.html('info', '../src/form.html');
  }

  create() {
    //let htmlDom = this.add.dom(400, 0).createFromCache('info')
    this.add.text(300, 100, 'this is PlayerInfo', {
      color: 'white',
      fontSize: '20px '
    });
    this.scene.start('Title');
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
