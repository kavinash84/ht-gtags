import React from "react";
import PropTypes from "prop-types";
// import { FormGroup, Label, Input, FormFeedback, Fade } from "reactstrap";

const InputBox = ({
  type,
  placeholder,
  onChangeInput,
  value,
  label,
  error,
  errorMessage,
  flexFlow,
  labelProps,
  inputStyleProps,
  accept
}) => {
  const inputProps = {
    type,
    value,
    placeholder,
    onChange: onChangeInput,
    accept
  };
  if (error) inputProps.valid = false;
  return (
    <div style={{ marginBottom: type === "file" ? "5px" : "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "5px"
        }}
      >
        <label htmlFor={label} {...labelProps} style={{ marginBottom: "10px" }}>
          {label}
        </label>
        <div style={{ width: "80%" }}>
          <input
            {...inputProps}
            style={
              type === "file"
                ? {}
                : {
                    padding: "13px 15px",
                    border: "1px solid hsl(0,0%,80%)",
                    borderRadius: "4px",
                    width: "100%"
                  }
            }
          />
          {error ? (
            <div style={{ color: "#dc4c3a", marginTop: "5px" }}>
              {errorMessage}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

InputBox.defaultProps = {
  errorMessage: "",
  flexFlow: "inherit",
  labelProps: {},
  inputStyleProps: {},
  accept: ""
};

InputBox.propTypes = {
  type: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  flexFlow: PropTypes.string,
  labelProps: PropTypes.objectOf(PropTypes.any),
  inputStyleProps: PropTypes.objectOf(PropTypes.any),
  accept: PropTypes.string
};

export default InputBox;
