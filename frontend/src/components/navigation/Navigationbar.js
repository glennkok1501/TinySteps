import { Container, Nav, Navbar } from "react-bootstrap";

const Navigationbar = () => {
    return ( 
        <Navbar expand="lg" bg="primary">
      <Container fluid>
        <Navbar.Brand href="#home">Tiny Steps</Navbar.Brand>

          <Nav className="m-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#supportservices">Support Services</Nav.Link>
            <Nav.Link href="#financialsupport">Financial Support</Nav.Link>
            <Nav.Link href="#nearbyamenities">Nearby Amenities</Nav.Link>
            <Nav.Link href="#getrecommendations">Get Recommendations</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
     );
}
 
export default Navigationbar;