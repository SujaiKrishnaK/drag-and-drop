import React, { useEffect, useRef, useState } from "react";
import "./element.css";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const Element = (props) => {
  const [Draggable, setDraggable] = useState(false);
  const { ele, dragHandler,setTouched,touched } = props;
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.addEventListener(
        "touchend",
        (e) => {
          if (touched) {
            let x = Math.round(e.changedTouches[0]["clientX"]);
          let y = Math.round(e.changedTouches[0]["clientY"]);
          dragHandler(e, ele, { x, y });
          }          
        },
        {
          passive: true,
        }
      );
    }
    return function cleanup() {
      if (elementRef.current) {
        elementRef?.current?.removeEventListener("touchstart", () => {}, false);
        elementRef?.current?.removeEventListener("touchend", () => {}, false);
      }
    };
  }, []);
  return (
    <div
      ref={elementRef}
      className="element w-full min-w-[70px]"
      draggable={Draggable}
      onDrag={(e) => {
        dragHandler(e, ele, false);
      }}
      onTouchStart={(e) => setTouched(true)}
      onTouchEnd={(e) => setTouched(false)}
    >
      <DragIndicatorIcon
        onMouseDown={(e) => setDraggable(true)}
        onMouseUp={(e) => setDraggable(false)}
        onTouchStart={(e) => setDraggable(true)}
        onTouchEnd={(e) => setDraggable(false)}
        className="element-drag-name"
        sx={{ color: "#ccc" }}
      />

      <p className="relative">{ele}</p>
    </div>
  );
};

export default Element;
