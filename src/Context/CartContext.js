// src/contexts/CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart(prevCart => {
            const itemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
            if (itemIndex === -1) {
                return [...prevCart, { ...item, quantity: 1 }];
            } else {
                const updatedCart = [...prevCart];
                updatedCart[itemIndex].quantity = (updatedCart[itemIndex].quantity || 1) + 1;
                return updatedCart;
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    };

    const decrementQuantity = (itemId) => {
        setCart(prevCart => {
            const itemIndex = prevCart.findIndex(item => item.id === itemId);
            if (itemIndex === -1) return prevCart; // Item not found

            const updatedCart = [...prevCart];
            if (updatedCart[itemIndex].quantity > 1) {
                updatedCart[itemIndex].quantity -= 1;
            } else {
                updatedCart.splice(itemIndex, 1); // Remove item if quantity is zero
            }
            return updatedCart;
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, decrementQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
