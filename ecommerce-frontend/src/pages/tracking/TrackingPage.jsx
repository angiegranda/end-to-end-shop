import { Link } from 'react-router'
import axios from 'axios'
import dayjs from 'dayjs'
import './TrackingPage.css'
import {Header} from '../../components/Header'
import { useParams } from 'react-router';
import {useState, useEffect } from 'react';
import { ProductDetails } from './ProductDetails';


export function TrackingPage( {cart} ) {

    const {orderId, productId} = useParams();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        const getOrder = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
        }
        getOrder();
    }, [orderId]);
    
    if (!order) {
        return null;
    }

    const product = order.products.find((product) => {
        return product.productId == productId; 
    })

    const totalDeliveryTimeMs = product.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().valueOf(totalDeliveryTimeMs); // calculates the amount of time that has passed since the order
    let deliveryProgress = (timePassedMs / totalDeliveryTimeMs) * 100;
    if (deliveryProgress > 100) {
        deliveryProgress = 100;
    } 

    return (
        <>
            <title>Tracking</title>

            <Header cart={cart}/>

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                    View all orders
                    </Link>
                    <ProductDetails product={product} deliveryProgress={deliveryProgress}/>
                </div>
            </div>
        </>
    );
}