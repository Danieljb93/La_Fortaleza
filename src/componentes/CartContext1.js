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
// import { createContext, useEffect, useState } from "react";

// import { getFirestore, doc, updateDoc } from "firebase/firestore";
// export const CartContext1 = createContext();

// const CartProvider = ({ children }) => {
//     const [cart, setCart] = useState([]);

//     const addItem = (item, cant) => {
//         setCart([...cart, { ...item, cant }]);
//     };

//     const updateStockInFirebase = async (itemId, newStock) => {
//         const querydb = getFirestore();
//         const itemDoc = doc(querydb, "productos", itemId);

//         try {
//             await updateDoc(itemDoc, { stock: newStock });
//             console.log("Stock actualizado en Firebase.");
//         } catch (error) {
//             console.error("Error actualizando el stock en Firebase:", error);
//         }
//     };

//     const restoreStock = async (itemId, quantity) => {
//         // Actualizar el stock en la base de datos de Firebase
//         const db = getFirestore(); // Accede al objeto firestore a través de getFirestore()

//         const productRef = doc(db, "productos", itemId);

//         try {
//             const productDoc = await productRef.get();
//             if (productDoc.exists()) {
//                 const currentStock = productDoc.data().stock;
//                 const newStock = currentStock + quantity;

//                 // Actualizar el campo 'stock' del producto en la base de datos
//                 await updateStockInFirebase(itemId, newStock);
//             } else {
//                 console.log("El producto no existe en la base de datos.");
//             }
//         } catch (error) {
//             console.error("Error al restaurar el stock:", error);
//         }
//     };
//     const getQuantity = () => {
//         return cart.reduce((acum, unItem) => acum + unItem.cant, 0);
//     };
//     return <CartContext1.Provider value={{ cart, addItem, restoreStock, getQuantity }}>{children}</CartContext1.Provider>;
// };
// export default CartProvider;
