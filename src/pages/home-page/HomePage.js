import React, { useEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import "./HomePage.css";
import * as data from "../../data";
// import axios from "axios";
import hero from "../../assets/img/nike-just-do-it.jpg";
import { useMediaPredicate } from "react-media-hook";
import { toast } from "react-toastify";
import { useCartContextActions } from "../../context/CartProvider";
import { getProducts } from "../../services/getProducts";

const HomePage = () => {
  const smallerThan450 = useMediaPredicate("(max-width: 450px)");
  const [products, setProducts] = useState();
  console.log(data.products);
  const images = [
    {
      url: "https://s6.uupload.ir/files/imani-bahati-lxvxpa1lovm-unsplash_fo31.jpg",
    },
    {
      url: "https://s6.uupload.ir/files/maksim-larin-nopsc3nwtzy-unsplash_ssi9.jpg",
    },
    {
      url: "https://s6.uupload.ir/files/usama-akram-s-gyabqtoxk-unsplash_d0o0.jpg",
    },
    {
      url: "https://s6.uupload.ir/files/giorgio-trovato-lv_4qm5gf9c-unsplash_kkri.jpg",
    },
    {
      url: "https://s6.uupload.ir/files/giorgio-trovato-lv_4qm5gf9c-unsplddash_alq.jpg",
    },
  ];
  const dispatch = useCartContextActions();
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    // console.log(item);
    toast.success(`${product.name} added to Cart!`);
  };

  useEffect(() => {
    if (products) {
      return;
    } else {
      try {
        getProducts().then((res) => setProducts(res.data));
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <div className="home-page-container">
      <div className="hero-container">
        <div className="hero-container-text">ALWAYES IN </div>
        <div className="hero-container-text2"> ROTATION</div>
        <div className="hero-container-text3">
          Shoes alwayes $100 & under, featuring
          <br></br>icons like the Nike Waffle debut.
        </div>

        <img className="hero" src={hero} alt="Hero-banner"></img>
      </div>
      <section className="products-list-container">
        {!products
          ? data.products.map((product) => (
              <div className="product-container" key={product.name}>
                <span className="products-off">${product.discount}</span>
                <div className="product-card">
                  <img
                    className="product-img"
                    src={product.image}
                    alt="product-img"
                  ></img>
                  <p className="product-name">{product.name}</p>
                  <div className="price-container">
                    <p className="product-price">${product.offPrice}</p>
                    <p className="product-offprice">${product.price}</p>
                  </div>
                  <button
                    className="products-btn"
                    onClick={() => addToCart(product)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))
          : products.map((product) => (
              <div className="product-container" key={product.name}>
                <span className="products-off">${product.discount}</span>
                <div className="product-card">
                  <img
                    className="product-img"
                    src={product.image}
                    alt="product-img"
                  ></img>
                  <p className="product-name">{product.name}</p>
                  <div className="price-container">
                    <p className="product-price">${product.offPrice}</p>
                    <p className="product-offprice">${product.price}</p>
                  </div>
                  <button
                    className="products-btn"
                    onClick={() => addToCart(product)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
      </section>
      <div className="slider">
        {smallerThan450 ? (
          <SimpleImageSlider
            width={300}
            height={200}
            images={images}
            showBullets={true}
            showNavs={true}
          />
        ) : (
          <SimpleImageSlider
            width={1200}
            height={640}
            images={images}
            showBullets={true}
            showNavs={true}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
