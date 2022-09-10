import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

export default class MainScene extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private current: number;
  private turning: number;
  private directions = [ null, null, null, null, null ];
  private car: Phaser.GameObjects.Sprite;


  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    // this.add.image(0, 0, 'base_tiles')
    console.log('Loading Tilemap...')
    const map = this.make.tilemap({ key: 'tilemap' })
    console.log('Adding TilesetImage...')
    const tileset = map.addTilesetImage('tiles', 'base_tiles')
    console.log('Creating Layer...')
    map.createLayer('Tile Layer 1', tileset)
    this.car = this.make.sprite({ key: 'car'}, true)
    this.car.x = 12
    this.car.y = 48
    this.car.angle = 90

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.checkKeys()
  }

  checkKeys(): void {
    if (this.cursors.left.isDown && this.current !== Phaser.LEFT)
    {
      this.checkDirection(Phaser.LEFT);
    }
    else if (this.cursors.right.isDown && this.current !== Phaser.RIGHT)
    {
      this.checkDirection(Phaser.RIGHT);
    }
    else if (this.cursors.up.isDown && this.current !== Phaser.UP)
    {
      this.checkDirection(Phaser.UP);
    }
    else if (this.cursors.down.isDown && this.current !== Phaser.DOWN)
    {
      this.checkDirection(Phaser.DOWN);
    }
    else
    {
      //  This forces them to hold the key down to turn the corner
      this.turning = Phaser.NONE;
    }
  }

  checkDirection(turnTo: number): void {
    this.make.tween(this.car).updateTo('angle', 90)
    this.make.tween(this.car).updateTo('speed', 100)
  }

}
