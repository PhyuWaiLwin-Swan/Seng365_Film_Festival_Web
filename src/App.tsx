import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Films from "./components/Film";
import FilmList from "./components/FilmList";

function App() {
  return (
      <div className="App">
        <Router>
          <div>

            <Routes>
                <Route path="/films-props" element={<FilmList/>}/>
                <Route path="/films" element={<Films/>}/>
                 {/*<Route path="/search" element={<Search/>}/>*/}

            </Routes>

          </div>
        </Router>
      </div>

  );


}


export default App;
