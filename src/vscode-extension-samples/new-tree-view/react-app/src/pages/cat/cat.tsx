import React, { Component } from 'react'

class Cat extends Component {

  render(): React.ReactElement {
    return (
      <div>
        <div>This is Cat page</div>
        <button>showMessage: Cat</button>
      </div>
    )
  }
}

export default Cat