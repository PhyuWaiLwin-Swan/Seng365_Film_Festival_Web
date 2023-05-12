import create from 'zustand';
 interface FilmState {
     films: Film[];
     setFilms: (films: Array<Film>) => void;
     editFilm: (film: Film, newFilmInfo: Film) => void;
     removeFilm: (film: Film) => void;
     }

const getLocalStorage = (key: string): Array<Film> => JSON.parse(window.localStorage.getItem(key) as string);
const setLocalStorage = (key: string, value:Array<Film>) => window.localStorage.setItem(key, JSON.stringify(value));


const useStore = create<FilmState>((set)=>({
    films:getLocalStorage("films")||[],
    setFilms :(films:Array<Film>)=>set(()=>{
        setLocalStorage("films",films)
        return {films:films}
    }),
    editFilm : (film:Film,newFilmInfo:Film)=>set((state)=> {
        const temp = state.films.map(f => f.filmId === film.filmId ?
            ({...f, ...newFilmInfo} as Film) : f)
        setLocalStorage('films', temp)
        return {films: temp}
    }),
        removeFilm: (film: Film) => set((state) => {
            setLocalStorage('films', state.films.filter(f => f.filmId !==
                film.filmId))
            return {films: state.films.filter(f => f.filmId !==
                    film.filmId)}
        })
}))


export const useFilmStore = useStore;























