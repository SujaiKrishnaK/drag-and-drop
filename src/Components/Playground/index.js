/**
 * This component will have elements 
 * which are dragged and dropped into 
 */
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./playground.css";

const Playground = (props) => {
  const [activeEl, setActiveEl] = useState(null);
  const groundRef = useRef();
  const {
    openModal,
    elements,
    onEdit,
    isEdit,
    setIsEdit,
    configVals,
    setConfigVals,
    deleteElem,
    touched,
    setTouched,
  } = props;

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const onPlaygroundMove = (e) => {
    const x = e.changedTouches[0]["clientX"];
    const y = e.changedTouches[0]["clientY"];
    let values = { ...configVals };
    values.x = x;
    values.y = y;
    setIsEdit(true);
    onEdit(values, false);
  };

  const onPlaygroundDrop = (e) => {
    const x = e.clientX;
    const y = e.clientY;
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

  /**
   * render elements based on element key
   * it can be Label or Input or Button
   * which are defined in Utils element Types
   */
  const getElements = (obj) => {
    let el = null;
    let font = `${obj["font-size"]}px`;
    let fontWeight = `${obj["font-weight"]}`;
    /**
     * calculating the width of container and 
     * generating percentage value of 
     * x and y for responsive
     */
    const containerWidth = groundRef?.current?.clientWidth;
    const containerHeight = groundRef?.current?.clientHeight;
    let x_percent = Math.round((obj.x / containerWidth) * 100);
    let y_percent = Math.round((obj.y / containerHeight) * 100);
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
            left: `${x_percent}%`,
            top: `${y_percent}%`,
          }}
          onDrag={() => onEditDrag(obj)}
          onTouchMove={() => onEditDrag(obj)}
          autoFocus={activeEl?.id === obj.id}
          onKeyDown={(e) => onEnterKey(e, obj)}
          onTouchStart={(e) => setTouched(true)}
          onTouchEnd={(e) => setTouched(false)}
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
            left: `${x_percent}%`,
            top: `${y_percent}%`,
          }}
          onDrag={() => onEditDrag(obj)}
          onTouchMove={() => onEditDrag(obj)}
          autoFocus={activeEl?.id === obj.id}
          onKeyDown={(e) => onEnterKey(e, obj)}
          onTouchStart={(e) => setTouched(true)}
          onTouchEnd={(e) => setTouched(false)}
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
            left: `${x_percent}%`,
            top: `${y_percent}%`,
            backgroundColor: "blue",
            color: "white",
          }}
          onDrag={() => onEditDrag(obj)}
          onTouchMove={() => onEditDrag(obj)}
          autoFocus={activeEl?.id === obj.id}
          onKeyDown={(e) => onEnterKey(e, obj)}
          onTouchStart={(e) => setTouched(true)}
          onTouchEnd={(e) => setTouched(false)}
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
      ref={groundRef}
      className="bg-[#ccc] overflow-x-scroll relative h-full"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onPlaygroundDrop(e)}
      /**
       * onDrop -- for web
       * onTouchEndCapture -- for mobile devices
       */
      onTouchEndCapture={(e) => {
        touched && onPlaygroundMove(e);
      }}
    >
      {renderElement(elements)}
    </div>
  );
};

export default Playground;
