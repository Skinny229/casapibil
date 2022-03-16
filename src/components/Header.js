import React, { Component } from 'react';


class Header extends Component {

    render() {
        return (
            <header id="home">
                <nav id="nav-wrap">
                  
                    <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
                    <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

                    <ul id="nav" className="nav">
                        <li className="current"> <a className="smoothscroll" href="#home">Home</a></li>
                        <li><a className="smoothscroll" href="#about">About Our Menu</a></li>
                        <li><a className="smoothscroll" href="#menu">Menu</a></li>
                        <li><a className="smoothscroll" href="#order">Place an order</a></li>
                        <li><a className="smoothscroll" href="#contact">Contact us</a></li>
                    </ul>

                </nav>



            </header>
        );
    }

}

export default Header;
