import * as PIXI from 'pixi.js'

import { Field, FieldConfiguration } from './game/field'

const stage1: number[] = [
  0, 0, 1, 1, 3, 3, 5, 5,
  0, 1, 1, 3, 3, 5, 5,
  3, 3, 5, 5, 0, 0, 1, 1,
  3, 3, 5, 5, 0, 0, 1
]

const configuration: FieldConfiguration = {
  bubbleRadius: 32,
  columns: 8,
  rowHeight: 56,
  rowShift: 32,
  x: 104,
  y: 136
}

window.onload = () => {
  const container = document.getElementById('app')
  if (container !== null) {
    const width = 720
    const height = 1280
    const app = new PIXI.Application({ width, height })
    const ratio = 720 / 1280

    const OnResize = function (): void {
      const clientRatio = window.innerWidth / window.innerHeight
      let scale = 1

      if (ratio < clientRatio) {
        scale = window.innerHeight / height
      } else {
        scale = window.innerWidth / width
      }

      container.style.left = `${(window.innerWidth - width * scale) / 2} + 'px'`
      container.style.top = `${(window.innerHeight - height * scale) / 2} + 'px'`
      app.renderer.resize(width * scale, height * scale)
      app.stage.scale.set(scale)
    }

    window.onresize = OnResize

    OnResize()

    const background = new PIXI.Graphics()
    background.beginFill(0x2b2d42).drawRect(0, 0, width, height).endFill()

    const frame = new PIXI.Graphics()
    frame.lineStyle(16, 0xedf2f4)
      .drawRect(0, 0, 528, 944)
    frame.x = 96
    frame.y = 128

    const shootRect = new PIXI.Graphics()
    shootRect.beginFill(0x8d99ae)
      .drawRect(0, 0, 512, 160)
      .endFill()
    shootRect.x = 104
    shootRect.y = 904

    const circle = new PIXI.Graphics()
    circle.beginFill(0xd90429)
      .drawCircle(0, 0, 24)
      .endFill()
    circle.x = width / 2
    circle.y = 952

    const arrow = new PIXI.Graphics()
    arrow.beginFill(0xef233c)
      .drawPolygon([
        0, -112,
        6, -96,
        6, 36,
        -6, 36,
        -6, -96
      ])
      .endFill()

    circle.addChild(arrow)
    circle.angle = 0

    let prevX = 0
    const onMove = function (x: number, range: number): void {
      const delta = x - prevX
      prevX = x
      circle.angle += delta * range

      if (circle.angle > 60) {
        circle.angle = 60
      } else if (circle.angle < -60) {
        circle.angle = -60
      }
    }
    app.stage.interactive = true
    app.stage.on('mousemove', function (event: PIXI.InteractionEvent) {
      onMove(event.data.global.x, 60 / 256)
    })
    app.stage.on('touchstart', function (event: PIXI.InteractionEvent) {
      prevX = event.data.global.x
    })
    app.stage.on('touchmove', function (event: PIXI.InteractionEvent) {
      onMove(event.data.global.x, 60 / 128)
    })

    app.stage.addChild(background)
    app.stage.addChild(frame)
    app.stage.addChild(shootRect)
    app.stage.addChild(circle)
    container.appendChild(app.view)

    const playfield = new Field(app.stage, configuration)
    playfield.setup(stage1)
  }
}
