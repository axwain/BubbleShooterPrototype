import { Container, Graphics } from 'pixi.js'

const colors: number[] = [0xffadad, 0xffd6a5, 0xfdffb6, 0xcaffbf, 0x9bf6ff, 0xa0c4ff, 0xa0c4ff, 0xffc6ff]

export class StaticBubble {
  private readonly _graphic: Graphics

  constructor (x: number, y: number, radius: number, colorIndex: number) {
    this._graphic = new Graphics()
    this._graphic.x = x
    this._graphic.y = y
    this._graphic.beginFill(colors[colorIndex]).drawCircle(0, 0, radius).endFill()
  }

  setContainer (container: Container): void {
    container.addChild(this._graphic)
  }
}
