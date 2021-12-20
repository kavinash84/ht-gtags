import React from "react";
import PropTypes from "prop-types";
// import Input from "hometown-components-dev/lib/InputFieldLabelHtV1";
// import InputField from "hometown-components-dev/lib/InputFieldHtV1";
// import TextArea from "hometown-components-dev/lib/TextAreaHtV1";
// import { Label, FeedBackMessage } from "hometown-components-dev/lib/LabelHtV1";

const FormInput = ({
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
    <div style={{ width: "100%" }}>
      {/* {!(type === "hidden") && (
        <div m style={{ fontSize: "0.875em", marginBottom: "0.625rem" }}>
          {label}
        </div>
      )} */}
      {(type === "text" ||
        type === "password" ||
        type === "email" ||
        type === "number" ||
        type === "hidden") && (
        <input
          {...inputProps}
          name={name}
          style={{
            height: "50px",
            backgroundColor: "white",
            borderRadius: "5px",
            borderColor: "rgb(227, 227, 227)",
            width: "100%",
            border: "1px solid #E3E3E3",
            padding: "5px 10px"
          }}
        />
      )}
      {type === "textarea" && <textarea {...inputProps} name={name} />}
      {/* {feedBackError && !(type === "hidden") && ( */}
      <div
        style={{
          color:
            feedBackError && !(type === "hidden") ? "#dc3545" : "transparent",
          padding: "3px",
          fontSize: "11px"
        }}
      >
        {feedBackMessage}
      </div>
      {/* )} */}
    </div>
  );
};

FormInput.propTypes = {
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

FormInput.defaultProps = {
  value: "",
  feedBackMessage: "",
  feedBackError: false,
  required: false,
  name: null,
  rows: 3,
  type: "text"
};

export default FormInput;
