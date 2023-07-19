import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../src/componentes/NavBar";
import ItemListContainer from "../src/componentes/ItemListContainer";
// import CartWidget from "../src/componentes/CartWidget";
// import Construccion from "../src/componentes/Construccion";
import Error from "../src/componentes/Error";
// import Herramientas from "../src/componentes/Herramientas";
// import Hogar from "../src/componentes/Hogar";
import ItemDetailContainer from "./componentes/ItemDetailContainer";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path={"/"} element={<ItemListContainer />} />
                    <Route path={"/categoria/:id"} element={<ItemListContainer />} />
                    <Route path={"/item/:id"} element={<ItemDetailContainer />} />
                    <Route path={"*"} element={<Error />} />

                    {/* <Route path={"/"} element={<ItemListContainer />} />
                    <Route path={"/ItemListContainer"} element={<ItemListContainer />} />
                    <Route path={"/ItemDetailContainer"} element={<ItemDetailContainer />} />
                    <Route path={"/construccion/:id"} element={<Construccion />} />
                    <Route path={"/hogar"} element={<Hogar />} />
                    <Route path={"/herramientas"} element={<Herramientas />} />
                    <Route path={"/CartWidget"} element={<CartWidget />} />
                    <Route path={"*"} element={<Error />} /> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
