// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import { getFirestore, doc, getDoc } from "firebase/firestore";
// import ItemDetail from "../componentes/ItemDetail";

// const ItemDetailContainer = () => {
//     const [item, setItem] = useState([]);

//     const { id } = useParams();

//     useEffect(() => {
//         const querydb = getFirestore();
//         const queryDoc = doc(querydb, "productos", id);
//         getDoc(queryDoc).then((res) => setItem({ id: res.id, ...res.data() }));
//     }, [id]);

//     return <div className="container">{item ? <ItemDetail item={item} /> : <h1>Cargando...</h1>}</div>;
// };

// export default ItemDetailContainer;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import ItemDetail from "../componentes/ItemDetail";

const ItemDetailContainer = () => {
    const [item, setItem] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const querydb = getFirestore();
        const queryDoc = doc(querydb, "productos", id);
        getDoc(queryDoc).then((res) => {
            const itemData = { id: res.id, ...res.data() };
            setItem(itemData); // Set the entire item data including stock
        });
    }, [id]);

    return <div className="container">{item ? <ItemDetail item={item} /> : <h1>Cargando...</h1>}</div>;
};

export default ItemDetailContainer;
