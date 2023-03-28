import React, { SyntheticEvent, useState } from "react";

export const useForm = <T extends {}>(initialForm: T) => {
  const [FormState, setFormState] = useState(initialForm);

  const onInputChange = ({ target }: SyntheticEvent | { target: Object }) => {
    const { name, value } = target as
      | HTMLInputElement
      | { name: ""; value: "" };
    setFormState({
      ...FormState,
      [name]: value,
    });
  };

  const onReset = () => {
    setFormState(initialForm);
  };

  return {
    ...FormState,
    FormState,
    onInputChange,
    onReset,
  };
};
