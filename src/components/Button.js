import 'phaser';

export default class Button extends Phaser.GameObjects.Container {
  constructor(
    scene,
    x,
    y,
    key1,
    key2,
    text,
    targetScene = null,
    targetSceneData = null,
    player1 = null,
    player2 = null
  ) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.button = this.scene.add.sprite(0, 0, key1).setInteractive();
    this.text = this.scene.add.text(0, 0, text, {
      fontSize: '20px',
      fill: '#fff'
    });
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', () => {
      if (targetScene === null) {
        player1.uploadScore();
        player2.uploadScore();
      } else {
        this.scene.scene.start(targetScene, targetSceneData);
      }
    });

    this.button.on('pointerover', () => {
      this.button.setTexture(key2);
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(key1);
    });

    this.scene.add.existing(this);
  }
}
