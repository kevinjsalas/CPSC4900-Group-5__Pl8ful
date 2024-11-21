import { StyleSheet } from 'react-native';

const favoritesStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      borderRadius: 20,
    },
    /* TopBar */
    topBar: {
      marginTop: 0,
      height: 50,
    },
    pageTitle: {
      marginTop: 10,
      left: 7,
      color: '#34404D',
      fontSize: 36,
      fontWeight: '900',
    },

    /* SearchBar */
    searchContainer: {
      top: 10,
      paddingBottom: 10,
      alignItems: 'center',
      borderRadius: 20,
    },
    searchBar: {
      height: 40,
      backgroundColor: '#fafafa',
      borderRadius: 10,
      paddingHorizontal: 15,
      fontSize: 16,
      width: '90%',
      textAlign: 'center',
    },


    /* RestaurantCard.jsx */
    linksContainer: {
      paddingHorizontal: 10,
      marginTop: 0,
      height: 765,
      paddingBottom: 150,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 0,
      color: '#333',
    },
    linkHeader: {
      fontSize: 20,
      fontWeight: '800',
      color: '#34404D',
      marginBottom: 10,
    },
    linkButton: {
      marginTop: 10,
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 10,
      shadowColor: '#34404D',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
      width: '95%',
      marginLeft: "2.5%",
    },
    linkText: {
      fontSize: 16,
      color: '#333',
    },
    linkHours: {
      fontSize: 16,
      color: '#333',
      marginBottom: 3,
      marginLeft: 3,
    },
    linkLocation: {
      flexDirection: 'row',
      marginBottom: 3,
      marginLeft: 0,
    },
    rating: {
      flexDirection: 'row',
      marginTop: 5,
      marginLeft: 3,
    },


    /* Navigation Bar */
    bottomBar: {
      marginBottom: 10,
      position: 'static',
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 15,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#ddd',
    },
    bottomButton: {
      alignItems: 'center',
    },
    bottomText: {
      marginTop: 5,
      fontSize: 12,
      fontWeight: 'bold',
      color: 'black',
      
    },
  });

export default favoritesStyles;