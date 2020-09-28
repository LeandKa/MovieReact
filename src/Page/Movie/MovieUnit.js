import React, { useState, useEffect } from 'react'
import './MovieUnit.css';
import { useParams } from 'react-router-dom';
import Card from '../../Components/Card/Card';
import Axios from 'axios';
import { Navbar } from 'react-bootstrap';
import NavBar from '../../Components/Navbar/NavBar';

const MovieUnit = () => {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [movie, setMovie] = useState({});
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [overview, setOverview] = useState('');
    const [vote, setVote] = useState('');
    const [recomendation, setRecomendation] = useState(false);


    const { movieId } = useParams();

    useEffect(() => {
        Axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API}&language=en-US`)
            .then(result => {
                setName(result.data.title)
                setMovie(result.data);
                setImage(result.data.poster_path)
                setGenres(result.data.genres)
                setOverview(result.data.overview)
                setVote(result.data.vote_average)
            })
        Axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.REACT_APP_API}&language=en-US&page=1`)
            .then(result => {
                setMovies(result.data.results)
                console.log(result.data.results)
                console.log(result.data.results.length)
                if(!result.data.results.length === 0){
                    setRecomendation(false);
                }else{
                    setRecomendation(true)
                }
            }, setTimeout(3000))
    }, [])

    const formatPrice = (value) => {
        const novoValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD' }).format(value)
        return (
            <label>{novoValue}</label>
        )
    }

    return (
        <div className="main-movie"style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${image})`,
            backgroundPosition: 'bottom',
            backgroundAttachment:'fixed',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat'
        }} >
            <NavBar></NavBar>
            <main className="container-movie-unit">
                <div className="container-div-image" >
                    <div className="movie-unit">
                        <img className="movie-image" src={`https://image.tmdb.org/t/p/w300${image}`} />
                    </div>
                    <div className="movie-header-div">
                        <h1 className="movie-title">{name}</h1>
                        <p className="movie-overview">{overview}</p>
                        <span className="movie-ratings">Rating:<span>{vote}</span></span>
                        <div className="movie-genres">
                            {
                                genres.map(genre => (
                                    <span className="genre-name">{genre.name}</span>
                                ))
                            }
                        </div>
                        <div className="movie-geral">
                            <span>
                                Revenue:{formatPrice(movie.revenue)}
                            </span>
                            <span>
                                Budget:{formatPrice(movie.budget)}
                            </span>
                            <span>
                                Release Data:{movie.release_date}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="movie-recomendation">
                    <h1 className="recomendation-title">Recomendation</h1>
                    {
                        recomendation ? <ul className="container-ul">
                            {movies.map(movies => (
                                <li className="container-li"><Card image={movies.poster_path} id={movies.id} data={movies.release_date} title={movies.original_title} genre={movies.genre_ids} voteAverange={movies.vote_average}></Card></li>
                            ))}
                        </ul>
                            : <h1 style={{
                                textAlign:'center',
                                margin:"23px"
                            }}>No Movies Here Sorry</h1>
                    }
                </div>
                
            
            </main>
            <footer>
                <div className="footer">
                <span>2020, made by <a>Leandro Cavalcanti</a></span>
                </div>
            </footer>
        </div>
    )
}

export default MovieUnit
