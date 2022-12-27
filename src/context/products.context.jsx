import { createContext, useState, useEffect } from "react";
import PRODUCTS_DATA from '../shop-data.json';

export const ProductsContext = createContext({
    products: [],
    setProducts: () => null
})

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState(PRODUCTS_DATA);
    const val = { products };
    return (
        <ProductsContext.Provider value={val}>{children}</ProductsContext.Provider>
    );
}