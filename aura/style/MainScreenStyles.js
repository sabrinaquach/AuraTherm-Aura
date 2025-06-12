import { StyleSheet } from 'react-native';

const MainScreensStyle = StyleSheet.create ({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 20, 
        backgroundColor: '#fff',
    },
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
    profileContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start'

    },
    usernameText: {
        // marginTop: 10,
    },
});

export default MainScreensStyle;