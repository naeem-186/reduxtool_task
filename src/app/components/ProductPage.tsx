
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct, updateProduct } from '../features/products/productsSlice';
import { RootState } from '../store';
import { Product } from '../models/Product';

const ProductPage: React.FC = () => {
    const dispatch = useDispatch();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const products = useSelector((state: RootState) => state.products.products);

    const handleAddProduct = () => {
        const id = Math.floor(Math.random() * 1000);
        dispatch(addProduct({ id, name: productName, price: parseFloat(productPrice) }));
        setProductName('');
        setProductPrice('');
    };

    const handleRemoveProduct = (id: number) => {
        dispatch(removeProduct(id));
    };

    const handleUpdateProduct = (id: number, newName: string, newPrice: number) => {
        const productToUpdate = products.find(product => product.id === id);
        if (productToUpdate) {
            const updatedName = newName !== '' ? newName : productToUpdate.name;
            const updatedPrice = newPrice !== 0 ? newPrice : productToUpdate.price;
            dispatch(updateProduct({ id, name: updatedName, price: updatedPrice }));
        }
    };


    return (
        <div>
            <h2>Add Product</h2>
            <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Product Price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
            />
            <button onClick={handleAddProduct}>Add Product</button>

            <h2>Product List</h2>
            <ul>
                {products.map((product: Product) => (
                    <li key={product.id}>
                        <div>{product.name}</div>
                        <div>${product.price}</div>
                        <div>
                            <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                            <button onClick={() => {
                                const newName = prompt('Enter new name:', product.name);
                                const newPrice = parseFloat(prompt('Enter new price:', product.price.toString()) || '0');
                                if (newName !== null && !isNaN(newPrice)) {
                                    handleUpdateProduct(product.id, newName, newPrice);
                                }
                            }}>Update</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductPage;



