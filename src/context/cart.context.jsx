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

const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => (cartItem.id === cartItemToRemove.id));

    if (existingCartItem.quantity === 1) {
        return cartItems.filter((ele) => ele.id !== cartItemToRemove.id)
    }

    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ?
        { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    )
}

const clearCartItem = (cartItems, cartItemToClear) =>
    cartItems.filter((ele) => ele.id !== cartItemToClear.id)



export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
    removeItemInCart: () => { },
    clearItemFromCart: () => { },
    cartTotal: 0
})



export const CartProvider = ({ children }) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity
        }, 0)

        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => {
            return total + (cartItem.quantity * cartItem.price)
        }, 0)

        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));

    }

    const removeItemInCart = (cartItemToRemove) => {
        setCartItems(removeItemFromCart(cartItems, cartItemToRemove));

    }

    const clearItemFromCart = (cartItemToRemove) => {
        setCartItems(clearCartItem(cartItems, cartItemToRemove));

    }


    const val = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartCount,
        removeItemInCart,
        clearItemFromCart,
        cartTotal
    };



    return (
        <CartContext.Provider value={val}>{children}</CartContext.Provider>
    );
}