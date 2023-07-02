import React from "react";
import { BsFillCartFill } from "react-icons/bs";

const CartWidget = () => {
    const defaultValue = 0;
    return (
        <div>
            <BsFillCartFill />
            <span>{defaultValue}</span>
        </div>
    );
};

export default CartWidget;
