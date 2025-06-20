import { useState } from 'react';
import { Keyboard } from 'react-native';

export default function useSignupValidation(onValid) {
    const [errors, setErrors] = useState({});
    const [isSelected, setIsSelected] = useState(false);
    
    //error handling & validation for input boxes
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
    }); 

    const validate = () => {
        Keyboard.dismiss();
        let valid = true;

        //username and password validation
        if(!inputs.username) {
            handleError('Please input username', 'username');
            valid = false;
        }
        if(!inputs.password) {
            handleError('Please input password', 'password');
            valid = false;
        } else if(inputs.password.length < 8) {
            handleError('Minimum password length of 8 characters', 'password');
            valid = false;
        }

        //email validation
        if(!inputs.email) {
            handleError('Please input email', 'email');
            valid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Please input valid email', 'email');
            valid = false;
        }

        //terms validation
        if(!isSelected) {
            handleError('Please accept the terms', 'terms');
            valid = false;
        } else {
            handleError(null, 'terms');
        }

        if(valid && onValid) {
            onValid();
        }
    };

    const handleOnChange = (text, input) => {
        setInputs(prevState => ({...prevState, [input] : text}));
    };

    const handleError = (errorMessage, input) => {
        setErrors((prevState) => ({...prevState, [input] : errorMessage}));
    };

    return {
        inputs,
        errors,
        isSelected,
        setIsSelected, 
        handleOnChange,
        handleError,
        validate,
    };
};