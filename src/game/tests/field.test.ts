import { Field, FieldConfiguration } from '../field'

describe('field', () => {
  const IsShifted = true
  const IsNotShifted = false

  const TestStage: number[] = [
    0, 0, 1, 1,
    0, 1, 1,
    2, 2, 3, 3,
    2, 2, 3
  ]

  const TestConfiguration: FieldConfiguration = {
    bubbleRadius: 8,
    columns: 4,
    rowHeight: 14,
    rowShift: 8,
    x: 0,
    y: 0
  }

  const GetField = (): Field => new Field(TestConfiguration, TestStage)

  it('should have a total of rows', () => {
    const InputField = GetField()
    const ExpectedTotalRows = 4

    expect(InputField.totalRows).toBe(ExpectedTotalRows)
  })

  it('should have a maximum of columns', () => {
    const InputField = GetField()
    const ExpectedMaxColumnsWhenShifted = TestConfiguration.columns - 1

    expect(InputField.maxColumns(IsNotShifted)).toBe(TestConfiguration.columns)
    expect(InputField.maxColumns(IsShifted)).toBe(ExpectedMaxColumnsWhenShifted)
  })

  it('should have interleaved shifted rows', () => {
    const InputField = GetField()
    const FirstRowIndex = 0
    const SecondRowIndex = 1
    const ThirdRowIndex = 2
    const FourthRowIndex = 3

    expect(InputField.isRowShifted(FirstRowIndex)).toBeFalsy()
    expect(InputField.isRowShifted(SecondRowIndex)).toBeTruthy()
    expect(InputField.isRowShifted(ThirdRowIndex)).toBeFalsy()
    expect(InputField.isRowShifted(FourthRowIndex)).toBeTruthy()
  })

  describe('find bubble index', () => {
    it('should not find any bubble index', () => {
      const InputField = GetField()
      const OutsideY = TestConfiguration.rowHeight * InputField.totalRows + 1

      expect(InputField.findBubbleIndex(-1, 0)).toEqual([])
      expect(InputField.findBubbleIndex(0, -1)).toEqual([])
      expect(InputField.findBubbleIndex(0, OutsideY)).toEqual([])
    })

    it('should return top-left bubble index', () => {
      const InputField = GetField()
      const ExpectedIndex = [0, 0]
      const Top = TestConfiguration.bubbleRadius
      const Bottom = TestConfiguration.rowHeight - 1
      const Left = TestConfiguration.bubbleRadius
      const Right = TestConfiguration.bubbleRadius * 2 - 1

      expect(InputField.findBubbleIndex(Left, Top)).toEqual(ExpectedIndex)
      expect(InputField.findBubbleIndex(Right, Bottom)).toEqual(ExpectedIndex)
    })

    it('should return leftmost bubble index of a shifted row', () => {
      const InputField = GetField()
      const ExpectedIndex = [1, 0]
      const X = TestConfiguration.bubbleRadius
      const Y = TestConfiguration.rowHeight

      expect(InputField.findBubbleIndex(X, Y)).toEqual(ExpectedIndex)
    })

    it('should return bottom-right bubble index', () => {
      const InputField = GetField()
      const ExpectedIndex = [InputField.totalRows - 1, TestConfiguration.columns - 2]
      const Top = TestConfiguration.rowHeight * (InputField.totalRows - 1)
      const Bottom = Top + TestConfiguration.rowHeight - 1
      const Left = TestConfiguration.bubbleRadius * 2 * (TestConfiguration.columns - 2) + TestConfiguration.rowShift
      const Right = TestConfiguration.bubbleRadius + Left - 1

      expect(InputField.findBubbleIndex(Left, Top)).toEqual(ExpectedIndex)
      expect(InputField.findBubbleIndex(Right, Bottom)).toEqual(ExpectedIndex)
    })
  })

  describe('find nearby bubbles', () => {
    const InputField = GetField()
    it('should return one bubble index at top-left', () => {
      const Left = TestConfiguration.bubbleRadius
      const Top = TestConfiguration.bubbleRadius
      const ExpectedTopLeftIndexes = [[0, 1]]

      expect(InputField.findNearbyBubbles(Left, Top)).toEqual(ExpectedTopLeftIndexes)
    })

    it('should return one bubble index at top-right', () => {
      const Right = TestConfiguration.bubbleRadius * (TestConfiguration.columns * 2 - 1) - TestConfiguration.rowShift
      const Top = TestConfiguration.bubbleRadius
      const ExpectedTopRightIndexes = [[0, 2]]

      expect(InputField.findNearbyBubbles(Right, Top)).toEqual(ExpectedTopRightIndexes)
    })

    it('should return three bubble indexes at bottom-left', () => {
      const Left = TestConfiguration.bubbleRadius
      const Bottom = TestConfiguration.rowHeight * InputField.totalRows - TestConfiguration.bubbleRadius - 1
      const ExpectedBottomLeftIndexes = [[2, 0], [2, 1], [3, 1]]

      expect(InputField.findNearbyBubbles(Left, Bottom)).toEqual(ExpectedBottomLeftIndexes)
    })

    it('should return four bubble indexes at bottom-right', () => {
      const Right = TestConfiguration.bubbleRadius * (TestConfiguration.columns * 2 - 1) - TestConfiguration.rowShift
      const Bottom = TestConfiguration.rowHeight * InputField.totalRows - TestConfiguration.bubbleRadius - 1
      const ExpectedBottomRightIndexes = [[2, 2], [2, 1], [2, 3], [3, 1]]

      expect(InputField.findNearbyBubbles(Right, Bottom)).toEqual(ExpectedBottomRightIndexes)
    })

    it('should return five bubble indexes at center', () => {
      const X = TestConfiguration.bubbleRadius * TestConfiguration.columns - 1
      const Y = TestConfiguration.rowHeight * 2
      const ExpectedIndexes = [[1, 1], [1, 0], [1, 2], [2, 0], [2, 2]]

      expect(InputField.findNearbyBubbles(X, Y)).toEqual(ExpectedIndexes)
    })
  })
})
