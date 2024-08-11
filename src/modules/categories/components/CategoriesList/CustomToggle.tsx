import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const CustomToggle = React.forwardRef<HTMLButtonElement, any>(
  ({ onClick }, ref) => (
    <button
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="btn btn-link p-0 m-0 border-0 shadow-none text-success"
    >
      <BsThreeDotsVertical />
    </button>
  )
);

export default CustomToggle;
