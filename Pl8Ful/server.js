// server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();

// Set up CORS to allow your frontend to access the backend
app.use(cors());

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename with original extension
  },
});

const upload = multer({ storage });

// Create the uploads folder if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Route to handle image upload
app.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
