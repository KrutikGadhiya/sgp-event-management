import './css/SignIN.css';
import { Component } from 'react';
import { Link } from 'react-router-dom';

class SignIN extends Component{
    render(){
        return (
            <div>
                <div id="formContainer">
                    <form class="form">
                        <h1 class="heading">Sign In</h1>
                
                        <div id="socialContainer">
                            <img class="social" src="http://pluspng.com/img-png/google-logo-png-open-2000.png" alt="Google" />
                        </div>

                        <div id="inputContainer">
                        <div>
                            <input class="input" type="email" name="email" placeholder="Email" />
                        </div>
                        <div>
                            <input class="input" type="password" name="password" placeholder="Password" />
                        </div>
                        <div>
                            <input class="submit" type="submit" name="submit" value="Sign In" />
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
}

export default SignIN;