import invariant from 'invariant'

// The max parameter count that the curried function has.
// For performance
const MAX_PARAMETER_NUNBER = 10

const ERROR_PARAM_INVALID_FN = 'should use a function as parameter.'

const ERROR_PARAM_INVALID_FN_ARGS_NUMBER =
  `should be a function that has 2 ~ ${MAX_PARAMETER_NUNBER} paramters.`

// Continue to pass arg or fire
const continuePassArgsOrFired = function continuePassArgsOrFired(fn, args) {
  const currentArgsNum = args.length
  const maxArgsNum = fn.length

  // Fire the hole when retrieve enough parameters
  if (currentArgsNum >= maxArgsNum) {
    return fn.apply(null, args.slice(0, maxArgsNum))
  }

  // Or continue to accept more parameters
  return function acceptArgsWrapper() {
    return continuePassArgsOrFired(fn, [...args, ...arguments])
  }
}

/**
 * Currify the function
 *
 * @param {function} fn the function that will be curried
 * @returns {function} the currify function
 */
const curry = fn => {
  // Check paramter type
  invariant(typeof fn === 'function', ERROR_PARAM_INVALID_FN)
  // Check number
  invariant(
    fn.length > 1 && fn.length <= MAX_PARAMETER_NUNBER,
    ERROR_PARAM_INVALID_FN_ARGS_NUMBER
  )

  const curryWrapper = function curryWrapper(arg0) {
    return continuePassArgsOrFired(fn, [...arguments])
  }
  // Store origin function
  curryWrapper.fn = fn
  return curryWrapper
}

export default curry

export { MAX_PARAMETER_NUNBER }
