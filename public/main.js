async function elements() {
  const response = await fetch('http://localhost:1337/elements')
  return await response.json()
}

const periodicTable = []
elements().then(data => {
  console.log(data)
})
