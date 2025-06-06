import React, { useState } from "react";
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Login = ({
    // label,
    // error,
    // password,
    // onFocus = () => {},
    // ...props
}) => {
    // const[isFocused, setIsFocused] = useState(false);
    // const [hidePassword, setHidePassword] = useState(password);
    
    return (
        <View>
            <Text style={styles.label}>Login</Text>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create ({ 
    label: {
        fontSize: 18,
        fontWeight: '500',
        paddingBottom: 5,
        paddingTop: 20,
    },
    // input: {
    //     flex: 1,
    // },
    // inputContainer: {
    //     color: 'black',
    //     width: '100%',
    //     height: 45,
    //     borderWidth: 1,
    //     borderRadius: 10,
    //     borderColor: '#D9D9D9',
    //     flexDirection: "row",
    //     paddingHorizontal: 10, 
    // }, 
    // errorMessage: {
    //     color: 'red',
    //     fontSize: 12,
    //     marginTop: 7,
    // },
    // icon: {
    //     fontSize: 18,
    //     color: 'black',
    //     alignSelf: 'center',
    //     paddingLeft: 20,
    // },
});