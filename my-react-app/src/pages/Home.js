/*
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ImageGrid from "../components/ImageGrid";
import DrawingCanvas from "../components/DrawingCanvas";
import "../styles/App.css";
import { AuthContext } from "../App";

const Home = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="image-grid-container">
        <ImageGrid />
      </div>
      <div className="drawing-canvas-container">
        <DrawingCanvas />
      </div>
      <button className="view-button" onClick={() => navigate("/view-drawing")}>
        View text file as drawing
      </button>
      {token && (
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Home;

*/

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { AuthContext } from "../App"; // Import AuthContext
import ImageGrid from "../components/ImageGrid";
import DrawingCanvas from "../components/DrawingCanvas";
import "../styles/App.css";

function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate
  const { token, logout } = useContext(AuthContext); // Initialize useContext

  const handleSelectImage = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="container">
      <div className="image-grid-container">
        <ImageGrid onSelectImage={handleSelectImage} />
      </div>
      <div className="drawing-canvas-container">
        {selectedImage ? (
          <DrawingCanvas image={selectedImage} />
        ) : (
          <p>Select an image to start drawing.</p>
        )}
      </div>
      <button className="view-button" onClick={() => navigate("/view-drawing")}>
        View text file as drawing
      </button>
      {token && (
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
}

export default Home;