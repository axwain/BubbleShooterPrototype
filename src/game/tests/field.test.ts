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

  describe('search bubble', () => {
    it('should not find any bubble index', () => {
      const InputField = GetField()
      const OutsideY = TestConfiguration.rowHeight * InputField.totalRows + 1

      expect(InputField.searchBubbleIndex(-1, 0)).toEqual([])
      expect(InputField.searchBubbleIndex(0, -1)).toEqual([])
      expect(InputField.searchBubbleIndex(0, OutsideY)).toEqual([])
    })

    it('should return top-left bubble index', () => {
      const InputField = GetField()
      const ExpectedIndex = [0, 0]
      const Bottom = TestConfiguration.rowHeight - 1
      const Right = TestConfiguration.bubbleRadius * 2 - 1

      expect(InputField.searchBubbleIndex(0, 0)).toEqual(ExpectedIndex)
      expect(InputField.searchBubbleIndex(Right, Bottom)).toEqual(ExpectedIndex)
    })

    it('should return bottom-right bubble index', () => {
      const InputField = GetField()
      const ExpectedIndex = [InputField.totalRows - 1, TestConfiguration.columns - 2]
      const Top = TestConfiguration.rowHeight * (InputField.totalRows - 1)
      const Bottom = Top + TestConfiguration.rowHeight - 1
      const Left = TestConfiguration.bubbleRadius * 2 * (TestConfiguration.columns - 2) + TestConfiguration.rowShift
      const Right = TestConfiguration.bubbleRadius * 2 + Left - 1

      expect(InputField.searchBubbleIndex(Left, Top)).toEqual(ExpectedIndex)
      expect(InputField.searchBubbleIndex(Right, Bottom)).toEqual(ExpectedIndex)
    })
  })
})
