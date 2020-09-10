import React, { useEffect, useState } from 'react'
import './Movie.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../Card/Card';
import Axios from 'axios';

const Movie = () => {

    const [movie, setMovie] = useState([]);
    const [type, setType] = useState('');
    const [titlePage, setTitlePage] = useState('Popular');
    const [start, setStart] = useState(1);


    useEffect(() => {
        Axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=80a40e211404d8a3420f6cd3e67455af&language=en-US&page=${start}`)
            .then(result => {
                setMovie(result.data.results);
                setType('popular');
                setTitlePage('Popular Movies')
                setStart(1)
            })

    }, [])


    useEffect(() => {
        Axios.get(`https://api.themoviedb.org/3/movie/${type}?api_key=80a40e211404d8a3420f6cd3e67455af&language=en-US&page=${start}`)
            .then(result => {
                const Movie = movie.concat(result.data.results)
                setMovie(Movie);
            })
    }, [start])

    const onPlaying = () => {
        Axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=80a40e211404d8a3420f6cd3e67455af&language=en-US&page=${start}`)
            .then(result => {
                setMovie(result.data.results);
                setStart(1);
                setTitlePage('Now Playing');
                setType('now_playing');
            })
    }

    const onRatings = () => {
        Axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=80a40e211404d8a3420f6cd3e67455af&language=en-US&page=${start}`)
            .then(result => {
                setMovie(result.data.results);
                setTitlePage('Top Ratings');
                setStart(1);
                setType('top_rated');
            })
    }

    const onUncoming = () => {
        Axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=80a40e211404d8a3420f6cd3e67455af&language=en-US&page=${start}`)
            .then(result => {
                setMovie(result.data.results);
                setTitlePage('UnComing Movies');
                setStart(1);
                setType('upcoming');
            })
    }


    const fetchPost = () => {
        if (start !== 0) {
            setStart(prevState => prevState + 1);
        } else {
            console.log('Nop')
        }
    }


    return (
        <section className="section-media">
            <div className="container">
            <h2 className="container-title">{titlePage}</h2>
                <div className="buttons-redirect">
                    <button className="button-s" onClick={onRatings}>Top Ratings</button>
                    <button className="button-s" onClick={onUncoming}>Uncoming</button>
                    <button className="button-s" onClick={onPlaying}>Playing</button>
                </div>
                <InfiniteScroll
                    dataLength={movie.length}
                    next={fetchPost}
                    hasMore="true"
                    loader={<h1>Loading</h1>}
                >
                    <ul className="container-ul">
                        {movie.map(movies => (
                            <li className="container-li"><Card image={movies.poster_path} id={movies.id} data={movies.release_date} title={movies.original_title} genre={movies.genre_ids} voteAverange={movies.vote_average} titlePage={titlePage}></Card></li>
                        ))}
                    </ul>
                </InfiniteScroll>
            </div>
        </section>
    )
}

export default Movie
