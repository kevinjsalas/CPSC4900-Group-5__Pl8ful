import { StyleSheet } from 'react-native';

const profileStyles = StyleSheet.create({

container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#34404D",
},
headerContainer: {
    
},
header: {
    top: 0,
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    marginBottom: 50,
},
button:{
    width: 200,
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
},
buttonText: {
    fontSize: 18,
    color: "#34404D",
    fontWeight: "600",
},
createAccount: {
    color: "white",
    marginTop: 20,
    fontSize: 14,
    fontWeight: "400",
},

});

export default profileStyles;