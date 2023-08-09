import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import CartWidget from "../componentes/CartWidget";
import logo from "../../src/logo.png";
import Image from "react-bootstrap/Image";

import { Link, NavLink } from "react-router-dom";

function NavBar() {
    return (
        <Navbar bg="warning" data-bs-theme="clear">
            <Container>
                <Link to="/" className="navbar-brand">
                    <Image src={logo} alt="Logo" className="logo" style={{ width: "100px", height: "80px" }} />
                    La Fortaleza
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">
                            Inicio
                        </Link>

                        <Link to={"/categoria/construccion"} className="nav-link">
                            Construcción
                        </Link>
                        <NavLink to="/categoria/hogar" className="nav-link">
                            Hogar
                        </NavLink>
                        <Link to="/categoria/herramientas" className="nav-link">
                            Herramientas
                        </Link>
                    </Nav>
                    <Nav>
                        <CartWidget />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
