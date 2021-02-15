import { BubbleShoot, StaticBubble } from '../bubbles'

describe('Bubble Shoot', () => {
  describe('Collision Check', () => {
    const Diameter = 16
    const Radius = Diameter / 2
    const CollisionDistance = Diameter - 0.01
    const testFieldBubble = new StaticBubble(0, 0, Radius, 0)

    it('does not collide at horizontal diameter distance', () => {
      const testBubbleShoot = new BubbleShoot(Diameter, 0, Radius, 0)

      expect(testBubbleShoot.doCollideWith(testFieldBubble)).toBeFalsy()
    })

    it('does not collide at vertical diameter distance', () => {
      const testBubbleShoot = new BubbleShoot(0, Diameter, Radius, 0)

      expect(testBubbleShoot.doCollideWith(testFieldBubble)).toBeFalsy()
    })

    it('does not collide at diagonal diameter distance', () => {
      const Position = {
        x: Diameter * Math.cos(Math.PI / 2),
        y: Diameter * Math.sin(Math.PI / 2)
      }
      const testBubbleShoot = new BubbleShoot(Position.x, Position.y, Radius, 0)

      expect(testBubbleShoot.doCollideWith(testFieldBubble)).toBeFalsy()
    })

    it('does not collide at arbitrary diameter distance', () => {
      const Position = {
        x: Diameter * Math.cos(0.7),
        y: Diameter * Math.sin(0.7)
      }
      const testBubbleShoot = new BubbleShoot(Position.x, Position.y, Radius, 0)

      expect(testBubbleShoot.doCollideWith(testFieldBubble)).toBeFalsy()
    })

    it('does collide horizontally', () => {
      const testBubbleShoot = new BubbleShoot(CollisionDistance, 0, Radius, 0)

      expect(testBubbleShoot.doCollideWith(testFieldBubble)).toBeFalsy()
    })

    it('does collide vertically', () => {
      const testBubbleShoot = new BubbleShoot(0, CollisionDistance, Radius, 0)

      expect(testBubbleShoot.doCollideWith(testFieldBubble)).toBeFalsy()
    })

    it('does collide diagonally', () => {
      const Position = {
        x: CollisionDistance * Math.cos(Math.PI / 2),
        y: CollisionDistance * Math.sin(Math.PI / 2)
      }
      const testBubbleShoot = new BubbleShoot(Position.x, Position.y, Radius, 0)

      expect(testBubbleShoot.doCollideWith(testFieldBubble)).toBeFalsy()
    })

    it('does collide at arbitrary position', () => {
      const Position = {
        x: CollisionDistance * Math.cos(0.7),
        y: CollisionDistance * Math.sin(0.7)
      }
      const testBubbleShoot = new BubbleShoot(Position.x, Position.y, Radius, 0)

      expect(testBubbleShoot.doCollideWith(testFieldBubble)).toBeFalsy()
    })
  })
})
