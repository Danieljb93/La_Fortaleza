// ProductList.js
import React from "react";
import { useCart } from "./CartContext";

const ProductList = ({ products }) => {
    const { addToCart } = useCart();

    return (
        <div>
            <h2>Productos</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <img src={product.imagen} alt={product.titulo} />
                        <h3>{product.titulo}</h3>
                        <p>{product.descripcion}</p>
                        <p>Precio: ${product.precio}</p>
                        <button onClick={() => addToCart(product)}>Agregar al carrito</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
