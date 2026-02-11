import CheckmarkIcon from '../../assets/images/icons/checkmark.png'
import { Stars } from '../../components/Stars';

export function ProductsGrid( {products} ) {
  return (
    <div className="products-grid">
        {products.map((prod, index) => {
          return (
              <div className="product-container" key={prod.id}>
                  <div className="product-image-container">
                      <img className="product-image"
                      src={prod.image} />
                  </div>

                  <div className="product-name limit-text-to-2-lines">
                      {prod.name}
                  </div>

                  <div className="product-rating-container">
                      <Stars rating={prod.rating.stars} starSize={18} />
                      <div className="product-rating-count link-primary">
                          {prod.rating.count}
                      </div>
                  </div>

                  <div className="product-price">
                      ${Math.floor(prod.priceCents / 100)}
                  </div>

                  <div className="product-quantity-container">
                      <select>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      </select>
                  </div>

                  <div className="product-spacer"></div>

                  <div className="added-to-cart">
                      <img src={CheckmarkIcon} />
                      Added
                  </div>

                  <button className="add-to-cart-button button-primary">
                      Add to Cart
                  </button>
              </div>
          );
        })
      }
    </div>
  );
}