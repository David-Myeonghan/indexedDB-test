import React from 'react';
import './App.css';
import IndexedDB from './IndexedDB';

const imgs = [
  {title: 'test', src:'https://images.unsplash.com/photo-1682957376808-dcb27d61f95e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'}
]

function App() {
  const result = IndexedDB();
  
  console.log(result)
  return (
    <div className="App">
      <img src={imgs[0].src} alt={imgs[0].title}/>
    </div>
  );
}

export default App;
