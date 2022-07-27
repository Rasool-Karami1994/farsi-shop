import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import logo from "../../assets/img/logo.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { useCartContext } from "../../context/CartProvider";
import {
  useAuthContext,
  useAuthContextAction,
} from "../../context/AuthProvider";
import { RiLogoutBoxLine } from "react-icons/ri";
import { HiUserCircle } from "react-icons/hi";

const Navigation = () => {
  const user = useAuthContext();
  const { cart } = useCartContext();
  const setUser = useAuthContextAction();

  const logoutHandler = () => {
    setUser(false);
    localStorage.setItem("auth", JSON.stringify(false));
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <nav>
      <img className="logo" alt="logo" src={logo}></img>
      <ul>
        <li>
          <NavLink to="/cart">
            <span>
              <FaShoppingCart />
            </span>
            <span className="cart-qnt">{cart.length}</span>
          </NavLink>{" "}
        </li>
        {user ? (
          <li>
            <NavLink to="/">
              <button className="logout-btn" onClick={() => logoutHandler()}>
                <span>
                  <RiLogoutBoxLine />
                </span>
              </button>
            </NavLink>
          </li>
        ) : (
          <li>
            {user ? (
              <NavLink to="/logout">
                <span>
                  <HiUserCircle />
                </span>
              </NavLink>
            ) : (
              <NavLink to="/signup">
                <span>
                  <HiUserCircle />
                </span>
              </NavLink>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
