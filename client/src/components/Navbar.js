import './css/Navbar.css';
import _ from 'lodash';
import { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';


function Navbar(props){
    const [username, setuName] = useState('User');
    const [usersname, setuSName] = useState('Name');

    function changeUName(){
      setuName(props.name)
      setuSName(props.usname)
    }
    let fun = setTimeout(changeUName, 1);

    function confirmMessage(){
      var r = window.confirm( " Are You Sure? " );
      if(r === true){
        setuName('User')
        setuSName('Name')
        props.history.push('/signIn');
      }
    }

    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else {
          x.className = "topnav";
        }
      }
    return (
        <div className="topnav" id="myTopnav"  >
            <h2 id="h2">{ username }<span id="span">{ usersname }</span></h2>
            {/* <h2>{ props.name }</h2> */}
            <div>
                <Link onClick = { confirmMessage } >LogOut</Link>
                <div className="dropdown">
                  <button className="dropbtn">Events
                    <i className="fa fa-caret-down"> </i>
                  </button>
                  <div className="dropdown-content">
                    <Link to="/createEvent">Pre Event</Link>
                    <Link to="/postEvent">Post Event</Link>
                    <Link to="/editEvent">Edit Event</Link>
                    <Link to="/deleteEvent">Delete Event</Link>
                  </div>
                </div> 
                <Link to="/dashboard">Dashboard</Link>
                <a href="javascript:void(0);" className="icon" onClick={myFunction}>&#9776;</a>
            </div>
        </div>
    );
}
export default withRouter(Navbar);