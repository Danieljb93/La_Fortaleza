import React, { useContext } from "react";
import { CartContext1 } from "./CartContext1";
import { Link } from "react-router-dom";

export const Carrito = () => {
    const { cart, restoreStock, setCart } = useContext(CartContext1);

    const handleCancelCompra = () => {
        // Recorre el carrito y restaura el stock de cada producto
        cart.forEach((item) => {
            restoreStock(item.id, item.cant);
        });
        // Limpia el carrito después de restaurar el stock
        setCart([]);
    };
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Carrito</h1>
            <hr />
            {cart.length === 0 ? (
                <h1>Carrito Vacio</h1>
            ) : (
                <div className="row">
                    {cart.map((unItem) => (
                        <div key={unItem.id} className="col-md-4 mb-4">
                            <div className="card">
                                <img
                                    src={unItem.img}
                                    className="card-img-top mx-auto"
                                    alt={unItem.titulo}
                                    style={{ width: "200px", height: "200px", objectFit: "contain" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Nombre: {unItem.name}</h5>
                                    <p className="card-text">Cantidad: {unItem.cant}</p>
                                    <p className="card-text">Precio: {unItem.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Link to="/checkout">
                        <button>Finalizar Compra</button>
                    </Link>
                    <button className="btn btn-warning" onClick={handleCancelCompra}>
                        Cancelar Compra
                    </button>
                </div>
            )}
        </div>
    );
};
