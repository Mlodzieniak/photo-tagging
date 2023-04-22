/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import CharacterImage from "./CharaterImage";

function ImageGallery({ firebaseApp, direction, foundChar }) {
  const [imageUrls, setImageUrls] = useState([]);
  const storage = getStorage(firebaseApp);
  const charList = [
    "Jerry_Mouse.png",
    "sonic-png-11.png",
    "Gay_rabbit_max.webp",
  ];

  useEffect(() => {
    const fetchImageUrls = async () => {
      // Clear imageUrls object
      setImageUrls([]);
      // Fetch image URLs and update state
      const promises = charList.map(async (char) => {
        const url = await getDownloadURL(ref(storage, char));
        return { url, name: char };
      });
      const urls = await Promise.all(promises);
      setImageUrls(urls);
    };
    fetchImageUrls();
  }, []);

  return (
    <div className="gallery" style={{ flexDirection: direction }}>
      {imageUrls.map((charUrl) => (
        <CharacterImage
          url={charUrl.url}
          key={charUrl.url}
          isFound={foundChar ? foundChar.includes(charUrl.name) : false}
        />
      ))}
    </div>
  );
}

export default ImageGallery;
