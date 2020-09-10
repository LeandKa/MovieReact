import React, { useState, useEffect } from 'react'
import './MovieUnit.css';
import { useParams } from 'react-router-dom';
import Card from '../Card/Card';
import Axios from 'axios';
import Loading from '../Loading/Loading';

const MovieUnit = () => {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [loading,setLoading] = useState(false)
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [overview, setOverview] = useState('');
    const [vote, setVote] = useState('');
    const [recomendation, setRecomendation] = useState(false);


    const { movieId } = useParams();

    useEffect(() => {

        Axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=80a40e211404d8a3420f6cd3e67455af&language=en-US`)
            .then(result => {
                setName(result.data.title)
                setLoading(true);
                setImage(result.data.poster_path)
                setGenres(result.data.genres)
                setOverview(result.data.overview)
                setVote(result.data.vote_average)
            })
        Axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=80a40e211404d8a3420f6cd3e67455af&language=en-US&page=1`)
            .then(result => {
                setMovies(result.data.results)
                setRecomendation(true);
            },setTimeout(3000))
    }, [])



    if(loading){
      return(<Loading></Loading>)
    }else{
    return (
        <div className="main-movie">
            <main className="container-movie-unit">
                <div className="movie-unit">
                    <img className="movie-image" src={`https://image.tmdb.org/t/p/w300${image}`} />
                </div>
                <div className="movie-header-div">
                    <div className="movie-header">
                        <h1 className="movie-title">{name}</h1>
                        <div className="movie-ratings">
                        <h1 className="rating">{vote}</h1>
                        </div>
                    </div>
                    <p className="movie-overview">{overview}</p>
                    <div className="movie-genres">
                        <h1 className="genre-title">Genres:</h1>
                        {
                            genres.map(genre => (
                                <h1 className="genre-name">{genre.name}</h1>
                            ))
                        }
                    </div>
                </div>
            </main>
            <div className="movie-recomendation">
                <h1 className="recomendation-title">Recomendation</h1>
                <div className="recomendation-movie">
                {
                    recomendation ? <ul className="container-ul">
                        {movies.map(movies => (
                            <li className="container-li"><Card image={movies.poster_path} id={movies.id} data={movies.release_date} title={movies.original_title} genre={movies.genre_ids} voteAverange={movies.vote_average}></Card></li>
                        ))}
                    </ul>
                    :<Loading className="loading"></Loading>
                }
                </div>
            </div>
        </div>
    )
     }
}

export default MovieUnit
