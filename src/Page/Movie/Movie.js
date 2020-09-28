import React, { useEffect, useState } from 'react'
import './Movie.css';
import Navbar from '../../Components/Navbar/NavBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../../Components/Card/Card';
import Axios from 'axios';

const Movie = () => {

    const [movie, setMovie] = useState([]);
    const [type, setType] = useState('');
    const [titlePage, setTitlePage] = useState('');
    const [start, setStart] = useState(1);


    useEffect(() => {
        Axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API}&language=en-US&page=${start}`)
            .then(result => {
                setMovie(result.data.results);
                setType('popular');
                setTitlePage('Popular Movies')
                setStart(1)
            })

    }, [])


    useEffect(() => {
        Axios.get(`https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.REACT_APP_API}&language=en-US&page=${start}`)
            .then(result => {
                const Movie = movie.concat(result.data.results)
                setMovie(Movie);
            })
    }, [start])

    const fetchPost = () => {
        if (start !== 0) {
            setStart(prevState => prevState + 1);
        } else {
            console.log('Nop')
        }
    }


    return (
        <div>
            <section className="section-media">
                <Navbar></Navbar>
                <div className="container">
    <h2 className="container-title">{titlePage}</h2>
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
        </div>
    )
}

export default Movie
