import React, { useEffect, useRef, useState } from "react";
import "./playground.css";

const Playground = (props) => {
  const [activeEl, setActiveEl] = useState(null);
  const {
    openModal,
    elements,
    onEdit,
    isEdit,
    setIsEdit,
    configVals,
    setConfigVals,
    deleteElem,
  } = props;

  const onEnterKey = (e, obj) => {
    if (e.key === "Enter") {
      setIsEdit(true);
      onEdit(obj, true);
      setActiveEl(obj);
    }
    if (e.key === "Delete") {
      deleteElem(obj);
    }
  };

  const onPlaygroundDrop = (e) => {
    const x = e.clientX || e.changedTouches[0].clientX;
    const y = e.clientY || e.changedTouches[0].clientY;
    if (isEdit) {
      let values = { ...configVals };
      values.x = x;
      values.y = y;
      setIsEdit(true);
      onEdit(values, false);
    } else {
      setIsEdit(false);
      openModal(x, y);
    }
  };
  const onEditDrag = (obj) => {
    setActiveEl(obj);
    setConfigVals(obj);
    setIsEdit(true);
  };

  const getElements = (obj) => {
    let el = null;
    let font = `${obj["font-size"]}px`;
    let fontWeight = `${obj["font-weight"]}`;
    if (obj.element === "Label") {
      el = (
        <label
          tabIndex="0"
          className={`${
            activeEl?.id === obj.id ? "show-selected" : ""
          } playground-inp`}
          draggable
          key={obj.id}
          onMouseDown={() => setActiveEl(obj)}
          style={{
            fontSize: font,
            fontWeight: fontWeight,
            left: obj.x,
            top: obj.y,
          }}
          onDrag={() => onEditDrag(obj)}
          onTouchMove={() => onEditDrag(obj)}
          autoFocus={activeEl?.id === obj.id}
          onKeyDown={(e) => onEnterKey(e, obj)}
        >
          {obj.text}
        </label>
      );
    }
    if (obj.element === "Input") {
      el = (
        <input
          draggable
          className={`${
            activeEl?.id === obj.id ? "show-selected" : ""
          } playground-inp`}
          key={obj.id}
          onMouseDown={() => setActiveEl(obj)}
          placeholder={obj.text}
          style={{
            fontSize: font,
            fontWeight: fontWeight,
            left: obj.x,
            top: obj.y,
          }}
          onDrag={() => onEditDrag(obj)}
          onTouchMove={() => onEditDrag(obj)}
          autoFocus={activeEl?.id === obj.id}
          onKeyDown={(e) => onEnterKey(e, obj)}
        ></input>
      );
    }
    if (obj.element === "Button") {
      el = (
        <button
          draggable
          className={`${
            activeEl?.id === obj.id ? "show-selected" : ""
          } playground-inp playground-inp-btn`}
          key={obj.id}
          onMouseDown={() => setActiveEl(obj)}
          style={{
            fontSize: font,
            fontWeight: fontWeight,
            left: obj.x,
            top: obj.y,
            backgroundColor: "blue",
            color: "white",
          }}
          onDrag={() => onEditDrag(obj)}
          onTouchMove={() => onEditDrag(obj)}
          autoFocus={activeEl?.id === obj.id}
          onKeyDown={(e) => onEnterKey(e, obj)}
        >
          {obj.text}
        </button>
      );
    }
    return el;
  };

  const renderElement = (el) => {
    return el?.map((obj) => {
      return getElements(obj);
    });
  };

  return (
    <div
      className="bg-[#ccc] overflow-x-scroll relative h-full"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onPlaygroundDrop(e)}
      onTouchEndCapture={(e) => onPlaygroundDrop(e)}
    >
      <div className="hidden"></div>    
      {renderElement(elements)}
    </div>
  );
};

export default Playground;
