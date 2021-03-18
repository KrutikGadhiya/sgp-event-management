import './css/SignIN.css';
import Dashboard from './Dashboard';
import { useState, Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

let obj = { givenName: "User", 
            familyName: "Name"};

function SignIN(props){
    console.log(props)
    const [name, setName] = useState('User');
    const [sname, setSName] = useState('Name');

    const responseGoogle = (Response) => {
        console.log(Response);
        obj = Response.profileObj;
        console.log(Response.profileObj);
        console.log(obj.givenName);
        setName(obj.givenName);
        setSName(obj.familyName);
        props.changeUser(obj.givenName)
        props.changeSUser(obj.familyName)
        // {<Redirect to='/dashboard' />}
        // props.history.push('/dashboard')
        props.history.push('/dashboard');
    }

        return (
            <div>
                <div id="formContainer">
                    <form class="form">
                        <h1 class="heading">Sign In</h1>
                        {/* <h1 class="heading">Sign In { name } {sname}</h1> */}
                
                        <div id="socialContainer">
                            {/* <img class="social" src="http://pluspng.com/img-png/google-logo-png-open-2000.png" alt="Google" /> */}
                            <GoogleLogin
                                clientId="671510511921-l5u9j6o9dn6uoflbr912kf84uva07th2.apps.googleusercontent.com"
                                buttonText="Login"
                                theme='dark'
                                onSuccess={ responseGoogle }
                                onFailure={ responseGoogle }
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>

                        <div id="inputContainer">
                        <div>
                            <input class="sinput" type="email" name="email" placeholder="Email" />
                        </div>
                        <div>
                            <input class="sinput" type="password" name="password" placeholder="Password" />
                        </div>
                        <div>
                            <input class="ssubmit" type="submit" name="submit" value="Sign In" />
                        </div>
                        <div>
                            <p>Not Registered?
                                <Link to='/signup'>
                                    <span>Create an account</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        )
}

export {obj};
export default withRouter(SignIN);