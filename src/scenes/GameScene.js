/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
import 'phaser';
import Player from '../game/player';
import GameController from '../game/game_controller';
import config from '../game-config/config';
import Button from '../components/Button';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.player;
    this.player2;
    this.cursors;
    this.bullets;
    this.shootTime = 0;
    this.fruits;
    this.currentPlayer;
    this.timerText;
    this.timedEvent;
    this.initialTime = 30;
    this.turnIndicator;
    this.roundCounter = 0;
    this.scoreBoard;
    this.menuButton;
  }

  init(data) {
    this.playerOne = data.playerOne;
    this.playerTwo = data.playerTwo;
    this.rounds = parseInt(data.rounds, 10);
  }

  create() {
    console.log(this.rounds);
    const { width, height } = this.sys.game.config;
    const bg = this.add.tileSprite(0, 0, width, height, 'tile');
    bg.setOrigin(0, 0);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = new Player(
      {
        scene: this,
        x: 750,
        y: 300,
        key: 'dude',
        orient: 'left',
        name: this.playerOne
      },
      this.cursors
    );

    this.player2 = new Player(
      {
        scene: this,
        x: 50,
        y: 300,
        key: 'dude',
        orient: 'right',
        name: this.playerTwo
      },
      this.cursors
    );

    console.log(
      'players ',
      this.player.getPlayerName(),
      this.player2.getPlayerName()
    );

    let gc = new GameController(this.player, this.player2);
    this.currentPlayer = gc.currentPlayer();
    this.currentPlayer.setPlayerTurn(true);
    console.log(this.currentPlayer.getPlayer());

    this.turnIndicator = this.add.text(
      200,
      100,
      this.currentPlayer.getPlayerName() + "'s turn",
      { fontSize: '34px', fill: 'yellow' }
    );

    this.bullets = this.physics.add.group();
    this.fruits = this.physics.add.group();

    this.playerAnim();

    this.spawnBatch();

    this.physics.add.overlap(
      this.bullets,
      this.fruits,
      this.shotFruit,
      null,
      this
    );

    this.timerText = this.add.text(
      32,
      32,
      'Countdown: ' + this.formatTime(this.initialTime)
    );

    // Each 1000 ms call onEvent
    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.onEvent,
      callbackScope: this,
      loop: true
    });

    this.scoreBoard = new Button(
      this,
      config.width / 2,
      config.height / 2,
      'btn-one',
      'btn-one-inverse',
      'Score Board',
      'Scores'
    );

    this.menuButton = new Button(
      this,
      400,
      500,
      'btn-one',
      'btn-one-inverse',
      'Menu',
      'Title'
    );
  }

  update() {
    this.player.update();
    this.player2.update();

    this.switchPlayer();

    this.checkPlayerAndFire();
  }

  fire(player, direction) {
    if (this.time.now > this.shootTime) {
      const bullet = this.bullets.create(
        player.x - 10,
        player.y + 15,
        'bullet'
      );

      if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.velocity.x = direction;
        this.shootTime = this.time.now + 900;
        setTimeout(() => {
          bullet.destroy();
        }, 5000);
      }
    }
  }

  checkPlayerAndFire() {
    if (
      this.player.getEligibilityToPlay() === true ||
      this.player2.getEligibilityToPlay() === true
    ) {
      if (this.cursors.left.isDown && this.player.getPlayerTurn() === true) {
        this.player.anims.play('left', true);
        this.fire(this.player, -400);
      } else if (
        this.cursors.right.isDown &&
        this.player2.getPlayerTurn() === true
      ) {
        this.player2.anims.play('right', true);
        this.fire(this.player2, 400);
      }
    }
  }

  switchPlayer() {
    if (
      this.player.getEligibilityToPlay() === true ||
      this.player2.getEligibilityToPlay() === true
    ) {
      if (this.initialTime === 0) {
        this.initialTime = 30;
        if (this.player === this.currentPlayer) {
          const player1Round = this.player.getRoundPlayed() + 1;
          this.player.updateRoundPlayed(player1Round);
          console.log(
            this.player.getPlayerName(),
            this.player.getRoundPlayed(),
            this.rounds
          );
          this.player.setPlayerTurn(false);
          this.roundCount(this.player);
          this.currentPlayer = this.player2;
          this.currentPlayer.setPlayerTurn(true);
        } else if (this.player2 === this.currentPlayer) {
          const player2Round = this.player2.getRoundPlayed() + 1;
          this.player2.updateRoundPlayed(player2Round);
          console.log(
            this.player2.getPlayerName(),
            this.player2.getRoundPlayed(),
            this.rounds
          );
          this.player2.setPlayerTurn(false);
          this.roundCount(this.player2);
          this.currentPlayer = this.player;
          this.currentPlayer.setPlayerTurn(true);
        }
      }
    }
    this.turnIndicator.setText(this.currentPlayer.getPlayerName() + "'s turn");
  }

  playerAnim() {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turnLeft',
      frames: [{ key: 'dude', frame: 0 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'turnRight',
      frames: [{ key: 'dude', frame: 5 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'upLeft',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'downLeft',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'upRight',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'downRight',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }

  shotFruit(bullet, fruit) {
    fruit.disableBody(true, true);
    bullet.disableBody(true, true);
    const score = this.currentPlayer.getScore() + 1;
    this.currentPlayer.setScore(score);
    this.currentPlayer.updateScore();
    console.log(this.currentPlayer.getScore());
  }

  spawnFruit() {
    if (
      this.player.getEligibilityToPlay() === true ||
      this.player2.getEligibilityToPlay() === true
    ) {
      const fruit = this.fruits.create(
        Phaser.Math.Between(200, 600),
        -5,
        'fruit'
      );

      this.fruits.children.iterate(child => {
        child.setGravityY(140);
      });
      setTimeout(() => {
        fruit.destroy();
      }, 6000);
    }
  }

  spawnBatch() {
    this.time.addEvent({
      delay: 1000,
      callback: this.spawnFruit,
      callbackScope: this,
      loop: true
    });
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);

    let partInSeconds = seconds % 60;

    partInSeconds = partInSeconds.toString().padStart(2, '0');

    return `${minutes}:${partInSeconds}`;
  }

  onEvent() {
    this.initialTime -= 1; // One second
    this.timerText.setText('Countdown: ' + this.formatTime(this.initialTime));
  }

  roundCount(player) {
    /*  if (
      this.player.getRoundPlayed() === this.player2.getRoundPlayed() &&
      (this.player.getRoundPlayed() > 0 && this.player2.getRoundPlayed() > 0) &&
      this.roundCounter <= this.rounds
    ) {
      this.roundCounter++;
      console.log('roundCounter ', this.roundCounter, this.rounds);
    } else*/

    if (player.getRoundPlayed() === this.rounds) {
      player.setEligibilityToPlay(false);
      player.uploadScore();
      console.log(player.getPlayerName(), "'s uploadScore");
      if (
        this.player.getRoundPlayed() === this.player2.getRoundPlayed() &&
        (this.player.getRoundPlayed() === this.rounds &&
          this.player2.getRoundPlayed() === this.rounds)
      ) {
        this.add.text(200, 200, 'Rounds completed turn', {
          fontSize: '34px',
          fill: 'yellow'
        });
        this.scene.pause('Game');
      }
    }
  }
}
