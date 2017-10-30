async function elements() {
  const response = await fetch('http://localhost:1337/elements')
  return await response.json()
}

const periodicTable = []
elements()
  .then(data =>
    data.forEach(element => {
      periodicTable.push(element)
    })
  )
  .catch(error => console.log(error))

console.log(periodicTable)
