import React from "react";
import bankImg from "../../assets/img/ebanking-digital-internet-banking-wallet-with-people-modern-flat-style-vector-illustration_65709-256.jpg";
import "./bankPage.css";
const BankPage = () => {
  return (
    <div className="bank-page-container">
      <img className="bank-page-img" src={bankImg} alt="Bank illustrator"></img>
      <h3 className="bank-page-text">
        ...تاچند ثانیه دیگر به درگاه بانکی متصل می شوید
      </h3>
    </div>
  );
};

export default BankPage;
