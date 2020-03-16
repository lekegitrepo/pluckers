import 'phaser';

export default class GameController {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
  }

  setInitialTurn() {
    let players = [this.player1, this.player2];
    return players[Phaser.Math.Between(0, 1)];
  }

  currentPlayer() {
    return this.setInitialTurn();
  }
}
