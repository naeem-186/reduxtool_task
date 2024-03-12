import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { Product } from '../models/Product';
import { RootState } from '../store';

const ProductListPage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products.products);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

    const handleAddToCart = (product: Product) => {
        const quantityToAdd = quantities[product.id] || 1;
        dispatch(addToCart({ ...product, quantity: quantityToAdd }));
        
    };

    const handleQuantityChange = (productId: number, increment: number) => {
        const currentQuantity = quantities[productId] || 1;
        const newQuantity = Math.max(1, currentQuantity + increment);
        setQuantities({ ...quantities, [productId]: newQuantity });
    };

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map((product: Product) => (
                    <li key={product.id}>
                        <div>{product.name}</div>
                        <div>${product.price}</div>
                        <div>
                            <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                            <span>{quantities[product.id] || 1}</span>
                            <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                        </div>
                        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductListPage;
