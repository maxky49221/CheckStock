import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Input } from "@material-ui/core";
import plus from "../images/plus.png";
import minus from "../images/minus.png";
import axios from "../axios";
import FormData from 'form-data';
import { createData } from "../utilites/createData";



function Popup(props){
const [textInput, setTextInput] = useState("");


const onAdd=(event)=>{
  console.log("add");
  console.log(props.id);
  event.preventDefault();
  const formData = new FormData();
  formData.append("product_id", props.id);
  formData.append("add",textInput);
  formData.append("reduce",0);
  axios.put("/AddAndReServlet", formData)
  .then((res)=>{props.onHide()})
  .catch((error)=>{console.log(error);});
}
const onReduce=(event)=>{
  console.log("reduce");
  event.preventDefault();
  const formData = new FormData();
  formData.append("product_id", props.id);
  formData.append("add",0);
  formData.append("reduce",textInput);
  axios.put("/AddAndReServlet", formData)
  .then((res)=>{props.onHide()})
  .catch((error)=>{console.log(error);});
}

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.serial}  
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="subbut">
        <h4>{props.name}</h4>
        <div className divimgpop>
        <img className="imgtablede" src={props.img}/>
        </div>

        <div className="inputnumber">
          <button className="butpm" onClick={onAdd}>
            <img className="imgpm" src={plus} />
          </button>


          <input type="number" onChange={e=>setTextInput(e.target.value)}></input>


          <button className="butpm" onClick={onReduce}>
            <img className="imgpm" src={minus} />
          </button>
          
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Popup;
