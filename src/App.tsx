import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Films from "./components/Films";
import FilmList from "./components/FilmList";

function App() {
  return (
      <div className="App">
        <Router>
          <div>

            <Routes>
                <Route path="/films-props" element={<FilmList/>}/>
                <Route path="/films" element={<Films/>}/>
                {/*<Route path="/films/:filmId" element={<Film/>} />*/}
                 {/*<Route path="/search" element={<Search/>}/>*/}

            </Routes>

          </div>
        </Router>
      </div>

  );


}


export default App;
