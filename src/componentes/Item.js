import React from "react";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
    const cantidadText = isNaN(item.stock) ? "sin stock" : `cantidad: ${item.stock}`;

    return (
        <Link to={"/item/" + item.id} className="text-decoration-none">
            <div className="container">
                <div className="card mb-3 border-2 border-dark">
                    <img
                        src={item.imagen}
                        className="card-img-top bg-white "
                        alt={item.titulo}
                        style={{ width: "200px", height: "200px" }}
                    />
                    <div className="card-body text-center">
                        <p className="card-text bg-black text-white p-2">{item.titulo}</p>

                        <p className="card-text bg-black text-white p-2">{cantidadText}</p>
                        <p className="card-text">Precio: ${item.precio}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Item;
