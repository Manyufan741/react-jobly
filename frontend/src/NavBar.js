import React, {useContext} from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import tokenContext from "./tokenContext";

const NavBar = () => {
    const tokenControl = useContext(tokenContext);
    // console.log("NavBar token =>", tokenControl.token);
    if (tokenControl.token) {
        return (
            <div>
                <Navbar expand="md">
                    <NavLink exact to="/" className="navbar-brand">
                        Jobly
                </NavLink>

                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink to="/companies">Companies</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/jobs">Jobs</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/profile">Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/logout">LogOut</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    } else {
        return (
            <div>
                <Navbar expand="md">
                    <NavLink exact to="/" className="navbar-brand">
                        Jobly
                    </NavLink>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink to="/users">Register</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/login">LogIn</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default NavBar;