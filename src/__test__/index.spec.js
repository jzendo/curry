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

test('test caller', () => {
  let fn = jest.fn()

  const add = (a, b) => {
    fn()
    return a + b
  }

  const f = curry(add)
  f(1, 2)
  f(1)(2)

  expect(fn).toHaveBeenCalled()
  expect(fn).toHaveBeenCalledTimes(2)
})

test('test function', () => {
  const add = (a, b) => a + b
  const f = curry(add)

  expect(f(1)(2)).toBe(3)
  expect(f(1, 2)).toBe(3)
  expect(f(1, 2, 5)).toBe(3)
})
