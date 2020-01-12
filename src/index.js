import invariant from 'invariant'

const ERROR_PARAM_INVALID_FN = 'should use a function as parameter.'

const continuePassArgsOrFired = function continuePassArgsOrFired(
  fn,
  args,
  maxArgsNum
) {
  const currentArgsNum = args.length

  if (currentArgsNum >= maxArgsNum) {
    return fn.apply(null, args.slice(0, maxArgsNum))
  } else {
    return function acceptArgsWrapper() {
      return continuePassArgsOrFired(fn, [...args, ...arguments], maxArgsNum)
    }
  }
}

const curry = fn => {
  invariant(typeof fn === 'function', ERROR_PARAM_INVALID_FN)

  const fnLen = fn.length

  const curryWrapper = function curryWrapper(arg0) {
    return continuePassArgsOrFired(fn, [...arguments], fnLen)
  }

  // Store origin function
  curryWrapper.fn = fn

  return curryWrapper
}

export default curry
