import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setIsCartOpen = (boolean) =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);



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

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);

}

export const removeItemInCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeItemFromCart(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);

}

export const clearItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = clearCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);

}