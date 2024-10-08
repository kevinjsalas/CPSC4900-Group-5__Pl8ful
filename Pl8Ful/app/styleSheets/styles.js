import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      justifyContent: 'space-between',
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
      fontSize: 24,
      fontWeight: '900',
    },

    /* SearchBar */
    searchContainer: {
      top: 10,
      paddingBottom: 10,
      justifyContent: 'flex-start',
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
    linkHeader: {
      fontSize: 20,
      fontWeight: '700',
      color: '#34404D',
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
    },
    linkText: {
      fontSize: 16,
      color: '#333',
    },
    linkLocation: {
      flexDirection: 'row',
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
      fontWeight: 'bold',
      color: 'black',
      
    },
  });

export default styles;