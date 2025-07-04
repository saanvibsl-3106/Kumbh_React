import React from "react";
import { ClipLoader, PulseLoader, BeatLoader, ScaleLoader } from "react-spinners";

const ButtonSpinner = ({
  variant = "clip",
  size = 15,
  color = "#d4af37",
  position = "inline",
  style = {}
}) => {
  const getPositionStyle = () => {
    switch (position) {
      case "inline":
        return {
          display: "inline-block",
          verticalAlign: "middle",
          marginLeft: "8px",
        };
      case "center":
        return {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        };
      case "right":
        return {
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
        };
      default:
        return {};
    }
  };

  const spinnerStyle = {
    ...getPositionStyle(),
    ...style
  };

  // Choose spinner based on variant
  const renderSpinner = () => {
    switch (variant) {
      case "pulse":
        return <PulseLoader size={size} color={color} speedMultiplier={0.75} />;
      case "beat":
        return <BeatLoader size={size} color={color} speedMultiplier={0.9} />;
      case "scale":
        return <ScaleLoader height={size} color={color} />;
      case "clip":
      default:
        return <ClipLoader size={size} color={color} speedMultiplier={0.8} />;
    }
  };

  return <div style={spinnerStyle}>{renderSpinner()}</div>;
};

export default ButtonSpinner;
