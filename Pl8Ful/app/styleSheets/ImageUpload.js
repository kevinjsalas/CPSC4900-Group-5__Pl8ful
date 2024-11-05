// Define the ImageUpload functional component
const ImageUpload = () => {
  // Declare state variables using the useState hook
  const [selectedImages, setSelectedImages] = useState([]); // This state will hold images selected by the user
  const [imageList, setImageList] = useState([]); // This state will hold images fetched from the backend server
  const [modalVisible, setModalVisible] = useState(false); // This state controls whether the modal is visible or not
  const [selectedImage, setSelectedImage] = useState(null); // This state holds the currently selected image for viewing in the modal

  // useEffect hook to fetch images when the component mounts
  useEffect(() => {
    // Define an async function to load images
    const loadImages = async () => {
      try {
        // Fetch images from the backend server
        const response = await fetch('http://localhost:3000/upload-image'); // Send GET request to fetch images
        const text = await response.text(); // Get the response text
        try {
          // Parse the response text as JSON to get the images
          const images = JSON.parse(text); // Convert response text to JSON
          setImageList(images); // Update the imageList state with the fetched images
        } catch (error) {
          console.error('Error parsing images response as JSON:', text); // Log error if parsing fails
        }
      } catch (error) {
        console.error('Error fetching images:', error); // Log error if fetching fails
      }
    };
    loadImages(); // Call the function to load images
  }, []); // Empty dependency array means this runs only once after the component mounts

  // Function to open the image picker for selecting a single image
  const openImagePickerAsync = async () => {
    // Open the image picker and wait for the user's selection
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Allow all media types (images, videos)
      allowsEditing: true, // Enable editing for the selected image
      aspect: [4, 3], // Set the aspect ratio for the image
      quality: 1, // Set the quality of the image (1 is best quality)
    });

    // If the user cancels the image picker, do nothing and return
    if (result.cancelled) return;

    // Update the selectedImages state by adding the newly selected image URI
    setSelectedImages((prev) => [...prev, result.uri]); // Add the selected image URI to the state
    // Upload the selected image to the backend server
    await uploadImage(result.uri); // Call uploadImage function with the selected image URI
  };

  // Function to upload a single image to the backend server
  const uploadImage = async (uri) => {
    // Create a new FormData object for the image upload
    const formData = new FormData(); // Initialize FormData object
    // Append the image data to the FormData object
    formData.append('image', {
      uri, // URI of the image to upload
      type: 'image/jpeg', // Specify the MIME type of the image
      name: 'upload.jpg', // Default name for the uploaded file
    });

    try {
      // Send a POST request to the server to upload the image
      const response = await fetch('http://localhost:3000/upload-image', {
        method: 'POST', // Use POST method for the upload
        body: formData, // Attach the FormData object as the request body
        headers: {
          'Content-Type': 'multipart/form-data', // Specify the content type for the upload
        },
      });

      // Get the response text from the upload
      const text = await response.text(); // Read the response text
      try {
        // Parse the response text as JSON to get the uploaded image URL
        const imageUrl = JSON.parse(text); // Convert response text to JSON
        // Update the imageList state by adding the newly uploaded image URL
        setImageList((prevList) => [...prevList, imageUrl]); // Add the uploaded image URL to the state
      } catch (error) {
        console.error('Error parsing upload response as JSON:', text); // Log error if parsing fails
      }
    } catch (error) {
      console.error('Error uploading image:', error); // Log error if uploading the image fails
    }
  };

  // Function to handle the selection of multiple images
  const handleMultipleImageUpload = async () => {
    // Open the image picker for selecting multiple images
    const results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Allow all media types
      allowsMultipleSelection: true, // Enable multiple selection
      quality: 1, // Set image quality
    });

    // If the user cancels the image picker, do nothing and return
    if (results.canceled) return;

    // Loop through each selected asset and upload it
    for (const result of results.assets) { // Iterate over each selected image
      // Upload each image
      await uploadImage(result.uri); // Call uploadImage function with the image URI
      // Update the selectedImages state by adding the newly selected image URI
      setSelectedImages((prev) => [...prev, result.uri]); // Add the selected image URI to the state
    }
  };

  // Function to handle when an image is pressed to view in the modal
  const handleImagePress = (uri) => {
    // Set the selected image URI to the state
    setSelectedImage(uri); // Update selectedImage state with the URI of the pressed image
    // Show the modal
    setModalVisible(true); // Change modalVisible state to true to display the modal
  };

  // Function to handle uploading more images from the modal
  const handleUploadMoreImages = () => {
    // Close the modal before opening the image picker for more uploads
    setModalVisible(false); // Change modalVisible state to false to hide the modal
    // Open the image picker for selecting multiple images
    handleMultipleImageUpload(); // Call handleMultipleImageUpload function
  };

  // Return the JSX for rendering the component
  return (
    <View style={styles.container}> {/* Container for the entire component */}
      {/* Button to select images, displays selected images if any */}
      <TouchableOpacity onPress={handleMultipleImageUpload} style={styles.imagePlaceholder}>
        <View style={styles.iconContainer}>
          {selectedImages.length > 0 ? ( // Check if any images are selected
            <FlatList
              data={selectedImages} // Pass the selected images to FlatList for rendering
              horizontal // Display images horizontally
              keyExtractor={(item, index) => index.toString()} // Unique key for each item
              renderItem={({ item }) => ( // Render each selected image
                <TouchableOpacity onPress={() => handleImagePress(item)}> // Open modal on press
                  <Image source={{ uri: item }} style={styles.image} resizeMode="cover" /> // Display the selected image
                </TouchableOpacity>
              )}
            />
          ) : (
            <Icon name="camera" size={50} color="#EC8677" /> // Show a camera icon if no images are selected
          )}
        </View>
      </TouchableOpacity>

      {/* Display list of images fetched from the backend */}
      <FlatList
        data={imageList} // Pass the image list from the backend to FlatList for rendering
        keyExtractor={(item, index) => index.toString()} // Unique key for each item
        renderItem={({ item }) => ( // Render each image from the list
          <TouchableOpacity onPress={() => handleImagePress(item)}> // Open modal on press
            <Image source={{ uri: item }} style={styles.storedImage} resizeMode="cover" /> // Display the image
          </TouchableOpacity>
        )}
      />

      {/* Modal to display selected image */}
      {selectedImage && ( // Render the modal only if an image is selected
        <Modal
          animationType="slide" // Slide animation for the modal
          transparent={true} // Set the modal background to transparent
          visible={modalVisible} // Control visibility based on modalVisible state
          onRequestClose={() => setModalVisible(false)} // Close modal on request (e.g., back button)
        >
          <View style={styles.modalView}> {/* Container for the modal content */}
            <Image source={{ uri: selectedImage }} style={styles.modalImage} resizeMode="contain" /> // Display the selected image in the modal
            <Pressable style={styles.uploadButton} onPress={handleUploadMoreImages}> {/* Button to upload more images */}
              <Text style={styles.buttonText}>Upload More Images</Text> {/* Button text */}
            </Pressable>
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}> {/* Close button for the modal */}
              <Icon name="times" size={30} color="#ffffff" /> {/* Close icon */}
            </Pressable>
          </View>
        </Modal>
      )}
    </View>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Make the container fill the available space
    alignItems: 'flex-end', // Align items to the right
    justifyContent: 'flex-start', // Align items to the top
    paddingTop: 0, // No padding at the top
    paddingRight: 0, // No padding on the right
  },
  imagePlaceholder: {
    height: 100, // Set height for the image placeholder
    width: '100%', // Set width to 100% of the container
    borderWidth: 1, // Set border width for the placeholder
    borderColor: '#ccc', // Set border color
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    marginBottom: 10, // Set margin below the placeholder
  },
  iconContainer: {
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center', // Center items vertically
    justifyContent: 'center', // Center items horizontally
  },
  image: {
    width: 70, // Set width for selected images
    height: 70, // Set height for selected images
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
