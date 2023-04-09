/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

function ImageGallery({ firebaseApp }) {
  const [imageUrls, setImageUrls] = useState([]);
  const storage = getStorage(firebaseApp);

  useEffect(() => {
    const storageRef = ref(storage);

    listAll(storageRef)
      .then((result) => {
        console.log(result);
        result.items.forEach((imageRef) => {
          getDownloadURL(imageRef).then((url) => {
            if (!imageUrls.includes(url)) {
              setImageUrls((prevUrls) => [...prevUrls, url]);
            }
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="gallery">
      {imageUrls.map((url, index) => (
        <img key={url} src={url} alt={`${index}`} />
      ))}
    </div>
  );
}

export default ImageGallery;
