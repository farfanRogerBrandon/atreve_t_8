import { StyleSheet } from 'react-native';

const Create_CarStyles = StyleSheet.create({
    title_container: {
        alignItems: 'center',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#FFE3B3',
    },
    heading: {
        fontSize: 30,
        marginBottom: 20,
        marginTop: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#FFC172',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textArea: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    label: {
        marginBottom: 5,
    },
    scrollViewContent: {
        width: '100%',
        height: '100%',
    },
});

export default Create_CarStyles;
