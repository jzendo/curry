import invariant from 'invariant'

const continuePassArgsOrFired = function(fn, args, targetLen) {
  const len = args.length

  if (len >= targetLen) {
    return fn.apply(null, args.slice(0, targetLen))
  } else {
    return function() {
      return continuePassArgsOrFired(fn, [...args, ...arguments], targetLen)
    }
  }
}

const curry = fn => {
  invariant(typeof fn === 'function', 'Should pass function.')

  const fnLen = fn.length

  const curryWrapper = function(arg0) {
    return continuePassArgsOrFired(fn, [...arguments], fnLen)
  }
  return curryWrapper
}

export default curry
