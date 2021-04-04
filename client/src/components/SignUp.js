import './css/SignIN.css';
import { useState, Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

let obj = {
    givenName: "User", 
    familyName: "Name",
    email: 'UserName@mail.com'
};
function SignUp(props){

    const [name, setName] = useState('User');
    const [sname, setSName] = useState('Name');
    const [email, setEmail] = useState('UserName@mail.com');

    const responseGoogle = (Response) => {
        console.log(Response);
        obj = Response.profileObj;
        console.log(Response.profileObj);
        console.log(obj.givenName);
        setName(obj.givenName);
        setSName(obj.familyName);
        setEmail(obj.email)
        props.changeUser(obj.givenName)
        props.changeSUser(obj.familyName)
        props.changeUEmail(obj.email)
        // {<Redirect to='/dashboard' />}
        // props.history.push('/dashboard')
        props.history.push('/dashboard');
    }

    return (  
        <div id="formContainer">
            <form class="form">
                <h1 class="heading">Register</h1>

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
                        <input class="sinput" type="password" name="password" placeholder="Confirm Password" />
                    </div>
                    <div>
                        <input class="ssubmit" type="submit" name="submit" value="Register" />
                    </div>
                    <div>
                        <p>Already Registered?
                            <Link to='/signin'>
                                <span>Sign IN</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}
 
export default withRouter(SignUp);