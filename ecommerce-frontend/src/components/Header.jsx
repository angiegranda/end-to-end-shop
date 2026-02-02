import './Header.css'
import WhiteLogo from '../assets/images/logo-white.png'
import WhiteLogoMobile from '../assets/images/mobile-logo-white.png'
import CartIcon from '../assets/images/icons/cart-icon.png'
import SearchIcon from '../assets/images/icons/search-icon.png'
import { NavLink } from 'react-router'
// the Link component lets you go to another pahe without reloading

export function Header() {
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
                    <input className="search-bar" type="text" placeholder="Search" />

                    <button className="search-button">
                    <img className="search-icon" src={SearchIcon} />
                    </button>
                </div>

                <div className="right-section">
                    <NavLink className="orders-link header-link" to="/orders">

                    <span className="orders-text">Orders</span>
                    </NavLink>

                    <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={CartIcon} />
                    <div className="cart-quantity">3</div>
                    <div className="cart-text">Cart</div>
                    </NavLink>
                </div>
            </div>
        </>
    );
}