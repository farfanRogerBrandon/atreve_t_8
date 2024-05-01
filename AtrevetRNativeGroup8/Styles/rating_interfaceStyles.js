import { StyleSheet } from 'react-native';

const Rating_InterfaceStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#FFE3B3',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 30,
        marginBottom: 20,
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },
    starImgStyle: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        padding: 15,
        backgroundColor: '#FFC172',
    },
});

export default Rating_InterfaceStyles;
