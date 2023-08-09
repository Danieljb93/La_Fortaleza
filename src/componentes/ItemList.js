import React from "react";
import Item from "../componentes/Item";

const ItemList = ({ item }) => {
    return (
        <div className="row" id="itemlist">
            <h2 className="bg-black text-white p-2">Conoce todos nuestros productos</h2>
            <hr />
            {item.map((item) => (
                <div className="col-md-3" key={item.id}>
                    <Item item={item} />
                </div>
            ))}
        </div>
    );
};

export default ItemList;
