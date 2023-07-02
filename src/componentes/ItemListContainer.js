import React from "react";

const ItemListContainer = ({ greeting, imagen }) => {
    return (
        <div>
            {greeting}
            <br />
            <img src={imagen} alt="img" />
        </div>
    );
};

export default ItemListContainer;
