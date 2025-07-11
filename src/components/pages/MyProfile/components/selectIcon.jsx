import React from "react";
import { SvgIcon } from "@mui/material";
export const SelectIcon = (props) => {
  return (
    <SvgIcon
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      height="16"
      width={16}
      {...props}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.9467 5.45312H7.79341H4.05341C3.41341 5.45312 3.09341 6.22646 3.54674 6.67979L7.00008 10.1331C7.55341 10.6865 8.45341 10.6865 9.00674 10.1331L10.3201 8.81979L12.4601 6.67979C12.9067 6.22646 12.5867 5.45312 11.9467 5.45312Z"
          fill="#707070"
        />
      </svg>
    </SvgIcon>
  );
};

export default SelectIcon;
