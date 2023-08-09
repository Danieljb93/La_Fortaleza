import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { CartContext1 } from "./CartContext1";

const CartWidget = () => {
    const { getQuantity } = useContext(CartContext1);

    return (
        <>
            <div>
                <Link to="/cart">
                    <BsFillCartFill />
                </Link>
                <button>{getQuantity()}</button>
            </div>
        </>
    );
};

export default CartWidget;
