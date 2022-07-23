import React from "react";
import HomePage from "./pages/home-page/HomePage";
import Cart from "./pages/cart/Cart";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import BankPage from "./pages/bank/BankPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <CheckoutPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/bankPage", element: <BankPage /> },
  { path: "*", element: <NotFoundPage /> },
];
export default routes;
