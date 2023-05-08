import React, {useEffect, useState} from "react";
import "./App.css";
import Dexie, {Table} from "dexie";

import IndexedDB from "./IndexedDB";

// interface ImageData {
//     title: string;
//     data: string;
// }

// class ImageDatabase extends Dexie {
//     public imageData!: Table<ImageData, string | ArrayBuffer>;
//
//     public constructor() {
//         super("ImageDatabase");
//         this.version(1).stores({
//             imageData: "++id,title,data"
//         })
//     }
// }

// Define your IndexedDB database
const db = new Dexie('MyDatabase');
db.version(1).stores({
    files: '++id, fileData'
});


async function addFile(file: File) {
    // Store the file data as a Blob in the database
    await db.files.put({fileData: file});

    // Alternatively, if you already have a Blob object, you can store it directly:
    // await db.files.put({ fileData: myBlob });
}

// Define a function to retrieve a file from the database
async function getFile(id: number) {
    // Retrieve the file data as a Blob from the database
    const fileData = await db.files.get(id)?.fileData;

    // Return the Blob object
    return fileData;
}


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
    const [imgState, setImgState] = useState<{ title: string; data: ArrayBuffer }[]>([]);

    // const result = IndexedDB();
    const db = new ImageDatabase();

    const handleToggleButton = () => {
        setToggle((prev) => !prev);
    };

    useEffect(() => {


        images.map(imgObj => {
            const title = imgObj.title;
            fetch(imgObj.src).then(res => res.blob()).then(blob => {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    const imageData = fileReader.result as ArrayBuffer;
                    console.log(imageData);

                    // Dexie
                    // db.transaction('rw', db.imageData, async () => {
                    //     if ((await db.imageData.where({title: title}).count()) === 0) {
                    //         const id = await db.imageData.add({title: title, data: JSON.stringify(imageData)});
                    //         console.log(`Added ${id}`)
                    //     }
                    // })
                    // setImgState(prev => [...prev, {title: imgObj.title, data: imageData}])
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

                            return (
                                <img key={image.title} src={blobUrl} alt={image.title}/>
                            )
                        }
                    )}
                </div>
            )}
        </div>
    );
}

export default App;


