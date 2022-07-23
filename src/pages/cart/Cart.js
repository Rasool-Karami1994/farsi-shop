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
            Your cart is empty <span>{" : )"}</span>
          </h2>
          <button className="empty-cart-btn" onClick={redirector}>
            Go to shopping
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
            <h4>Free Delivery for Members</h4>
            <p>
              Become a member to get fast and free delivery.{" "}
              <span>
                <a href="/signup">JoinUs</a>
              </span>{" "}
              or{" "}
              <span>
                <a href="/login">SignIn</a>
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
                      onClick={() => decrementHandler(item)}
                      className={
                        item.quantity === 1
                          ? "cart-control-red"
                          : "cart-control-icons"
                      }
                    >
                      <MdKeyboardArrowDown />
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      className="cart-control-icons"
                      onClick={() => incrementHandler(item)}
                    >
                      <MdKeyboardArrowUp />
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
                $ {item.offPrice * item.quantity}
              </p>
            </div>
          ))}
        </section>
        <section className="cart-summery-container">
          <div className="cart-summery">
            <h4>Summary</h4>
            <div>
              <p>Price</p>
              <span>$ {summeryPriceValue}</span>
            </div>
            <div>
              <p>Discount</p>
              <span>$ {summerydiscountValue}</span>
            </div>
            <div className="cart-summery-text">
              <p>Total</p>
              <span>$ {total}</span>
            </div>

            <Link className="chekout-link" to="/checkout">
              <button className="checkout-btn">Checkout</button>
            </Link>
          </div>
        </section>
      </div>
    );
  }
};

export default Cart;
