import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const ItemCount = ({ item, onAdd }) => {
    const [counter, setCounter] = useState(1);
    const [stock, setStock] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        if (item && item.id) {
            const fetchStockFromFirebase = async () => {
                const firestore = getFirestore();
                const itemDocRef = doc(firestore, "productos", item.id);

                try {
                    const itemSnapshot = await getDoc(itemDocRef);
                    if (itemSnapshot.exists()) {
                        const data = itemSnapshot.data();
                        if (data && data.stock !== undefined) {
                            setStock(data.stock);
                        } else {
                            console.error("Stock data is undefined or missing.");
                        }
                    } else {
                        console.error("Item does not exist in Firestore.");
                    }
                } catch (error) {
                    console.error("Error fetching stock from Firebase:", error);
                }
            };

            fetchStockFromFirebase();
        }
    }, [item]);

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
        setAddedToCart(true);
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
                {addedToCart && (
                    <div className="col-md-4">
                        <Link
                            to={{
                                pathname: "/cart",
                            }}
                        >
                            <button type="button" className="btn btn-success">
                                Ir al carrito
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemCount;
