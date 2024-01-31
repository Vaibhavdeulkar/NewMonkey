import React, { Component } from 'react'
import spinnerImage from '../Spinner-without-bg-202px.gif';


export default class Spinner extends Component {
  render() {
    return (
      <div >
        <img src={spinnerImage} alt="Loading" style={{ width: '50%', height: '50%' }}/>
      </div>
    )
  }
}
