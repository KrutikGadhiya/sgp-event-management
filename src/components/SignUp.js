import './css/SignIN.css';
import { Link } from 'react-router-dom';
function SignUp(){
    return (  
        <div id="formContainer">
            <form class="form">
                <h1 class="heading">Register</h1>

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
                        <input class="input" type="password" name="password" placeholder="Confirm Password" />
                    </div>
                    <div>
                        <input class="submit" type="submit" name="submit" value="Register" />
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
 
export default SignUp;