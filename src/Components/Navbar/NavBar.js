import React, { Component } from 'react'
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import GitHubIcon from '@material-ui/icons/GitHub';
import firebase from '../../Firebase';


export default class NavBar extends Component {

    state = {
        clicked: true,
        ratings: 'ratings',
        playing: 'playing',
        uncoming: 'uncoming'
    }


    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    onClick = () =>{
      firebase.auth().signOut().then(function() {
        localStorage.removeItem('login');
        window.location.reload();
      }).catch(function(error) {
        alert(error.message);
      });
    }


    render() {

        const log = () =>{
            if(localStorage.getItem('login')){
              return( <a className="nav-links-button" onClick={this.onClick}>Logout</a>)
            }else{
               return (<a className="nav-links-button" href={'/login'}>Login</a>)
            }
        }


        return (
            <nav className="NavbarItems">
                <a className="navbar-logo" href="/" >React</a>
                <div className="menu-icon" onClick={this.handleClick}>
                    {
                        this.state.clicked ? <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                            : <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>

                    }
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    <li>
                        <a className="nav-links" href={'#'}>Popular</a>
                    </li>
                    <li>
                         {log()}
                    </li>

                    <li>
                        <span className="nav-links">
                          <a href="https://github.com/LeandKa/MovieReact"><GitHubIcon></GitHubIcon></a>
                        </span>
                    </li>
                </ul>
            </nav>
        )
    }
}
