import './css/Navbar.css';
import { Component } from 'react';
import { Link } from 'react-router-dom';


function Navbar(){
    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else {
          x.className = "topnav";
        }
      }
    return (
        <div className="topnav" id="myTopnav">
            <h2 id="h2">krutik<span id="span">gadhiya</span></h2>
            <div>
                <a href="#logout">LogOut</a>
                <div className="dropdown">
                  <button className="dropbtn">Events
                    <i className="fa fa-caret-down"> </i>
                  </button>
                  <div className="dropdown-content">
                    <Link to="/createEvent">Create Event</Link>
                    <a href="#">Edit Event</a>
                    <a href="#">Delete Event</a>
                  </div>
                </div> 
                <Link to="/dashbord">Dashbord</Link>
                <a href="javascript:void(0);" className="icon" onClick={myFunction}>&#9776;</a>
            </div>
        </div>
    );
}
export default Navbar;