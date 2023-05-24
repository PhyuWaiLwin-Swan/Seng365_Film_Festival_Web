// import React from 'react';
// import './App.css';
// import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import Film from "./components/Film";
// import FilmList from "./components/FilmList";
// import ResponsiveAppBar from "./components/Header";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import User from "./components/User";
// import CreateFilm from "./components/CreateFilm";
// import AllFilms from "./components/AllFilms";
// import films from "./components/Films";
//
// function App() {
//   return (
//       <div className="App">
//         <Router>
//           <div>
//             <ResponsiveAppBar></ResponsiveAppBar>
//             <Routes>
//                 <Route path="/films" element={<AllFilms/>}/>
//                 <Route path="/films/:id" element={<Film/>}/>
//                 <Route path="/users/login" element={<Login/>}/>
//                 {/*<Route path="/users/register" element={<Register/>}/>*/}
//                 <Route path="/Users/:id" element={<User/>}/>
//                 <Route
//                     path="/films/create"
//                     element={ <CreateFilm isCreate={true} title="Create Film" filmId={0} />}
//                 />
//                 <Route
//                     path={`/edit`}
//                     element={<CreateFilm isCreate={false} title="Edit Film" filmId={parseInt(localStorage.getItem("editFilmId") || "0")} />}
//                 />
//                 <Route path="/films/MyFilms" element={<FilmList />} />
//                 <Route
//                     path="/users/:id/edit"
//                     element={ <Register isRegister={false} header="Edit" />}
//                 />
//                 <Route
//                     path="/users/register"
//                     element={ <Register isRegister={true} header="Register" />}
//                 />
//
//
//
//             </Routes>
//
//           </div>
//         </Router>
//       </div>
//
//   );
//
//
// }
//
//
// export default App;




import React, {useContext} from 'react';
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
import films from "./components/Films";
import {AlertContext, AlertProvider} from "./components/alertContext";

export interface AlertContextValue {
    alert: { message: string; severity: string };
    showAlert: (message: string, severity: string) => void;
}

const App: React.FC = () => {
    const { alert } = useContext<AlertContextValue>(AlertContext);
    return (

        <AlertProvider>
            <div className="App">
                <Router>
                    <div>
                        <ResponsiveAppBar />
                        <Routes>
                            <Route path="/films" element={<AllFilms />} />
                            <Route path="/films/:id" element={<Film />} />
                            <Route path="/users/login" element={<Login />} />
                            <Route path="/Users/:id" element={<User />} />
                            <Route
                                path="/films/create"
                                element={<CreateFilm isCreate={true} title="Create Film" filmId={0} />}
                            />
                            <Route
                                path={`/edit`}
                                element={
                                    <CreateFilm
                                        isCreate={false}
                                        title="Edit Film"
                                        filmId={parseInt(localStorage.getItem('editFilmId') || '0')}
                                    />
                                }
                            />
                            <Route path="/films/MyFilms" element={<FilmList />} />
                            <Route
                                path="/users/:id/edit"
                                element={<Register isRegister={false} header="Edit" />}
                            />
                            <Route
                                path="/users/register"
                                element={<Register isRegister={true} header="Register" />}
                            />
                        </Routes>
                    </div>
                </Router>
            </div>
        </AlertProvider>
    );
};


export default App;

