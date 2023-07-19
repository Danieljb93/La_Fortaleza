import React from "react";
import ItemCount from "../componentes/ItemCount";

const ItemDetail = ({ item }) => {
    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                {item && item.imagen && <img src={item.imagen} className="img-fluid" alt={item.titulo} />}
                <h2>{item && item.titulo}</h2>
                <p>Descripción:{item && item.descripcion}</p>
                <p>Precio:{item && item.precio}</p>
                <p>Cantidad: {item && item.stock}</p>
            </div>
            <div>
                <ItemCount stockItems={20} />
            </div>
        </div>
    );
};

export default ItemDetail;
