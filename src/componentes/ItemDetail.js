import React, { useState, useContext, useEffect } from "react";
import ItemCount from "../componentes/ItemCount";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { CartContext1 } from "../componentes/CartContext1";

const ItemDetail = ({ item }) => {
    const [stock, setStock] = useState(item.stock);
    const { addItem } = useContext(CartContext1);

    const handleOnAdd = (count) => {
        addItem({ id: item.id, price: item.precio, name: item.titulo, img: item.imagen }, count);
        updateStockInFirebase(stock - count); // Disminuir el stock después de la compra
    };

    const updateStockInFirebase = async (newStock) => {
        const querydb = getFirestore();
        const itemDoc = doc(querydb, "productos", item.id);

        try {
            await updateDoc(itemDoc, { stock: newStock });
            setStock(newStock); // Actualizar el estado local con el nuevo valor del stock
        } catch (error) {
            console.error("Error updating stock in Firebase:", error);
        }
    };

    useEffect(() => {
        if (item.id) {
            const fetchStockFromFirebase = async () => {
                const querydb = getFirestore();
                const itemDoc = doc(querydb, "productos", item.id);
                try {
                    const docSnapshot = await getDoc(itemDoc);
                    if (docSnapshot.exists()) {
                        const stockFromFirebase = docSnapshot.data().stock;
                        setStock(stockFromFirebase);
                    }
                } catch (error) {
                    console.error("Error fetching stock from Firebase:", error);
                }
            };

            fetchStockFromFirebase();
        }
    }, [item.id]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title bg-black text-white p-2">Seleccionaste este producto</h2>
                            <hr />
                            {item.imagen && <img src={item.imagen} className="img-fluid border-dark" alt={item.titulo} />}
                            <h2 className="card-title">{item.titulo}</h2>
                            <p className="card-text">Descripción: {item.descripcion}</p>
                            <p className="card-text bg-black text-white p-2">Precio: {item.precio}</p>
                            <p className="card-text">Cantidad: {stock}</p>
                            <ItemCount stockItems={stock} item={item} onAdd={handleOnAdd} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;
