const student = {
  name: 'Andrey',
  grades: [
    { name: 'Algebra', score: 2 },
    { name: 'Physics', score: 6 },
    { name: 'Invalid Grade', score: null },
    { name: 'Chemistry', score: undefined },
    { name: 'History', score: 9 },
  ],
}

const getAverageGrade = (student) => {
  let average = 0
  const total = student.grades?.reduce((acc, { score }) => {
    if (typeof score === 'number') {
      average++
      return acc + score
    }
    return acc
  }, 0)
  return total / average
}

console.log(getAverageGrade(student))
