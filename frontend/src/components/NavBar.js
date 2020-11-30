import React from "react";
import { Dropdown } from "react-bootstrap";
import {Link} from 'react-router-dom'

import brand from '../assets/brand.png'

class NavBar extends React.Component {
    handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token')
    }
    render() {
        return (
            <nav className="navbar shadow  navbar-expand-lg sticky-top navbar-light bg-light">
                {/* <Link className="navbar-brand text-warning" to="/index"><img src={brand} alt="Brand" width="120"/></Link> */}
                <a className="navbar-brand text-warning" href="index"><img src={brand} alt="Brand" width="120"/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item different mx-3 font-weight-bold">
                            <a className="nav-link text-warning" href="#">STUDENTS <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item different mx-3 font-weight-bold">
                            <a className="nav-link text-warning" href="qna">MENTORS</a>
                        </li>
                        <li className="nav-item different mx-3 font-weight-bold">
                            <a className="nav-link text-warning" href="#about">ABOUT US</a>
                        </li>                        
                        <li className="nav-item different mx-3 font-weight-bold dropdown">
                            <a className="nav-link text-warning" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            RESOURCES
                            </a>
                            <div className="dropdown-menu bg-transparent border-0" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item bg-white my-2 rounded shadow text-info" href="#">Downloads</a>
                                <a className="dropdown-item bg-white my-2 rounded shadow text-info" href="#">Blogs</a>
                                {localStorage.getItem('token') ? 
                                    <a className="dropdown-item bg-white my-2 rounded shadow text-info" href={`/chat?name=${JSON.parse(localStorage.getItem('user')).firstName+JSON.parse(localStorage.getItem('user')).lastName}&room=General`}>Chat Rooms</a>
                                :<></>}
                                <a className="dropdown-item bg-white my-2 rounded shadow text-info" href="#">Experience</a>
                            </div>
                        </li>
                        
                            {localStorage.getItem('token') ? 
                                <>
                                    <li className="nav-item different mx-3 font-weight-bold">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="btn-sm" id="dropdown-basic">
                                            {JSON.parse(localStorage.getItem('user')).email}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu style={{backgroundColor:'white'}}>
                                                <Dropdown.Item href="/mentordashboard" >Dashboard</Dropdown.Item>
                                                
                                                </Dropdown.Menu>
                                        </Dropdown>
                                         </li>    
                                    <li className="nav-item different mx-3 font-weight-bold">
                                        <Link className=" nav-link text-info login" style={{textDecoration:"none"}} onClick={this.handleLogout}>Logout</Link> 
                                    </li>
                                </>
                                :
                                <Link className="nav-link text-info login" to="/login">Login</Link> 
                            }   
                            
                            {/* <a className="nav-link text-info login" href="login">LOGIN</a> */}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar;