import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">Welcome to AgroFresh</h1>
        <p className="home-description">
          Your one-stop shop for all your agricultural needs. Connect directly with farms and suppliers
          to get the freshest fruits and vegetables for your home and business at competitive bulk prices.
        </p>
        <Link to="/products">
          <button type="button" className="shop-now-button">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home