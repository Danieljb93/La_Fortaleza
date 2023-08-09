import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../src/componentes/NavBar";
import ItemListContainer from "../src/componentes/ItemListContainer";
import Error from "../src/componentes/Error";
import ItemDetailContainer from "./componentes/ItemDetailContainer";
import CartProvider from "./componentes/CartContext1";
import { Checkout } from "./componentes/Checkout";
import { Carrito } from "./componentes/Carrito";

function App() {
    return (
        <div className="App">
            <CartProvider>
                <BrowserRouter>
                    <NavBar />
                    <Routes>
                        <Route path={"/"} element={<ItemListContainer />} />
                        <Route path={"/categoria/:id"} element={<ItemListContainer />} />
                        <Route path={"/item/:id"} element={<ItemDetailContainer />} />
                        <Route path={"*"} element={<Error />} />
                        <Route path={"/checkout"} element={<Checkout />} />
                        <Route path={"/cart"} element={<Carrito />} />
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </div>
    );
}

export default App;
