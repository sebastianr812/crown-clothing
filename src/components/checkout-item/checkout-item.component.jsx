import { ImageContainer, CheckoutItemContainer, StyledSpanForWidth, Quantity, RemoveDiv, Arrow, Value } from './checkout-item.styles'

import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';



const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;

    const { clearItemFromCart, addItemToCart, removeItemInCart } = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemInCart(cartItem);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <StyledSpanForWidth >{name}</StyledSpanForWidth>
            <Quantity >
                <Arrow onClick={removeItemHandler} >
                    &#10094;
                </Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler} >
                    &#10095;

                </Arrow>
            </Quantity>
            <StyledSpanForWidth >${price}</StyledSpanForWidth>
            <RemoveDiv onClick={clearItemHandler} >
                &#10005;
            </RemoveDiv>

        </CheckoutItemContainer>

    );
}

export default CheckoutItem;