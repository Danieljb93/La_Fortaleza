import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productos from "../productos.json";
import ItemDetail from "../componentes/ItemDetail";

const ItemDetailContainer = () => {
    const [item, setItem] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const promesa = new Promise((resolve) => {
            setTimeout(() => {
                resolve(productos.find((item) => item.id === parseInt(id)));
            }, 2000);
        });
        promesa.then((data) => {
            setItem(data);
        });
    }, [id]);

    return (
        <div className="container">
            <ItemDetail item={item} />
        </div>
    );
};

export default ItemDetailContainer;

// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";

// const ItemDetailContainer = ({ producto, handleCloseModal }) => {
//     const { id, titulo, imagen, categoria, descripcion, precio, stock } = producto;
//     const [count, setCount] = useState(0);

//     const handleIncrement = () => {
//         if (count < stock) {
//             setCount(count + 1);
//         }
//     };

//     const handleDecrement = () => {
//         if (count > 0) {
//             setCount(count - 1);
//         }
//     };

//     const handleBuy = () => {
//         // Aquí sera la compra
//         console.log(`Compraste ${count} unidades de ${titulo}`);
//         handleCloseModal();
//     };

//     return (
//         <div>
//             <h2>{titulo}</h2>
//             <img src={imagen} alt={titulo} />
//             <p>Categoría: {categoria}</p>
//             <p>Id: {id}</p>
//             <p>Descripción: {descripcion}</p>
//             <p>Precio: ${precio}</p>
//             <p>Stock: {stock}</p>
//             <div>
//                 <Button variant="primary" onClick={handleIncrement} disabled={count >= stock}>
//                     +
//                 </Button>{" "}
//                 <Button variant="danger" onClick={handleDecrement} disabled={count === 0}>
//                     -
//                 </Button>{" "}
//                 <Button variant="success" onClick={handleBuy} disabled={count === 0}>
//                     Comprar
//                 </Button>
//             </div>
//             <p>Cantidad seleccionada: {count}</p>
//         </div>
//     );
// };

// export default ItemDetailContainer;
