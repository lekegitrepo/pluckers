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
    this.score = 0;
    this.cursors = cursor;
    this.shootTime;
    this.orien = config.orient;
    this.turn = false;
    this.name = config.name;

    this.scoreText = config.scene.add.text(
      config.x - 45,
      config.y - 290,
      'Score: ' + this.score,
      {
        fontSize: '12px',
        fill: '#fff'
      }
    );
  }

  update() {
    if (this.orien == 'left') {
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
    } else if (this.orien == 'right') {
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

    /*if (this.cursors.left.isDown) {
      this.anims.play('left', true);
      this.fire();
    }*/
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

  updateScore() {
    this.scoreText.setText('Score: ' + this.score);
  }
}
