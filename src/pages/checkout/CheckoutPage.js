import "./CheckoutPage.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartProvider";
import { useAuthContext } from "../../context/AuthProvider";
import cartEmptyImg from "../../assets/img/cart-empty2.PNG";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const redirector = () => {
    navigate("/");
  };

  const { cart, total } = useCartContext();
  const user = useAuthContext();

  return (
    <div className="checkout-card-container">
      {cart.length ? (
        <>
          <button onClick={redirector} className="back-button">
            <IoIosArrowBack />
          </button>
          <div className="checkout-card">
            <h4 className="chekout-card-text">{`Dear ${user.name}, this is your shoping detailes:`}</h4>
            <div className="checkout-content-first">
              {cart.map((item) => (
                <div className="checkout-cart-item" key={item.id}>
                  <div>
                    <span className="checkout-badge">{item.quantity}</span>
                    <img src={item.image} alt={item.name}></img>
                  </div>
                  <p>{item.name}</p>
                  <p>$ {item.offPrice}</p>
                </div>
              ))}
            </div>
            <div className="checkout-content-second">
              <div>
                <p>Subtotal</p>
                <span>$ {total}</span>
              </div>
              <div>
                <p>Shipping</p>
                <span>$ 8</span>
              </div>
            </div>
            <div className="checkout-content-third">
              <p>Total</p>
              <span>$ {8 + total} </span>
            </div>
            {user ? (
              <button
                className="place-order-btn"
                onClick={() => navigate("/bankPage")}
              >
                Place Order
              </button>
            ) : (
              <button
                className="place-order-btn"
                onClick={() => navigate("/signup")}
              >
                Place Order
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="cart-empty-container">
          <button onClick={redirector} className="back-button">
            <IoIosArrowBack />
          </button>
          <div className="cart-empty-card">
            <img
              src={cartEmptyImg}
              alt="empty cart"
              className="empty-cart-img"
            ></img>
            <h2 className="empty-cart-h2">
              Your cart is empty <span>{" : )"}</span>
            </h2>
            <button className="empty-cart-btn" onClick={redirector}>
              Go to shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
// };

export default CheckoutPage;
