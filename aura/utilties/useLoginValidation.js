import { useState } from 'react';
import { Keyboard } from 'react-native';

export default function useLoginValidation(onValid) {
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.email) {
      handleError('Please input username', 'username');
      valid = false;
    }

    if (!inputs.email) {
      handleError('Please input email', 'email');
      valid = false;
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      valid = false;
    }

    if (valid && onValid) onValid();
  };

  const handleError = (message, field) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  const handleOnChange = (text, field) => {
    setInputs(prev => ({ ...prev, [field]: text }));
  };

  return {
    inputs,
    errors,
    handleError,
    handleOnChange,
    validate,
  };
}
