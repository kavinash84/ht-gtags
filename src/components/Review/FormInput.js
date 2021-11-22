import React from "react";
import PropTypes from "prop-types";
import Input from "hometown-components/lib/Input";
import InputField from "hometown-components/lib/InputField";
import TextArea from "hometown-components/lib/TextArea";
import { Label, FeedBackMessage } from "hometown-components/lib/Label";

const FormInput = ({
  label,
  name,
  type,
  feedBackMessage,
  feedBackError,
  style,
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
    <InputField mb="0.625rem" style={style}>
      {!(type === "hidden") && (
        <Label fontSize="0.875em" mb="0.625rem">
          {label}
        </Label>
      )}
      {(type === "text" ||
        type === "password" ||
        type === "email" ||
        type === "number" ||
        type === "hidden") && (
        <Input
          {...inputProps}
          name={name}
          style={{
            height: "50px",
            backgroundColor: "white",
            borderRadius: "5px",
            borderColor: "rgb(227, 227, 227)"
          }}
        />
      )}
      {type === "textarea" && <TextArea {...inputProps} name={name} />}
      {feedBackError && !(type === "hidden") && (
        <FeedBackMessage type="error">{feedBackMessage}</FeedBackMessage>
      )}
    </InputField>
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
