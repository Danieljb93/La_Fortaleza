import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CartWidget from "../componentes/CartWidget";
import Image from "react-bootstrap/Image";
import logo from "../../src/logo.png"; // Ruta de tu archivo de imagen de logo

function NavBar() {
    return (
        <Navbar bg="warning" data-bs-theme="clear">
            <Container>
                <Navbar.Brand href="#inicio">
                    <Image src={logo} alt="Logo" className="logo" style={{ width: "70px", height: "50px" }} />
                    La Fortaleza
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#inicio">Inicio</Nav.Link>
                        <Nav.Link href="#productos">Productos</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#CartWidget">
                            <CartWidget />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
