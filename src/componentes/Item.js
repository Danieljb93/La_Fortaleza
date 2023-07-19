import React from "react";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
    return (
        <Link to={"/item/" + item.id} className="text-decoration-none">
            <div className="container">
                <div className="card ">
                    <img src={item.imagen} className="card-img-top" alt={item.titulo} />
                    <div className="card-body text-center">
                        <p className="card-text">{item.titulo}</p>
                        <p className="card-text">{item.precio}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Item;
