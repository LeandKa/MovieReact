import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import './Movie.css';
import Card from '../Card/Card';
import Axios from 'axios';

const MovieRatings = () => {

    const [movie,setMovie]= useState([])
    const [title,setTitle] = useState('');
    const [start,setStart] = useState(1);


    useEffect(()=>{
        Axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=80a40e211404d8a3420f6cd3e67455af&language=en-US&page=${start}`)
        .then(result =>{
            setMovie(result.data.results);
            setTitle('Top Rated')
        })
    },[])

    useEffect(()=>{
        Axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=80a40e211404d8a3420f6cd3e67455af&language=en-US&page=${start}`)
            .then(result => {
                const Movie = movie.concat(result.data.results)
                setMovie(Movie);
            })
    },[start])

    const fetchPost = () =>{
        if(start !== 0){
            setStart(prevState => prevState + 1);
          }else{
              console.log('Nop')
          }
    }


    return (
        <section className="section-media">
            <div className="container">
           <h2 className="container-title">{title}</h2>
           <InfiniteScroll
                    dataLength={movie.length}
                    next={fetchPost}
                    hasMore="true"
                    loader={<h4>Loading...</h4>}
                >
                <ul className="container-ul">
                    {movie.map(movies=>(
                        <li className="container-li"><Card image={movies.poster_path} id={movies.id} data={movies.release_date} title={movies.original_title} genre={movies.genre_ids} voteAverange={movies.vote_average}></Card></li>
                    ))}
                </ul>
                </InfiniteScroll>
            </div>
        </section>
    )
}

export default MovieRatings
