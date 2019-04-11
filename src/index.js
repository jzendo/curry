import invariant from 'invariant'

const ERROR_PARAM_FN = 'should use a function as parameter.'

const continuePassArgsOrFired = function continuePassArgsOrFired(
  fn,
  args,
  targetLen
) {
  const len = args.length

  if (len >= targetLen) {
    return fn.apply(null, args.slice(0, targetLen))
  } else {
    return function acceptArgsWrapper() {
      return continuePassArgsOrFired(fn, [...args, ...arguments], targetLen)
    }
  }
}

const curry = fn => {
  invariant(typeof fn === 'function', ERROR_PARAM_FN)

  const fnLen = fn.length
  const curryWrapper = function curryWrapper(arg0) {
    return continuePassArgsOrFired(fn, [...arguments], fnLen)
  }

  return curryWrapper
}

export default curry
