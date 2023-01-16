import { CategoryItem } from "../categories/category.types";;


export enum CART_ACTION_TYPES {
    SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
    SET_IS_CART_OPEN = 'cart/SET_IS_CART_OPEN',
    ADD_ITEM_TO_CART = 'cart/ADD_ITEM_TO_CART',
    REMOVE_ITEM_FROM_CART = 'cart/REMOVE_ITEM_FROM_CART',
    CLEAR_ITEM_FROM_CART = 'cart/CLEAR_ITEM_FROM_CART',
    RETURN_TO_DEFAULT = 'RETURN_TO_DEFAULT'
}

export type CartItem = CategoryItem & {
    quantity: number;
}