import './Header.css'
import WhiteLogo from '../assets/images/logo-white.png'
import WhiteLogoMobile from '../assets/images/mobile-logo-white.png'
import CartIcon from '../assets/images/icons/cart-icon.png'
import SearchIcon from '../assets/images/icons/search-icon.png'
import { NavLink, useNavigate, useSearchParams } from 'react-router'
import { useEffect, useState } from 'react'
// the Link component lets you go to another pahe without reloading

export function Header({ cart = [] }) {

    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

    useEffect(() => {
        setSearchTerm(searchParams.get('search') || '');
    }, [searchParams]);

    const runSearch = () => {
        const trimmedTerm = searchTerm.trim();
        navigate(trimmedTerm ? `/?search=${encodeURIComponent(trimmedTerm)}` : '/');
    }

    const handleSearchKeyDown = (event) => {
        if (event.key === 'Enter') {
            runSearch();
        }
    }

    return (
        <>
            <div className="header">
                <div className="left-section">
                    <NavLink className="header-link" to="/">
                    <img className="logo" src={WhiteLogo} />
                    <img className="mobile-logo" src={WhiteLogoMobile} />
                    </NavLink>
                </div>
                <div className="middle-section">
                    <input className="search-bar" type="text" placeholder="Search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    onKeyDown={handleSearchKeyDown} />

                    <button className="search-button" type="button" onClick={runSearch}>
                    <img className="search-icon" src={SearchIcon} />
                    </button>
                </div>

                <div className="right-section">
                    <NavLink className="orders-link header-link" to="/orders">

                    <span className="orders-text">Orders</span>
                    </NavLink>

                    <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={CartIcon} />
                    <div className="cart-quantity">{cartQuantity}</div>
                    <div className="cart-text">Cart</div>
                    </NavLink>
                </div>
            </div>
        </>
    );
}
