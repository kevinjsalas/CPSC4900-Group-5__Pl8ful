import { StyleSheet } from 'react-native';

const profileStyles = StyleSheet.create({

container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#34404D",
    backgroundColor: "#FFFFFF",
},
container2: {
    flex: 1,
    backgroundColor: "#FFFFFF",
},
headerContainer: {
    flexDirection: 'row',
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
},
userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
},
header: {
    top: 0,
    fontSize: 48,
    fontWeight: "700",
    color: "#34404D",
    paddingLeft: 20,
},
button:{
    width: 200,
    height: 50,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
},
signOut: {
    width: 125,
    height: 50,
    padding: 10,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    bottom: 0
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
topBar: {
    marginTop: 0,
    height: 50,
},
divider: {
    height: 2,
    width: "90%",
    backgroundColor: "#34404D",
    marginVertical: 20,
    borderRadius: 10,
},

});

export default profileStyles;