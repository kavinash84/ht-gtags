const validationProps = (error, errorMessage) => ({
  error,
  errorMessage
});

export const isBlank = val => {
  const trimmedVal = val.trim();
  if (!trimmedVal && trimmedVal.length === 0) {
    return true;
  }
  return false;
};

export const validateText = (value, field) => {
  if (isBlank(value)) {
    return validationProps(true, `${field} should not be left blank`);
  }
  return validationProps(false, "");
};

export const validatePincode = value => {
  if (!isBlank(value) && !/^[1-9][0-9]{5}$/i.test(value)) {
    return true;
  }
  return false;
};

export const allowNChar = (value, n) => {
  if (value.length <= n) {
    return true;
  }
  return false;
};

export const allowTypeOf = (value, type) => {
  if (type === "number") {
    return /^\d+$/.test(value);
  }
};

export const validateName = value => {
  if (isBlank(value)) {
    return validationProps(true, "Please enter your name");
  } else if (value.length < 3) {
    return validationProps(true, "Name should be atleast 3 characters");
  }
  return validationProps(false, "");
};
export const validateCity = value => {
  if (isBlank(value)) {
    return validationProps(true, "Please enter City Name");
  }
  return validationProps(false, "");
};
export const validateFullname = value => {
  if (isBlank(value)) {
    return validationProps(true, "Please enter your first name and last name");
  } else if (value.length < 3) {
    return validationProps(true, "Name should be atleast 3 characters");
  } else if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(value)) {
    return validationProps(
      true,
      "Please enter firstname, lastname seperated with a space."
    );
  }
  return validationProps(false, "");
};
export const trimSpecialChar = text => {
  const newText = text.replace(/[^a-zA-Z ]/g, "");
  return newText;
};
export const checkSpecialChar = text => {
  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; //eslint-disable-line
  const check = format.test(text);
  return check;
};

export const checkSpecialCharAndNum = text => {
  const format = /^[A-Za-z]+$/; //eslint-disable-line
  const check = !format.test(text);
  return check;
};

export const validateMobile = num => {
  if (RegExp(/^[6-9]\d{9}$/).test(num)) {
    return validationProps(false, "");
  }
  return validationProps(true, "Enter a valid mobile number");
};

// export const validateMobile = (value) => {
//   if (/^\d{10}$/.test(value)) {
//     return validationProps(false, '');
//   }
//   return validationProps(true, 'Enter a valid mobile number');
// };

export const validateEmail = val => {
  /* eslint-disable */
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(val).toLowerCase())) return validationProps(false, "");
  return validationProps(true, "Enter valid email address !");
  /* eslint-enable */
};

export const validateOption = val => {
  if (!val || isBlank(val)) {
    return validationProps(true, "Please select an option");
  }
  return validationProps(false, "");
};
