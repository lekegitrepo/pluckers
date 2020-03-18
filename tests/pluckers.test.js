/* eslint-disable no-unused-vars */
import Phaser from 'phaser';
import GameController from '../src/game/game_controller';
import Player from '../src/game/player';

jest.mock('../src/game/player');

const playerNameMock = jest.fn();

Player.mockImplementation(() => ({ getPlayerName: playerNameMock }));

beforeEach(() => {
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
    expect(Player).not.toHaveBeenCalled();
    const player1 = new Player({}, null);
    const player2 = new Player({}, null);
    const gc = new GameController(player1, player2);
    expect(Player).toHaveBeenCalledTimes(2);
  });
});
