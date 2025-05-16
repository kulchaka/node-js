const arr = [1, 2, [3, 4, [5]], 6]

const sum = (array) =>
  array.reduce((acc, curr) => {
    if (Array.isArray(curr)) {
      return acc + sum(curr)
    }
    if (typeof curr === 'number') {
      return acc + curr
    }
    return acc
  }, 0)

console.log(sum(arr))