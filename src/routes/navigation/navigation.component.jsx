import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../context/user.context";

import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss'

const Navigation = () => {

    const { currentUser } = useContext(UserContext);


    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrownLogo />
                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>

                    {currentUser ? (
                        <span className="nav-link" onClick={signOutUser}>Sign Out</span>
                    ) : (
                        <Link className="nav-link" to='/auth'>
                            Sign In
                        </Link>
                    )}
                    <CartIcon />

                </div>
                <CartDropDown />
            </div>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;