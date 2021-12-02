import React from "react";
import PropTypes from "prop-types";

const FormInputModal = ({
  label,
  name,
  type,
  feedBackMessage,
  feedBackError,
  ...rest
}) => {
  const inputProps = {
    type,
    name,
    feedBackMessage,
    feedBackError,
    ...rest
  };
  return (
    <div style={{ width: "70%" , marginLeft:"15%", outline:'none', border:'none'}}>
      {!(type === "hidden") && (
        <div m style={{ fontSize: "12px", marginBottom: "0.625rem" }}>
          {label}
        </div>
      )}
      {(type === "text" ||
        type === "password" ||
        type === "email" ||
        type === "number" ||
        type === "hidden") && (
        <input
          {...inputProps}
          name={name}
          style={{
            height: "40px",
            backgroundColor: "white",
            borderRadius: "5px",
            borderColor: "rgb(227, 227, 227)",
            width: "100%",
            border: "none",
            padding: "5px 10px",
            outline:"none"
          }}
        />
      )}
      {type === "textarea" && <textarea {...inputProps} name={name} />}
      {feedBackError && !(type === "hidden") && (
        <div style={{ color: "#dc3545", padding: "3px", fontSize: "13px" }}>
          {feedBackMessage}
        </div>
      )}
    </div>
  );
};

FormInputModal.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string,
  feedBackMessage: PropTypes.string,
  feedBackError: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string,
  rows: PropTypes.number
};

FormInputModal.defaultProps = {
  value: "",
  feedBackMessage: "",
  feedBackError: false,
  required: false,
  name: null,
  rows: 3,
  type: "text"
};

export default FormInputModal;