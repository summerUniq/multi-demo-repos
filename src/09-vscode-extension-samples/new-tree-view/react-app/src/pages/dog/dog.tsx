import React, { Component } from 'react'

class Dog extends Component {

  render(): React.ReactElement {
    return (
      <div>
        <div>This is Dog page</div>
        <button>showMessage: Dog</button>
      </div>
    )
  }
}

export default Dog