import { ImageContainer, CheckoutItemContainer, StyledSpanForWidth, Quantity, RemoveDiv, Arrow, Value } from './checkout-item.styles'
import { FC, memo } from 'react';
import { CartItem } from '../../store/cart/cart.types';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, removeItemInCart, clearItemFromCart } from '../../store/cart/cart.actions'


type CheckoutItemProps = {
    cartItem: CartItem;
}

const CheckoutItem: FC<CheckoutItemProps> = memo(({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;

    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemInCart(cartItems, cartItem));

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
});

export default CheckoutItem;