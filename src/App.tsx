import React, { useEffect, useState } from "react";
import "./App.css";
import IndexedDB from "./IndexedDB";

const images = [
  {
    title: "test",
    src: "https://images.unsplash.com/photo-1682957376808-dcb27d61f95e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  },
    // {
    //     title: "test2",
    //     src: "https://unsplash.com/photos/1ftBKp8mOyQ",
    // },
];

function App() {
  const [toggle, setToggle] = useState(false);
  const [imgState, setImgState] = useState<{title: string; data: ArrayBuffer}[]>([]);

  const result = IndexedDB();

  const handleToggleButton = () => {
    setToggle((prev) => !prev);
  };

  useEffect(() => {


      images.map(imgObj => {
          // const title = imgObj.title;
          fetch(imgObj.src).then(res => res.blob()).then(blob => {
              const fileReader = new FileReader();
              fileReader.onload = () => {
                  const imageData = fileReader.result as ArrayBuffer;
                  console.log(imageData)
                  setImgState(prev => {
                      console.log(prev)

                  return [...prev, {title: imgObj.title, data: imageData}]
                  })
              };
              fileReader.readAsArrayBuffer(blob);
          })
      })
  }, []);

    console.log(imgState);

  return (
    <div className="App">
      <button onClick={handleToggleButton}>On</button>

      {toggle && (
        <div>
          {imgState.map((image) => {
              const blob = new Blob([image.data], {type: 'image/jpg'})
              const blobUrl = URL.createObjectURL(blob);

              return(
            <img key={image.title} src={blobUrl} alt={image.title} />
          )}
          )}
        </div>
      )}
    </div>
  );
}

export default App;


