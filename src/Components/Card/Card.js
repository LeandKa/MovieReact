import React, { Component } from 'react'
import './Card.css';

export default class Card extends Component {
    render() {
        const { title,id,data,genre,image, voteAverange } = this.props
        return (
            <div className="container-card">
                <div className="card">
                    <a href={`/movie/${id}`} className="card-a"><img className="card-image" src={`https://image.tmdb.org/t/p/w185${image}`}></img></a>
                    <a className="card-body">
                        <h1 className="card-title">{title}</h1>
                        <h1 className="card-ratings">{voteAverange}</h1>
                        <h1 className="card-data">Release:{data}</h1>
                    </a>
                </div>
            </div>
        )
    }
}
