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
            <h4 className="chekout-card-text">{` ${user.name}عزیز، جزئیات سفارش شما: `}</h4>
            <div className="checkout-content-first">
              {cart.map((item) => (
                <div className="checkout-cart-item" key={item.id}>
                  <div>
                    <span className="checkout-badge">{item.quantity}</span>
                    <img src={item.image} alt={item.name}></img>
                  </div>
                  <p>{item.name}</p>
                  <p> {item.offPrice} تومان</p>
                </div>
              ))}
            </div>
            <div className="checkout-content-second">
              <div>
                <p>کل سبد</p>
                <span> {total} تومان</span>
              </div>
              <div>
                <p>حمل و نقل</p>
                <span> 28 تومان</span>
              </div>
            </div>
            <div className="checkout-content-third">
              <p>مجموع سفارش</p>
              <span> {8 + total} تومان</span>
            </div>
            {user ? (
              <button
                className="place-order-btn"
                onClick={() => navigate("/bankPage")}
              >
                نهایی کردن سفارش
              </button>
            ) : (
              <button
                className="place-order-btn"
                onClick={() => navigate("/signup")}
              >
                نهایی کردن سفارش
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
              <span>{" ( :"}</span> متاسفانه سبد خرید شما خالیه
            </h2>
            <button className="empty-cart-btn" onClick={redirector}>
              رفتن به فروشگاه
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
// };

export default CheckoutPage;
