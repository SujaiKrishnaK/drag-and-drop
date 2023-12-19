import React, { useId } from "react";
import "./sidebar.css";
import Element from "../../Reusables/Element";
import { ELEMENT_TYPES } from "../../Utils/Constants";

const Sidebar = (props) => {
  const { dragHandler } = props;
  return (
    <div className="bg-[#000] sidenav">      
        <div className="sidenav-main">
          <h6 className="sidenav-heading">BLOCKS</h6>
          {ELEMENT_TYPES.map((ele) => (
            <div className="ele-wrapper" key={Math.random()}>
              <Element ele={ele.name} dragHandler={dragHandler} />
            </div>
          ))}
        </div>
      
    </div>
  );
};

export default Sidebar;
