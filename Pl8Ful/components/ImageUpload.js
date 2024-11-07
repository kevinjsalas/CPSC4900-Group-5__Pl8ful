import React, { useState, useEffect } from 'react'; 
import { View, TouchableOpacity, Image, StyleSheet, FlatList, Modal, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const ImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     const loadImages = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/upload-image');
//         const text = await response.text();
//         try {
//           const images = JSON.parse(text);
//           setImageList(images);
//         } catch (error) {
//           console.error('Error parsing images response as JSON:', text);
//         }
//       } catch (error) {
//         console.error('Error fetching images:', error);
//       }
//     };
//     loadImages();
//   }, []);

  const openImagePickerAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) return;

    setSelectedImages((prev) => [...prev, result.uri]);
    await uploadImage(result.uri);
  };

  const uploadImage = async (uri) => {
    console.log('Uploading image URI:', uri);
    const formData = new FormData();
    formData.append('image', {
      uri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    });

    try {
      const response = await fetch('http://localhost:3000/upload-image', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const text = await response.text();
      try {
        const imageUrl = JSON.parse(text);
        setImageList((prevList) => [...prevList, imageUrl]);
      } catch (error) {
        console.error('Error parsing upload response as JSON:', text);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleMultipleImageUpload = async () => {
    const results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (results.canceled) return;

    for (const result of results.assets) {
    //   await uploadImage(result.uri);
      setSelectedImages((prev) => [...prev, result.uri]);
    }
  };

  // Function to open the modal
  const handleImagePress = (uri) => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  // Function to handle uploading more images from the modal
  const handleUploadMoreImages = () => {
    setModalVisible(false); // Close the modal before opening the picker
    handleMultipleImageUpload(); // Open image picker for multiple uploads
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMultipleImageUpload} style={styles.imagePlaceholder}>
        <View style={styles.iconContainer}>
          {selectedImages.length > 0 ? (
            <FlatList
              data={selectedImages}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleImagePress(item)}>
                  <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
                </TouchableOpacity>
              )}
            />
          ) : (
            <Icon name="camera" size={50} color="#EC8677" />
          )}
        </View>
      </TouchableOpacity>

      {/* Display list of images from the backend */}
      {/* <FlatList
        data={imageList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleImagePress(item)}>
            <Image source={{ uri: item }} style={styles.storedImage} resizeMode="cover" />
          </TouchableOpacity>
        )}
      /> */}

      {/* Modal to display selected image */}
      {selectedImage && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Image source={{ uri: selectedImage }} style={styles.modalImage} resizeMode="contain" />
            <Pressable style={styles.uploadButton} onPress={handleUploadMoreImages}>
              <Text style={styles.buttonText}>Upload More Images</Text>
            </Pressable>
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Icon name="times" size={30} color="#ffffff" />
            </Pressable>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      paddingTop: 10,
      paddingRight: 0,
    },
    imagePlaceholder: {
      height: 200,
      width: '100%',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      backgroundColor: '#fafafa',
    },
    iconContainer: {
      flexDirection: 'row', // Arrange items in a row
      alignItems: 'center', // Center items vertically
      justifyContent: 'center', // Center items horizontally
    },
    image: {
      width: 100, // Set width for selected images
      height: 175, // Set height for selected images
      borderRadius: 10, // Add border radius for rounded corners
      margin: 5, // Set margin around images
    },
    storedImage: {
      width: 100, // Set width for stored images
      height: 100, // Set height for stored images
      borderRadius: 10, // Add border radius for rounded corners
      margin: 5, // Set margin around images
    },
    modalView: {
      flex: 1, // Make the modal fill the available space
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Set a semi-transparent black background
      alignItems: 'center', // Center content horizontally
      justifyContent: 'center', // Center content vertically
    },
    modalImage: {
      width: '80%', // Set width for the modal image
      height: '80%', // Set height for the modal image
      marginBottom: 20, // Set margin below the image
    },
    uploadButton: {
      backgroundColor: '#EC8677', // Set background color for the button
      padding: 10, // Add padding inside the button
      borderRadius: 5, // Add border radius for rounded corners
      marginBottom: 10, // Set margin below the button
    },
    buttonText: {
      color: '#ffffff', // Set text color for the button
      fontSize: 16, // Set font size for the button text
    },
    closeButton: {
      position: 'absolute', // Position the button absolutely
      top: 20, // Position from the top
      right: 20, // Position from the right
    },
});

export default ImageUpload;