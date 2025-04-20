import React, {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import { MdShoppingCart } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartListCount = cartList.length
        return (
          <>
            {cartListCount > 0 ? (
              <span className="cart-count-badge">{cartListCount}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <nav className="nav-header">
      <div className="nav-content">
        {/* Desktop / Large Screen Nav */}
        <div className="nav-bar-large-container">
          <Link to="/" className="nav-link">
            <h1 className="nav-logo-text">AgroFresh</h1>
          </Link>
          <div className="nav-menu-container">
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-menu-item">
                <Link to="/products" className="nav-link">Products</Link>
              </li>
              <li className="nav-menu-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>
            </ul>
          </div>
          <ul className="nav-menu">

            <li className="nav-menu-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/cart" className="nav-link">
                <MdShoppingCart />
                {renderCartItemsCount()}
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Nav */}
        <div className="nav-bar-mobile-container">
          <div className="mobile-menu">
            <RxHamburgerMenu size={24} />
            <Link to="/" className="nav-link">
              <h1 className="nav-logo-text">AgroFresh</h1>
            </Link>
          </div>
          <div className="mobile-login-cart">
            <Link to="/login" className="nav-link mobile-login">
              Login
            </Link>
            <Link to="/cart" className="nav-link mobile-cart">
              <MdShoppingCart size={24} />
              {renderCartItemsCount()}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header);