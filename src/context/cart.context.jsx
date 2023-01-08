import { createContext, useReducer } from "react";
import { createAction } from '../utils/reducer/reducer.utils'




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

const INITAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
    REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
    CLEAR_ITEM_FROM_CART: 'CLEAR_ITEM_FROM_CART'
}


const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`unhandled type ${type} in cartReducer`);
    }
}



export const CartProvider = ({ children }) => {

    const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITAL_STATE);

    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    // useEffect(() => {
    //     const newCartCount = cartItems.reduce((total, cartItem) => {
    //         return total + cartItem.quantity
    //     }, 0)

    //     setCartCount(newCartCount);
    // }, [cartItems])

    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce((total, cartItem) => {
    //         return total + (cartItem.quantity * cartItem.price)
    //     }, 0)

    //     setCartTotal(newCartTotal);
    // }, [cartItems])


    const updateCartReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity
        }, 0);

        const newCartTotal = newCartItems.reduce((total, cartItem) => {
            return total + (cartItem.quantity * cartItem.price)
        }, 0)

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
            cartItems: newCartItems,
            cartTotal: newCartTotal,
            cartCount: newCartCount
        }))
    }





    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartReducer(newCartItems);

    }

    const removeItemInCart = (cartItemToRemove) => {
        const newCartItems = removeItemFromCart(cartItems, cartItemToRemove);
        updateCartReducer(newCartItems);

    }

    const clearItemFromCart = (cartItemToRemove) => {
        const newCartItems = clearCartItem(cartItems, cartItemToRemove);
        updateCartReducer(newCartItems);

    }

    const setIsCartOpen = (bool) => {
        dispatch(
            createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
        );

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