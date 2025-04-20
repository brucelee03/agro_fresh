import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'
import Products from './components/Products'
import OrderPlacement from './components/OrderPlacement'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    const existingItem = cartList.find(item => item.id === product.id)
    if (existingItem) {
      // If the item already exists, update its quantity
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item => {
          if (item.id === product.id) {
            return {...item, quantity: item.quantity + product.quantity}
          }
          return item
        }),
      }))
    } else {
      // If the item doesn't exist, add it to the cart list
      this.setState(prevState => ({
        cartList: [
          ...prevState.cartList,
          {...product, quantity: product.quantity},
        ],
      }))
    }
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item => {
        if (item.id === id) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item => {
        if (item.id === id) {
          if (item.quantity <= 1) {
            this.removeCartItem(id)
          }
          return {...item, quantity: item.quantity - 1}
        }
        return item
      }),
    }))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(eachCart => eachCart.id !== id)
    this.setState({cartList: updatedCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/place-order" component={OrderPlacement} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App