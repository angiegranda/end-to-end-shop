import './HomePage.css'
import { Header } from '../../components/Header'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { ProductsGrid } from './ProductsGrid';

export function HomePage({ cart }) {
    /*
    fetch(URL).then((response) => { response.json().then((data) => HERE MANIPULATE THE DATA)}) 
    => axios waits for fecth and gives directly the data.json()
    cleaner way to ask data to backend
    */

    const [products, setProducts] = useState([]);
    
    // useEffect(() => 
    // {
    //     axios.get('/api/products').then((response) => 
    //     {
    //         setProducts(response.data);
    //     })
    // }, []); // empty dependency array means that this code will run only once


    useEffect(() => 
    {
        // async-await is just syntactic sugar on top of Promises. It makes asynchronous code look synchronous.
        const getHomeData = async () => {
            const response = await axios.get('/api/products');
            // await makes them execute sequentially, so the first line must finish before then next line runs
            setProducts(response.data);
        }
        getHomeData();
    }, []);

    return (
        <>
            <title>Home</title>

            <Header cart={cart}/>

            <div className="home-page">
                <ProductsGrid products={products} />
            </div> 
            
        </> 
    );
}
