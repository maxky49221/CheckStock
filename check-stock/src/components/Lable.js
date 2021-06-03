import { useState } from "react";
import Input from "./Input";
import ImageUpload from "../components/ImgUpload";
import { createData } from "../utilites/createData";
import axios from '../axios';
import FormData from 'form-data';
import back from '../images/back.png';
import { Link } from "react-router-dom";


const Lable = () => {
  //const [pro, setPro] = useState("");
  const [serial , setSerial] = useState(""); 
  const [name, setName] = useState(""); 
  const [price, setPrice] = useState("");
  const [number, setNumber] = useState("");
  const [img , setImg] = useState("");


const getStart=async()=>{
  const newData = createData(name, serial, number , price)
  const formData = new FormData();
  formData.append("serial",serial);
  formData.append("name",name);
  formData.append("price",price);
  formData.append("number",number); 
  formData.append("imgURL",img); 

  await axios.post("/InfoProductServlet", formData);
}


  return (
    <div className="col"> 
      <div>
        <div className="container">
          <div className="card">
            <div className="card-body">
              <form>

                <Input name= "Serial" type="text" onChange={(e)=>setSerial(e.target.value)} />
              
                <Input name=  "name" type="text" onChange={(e)=>setName(e.target.value)}/>
                
                <Input name= "price" type="number" onChange={(e)=>setPrice(e.target.value)} />
                
                <Input name= "number" type="number" onChange={(e)=>setNumber(e.target.value)}/>

                <Input name=  "img" type="text" onChange={(e)=>setImg(e.target.value)} />
                
                <ImageUpload />
                
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={getStart}
                >
                  Submit
                </button>

              </form>
            </div>
          </div>
        </div>
        <Link to="/home">
        <button className="butpm"> <img className="butlable" src={back}/> </button>
        </Link>
      </div>

    </div>
  );
};

export default Lable;
