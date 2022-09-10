import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

export default class MainScene extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private current: number;
  private turning: number;
  private directions = [ null, null, null, null, null ];
  private car: Phaser.GameObjects.Sprite;
  private canvas: HTMLCanvasElement;
  private layer: Phaser.Tilemaps.TilemapLayer;

  private speed = 4
  private lookahead = 16

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
    this.layer = map.createLayer('Tile Layer 1', tileset)
    this.car = this.make.sprite({ key: 'car'}, true)
    this.car.x = 16
    this.car.y = 48
    this.car.angle = 90

    this.cursors = this.input.keyboard.createCursorKeys()
    this.canvas = this.game.canvas
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
    let tile;
    if (turnTo === Phaser.RIGHT) {
      tile = this.layer.getTileAtWorldXY(this.car.x + this.lookahead, this.car.y);
    } else if (turnTo === Phaser.LEFT) {
      tile = this.layer.getTileAtWorldXY(this.car.x - this.lookahead, this.car.y);
    } else if (turnTo === Phaser.UP) {
      tile = this.layer.getTileAtWorldXY(this.car.x, this.car.y - this.lookahead);
    } else if (turnTo === Phaser.DOWN) {
      tile = this.layer.getTileAtWorldXY(this.car.x, this.car.y + this.lookahead);
    }
    console.log(`tile.index=${tile?.index}`)
    if (tile && tile.index != 20) {
      this.move(turnTo)
    }
    // this.move(turnTo)
  }

  move(direction: number): void {
    if (direction === Phaser.RIGHT) {
      this.car.angle = 90;
      if (this.car.x + this.lookahead <= (this.canvas.width - this.car.width / 2)) {
        this.car.x += this.speed;
      }
    } else if (direction === Phaser.LEFT) {
      this.car.angle = -90;
      if (this.car.x - this.lookahead >= 0) {
        this.car.x -= this.speed;
      }
    } else if (direction === Phaser.UP) {
      this.car.angle = 0;
      if (this.car.y - this.lookahead > 0) {
        this.car.y -= this.speed;
      }
    } else if (direction === Phaser.DOWN) {
      this.car.angle = 180;
      if (this.car.y + this.lookahead <= (this.canvas.height - this.car.height / 2)) {
        this.car.y += this.speed;
      }
    }
    let tile = this.layer.getTileAtWorldXY(this.car.x, this.car.y);
    if (tile.index == 127 || tile.index == 29) {
      this.car.x = 16
      this.car.y = 48
      this.car.angle = 90
    }
  }
}
