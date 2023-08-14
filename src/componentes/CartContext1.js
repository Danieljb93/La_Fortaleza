import { createContext, useEffect, useState } from "react";

export const CartContext1 = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addItem = (item, cant) => {
        const updatedCart = cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, cant: cartItem.cant + cant } : cartItem));

        const existingItem = updatedCart.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
            setCart(updatedCart);
        } else {
            setCart([...updatedCart, { ...item, cant }]);
        }
    };
    const clearCart = () => {
        setCart([]); // Vaciar el carrito
    };

    useEffect(() => {
        console.log("carrito:", cart);
    }, [cart]);

    const getQuantity = () => {
        return cart.reduce((acum, unItem) => acum + unItem.cant, 0);
    };

    const restoreStock = (productId, quantityToRestore) => {
        setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, stock: item.stock + quantityToRestore } : item)));
    };

    return (
        <CartContext1.Provider value={{ cart, setCart, restoreStock, getQuantity, addItem, clearCart }}>{children}</CartContext1.Provider>
    );
};

export default CartProvider;
