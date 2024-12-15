import { useState } from "react";

export const useForm = (initialValue) => {
  const [form, setForm] = useState(
    Object.keys(initialValue).reduce((obj, key) => {
      return {
        ...obj,
        [key]: {
          value: initialValue[key],
          isValid: true,
        },
      };
    }, {})
  );

  const onChangeHandler = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    const isValid = event.target.validity
      ? event.target.validity.valid
      : !!value;

    setForm((form) => {
      return {
        ...form,
        [id]: {
          value,
          isValid,
        },
      };
    });
  };

  return [form, onChangeHandler, setForm];
};
