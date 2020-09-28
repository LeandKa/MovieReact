import React, { Component } from 'react'
import './Card.css';

export default class Card extends Component {


    render() {

        const { title, id, data, image, voteAverange } = this.props

        const cardA = () =>{
             if(image === null){
                return(<a href={`/movie/${id}`} className="card-a"><img className="card-image" src='https://phobic-heat.surge.sh/images/no_image.jpg'></img></a>)
             }else{
                 return(<a href={`/movie/${id}`} className="card-a"><img className="card-image" src={`https://image.tmdb.org/t/p/w185${image}`}></img></a>)
             }
        }
        return (
            <div className="container-card">
                <div className="card">
                    {cardA()}
                    <div className="card-body">
                        <div className="body-info">
                            <h1 className="card-title">{title}</h1>
                            <h1 className="card-data">Release:{data}</h1>
                        </div>
                        <h1 className="card-ratings">{voteAverange}</h1>
                    </div>
                </div>
            </div>
        )
    }
}
