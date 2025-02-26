import React, { useState, useEffect } from "react";
import { fetchImages } from "../utils/api";
import "../styles/ImageGrid.css";

function ImageGrid({ onSelectImage }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages()
      .then((response) => {
        // Ensure the response has the correct structure
        if (response.images && Array.isArray(response.images)) {
          const paddedImages = [...response.images];
          while (paddedImages.length < 10) {
            paddedImages.push("https://via.placeholder.com/300?text=No+Image");
          }
          setImages(paddedImages);
        } else {
          console.error("Invalid response format:", response);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch images:", error);
      });
  }, []);

  return (
    <div className="grid-container">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`${index + 1}`}
          onClick={() => onSelectImage(img)}
          className="grid-image"
        />
      ))}
    </div>
  );
}

export default ImageGrid;