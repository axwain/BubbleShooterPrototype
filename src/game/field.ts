import { Container, Graphics } from 'pixi.js'

const colors: number[] = [0xffadad, 0xffd6a5, 0xfdffb6, 0xcaffbf, 0x9bf6ff, 0xa0c4ff, 0xa0c4ff, 0xffc6ff]
const stage1: number[] = [
  0, 0, 1, 1, 3, 3, 5, 5,
   0, 1, 1, 3, 3, 5, 5,
  3, 3, 5, 5, 0, 0, 1, 1,
   3, 3, 5, 5, 0, 0, 1
]
const radius = 32

export class Field {
  field: Container

  constructor (stage: Container, x: number, y: number) {
    this.field = new Container()
    this.field.x = x
    this.field.y = y
    stage.addChild(this.field)
  }

  fill (): void {
    let x = radius
    let y = radius
    let isEven = true
    let count = 0
    function maxOnRow (even: boolean) {
      return even ? 8 : 7
    }
    for(const color of stage1) {
      const bubble = new Graphics()
      bubble.beginFill(colors[color]).drawCircle(0, 0, radius).endFill()
      bubble.x = x
      bubble.y = y
      x += radius * 2
      count++
      if (count === maxOnRow(isEven)) {
        isEven = !isEven
        x = radius * (isEven ? 1 : 2)
        y += radius * 2 - 8
        count = 0
      }

      this.field.addChild(bubble)
    }
  }
}