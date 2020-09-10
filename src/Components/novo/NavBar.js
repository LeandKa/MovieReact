import React, { Component } from 'react'
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'


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


    render() {
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
                        <a className="nav-links" href={'/'}>Popular</a>
                    </li>
                    <li>
                        <a className="nav-links" href={'/'}>Popular</a>
                    </li>
                    <li>
                        <a className="nav-links" href={'/'}>Popular</a>
                    </li>
                </ul>
            </nav>
        )
    }
}
