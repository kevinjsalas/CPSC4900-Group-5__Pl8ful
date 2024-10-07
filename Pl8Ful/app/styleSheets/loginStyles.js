import { StyleSheet } from 'react-native';


const loginStyles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ec8677"
    },
    loginHeader: {
        fontSize: 60,
        // fontFamily: "ReemKufiFun-VariableFont_wght",
        fontWeight: "700",
        color: "#f0f0f0",
        marginBottom: 20,
    },
    loginText: {
        fontSize: 20,
        color: "grey"
    },
    loginInput: {
        width: "90%",
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
    buttonText: {
        justifyContent: "center",
        fontSize: 20,
        color: "#34404D",
        fontWeight: "700", 
    },
});

export default loginStyles;