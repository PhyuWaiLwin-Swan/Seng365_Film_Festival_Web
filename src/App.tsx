import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Film from "./components/Film";
import FilmList from "./components/FilmList";
import ResponsiveAppBar from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import User from "./components/User";
import CreateFilm from "./components/CreateFilm";
import AllFilms from "./components/AllFilms";

function App() {
  return (
      <div className="App">
        <Router>
          <div>
            <ResponsiveAppBar></ResponsiveAppBar>
            <Routes>
                <Route path="/films" element={<AllFilms/>}/>
                <Route path="/films/:id" element={<Film/>}/>
                <Route path="/users/login" element={<Login/>}/>
                <Route path="/users/register" element={<Register/>}/>
                <Route path="/Users/:id" element={<User/>}/>
                <Route path="/films/create" element={<CreateFilm/>}/>

            </Routes>

          </div>
        </Router>
      </div>

  );


}


export default App;
