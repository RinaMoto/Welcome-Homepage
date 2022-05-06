import {useState} from 'react';
import './App.css';
import Main from './Components/Main.js';
import Todo from './Components/TodoList.js';

function App() {
  const [setDark] = useState(() => {
      let today = new Date().getHours();
      if (today >= 7 && today <= 19) {
        return "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-300";
      }
      else {
        return "bg-gradient-to-r from-gray-700 via-sky-700 to-gray-700";
     }
  });


  return (
    <div className="App">
      <body className={`App-header ${setDark}`}>
        <Main /> 
        <Todo />
      </body>
    </div>
  );
}

export default App;
