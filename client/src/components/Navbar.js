import './css/Navbar.css';
import _ from 'lodash';
import { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';




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

    const onLogout = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You will Signout!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, SignOut!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            {
              title: 'you are now Signout!',
              text: 'you will be redirected to Login/Signup Page',
              icon: 'success',
            }
          ).then((res) => {
            if(res.isConfirmed){
              props.history.push('/signIn');
            }
          })
        }
        setuName('User')
        setuSName('Name')
      })
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
              <div className="logoutBtn">
                <Link onClick = { onLogout } >LogOut</Link>
              </div>
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
                </div > 
                <Link className="dash" to="/dashboard">Dashboard</Link>
                <a href="javascript:void(0);" className="icon" onClick={myFunction}>&#9776;</a>
            </div>
        </div>
    );
}
export default withRouter(Navbar);