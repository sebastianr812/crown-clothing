import { createContext, useEffect, useState } from "react";




const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => (cartItem.id === productToAdd.id));

    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
    }


    // return new array with modified cart item / new cart item - return an array that spreads the existing
    // cart items and adds another that spreads that and adds a key with quantity and sets it to one 
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0
})



export const CartProvider = ({ children }) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity
        }, 0)

        setCartCount(newCartCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));

    }

    const val = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };



    return (
        <CartContext.Provider value={val}>{children}</CartContext.Provider>
    );
}