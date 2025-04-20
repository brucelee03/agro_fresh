import {Link} from 'react-router-dom'

import './index.css'

const ProductCard = props => {
  const {productData} = props
  const {name, price, productUrl,  id} = productData

  return (
    <Link to={`/products/${id}`} className="link-item">
      <li className="product-item">
        <img src={productUrl} alt="product" className="thumbnail" />
        <h1 className="title">{name}</h1>
        <div className="product-details">
          <p className="price">Rs {price}/-</p>
        </div>
      </li>
    </Link>
  )
}
export default ProductCard