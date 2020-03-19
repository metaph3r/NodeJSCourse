const { calculateTip } = require('../src/math')

test('Should calculate total with tip', () => {
    const total = calculateTip(10, 0.3)

    expect(total).toBe(13)
})

test('Shoud calculate total with default tip', () => {
    expect(calculateTip(10)).toBe(12)
})