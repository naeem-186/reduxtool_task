
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../features/cart/cartSlice';

const CartPage: React.FC = () => {
    const cartItems = useSelector(selectCartItems);

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="cart-page">
            <h1>Cart Details</h1>
            <div>
                {cartItems.map(item => (
                    <div key={item.id}>
                        <p>Product: {item.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${item.price}</p>
                        <p>Total Price: ${item.price * item.quantity}</p>
                    </div>
                ))}
                <p>Total Quantity: {totalQuantity}</p>
                <p>Total Price: ${totalPrice}</p>
            </div>
        </div>
    );
};

export default CartPage;


