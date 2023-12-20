import React, { useId } from "react";
import "./sidebar.css";
import { v4 as uuidv4 } from "uuid";
import Element from "../../Reusables/Element";
import { ELEMENT_TYPES } from "../../Utils/Constants";

const Sidebar = (props) => {
  const { dragHandler, exportJson,setTouched,touched } = props;
  return (
    <div className="relative text-[#fff] p-5 flex flex-col justify-start items-center overflow-hidden">
      <h6 className="text-[100%]">BLOCKS</h6>
      <div className="w-full flex-wrap text-[#000]" >
        {ELEMENT_TYPES.map((ele) => (
          <div className="my-2" key={uuidv4()}>
            <Element ele={ele.name} dragHandler={dragHandler} setTouched={setTouched} touched={touched}/>
          </div>
        ))}
      </div>
      <a
        className="cursor-pointer text-[#fff]"
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(exportJson)
        )}`}
        download="alma-base.json"
      >
        Download JSON
      </a>
    </div>
  );
};

export default Sidebar;
