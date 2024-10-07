import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'space-between',
    },

    /* TopBar */
    topBar: {
      marginTop: 0,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    topBarText: {
      color: 'black',
      fontSize: 30,
      fontWeight: 'bold',
    },

    /* SearchBar */
    searchContainer: {
      padding: 10,
      borderRadius: 10,
      justifyContent: 'flex-start'
    },
    searchBar: {
      height: 40,
      backgroundColor: '#e0e0e0',
      borderRadius: 10,
      paddingHorizontal: 15,
      fontSize: 16,
    },


    /* RestaurantCard.jsx */
    linksContainer: {
      flex: 1,
      paddingHorizontal: 10,
      marginTop: 0,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
    },
    linkButton: {
      marginTop: 10,
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
    },
    linkText: {
      fontSize: 18,
      color: '#333',
    },
    rating: {
      flexDirection: 'row',
      marginTop: 5,
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
      color: '#333',
    },
  });

export default styles;