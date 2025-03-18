import { Container, Nav, Navbar } from "react-bootstrap";
import LogoutBtn from "./LogoutBtn";
import { Link } from 'react-router-dom';

const Navigationbar = () => {

    const pages = [
      {title: "Home", page: "/"},
      {title: "Financial Support", page: "/financialsupport"},
      {title: "Bookmarks", page: "/bookmarks"},
      {title: "Assistant", page: "/assistant"}
    ]

    return ( 
        <Navbar sticky="top" expand="lg" bg="primary">
      <Container fluid>
        <Navbar.Brand href="#home">Tiny Steps</Navbar.Brand>

          <Nav className="m-auto">
            {
              pages.map((page, index) => (
                  <Link key={index} to={page.page} className='ms-4 me-4 text-muted text-decoration-none'>{page.title}</Link>
              ))
            }
            

          </Nav>

          <LogoutBtn />
      </Container>
    </Navbar>
     );
}
 
export default Navigationbar;