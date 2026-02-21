import './HomePage.css'
import { Header } from '../../components/Header'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { ProductsGrid } from './ProductsGrid';

export function HomePage({ cart, loadCart}) {

    /*
    fetch(URL).then((response) => { response.json().then((data) => HERE MANIPULATE THE DATA)}) 
    => axios waits for fecth and gives directly the data.json()
    cleaner way to ask data to backend
    */

    const [products, setProducts] = useState([]);
    
    useEffect(() => 
    {
        // async-await is just syntactic sugar on top of Promises. It makes asynchronous code look synchronous.
        const loadHomeData = async () => {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        }
        loadHomeData();
    }, []);

    return (
        <>
            <title>Home</title>

            <Header cart={cart}/>

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart}/>
            </div> 
            
        </> 
    );
}
