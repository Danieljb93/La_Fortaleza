import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productos from "../productos.json";
import ItemList from "../componentes/ItemList";

const ItemListContainer = () => {
    const [item, setItem] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(id ? productos.filter((item) => item.categoria === id) : productos);
                    }, 1000);
                });
                setItem(data);
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchData();
        const promesa = new Promise((resolve) => {
            setTimeout(() => {
                resolve(id ? productos.filter((item) => item.categoria === id) : productos);
            }, 1000);
        });
        promesa.then((data) => {
            setItem(data);
        });
    }, [id]);

    return (
        <div className="container">
            <div className="row">
                <ItemList item={item} />
            </div>
        </div>
    );
};

export default ItemListContainer;
// import React, { useState, useEffect } from "react";
// import productos from "../productos.json";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import { useParams } from "react-router-dom";
// import ItemDetailContainer from "../componentes/ItemDetailContainer";

// const ItemListContainer = () => {
//     const [selectedProductId, setSelectedProductId] = useState(null);
//     const { id } = useParams();
//     const [showModal, setShowModal] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);

//     useEffect(() => {
//         setSelectedProduct(productos.find((producto) => producto.id === selectedProductId));
//     }, [selectedProductId]);

//     const handleItemClick = (productId) => {
//         setSelectedProductId(productId);
//         setShowModal(true);
//     };

//     const handleCloseModal = () => {
//         setSelectedProductId(null);
//         setShowModal(false);
//     };

//     return (
//         <div className="container">
//             <h2>Conoce todos nuestros productos</h2>
//             <hr />
//             <div className="row">
//                 {productos.map((producto) => (
//                     <div key={producto.id} className="col-sm-6 col-md-4 col-lg-3">
//                         <div className="card" style={{ cursor: "pointer" }}>
//                             <h3 className="card-title">{producto.titulo}</h3>
//                             <img src={producto.imagen} alt={producto.titulo} className="card-img-top" />
//                             <div className="card-body">
//                                 <p className="card-text">Precio: {producto.precio}</p>
//                                 <p className="card-text">Descripción: {producto.descripcion}</p>
//                                 <p className="card-text">Stock: {producto.stock}</p>
//                                 <Button variant="warning" onClick={() => handleItemClick(producto.id)}>
//                                     Detalle
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <Modal show={showModal} onHide={handleCloseModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Detalle del producto</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {selectedProduct && <ItemDetailContainer producto={selectedProduct} handleCloseModal={handleCloseModal} />}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseModal}>
//                         Cerrar
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default ItemListContainer;
