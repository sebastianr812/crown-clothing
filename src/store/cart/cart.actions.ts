import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
);



const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
    const existingCartItem = cartItems.find((cartItem) => (cartItem.id === cartItemToRemove.id));

    if (existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter((ele) => ele.id !== cartItemToRemove.id)
    }

    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ?
        { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    )
}

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] =>
    cartItems.filter((ele) => ele.id !== cartItemToClear.id)

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));


export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);

}


export const removeItemInCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
    const newCartItems = removeItemFromCart(cartItems, cartItemToRemove);
    return setCartItems(newCartItems);

}

export const clearItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
    const newCartItems = clearCartItem(cartItems, cartItemToRemove);
    return setCartItems(newCartItems);

}

export const returnCartToDefault = () =>
    createAction(CART_ACTION_TYPES.RETURN_TO_DEFAULT) 
