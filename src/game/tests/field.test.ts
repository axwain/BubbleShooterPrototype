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

  it('should have a total of rows', () => {
    const ExpectedTotalRows = 4
    const InputField = new Field(TestConfiguration, TestStage)

    expect(InputField.totalRows).toBe(ExpectedTotalRows)
  })

  it('should have a maximum of columns', () => {
    const InputField = new Field(TestConfiguration, TestStage)
    const ExpectedMaxColumnsWhenShifted = TestConfiguration.columns - 1

    expect(InputField.maxColumns(IsNotShifted)).toBe(TestConfiguration.columns)
    expect(InputField.maxColumns(IsShifted)).toBe(ExpectedMaxColumnsWhenShifted)
  })
})
