import './css/Navbar.css';
// import _ from 'lodash';
// import SignIn from './SignIN'
// import SignUp from './SignUp'
import { useState, useEffect, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserContext } from '../App'
// import { render } from '@testing-library/react';


function Navbar(props){
    const [username, setuName] = useState('User');
    const [usersname, setuSName] = useState('Name');

    const { state, dispatch } = useContext(UserContext)
    const renderList = () => {
      if(state){
        return [
              <div className="logoutBtn">
                <Link onClick = { onLogout }  >LogOut</Link>
              </div>,
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
              </div >,
              <div>
                <Link className="dash" to="/dashboard">Dashboard</Link>
              </div>
        ] 
      } else {
        return [
          <div className="logoutBtn">
            <Link className="dash" to='/signIn'>SignIn</Link>
          </div>,
          <div>
            <Link className="dash" to='/signUp'>SignUP</Link>
          </div>
        ]
      }
    }

    function changeUName(){
      setuName(props.name)
      setuSName(props.usname)
    }
    //let fun = setTimeout(changeUName, 1);
    useEffect(() => {
      changeUName()
    }, [props.name])

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
              setuName('User')
              setuSName('Name')
              localStorage.clear()
              dispatch({type: 'CLEAR'})
              props.history.push('/signIn');
            }
          })
        }
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
            <h2 id="h2">Welcome <span id="span">{ username }</span></h2>
            {/* <h2>{ props.name }</h2> */}
            <div>
                { renderList() }
                {/* </>
              } */}
                <a href="javascript:void(0);" className="icon" onClick={myFunction}>&#9776;</a>
            </div>
        </div>
    );
}
export default withRouter(Navbar);