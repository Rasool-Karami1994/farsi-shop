import "./App.css";
import LayOut from "./layout/LayOut";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartProvider from "./context/CartProvider";
import AuthProvider from "./context/AuthProvider";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <CartProvider>
          <LayOut>
            <Routes>
              {routes.map((route, index) => (
                <Route {...route} key={index}></Route>
              ))}
            </Routes>
          </LayOut>
          <ToastContainer />
        </CartProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
