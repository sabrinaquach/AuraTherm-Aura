import { StyleSheet } from 'react-native';

const onboardingStyle = StyleSheet.create ({
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        paddingBottom: 15,
    },
    image: {
        width: 800,
        height: 230,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '500',
        paddingBottom: 15,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',      
        color: '#444',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    dotIndicator: {          
        top: 610,
        position: 'absolute',
        bottom: 0,
        left: 20,
        right: 0,
    },
    input: {
        color: 'black',
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D9D9D9',
        padding: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '500',
        paddingBottom: 5,
        paddingTop: 20,
    },
    radioGroup: {
        flexDirection: 'row', 
        alignItems: 'left', 
        marginTop: 20, 
    },
    radioButton: {
        flexDirection: 'row', 
        alignItems: 'center',         
    },
    learnContainer: {
        flexDirection: 'column',
    },
    radioLabel: {
        marginLeft: 8, 
        fontSize: 16,
        color: '#333',
    },
    linkText: {
        marginLeft: 8, 
        fontSize: 16,
        color: '#757575',
    },
    loginDescription: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        bottom: 40,
    },
    termsError: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        paddingLeft: 46,
    },
    registerDescription: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        bottom: 40,
    },
    termsError: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        paddingLeft: 46,
    },
    preferencesContainer: {
        paddingBottom: 15,
    },
    labelsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: -2,
        paddingHorizontal: 5,
      },
    labelText: {
        fontSize: 16,
        fontWeight: 500,
        paddingTop: 15,
    },
    sliderContainer: {
        paddingTop: 40,
    },
});

export default onboardingStyle;