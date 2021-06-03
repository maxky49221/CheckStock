import React,{useState} from "react";
import Add from "../images/add.svg";
import Box from "../images/box.svg";


const ImgUpload = () => {
  const [{ alt, src }, setImg] = useState({
    src: Box,
    alt: "Upload an Image",
  });

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
    }
  };

  return (
    <form encType="multipart/form-data">
      <h1 className="form__title">Add picture of product</h1>
      <div className="form__img-input-container">
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          id="photo"
          className="visually-hidden"
          onChange={handleImg}
        />
        
        <div className="boxpic">
        <img src={src} alt={alt} width="100%" height="100%" className="form-img__img-preview" />
        </div>
      </div>
    </form>
  );
};

export default ImgUpload;
