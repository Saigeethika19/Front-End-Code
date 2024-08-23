// src/Components/CustomNavbar.js
import React, { useState, useEffect } from 'react';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { toast } from 'react-toastify';
import { logout } from '../Service/UserService';
import { useCart } from '../Context/CartContext';

function CustomNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const { cart } = useCart();
    const navigate = useNavigate();

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        logout().then(() => {
            setUser(null);
            localStorage.removeItem('user');
            toast.success("Logged out successfully");
            navigate('/login');
        }).catch((error) => {
            toast.error("Error during logout");
            console.error("Logout error:", error);
        });
    };

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div>
            <Navbar color="success" light expand="md">
                <NavbarBrand tag={ReactLink} to="/">foody</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/order">Food Item</NavLink>
                        </NavItem>
                    </Nav>

                    <Nav navbar>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/cart" className="position-relative">
                                <i className="bi bi-cart"></i>
                                {cartCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {cartCount}
                                        <span className="visually-hidden">items in cart</span>
                                    </span>
                                )}
                            </NavLink>
                        </NavItem>
                        {user ? (
                            <>
                                <NavItem>
                                    <NavLink>{user.name}</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink type="button" onClick={handleLogout}>
                                        Logout
                                    </NavLink>
                                </NavItem>
                            </>
                        ) : (
                            <>
                                <NavItem>
                                    <NavLink className="text-white" tag={ReactLink} to="/login">
                                        Login
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="text-white" tag={ReactLink} to="/signup">
                                        Signup
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default CustomNavbar;
