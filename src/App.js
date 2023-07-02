import "./App.css";
import NavBar from "../src/componentes/NavBar";
import ItemListContainer from "../src/componentes/ItemListContainer";
function App() {
    return (
        <div className="App">
            <NavBar />
            <ItemListContainer
                greeting="Hola acá van a ir mis productos"
                imagen="https://d100mj7v0l85u5.cloudfront.net/s3fs-public/2023-04/funciones-del-jefe-de-compras-6.png"
            />
        </div>
    );
}

export default App;
