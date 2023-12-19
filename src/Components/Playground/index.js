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
    if (e.key === "Delete" || e.key === "Backspace") {
      deleteElem(obj);
    }
  };

  const onPlaygroundDrop = (e) => {
    // const containerRect = e.currentTarget.getBoundingClientRect();
    // if (
    //   e.clientX >= containerRect.left &&
    //   e.clientX <= containerRect.right &&
    //   e.clientY >= containerRect.top &&
    //   e.clientY <= containerRect.bottom
    // ) {
    const x = e.clientX - e.target.offsetLeft - 10;
    const y = e.clientY - e.target.offsetTop - 25;
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
    // } else {
    //   alert("Dropping here not allowed!")
    // }
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
          } playground-inp`}
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
        className="bg-[#ccc] flex h-screen relative overflow-hidden playground-main"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onPlaygroundDrop(e)}
      >
        {renderElement(elements)}
      </div>
    
  );
};

export default Playground;
