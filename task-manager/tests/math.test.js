const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit } = require('../src/math')
const { add } = require('../../playground/9-async-await')

test('Should calculate total with tip', () => {
    const total = calculateTip(10, 0.3)
    expect(total).toBe(13)
})

test('Shoud calculate total with default tip', () => {
    expect(calculateTip(10)).toBe(12)
})

test('Should convert 32 F to 0 C', () => {
    const result = fahrenheitToCelsius(32)
    expect(result).toBe(0)
})

test('Should convert 0 C to 32 F', () => {
    const result = celsiusToFahrenheit(0)
    expect(result).toBe(32)
})

test('Async test demo', (done) => {
    setTimeout(() => {
        expect(1).toBe(1)
        done()
    }, 2000)
})

test('Should add two numbers', (done) => {
    add(2, 3).then((result) => {
        expect(result).toBe(5)
        done()
    })
})

test('Should add two numbers async/await', async () => {
    const result = await add(3, 4)
    expect(result).toBe(7)
})