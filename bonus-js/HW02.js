const createMultiplier = (value) => (func) => func * value
const multiplyBy2 = createMultiplier(2)
console.log(multiplyBy2(5)) // Результат: 10
console.log(multiplyBy2(10)) // Результат: 20
