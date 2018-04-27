const validateFormField = (value, rules, compareValue) => {
  let isValid = true;

  for (const rule in rules) {
    switch (rule) {
      case 'isEmail':
        isValid = isValid && emailValidator(value);
        break;
      case 'minLength':
        isValid = isValid && minLengthValidaor(value, rules[rule]);
        break;
      case 'equalTo':
        isValid = isValid && equalToValidator(value, compareValue);
        break;
      default:
        isValid = true;
    } 
  }

  return isValid;
};

const emailValidator = value => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

const minLengthValidaor = (value, minLength) => value.length >= minLength;

const equalToValidator = (value, compareValue) => value === compareValue;

export default validateFormField;
