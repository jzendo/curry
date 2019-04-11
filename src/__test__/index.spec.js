import curry from '../index'

test('test args', () => {
  expect(typeof curry === 'function').toBeTruthy()

  expect(() => {
    curry(1)
  }).toThrow()

  expect(() => {
    curry()
  }).toThrow()

  expect(() => {
    curry()
  }).toThrowError(/function as parameter/)
})

test('test function', () => {
  const add = (a, b) => a + b
  const f = curry(add)

  expect(f(1)(2)).toBe(3)
  expect(f(1, 2)).toBe(3)
  expect(f(1, 2, 5)).toBe(3)
})
