import {Header} from '../components/Header'
import './NotFoundPage.css'

export function NotFoundPage( {cart} ) {
    return (
        <>
            <title>Not Found</title>
            <Header />
            <div className='not-found-message'>Not Found 404</div>
        </>
    );
}