import React, { useState } from "react";
import "./element.css";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const Element = (props) => {
  const [Draggable, setDraggable] = useState(false);
  const { ele, dragHandler } = props;

  return (
    <div
      className="element w-full min-w-[70px]"
      draggable={Draggable}
      onDrag={(e) => {
        dragHandler(e, ele);
      }}
      onTouchMove={(e) => {
        dragHandler(e, ele);
      }}
    >
      <DragIndicatorIcon
        onMouseDown={(e) => setDraggable(true)}
        onMouseUp={(e) => setDraggable(false)}
        className="element-drag-name"
        sx={{ color: "#ccc" }}
      />

      <p className="relative">{ele}</p>
    </div>
  );
};

export default Element;
