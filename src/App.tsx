import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Search from "./components/Search";

function App() {
  return (
      <div className="App">
        <Router>
          <div>

            <Routes>
              <Route path="/search" element={<Search/>}/>

            </Routes>

          </div>
        </Router>
      </div>

  );


}


export default App;
