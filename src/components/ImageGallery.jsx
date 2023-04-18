/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import CharacterImage from "./CharaterImage";

function ImageGallery({ firebaseApp }) {
  const [imageUrls, setImageUrls] = useState([]);
  const storage = getStorage(firebaseApp);
  const charList = [
    "Jerry_Mouse.png",
    "sonic-png-11.png",
    "Gay_rabbit_max.webp",
  ];

  useEffect(() => {
    const fetchImageUrls = async () => {
      // Clear imageUrls array
      setImageUrls([]);

      // Fetch image URLs and update state
      const promises = charList.map((char) =>
        getDownloadURL(ref(storage, char))
      );
      const urls = await Promise.all(promises);
      setImageUrls(urls);
    };

    fetchImageUrls();
  }, []);

  return (
    <div className="gallery">
      {imageUrls.map((charUrl) => (
        <CharacterImage url={charUrl} key={charUrl} />
      ))}
    </div>
  );
}

export default ImageGallery;
