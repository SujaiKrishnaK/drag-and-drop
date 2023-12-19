import React, { useState } from "react";
import "./index.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Input from "../Input";
import { CONFIGURATIONS } from "../../Utils/Constants";

const CustomModal = (props) => {
  const { open, configVals, onChange, closeModal, onSave } = props;

  const handleClose = () => {
    closeModal();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus
    >
      <Box sx={style}>
        <h5 className="flex justify-center items-center my-2 ">
          Edit {configVals?.element}
        </h5>
        <hr></hr>
        <div className="p-3 flex flex-col">
          {CONFIGURATIONS.map((config) => (
            <Input
              placeholder={`${
                configVals?.element && config.placeholder
                  ? config.placeholder + " " + configVals?.element
                  : ""
              }`}
              name={config.name}
              label={config.label}
              key={config.name}
              value={configVals[config.name]}
              type={config.name === "text" ? "text"  : "number"}              
              onChange={(e) => {
                onChange(e, config.name)
              }
              }
            />
          ))}
        </div>
        <hr></hr>
        <button
          disabled={!configVals.text}
          className="m-3 bg-[blue] text-[#fff] w-[150px] h-[40px] rounded disabled:bg-[#ccc]"
          onClick={() => {
            onSave(configVals)
          }}
        >
          Save Changes
        </button>
      </Box>
    </Modal>
  );
};

export default CustomModal;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  boxShadow: 24,
  py: 2,
};
