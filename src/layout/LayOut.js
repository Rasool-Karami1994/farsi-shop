import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const LayOut = ({ children }) => {
  return (
    <div>
      <Header />

      {children}
      <Footer />
    </div>
  );
};

export default LayOut;
