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
  const [mobileDrag, setMobileDrag] = useState(0);
  const [touched, setTouched] = useState(false);
  const [configVals, setConfigVals] = useState(initialConfig);

  useEffect(() => {
    if (mobileDrag) {
      openModal();
      saveToStorage();
    }
  }, [mobileDrag]);

  useEffect(() => {
    /**
     * used to persist with local storage
     */
    let stored = JSON.parse(localStorage.getItem("elements-alma"));
    if (stored?.length) {
      setElements(stored);
    }
    window.addEventListener("beforeunload", () => {
      saveToStorage();
    });
    return () => {
      window.removeEventListener("beforeunload", () => {});
    };
  }, []);

  useEffect(() => {
    /**
     * retrieve from local storage to populate
     */
    if (elements?.length) {
      let el = JSON.stringify(elements);
      localStorage.setItem("elements-alma", el);
    }
  }, [elements]);

  const dragHandler = (e, ele, isMobile) => {
    /**
     * isMobile will have {x,y} with
     * touch devices
     */
    e.preventDefault();
    setIsEdit(false);
    let values = { ...configVals };
    values["element"] = ele;
    if (isMobile) {
      values.x = isMobile.x;
      values.y = isMobile.y;
      setMobileDrag(mobileDrag + 1);
    }
    setConfigVals(values);
  };

  const saveToStorage = () => {
    if (elements?.length) {
      let el = JSON.stringify(elements);
      localStorage.setItem("elements-alma", el);
    }
  };

  const openModal = (x, y) => {
    let values = { ...configVals };
    if (x && y) {
      values.x = x;
      values.y = y;
    }
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
          {/* left section for dropping elements */}
          <Playground
            elements={elements}
            configVals={configVals}
            isEdit={isEdit}
            openModal={openModal}
            onEdit={onEdit}
            setIsEdit={setIsEdit}
            setConfigVals={setConfigVals}
            deleteElem={deleteElem}
            touched={touched}
            setTouched={setTouched}
          />
        </div>
        <div className="col-span-3 max-[495px]:col-span-5 bg-[#000]">
          {/* right side bar to pick elements */}
          <Sidebar
            dragHandler={dragHandler}
            exportJson={elements}
            touched={touched}
            setTouched={setTouched}
          />
        </div>
      </div>
      {/* modal which opens up on drop */}
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
