import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import logo from "../../assets/img/logo.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { useCartContext } from "../../context/CartProvider";
import {
  useAuthContext,
  useAuthContextAction,
} from "../../context/AuthProvider";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";
const Navigation = () => {
  const user = useAuthContext();
  const { cart } = useCartContext();
  const setUser = useAuthContextAction();
  // console.log(user);

  const logoutHandler = () => {
    setUser(false);
    localStorage.setItem("auth", JSON.stringify(false));
    toast.success(`${user.name} loged out!`);
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
                  <FiLogOut />
                </span>
              </button>
            </NavLink>
          </li>
        ) : (
          <li>
            {user ? (
              <NavLink to="/logout">
                <span>
                  <FiLogIn />
                </span>
              </NavLink>
            ) : (
              <NavLink to="/signup">
                <span>
                  <FiLogIn />
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
