import './HomePage.css'
import { Header } from '../../components/Header'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import { ProductsGrid } from './ProductsGrid';

export function HomePage({ cart, loadCart}) {

    /*
    fetch(URL).then((response) => { response.json().then((data) => HERE MANIPULATE THE DATA)}) 
    => axios waits for fecth and gives directly the data.json()
    cleaner way to ask data to backend
    */

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || '';

    useEffect(() => 
    {
        // async-await is just syntactic sugar on top of Promises. It makes asynchronous code look synchronous.
        const loadHomeData = async () => {
            setIsLoading(true);
            const response = await axios.get('/api/products', {
                params: search ? { search } : {}
            });
            setProducts(response.data);
            setIsLoading(false);
        }
        loadHomeData();
    }, [search]);

    return (
        <>
            <title>Home</title>

            <Header cart={cart}/>

            <div className="home-page">
                {search && (
                    <div className="search-results-title">
                        {isLoading ? 'Searching…' : `Results for "${search}"`}
                        {!isLoading && (
                            <Link className="link-primary clear-search-link" to="/">Clear search</Link>
                        )}
                    </div>
                )}

                {!isLoading && search && products.length === 0 ? (
                    <div className="no-results-message">
                        No products matched &quot;{search}&quot;. Try a different search.
                    </div>
                ) : (
                    <ProductsGrid products={products} loadCart={loadCart}/>
                )}
            </div> 
            
        </> 
    );
}
