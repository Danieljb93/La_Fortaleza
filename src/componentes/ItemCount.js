import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Importa las funciones adecuadas de firestore

const ItemCount = ({ item, onAdd }) => {
    const [counter, setCounter] = useState(1);
    const [stock, setStock] = useState(0);

    useEffect(() => {
        const fetchStockFromFirebase = async () => {
            const firestore = getFirestore(); // Obtiene una instancia de Firestore
            const itemDocRef = doc(firestore, "productos", item.id); // Referencia al documento en Firestore

            try {
                const itemSnapshot = await getDoc(itemDocRef);
                if (itemSnapshot.exists()) {
                    const data = itemSnapshot.data();
                    setStock(data.stock);
                }
            } catch (error) {
                console.error("Error fetching stock from Firebase:", error);
            }
        };

        fetchStockFromFirebase();
    }, [item.id]);

    const incrementarStock = () => {
        if (counter < stock) {
            setCounter(counter + 1);
        }
    };

    const decrementarStock = () => {
        if (counter > 1) {
            setCounter(counter - 1);
        }
    };

    const handleAgregarAlCarrito = () => {
        onAdd(counter);
    };

    return (
        <div className="container" id="itemcount">
            <div className="row mb-3">
                <div className="col-md-2">
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" className="btn btn-outline-warning" onClick={decrementarStock}>
                            -
                        </button>
                        <button type="button" className="btn btn-outline-warning">
                            {counter}
                        </button>
                        <button type="button" className="btn btn-outline-warning" onClick={incrementarStock}>
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <button type="button" className="btn btn-warning" onClick={handleAgregarAlCarrito}>
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemCount;
