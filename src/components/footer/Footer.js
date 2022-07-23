import { AiFillInstagram } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import { SiGmail } from "react-icons/si";
import logo from "../../assets/img/logo.jpg";
import zarinpal from "../../assets/img/zarinpal-badge.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="icons-container">
        <a href="https://www.instagram.com/rasoolkarami_1994/" target="blank">
          <AiFillInstagram />
        </a>
        <a href="http://github.com/Rasool-karami1994" target="blank">
          <AiFillGithub />
        </a>
        <a
          target="blank"
          href="mailto:rasoolkarami2304@gmail.com?cc=email-cc@gmail.com&bcc=email-bcc@gmail.com&subject=Subject Using Mailto.co.uk&body=Email Using Body"
        >
          <SiGmail />
        </a>
      </div>

      <img className="zarinpal-logo" alt="logo" src={zarinpal}></img>
      <img className="logo-footer" alt="logo" src={logo}></img>
    </footer>
  );
};

export default Footer;
