import { StyleSheet } from "react-native";

const reviewStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
    },
    reviewContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        height: "75%",
        width: "95%",
        padding: 20,
        marginTop: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    reviewHeader: {
        fontSize: 24,
        fontWeight: "900",
        color: "#34404D",
        textAlign: "left",
    },
    text: {
        fontSize: 18,
        color: "#34404D",
        marginTop: 10,
        backgroundColor: "#fafafa",
        borderRadius: 10,
        height: 350,
        padding: 10,
        textAlignVertical: "top"
    },
    title: {
        fontSize: 18,
        color: "#34404D",
        marginTop: 10,
        backgroundColor: "#fafafa",
        borderRadius: 10,
        height: "10%",
        padding: 10,
        justifyContent: "flex-start",
    },
    submitButton: {
        backgroundColor: "#EC8677",
        color: "#FFFFFF",
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        width: 100,
        alignSelf: "center"
    }
});

export default reviewStyles;