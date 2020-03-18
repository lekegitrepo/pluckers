import Phaser from 'phaser';
import GameController from '../src/game/game_controller';
import Player from '../src/game/player';

jest.mock('../src/game/player');

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Player.mockClear();
});

describe('Phaser', () => {
  it('Check the instance of Phaser', () => {
    expect(Phaser).toBeInstanceOf(Object);
  });

  it('Check Phaser version', () => {
    expect(Phaser).toHaveProperty('VERSION', '3.22.0');
  });
});

describe('GameController', () => {
  it('Check if the GameController called the class constructor', () => {
    const player1 = new Player({}, null);
    const player2 = new Player({}, null);
    const gc = new GameController(player1, player2);
    expect(Player).toHaveBeenCalledTimes(2);
  });
});

describe('Player', () => {
  it('get player name, score', () => {
    const mockPlayerName = jest.fn('playerOne');
    Player.prototype.getPlayerName = mockPlayerName;
    expect(player.getPlayerName()).toBe('playerOne');
  });
});
