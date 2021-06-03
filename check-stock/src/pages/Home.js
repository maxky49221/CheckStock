import Homebut from "../components/Homebut";
import imageclock from "../images/clock.svg";
import imagemoney from "../images/money.svg";
import imagepackage from "../images/packages.svg";
import Nevbar from "../components/Nevbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Nevbar header="Check Stock" />
      <div className="Buthome">
        <Homebut namebut="Add Stock" img={imagepackage} url="/add"/>
        <Homebut namebut="Check Stock" img={imageclock} url="/check"/>
        <Homebut namebut="Ledger" img={imagemoney} url="/ledger"/>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
