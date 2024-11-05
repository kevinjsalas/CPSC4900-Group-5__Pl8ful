import React, { useState, useEffect } from 'react'; 
import { View, TouchableOpacity, Image, StyleSheet, FlatList, Modal, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const ImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch('http://localhost:3000/upload-image');
        const text = await response.text();
        try {
          const images = JSON.parse(text);
          setImageList(images);
        } catch (error) {
          console.error('Error parsing images response as JSON:', text);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    loadImages();
  }, []);

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
      await uploadImage(result.uri);
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
      <FlatList
        data={imageList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleImagePress(item)}>
            <Image source={{ uri: item }} style={styles.storedImage} resizeMode="cover" />
          </TouchableOpacity>
        )}
      />

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
    paddingTop: 0,
    paddingRight: 0,
  },
  imagePlaceholder: {
    width: 160,
    height: 160,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 20,
    position: 'relative',
    zIndex: 1,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 10,
  },
  storedImage: {
    width: 160,
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
    paddingHorizontal: 20, // Add padding for a better layout
  },
  modalImage: {
    width: '95%',
    height: '53%', // Adjusted to provide more space for the button
    borderRadius: 10,
    borderWidth: 2, // Adding a border
    borderColor: '#EC8677', // Border color
  },
  uploadButton: {
    backgroundColor: '#EC8677',
    borderRadius: 10,
    padding: 15, // Increased padding for a larger button
    marginTop: 70, // Reduced margin to bring it closer to the image
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center', // Center the text
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 30,
    backgroundColor: '#EC8677',
    borderRadius: 10,
    padding: 10,
  },
});

export default ImageUpload;
