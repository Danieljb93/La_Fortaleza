import React, { useContext, useState } from "react";
import { addDoc, collection, getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { CartContext1 } from "./CartContext1";
import { Link } from "react-router-dom";

export const Checkout = () => {
    const { setCart } = useContext(CartContext1);
    const [orderId, setOrderId] = useState();
    const [buyer, setBuyer] = useState({
        Nombre: "",
        Email: "",
        ConfirmarEmail: "",
        Telefono: "",
    });

    const [total, setTotal] = useState(0);

    const updateStockInFirebase = async (itemId, newStock) => {
        const querydb = getFirestore();
        const itemDoc = doc(querydb, "productos", itemId);

        try {
            await updateDoc(itemDoc, { stock: newStock });
        } catch (error) {
            console.error("Error updating stock in Firebase:", error);
        }
    };

    const { Nombre, Email, ConfirmarEmail, Telefono } = buyer;
    const { cart } = useContext(CartContext1);

    const handleInputChange = (e) => {
        setBuyer({
            ...buyer,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Email !== ConfirmarEmail) {
            alert("Las direcciones de correo electrónico no coinciden.");
            return;
        }

        const totalAPagar = cart.reduce((total, item) => {
            const itemTotal = item.price * item.cant;
            return total + itemTotal;
        }, 0);
        const dia = new Date();
        const data = { buyer, cart, total: totalAPagar, dia };
        await generateOrder(data);
        setTotal(totalAPagar);

        // Vaciar el carrito y restaurar el stock
        handleCancel();
    };

    const handleCancel = async () => {
        // Restaurar el stock en Firebase y vaciar el carrito
        try {
            const querydb = getFirestore();

            for (const cartItem of cart) {
                const itemDoc = doc(querydb, "productos", cartItem.id);
                const currentDoc = await getDoc(itemDoc);
                const currentStock = currentDoc.data().stock;
                const newStock = currentStock + cartItem.cantidad;

                await updateDoc(itemDoc, { stock: newStock });
            }

            // Restablecer el carrito a un estado vacío solo si hay elementos en el carrito
            if (cart.length > 0) {
                setCart([]);
            }
        } catch (error) {
            console.error("Error canceling purchase:", error);
        }
    };

    const generateOrder = async (data) => {
        const querydb = getFirestore();
        const queryCollection = collection(querydb, "Orders");
        const order = await addDoc(queryCollection, data);

        // Itera a través de los elementos en el carrito y actualiza el stock para cada elemento
        for (const cartItem of cart) {
            const newStock = cartItem.stock - cartItem.cantidad;
            updateStockInFirebase(cartItem.id, newStock);
        }

        setOrderId(order.id);
    };
    return (
        <div className="container mt-5">
            {!orderId && (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="Nombre"
                            placeholder="Nombre"
                            value={Nombre}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            name="Email"
                            placeholder="Email"
                            value={Email}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            name="ConfirmarEmail"
                            placeholder="Confirmar Email"
                            value={ConfirmarEmail}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            name="Telefono"
                            placeholder="Telefono"
                            value={Telefono}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Confirmar Compra
                    </button>
                    <button onClick={handleCancel} className="btn btn-danger">
                        Cancelar compra
                    </button>
                </form>
            )}
            {orderId && (
                <div className="mt-5 bg-warning p-4 rounded">
                    <h3 className="mb-3">¡Felicitaciones, tu compra se realizó con éxito!</h3>
                    <hr />
                    <h4 className="mb-2">Tu ID de compra es: {orderId}</h4>
                    <h4>El valor total es: ${total}</h4>
                    <Link to="/" className="btn btn-primary mt-3">
                        Volver a comprar
                    </Link>
                </div>
            )}
        </div>
    );
};
