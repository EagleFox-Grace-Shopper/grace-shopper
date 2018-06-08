import React from 'react'

class ButtonAddToCart extends React.Component {

  constructor(props){
    super(props)
    this.addToCart = this.addToCart.bind(this)
  }

  addToCart = () => {
    console.log('add to cart functionality needs to be written!')
  }

  render(){
    return (
      <div>
        <button id= "addToCart" onClick={this.addToCart}>
          Add to Cart
        </button>
      </div>
    )
  }
}

export default ButtonAddToCart
