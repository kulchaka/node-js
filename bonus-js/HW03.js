const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))

delay(1000)
  .then(() => console.log('First promise resolved after 1 second'))
  .catch((error) => console.error(error))

delay(2000)
  .then(() => console.log('Second promise resolved after 2 seconds'))
  .catch((error) => console.error(error))

delay(3000)
  .then(() => console.log('Third promise resolved after 3 seconds'))
  .catch((error) => console.error(error))
