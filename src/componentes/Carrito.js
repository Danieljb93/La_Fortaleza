import React, { useContext } from "react";
import { CartContext1 } from "../componentes/CartContext1";
import { Link } from "react-router-dom";

export const Carrito = () => {
    const { cart } = useContext(CartContext1);

    const totalAPagar = cart.reduce((total, item) => {
        const itemTotal = item.price * item.cant;
        return total + itemTotal;
    }, 0);
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Carrito</h1>
            <hr />
            {cart.length === 0 ? (
                <h2>Carrito Vacio</h2>
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
                    <Link
                        to={{
                            pathname: "/checkout",
                        }}
                    >
                        <button>Finalizar Compra</button>
                    </Link>

                    <p>Total a Pagar: {totalAPagar}</p>
                </div>
            )}
        </div>
    );
};
