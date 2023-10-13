import { CART_ACTION_TYPES } from "./cart.types";

const CART_INTITAL_STATE = {
    isCartOpen: false,
    cartItems: [],

}


export const cartReducer = (state = CART_INTITAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        case CART_ACTION_TYPES.RETURN_TO_DEFAULT:
            return {
                ...state,
                ...CART_INTITAL_STATE
            }
        default:
            return state;
    }
}