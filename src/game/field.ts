import { Container } from 'pixi.js'
import { StaticBubble } from './bubbles'

export interface FieldConfiguration {
  bubbleRadius: number
  columns: number
  rowHeight: number
  rowShift: number
  x: number
  y: number
}

export class Field {
  private readonly _field: Container
  private readonly _bubbleRadius: number
  private readonly _bubbles: StaticBubble[][]
  private readonly _columns: number
  private readonly _rowHeight: number
  private readonly _rowShift: number

  constructor (configuration: FieldConfiguration, stage: number[], startsShifted = false) {
    this._field = new Container()
    this._field.x = configuration.x
    this._field.y = configuration.y
    this._bubbles = []
    this._bubbleRadius = configuration.bubbleRadius
    this._columns = configuration.columns
    this._rowHeight = configuration.rowHeight
    this._rowShift = configuration.rowShift

    this.setup(stage, startsShifted)
  }

  get container () {
    return this._field
  }

  get totalRows () {
    return this._bubbles.length
  }

  maxColumns(isShifted: boolean): number {
    return isShifted ? this._columns - 1 : this._columns
  }

  setup (stage: number[], startsShifted = false): void {
    let x = this._bubbleRadius
    let y = this._bubbleRadius
    let isShifted = startsShifted
    let count = 0

    this._bubbles.length = 0
    let currentRow: StaticBubble[] = []
    for (const colorIndex of stage) {
      const bubble = new StaticBubble(x, y, this._bubbleRadius, colorIndex)
      currentRow.push(bubble)
      x += this._bubbleRadius * 2
      count++
      if (count === this.maxColumns(isShifted)) {
        isShifted = !isShifted
        x = this._rowShift * (isShifted ? 1 : 0) + this._bubbleRadius
        y += this._rowHeight
        count = 0
        this._bubbles.push(currentRow)
        currentRow = []
      }

      bubble.setContainer(this._field)
    }
  }
}
