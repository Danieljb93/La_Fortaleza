import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useContext, useState } from "react";
import React from "react";
import { CartContext1 } from "./CartContext1";

export const Checkout = () => {
    const [orderId, setOrderId] = useState();
    const [buyer, setBuyer] = useState({
        Nombre: "",
        Email: "",
        Telefono: "",
    });
    const { Nombre, Email, Telefono } = buyer;

    const { cart } = useContext(CartContext1);

    const handleInputChange = (e) => {
        setBuyer({
            ...buyer,
            [e.target.name]: e.target.value,
        });
    };
    const [total, setTotal] = useState(0); // Define total y setTotal en el estado

    const handleSubmit = async (e) => {
        e.preventDefault();
        const totalValue = cart.reduce((acum, unItem) => acum + unItem.price * unItem.cantidad, 0);
        const dia = new Date();
        const data = { buyer, cart, total: totalValue, dia };
        await generateOrder(data);
        setTotal(totalValue); // Actualiza el valor del total en el estado
    };

    const generateOrder = async (data) => {
        const querydb = getFirestore();
        const queryCollection = collection(querydb, "Orders");
        const order = await addDoc(queryCollection, data);
        setOrderId(order.id);
    };

    return (
        <>
            <h1>Formulario</h1>
            <hr />
            {!orderId && (
                <form onSubmit={handleSubmit}>
                    <input type="text" name="Nombre" placeholder="Nombre" value={Nombre} onChange={handleInputChange} required />
                    <input type="email" name="Email" placeholder="Email" value={Email} onChange={handleInputChange} required />
                    <input type="number" name="Telefono" placeholder="Telefono" value={Telefono} onChange={handleInputChange} />
                    <input type="submit" value="Confirmar Compra" />
                </form>
            )}
            {orderId && (
                <>
                    <h1>Felicitafciones, tu compra se realizo con exito</h1>
                    <h3>Tu ID de compra es: {orderId}</h3>
                    <h3>El valor total es: ${total}</h3> {/* Muestra el total calculado */}
                </>
            )}
        </>
    );
};
