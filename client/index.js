import React, { Component } from 'react'
import ReactDOM from 'react-dom'

async function elements() {
  const response = await fetch('http://localhost:3000/elements')
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

function renderResults(item) {
  return (
    <div className="suggestions" key={item.name}>
      {item.name}
      {', '}
      {item.symbol}
    </div>
  )
}

class TypeAhead extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      result: []
    }
  }
  render() {
    return (
      <div>
        <input
          type="text"
          name="element"
          placeholder="Search for elements..."
          onChange={this.onChange.bind(this)}
          onKeyUp={this.changeInput.bind(this)}
          value={this.state.value}
        />
        <div id="dropDown">
          {this.state.result.map(element => renderResults(element))}
        </div>
      </div>
    )
  }

  matchItem(value) {
    const results = periodicTable.reduce((accumulator, element) => {
      let name = element.name.toLowerCase()
      let symbol = element.symbol.toLowerCase()
      if (value === '') {
        this.setState({ result: [] })
      } else {
        if (
          value === name.substr(0, value.length) ||
          value === symbol.substr(0, value.length)
        ) {
          accumulator.push(element)
        }
      }
      return accumulator
    }, [])
    this.setState({ result: results })
  }

  changeInput() {
    var autoCompleteResult = this.matchItem(this.state.value)
  }
  onChange(event) {
    this.setState({ value: event.target.value })
  }
}

ReactDOM.render(<TypeAhead />, document.querySelector('.search'))
