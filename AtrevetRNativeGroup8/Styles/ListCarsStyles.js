import { StyleSheet } from 'react-native';

const ListCarStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#FFE3B3',
    },
    headerTopBar: {
        backgroundColor: "#26798e",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        elevation: 2,
        marginBottom: 10,
        marginTop: 20,
    },
    headerTopBarTitle: {
        color: "#fff",
        fontSize: 25,
        textAlign: 'center',
    },
    addButton: {
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#ffc172',
        height: 35,
        borderColor: '#000',
        borderWidth: 1,
        width: 150,
    },
    addButtonText: {
        fontSize: 18,
        textAlign: 'center',
    },
    listContainer: {
        flex: 1,
    },
    header: {
        marginTop: 10,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#000"
    },
    headerText: {
        flex: 1,
        fontSize: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 6,
        marginHorizontal: 1,
        elevation:1,
        borderRadius:3,
        paddingVertical:10,
        backgroundColor: "#63caa7",
        paddingHorizontal: 6,
    },
    cell: {
        fontSize: 14,
        flex: 1,
    },
    editButton: {
        marginLeft: 5,
    },
    edit: {
        color: "#0EABFE"
    },
    deleteButton: {
        marginLeft: 5,
    },
    delete: {
        color: "#FF0000"
    },
});

export default ListCarStyles;
