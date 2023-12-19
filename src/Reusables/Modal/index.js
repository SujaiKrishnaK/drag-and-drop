import React, { useState } from "react";
import "./index.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Input from "../Input";
import { CONFIGURATIONS } from "../../Utils/Constants";
import { CloseTwoTone } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

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
        <div className="flex my-1 mx-2 justify-between">
          <div className="w-full text-xl">Edit {configVals?.element}</div>
          <CloseTwoTone
            sx={{ color: "#ccc", cursor: "pointer" }}
            onClick={handleClose}
          />
        </div>

        <hr></hr>
        <div className="p-3 grid max-md:grid-cols-4 xl:grid-cols-1">
          {CONFIGURATIONS.map((config) => (
            <div className="flex flex-col col-span-2 my-1" >
              <Input                
                placeholder={`${
                  configVals?.element && config.placeholder
                    ? config.placeholder + " " + configVals?.element
                    : ""
                }`}
                name={config.name}
                label={config.label}
                value={configVals[config.name]}
                type={config.name === "text" ? "text" : "number"}
                onChange={(e) => {
                  onChange(e, config.name);
                }}
              />
            </div>
          ))}
        </div>
        <hr></hr>
        <button
          disabled={!configVals.text}
          className="m-3 bg-[blue] text-[#fff] w-[150px] h-[40px] rounded disabled:bg-[#ccc]"
          onClick={() => {
            onSave(configVals);
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
  bgcolor: "#fff",
  boxShadow: 24,
  py: 2,
  minWidth: "350px",
  borderRadius: "10px",
};
