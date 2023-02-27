import React from "react";
import { GlobalConsumer } from "../../../context/store";
import { Container, Navbar, NavDropdown } from "react-bootstrap";
import "./header.css";
import { FaUserCircle } from "react-icons/fa";
import { ImHome } from "react-icons/im";
import { Link } from "react-router-dom";
import { CapitalCaseFirstWord } from "../../../config/capitalCaseWord";

function Header(props) {
  const { currentUserLogin, statusLogin, adminRoles, titleHeader } = props;

  return (
    <div className="header">
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand>
            <Navbar.Text className="text-white marginLeftBrand">
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <ImHome /> {titleHeader}
              </Link>
            </Navbar.Text>
          </Navbar.Brand>

          {statusLogin && (
            <Navbar.Collapse className="justify-content-end text-white">
              <FaUserCircle />
              <NavDropdown
                title={`Welcome, ` + CapitalCaseFirstWord(currentUserLogin)}
              >
                <NavDropdown.Item href="/">Logout</NavDropdown.Item>

                {adminRoles && (
                  <NavDropdown.Item as={Link} to="/home_admin">
                    Admin
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </div>
  );
}

export default GlobalConsumer(Header);
