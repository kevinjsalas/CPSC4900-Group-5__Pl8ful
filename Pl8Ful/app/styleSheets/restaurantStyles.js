import { StyleSheet } from "react-native";

const restaurantStyles = StyleSheet.create({
    topBar: {
        marginTop: 0,
        height: 50,
        width: "110%",
        },
    screenContainer: {
        flex: 1,
        backgroundColor: "#EC8677",
        justifyContent: "center"
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        height: "87%",
        width: "90%",
        marginLeft: "5%",
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
    informationCard: {
        marginBottom: 50
    },
    header: {
        fontSize: 40,
        fontWeight: "900",
        color: "#34404D"
    },
    location: {
        fontSize: 18,
        color: "#34404D",
        marginTop: 10
    },
    hours: {
        fontSize: 18,
        color: "#34404D",
        marginTop: 10
    },
    rating: {
        fontSize: 18,
        color: "#34404D",
        marginTop: 10
    },
    starBreakdown: {
        flexDirection: "column",
        marginBottom: 20,
        marginTop: 200,
    },
    starBar: {
        marginRight: 5,
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
    },
    starHead: {
        fontSize: 18,
        fontWeight: "800",
        marginRight: 2,
        width: 15,
        
    },
    bar: {
        height: 10,
        width: 100,
        backgroundColor: "#EC8677",
        borderRadius: 10,
        top: 2,
    },
    barNum: {
        fontSize: 12,
        fontWeight: "700",
        marginLeft: 2,
        top: 2,
    },
    filterBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 20
    },
    filterHeader1: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#34404D"
    },
    filterHeader2: {
        fontSize: 12,
        fontWeight: "600",
        color: "#34404D"
    },
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    reviewsContainer: {
        marginBottom: 20,
        flex: 1
    },
    reviewCard: {
        backgroundColor: "#F0F0F0",
        borderRadius: 10,
        padding: 20,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    nameStar: {
        textAlign: "left",
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#34404D"
    },
    rating: {
        color: "#34404D"
    },
    divider: {
        height: "100%",
        backgroundColor: "#34404D",
        width: 1,
        borderRadius: 10,
        margin: 10
    },
    reviewTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#34404D",
        flexShrink: 1,
        width: 200,
        marginBottom: 5
    },
    reviewText: {
        fontSize: 12,
        fontStyle: "italic",
        color: "#34404D",
        width: 200,
    }
});

export default restaurantStyles;