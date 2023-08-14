import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import ItemList from "../componentes/ItemList";

const ItemListContainer = () => {
    const [item, setItem] = useState([]);
    const [load, setLoad] = useState(true);
    const { id } = useParams();

    const getData = async (categoria) => {
        setLoad(true);
        const querydb = getFirestore();
        const queryColletion = categoria
            ? query(collection(querydb, "productos"), where("categoria", "==", categoria))
            : collection(querydb, "productos");
        const resultado = await getDocs(queryColletion);
        const datos = resultado.docs.map((p) => ({ id: p.id, ...p.data() }));
        setItem(datos);
        setLoad(false);
    };

    useEffect(() => {
        getData(id);
    }, [id]);

    return (
        <div className="container">
            {load ? (
                <p>Cargando...</p>
            ) : (
                <div className="row">
                    <ItemList item={item} />
                </div>
            )}
        </div>
    );
};

export default ItemListContainer;
