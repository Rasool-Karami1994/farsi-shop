import {
  useCartContext,
  useCartContextActions,
} from "../../context/CartProvider";
import "./Cart.css";
import cartEmptyImg from "../../assets/img/cart-empty2.PNG";
import { IoIosArrowBack } from "react-icons/io";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

const Cart = () => {
  const navigate = useNavigate();
  const redirector = () => {
    navigate("/");
  };

  //destructure cart from datas recived by useCartContext hook
  const { cart, total } = useCartContext();
  console.log(cart);

  const dispatch = useCartContextActions();
  const incrementHandler = (cartItem) => {
    console.log(cartItem);
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  };
  const decrementHandler = (cartItem) => {
    console.log(cartItem);
    dispatch({ type: "REDUCE_QUANTITY", payload: cartItem });
  };
  const removeCartItemHandler = (cartItem) => {
    console.log(cartItem);
    dispatch({ type: "REMOVE_CART_ITEM", payload: cartItem });
  };

  /*using forEach method for calculating summery price element*/
  let summeryPriceValue = 0;
  cart.forEach((element) => {
    summeryPriceValue += element.price * element.quantity;
  });
  /*using forEach method for calculating summery price element*/
  let summerydiscountValue = 0;
  cart.forEach((element) => {
    summerydiscountValue += element.discount * element.quantity;
  });

  // useEffect(() => {
  //   if (!cart) {
  //     const savedCartItems = JSON.parse(localStorage.getItem("cart2"));
  //     cart.push(savedCartItems);
  //   } else {
  //     localStorage.setItem("cart2", JSON.stringify(cart));
  //   }
  // }, [cart]);

  if (!cart.length) {
    return (
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
    );
  } else {
    return (
      <div className="cart-container">
        <button onClick={redirector} className="back-button">
          <IoIosArrowBack />
        </button>
        <section className="cart-list-container">
          <div className="cart-Delivery-box">
            <h4>تحویل رایگان برای اعضا</h4>
            <p>
              با عضویت در فروشگاه از تحویل رایگان و سریع بهره مند شوید{" "}
              <span>
                <a href="/signup">ثبت نام</a>
              </span>{" "}
              |{" "}
              <span>
                <a href="/login">ورود</a>
              </span>
            </p>
          </div>
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-img"
              ></img>
              <div>
                <p className="cart-item-name">{item.name}</p>
                <div className="cart-item-control">
                  <div className="cart-item-qnt-control">
                    <button
                      className="cart-control-icons"
                      onClick={() => incrementHandler(item)}
                    >
                      <MdKeyboardArrowUp />
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      onClick={() => decrementHandler(item)}
                      className={
                        item.quantity === 1
                          ? "cart-control-red"
                          : "cart-control-icons"
                      }
                    >
                      <MdKeyboardArrowDown />
                    </button>
                  </div>
                  <button
                    className="cart-control-red"
                    onClick={() => removeCartItemHandler(item)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
              <p className="cart-item-price">
                {item.offPrice * item.quantity} تومان
              </p>
            </div>
          ))}
        </section>
        <section className="cart-summery-container">
          <div className="cart-summery">
            <h4>جزئیات خرید</h4>
            <div>
              <p>قیمت</p>
              <span> {summeryPriceValue} تومان</span>
            </div>
            <div>
              <p>تخفیف</p>
              <span> {summerydiscountValue} تومان</span>
            </div>
            <div className="cart-summery-text">
              <p>قیمت نهایی</p>
              <span> {total} تومان</span>
            </div>

            <Link className="chekout-link" to="/checkout">
              <button className="checkout-btn">ادامه سفارش</button>
            </Link>
          </div>
        </section>
      </div>
    );
  }
};

export default Cart;
