import Nev from "../components/Nev";
import Tablele from "../components/Tablele";
import Total from "../components/Total";

const Ledger = ({data}) => {
  return (
    <div>
      <div>
        <Nev header="Check Stock" />
      </div>
      <table>
        <Tablele data={data}/>
      </table>
      
      
    </div>
  );
};

export default Ledger;
