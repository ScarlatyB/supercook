import React, { useState } from "react";

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState("");

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // Generate image preview
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Handle file upload to backend
    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile); // Change "image" if needed

        try {
            const response = await fetch("http://localhost:3000/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            setMessage(data.message || "Upload successful!");
        } catch (error) {
            setMessage("Error uploading file.");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Upload an Image</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && <img src={preview} alt="Preview" width="200px" />}
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ImageUpload;
