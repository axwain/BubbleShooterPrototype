import { Container, Graphics } from 'pixi.js'

const colors: number[] = [0xffadad, 0xffd6a5, 0xfdffb6, 0xcaffbf, 0x9bf6ff, 0xa0c4ff, 0xa0c4ff, 0xffc6ff]

export class StaticBubble {
  private readonly _graphic: Graphics
  private readonly _squaredRadius: number
  private readonly _radius: number

  constructor (x: number, y: number, radius: number, colorIndex: number) {
    this._graphic = new Graphics()
    this._graphic.x = x
    this._graphic.y = y
    this._graphic.beginFill(colors[colorIndex]).drawCircle(0, 0, radius).endFill()

    this._radius = radius
    this._squaredRadius = radius * 2
  }

  get squaredRadius (): number {
    return this._squaredRadius
  }

  get radius (): number {
    return this._radius
  }

  get x (): number {
    return this._graphic.x
  }

  get y (): number {
    return this._graphic.y
  }

  setContainer (container: Container): void {
    container.addChild(this._graphic)
  }
}

export class BubbleShoot extends StaticBubble {
  doCollideWith (other: StaticBubble): boolean {
    const squaredDistance = Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2)
    return squaredDistance < this.squaredRadius
  }
}
