import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

import "./Load.css";

import { ImageConfig } from "../../config/ImageConfig";
import uploadImg from "../../assets/cloud-upload-regular-240.png";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
const DropFileInput = (props) => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };


  const [selectedFile, setSelectedFile] = useState(null);


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
 formData.append('file', selectedFile);
 console.log("formData : ",formData)

fetch('/api/upload', {
  method: 'POST',
  body: formData,
})
  .then((response) => {
    console.log("response is:",response);
  })
  .catch((error) => {
    console.error(error);
  });
};




  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
            <CloudUploadOutlinedIcon className="CloudUpload"/>
        
          <p>Drag & Drop your files here</p>
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>
      {fileList.length > 0 ? (
        <div className="drop-file-preview">
            <div className="ready-to-upload">
          <p className="drop-file-preview__title">Ready to upload</p>
          <Button
            style={{
                fontFamily:"Montserrat",
                marginBottom:"6px",
                marginRight:"10px",
              backgroundColor: "#08dbba",
              color: "#566787",
              border: "0px",
              borderRadius: "4px",
              fontWeight: "bold",
              width:"fit-content"    
            }}
            onClick={handleSubmit}
          >
            <span>upload</span>
          </Button>
          </div>

          {fileList.map((item, index) => (
            <div key={index} className="drop-file-preview__item">
              <img
                src={
                  ImageConfig[item.type.split("/")[1]] || ImageConfig["default"]
                }
                alt=""
              />
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
                <p>{item.size}B</p>
              </div>
              <span
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              >
                x
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
