import { StyleSheet } from 'react-native';


const loginStyles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#ec8677",
    },
    background: {
        flex: 1,
    },
    loginHeader: {
        fontSize: 60,
        fontWeight: "700",
        color: "white",
        marginBottom: 20,
        backgroundColor: "#ec8677",
        
    },
    loginText: {
        fontSize: 20,
        color: "grey"
    },
    loginInput: {
        width: "80%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 10,
        backgroundColor: "white",
        borderRadius: 10,
        border: "1px solid #ccc",
    },
    loginButton: {
        width: 125,
        height: 50,
        padding: 10,
        backgroundColor: "white",
        alignItems: "center",
        borderRadius: 10,
    },
    createButton: {
        width: 250,
        height: 50,
        padding: 10,
        backgroundColor: "white",
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText: {
        justifyContent: "center",
        fontSize: 20,
        color: "#34404D",
        fontWeight: "700", 
    },
});

export default loginStyles;