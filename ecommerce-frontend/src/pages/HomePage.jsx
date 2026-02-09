import './HomePage.css'
import { Header } from '../components/Header'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Stars } from '../components/Stars';
import CheckmarkIcon from '../assets/images/icons/checkmark.png'

export function HomePage({ cart }) {
    /*
    fetch(URL).then((response) => { response.json().then((data) => HERE MANIPULATE THE DATA)}) 
    => axios waits for fecth and gives directly the data.json()
    cleaner way to ask data to backend
    */

    const [products, setProducts] = useState([]);
    
    useEffect(() => 
    {
        axios.get('http://localhost:3000/api/products').then((response) => 
        {
            setProducts(response.data);
        })
    }, []); // empty dependency array means that this code will run only once

    return (
        <>
            <title>Home</title>

            <Header cart={cart}/>

            <div className="home-page">
                <div className="products-grid">
                    {
                        products.map((prod, index) => {
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

                    <div className="product-container">
                    <div className="product-image-container">
                        <img className="product-image"
                        src="images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg" />
                    </div>

                    <div className="product-name limit-text-to-2-lines">
                        Adults Plain Cotton T-Shirt - 2 Pack
                    </div>

                    <div className="product-rating-container">
                        <Stars rating={4.5} starSize={18} />
                        <div className="product-rating-count link-primary">
                        56
                        </div>
                    </div>

                    <div className="product-price">
                        $7.99
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
                </div>
            </div> 
        </> 
    );
}
