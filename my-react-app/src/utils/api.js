/**
 * fetchImages Utility Function
 *
 * This function generates an array of image URLs using the Picsum Photos API.
 * It creates a specified number of random images by appending a unique `random` query parameter.
 *
 * @param {number} count - The number of images to generate (default is 10).
 * @returns {Promise<string[]>} A promise that resolves to an array of image URLs.
 */
 /*
const fetchImages = async (count = 10) => {
  return Array.from(
    { length: count },
    (_, i) => `https://picsum.photos/300/200?random=${i}`
  );
};

export default fetchImages;
*/

const API_URL = "http://localhost:8000";

export const fetchImages = async () => {
  const response = await fetch(`${API_URL}/images`);
  return response.json();
};

export const register = async (username, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return response.json();
};

export const login = async (username, password) => {
  console.log("Sending login request with:", { username, password });  // Debugging
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response.json();
};


export const saveDrawing = async (drawing, token) => {
  const response = await fetch(`${API_URL}/drawings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(drawing),
  });
  return response.json();
};
