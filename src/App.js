import React, { useEffect, useState } from "react";
import "./App.css";
import Playground from "./Components/Playground";
import Sidebar from "./Components/Sidebar";
import CustomModal from "./Reusables/Modal";
import { v4 as uuidv4 } from "uuid";

const initialConfig = {
  x: 0,
  y: 0,
  text: "",
  ["font-size"]: 20,
  ["font-weight"]: 200,
  element: null,
};
function App() {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [elements, setElements] = useState([]);
  const [configVals, setConfigVals] = useState(initialConfig);

  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem("elements-alma"));

    if (stored?.length) {
      setElements(stored);
    }
    window.addEventListener("beforeunload", () => {
      if (elements?.length) {
        let el = JSON.stringify(elements);
        localStorage.setItem("elements-alma", el);
      }
    });
    return () => {
      window.removeEventListener("beforeunload", () => {});
    };
  }, []);

  useEffect(() => {
    if (elements?.length) {
      let el = JSON.stringify(elements);
      localStorage.setItem("elements-alma", el);
    }
  }, [elements]);

  const dragHandler = (e, ele) => {
    e.preventDefault();
    setIsEdit(false);
    let values = { ...configVals };
    values["element"] = ele;
    setConfigVals(values);
  };

  const openModal = (x, y) => {
    let values = { ...configVals };
    values.x = x;
    values.y = y;
    setConfigVals(values);
    setOpen(true);
  };

  const onChange = (e, name) => {
    const val = e.target.value;
    let newValues = { ...configVals };
    newValues[name] = name !== "text" ? Number(val) : val;
    setConfigVals(newValues);
  };

  const onEdit = (configObj, isDragged) => {
    setConfigVals(configObj);
    if (!isDragged) {
      onSave(configObj);
    } else {
      setOpen(true);
    }
  };

  const deleteElem = (ele) => {
    let elms = [...elements];
    let filtered = elms.filter((el) => el.id !== ele.id);
    setElements(filtered);
  };
  const onSave = (editedConf) => {
    let el = [...elements];
    if (!isEdit) {
      el.push(configVals);
      el[el.length - 1]["id"] = uuidv4();
    } else {
      let found = el.findIndex((obj) => {
        return obj.id === editedConf.id;
      });
      if (found > -1) {
        el[found] = editedConf;
      }
    }
    setElements(el);
    handleCloseModal();
  };
  const handleCloseModal = () => {
    setOpen(false);
    setConfigVals(initialConfig);
  };
  return (
    <div className="App">
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-9 max-[495px]:col-span-7 bg-[#ccc]">          
          <Playground
            elements={elements}
            configVals={configVals}
            isEdit={isEdit}
            openModal={openModal}
            onEdit={onEdit}
            setIsEdit={setIsEdit}
            setConfigVals={setConfigVals}
            deleteElem={deleteElem}
          />
        </div> 
        <div className="col-span-3 max-[495px]:col-span-5 bg-[#000]">        
          <Sidebar dragHandler={dragHandler} exportJson={elements} />
        </div>
      </div>
      {open && (
        <CustomModal
          open={open}
          configVals={configVals}
          onChange={onChange}
          closeModal={handleCloseModal}
          onSave={onSave}
        />
      )}
    </div>
  );
}

export default App;
