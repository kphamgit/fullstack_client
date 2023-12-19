import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
//import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import { Link, NavLink, Outlet } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import NavBarButton from './NavBarButton';

function NavbarComponent({categories}) {
    return (
        <>
          <Navbar bg="primary" data-bs-theme="light">
            <Container>
              <Navbar.Brand href="#home">English Tuyhoa</Navbar.Brand>
              <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              {categories.map(cat => 
             <li key={cat.id}><NavBarButton title={cat.name} subcategories={cat.sub_categories}/>
              </li>
              )}
              
              </Nav>
            </Container>
          </Navbar>
          <Outlet />
        </>
    );
}

export default NavbarComponent