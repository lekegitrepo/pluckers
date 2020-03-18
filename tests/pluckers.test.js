import Phaser from 'phaser';
// const GameController = require('../src/game/game_controller');
/* import Player from '../src/game/player';

const player1 = new Player(
  {
    scene: '',
    x: 750,
    y: 300,
    key: 'dude',
    orient: 'left',
    name: 'playerOne',
  },
  null,
);

describe('Player', () => {
  it('get player name, score', () => {
    expect(player1.getPlayerName()).toBe('playerOne');
  });
}); */

describe('Phaser', () => {
  it('check the instance of Phaser', () => {
    expect(Phaser).toBeInstanceOf(Object);
  });

  it('check Phaser version', () => {
    expect(Phaser).toHaveProperty('VERSION', '3.22.0');
  });
});
