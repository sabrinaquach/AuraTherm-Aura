import { StyleSheet } from 'react-native';

const MainScreensStyle = StyleSheet.create ({
    container: {
        flex: 1,
        paddingTop: 80,
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
        // paddingBottom: 15,
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
        paddingTop: 45,
    },
    secondSliderContainer: {
        paddingTop: 30,
    },
    profileContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    usernameText: {
        marginTop: 10,
        fontSize: 16,
    },
    additionsContainer: {
        paddingTop: 50,
        backgroundColor: '#fff',
    },
    logOutContainer: {
        marginBottom: 50,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    itemText: {
        fontSize: 16,
    },
    separator: {
        height: 1,
        backgroundColor: '#D9D9D9',
        width: '100%',
    },
    itemIcon: {
        marginLeft: 'auto',
        color: 'gray',
    },
    accountSection: {
        paddingTop: 10,
    },
    editContainer: {
        alignItems: 'flex-end',
    },
    editButton: {
        fontWeight: '500',
        fontSize: 18,
    },
    accountInfo: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 45,
        lineHeight: 45,
    },
    accountInfoLabel: {
        fontSize: 18,
        fontWeight: '500',
        paddingBottom: 5,
        paddingTop: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingBottom: 15,
        
    },
    backButton: {
        paddingBottom: 15,
        position: 'absolute',
        left: 0,
    },
    editAccountTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    ScrollView: {
        backgroundColor: '#fff',
    },
    SafeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20, 
        paddingTop: 40,
    },
    occupancyContainer: {
        flexDirection: 'row',
        position: 'relative',
        paddingBottom: 15,
    },
    sensitivityNumber: {
        fontSize: 20,
        fontWeight: '500',
        position: 'absolute',
        right: 0,
    },
    occupancyTitle: {
        fontSize: 20,
        fontWeight: '500',
    },
});

export default MainScreensStyle;