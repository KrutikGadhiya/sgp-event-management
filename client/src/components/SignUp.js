import './css/SignIN.css';
import { useState, useContext } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import axios from 'axios'
import GoogleLogin from 'react-google-login';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameRegex = /^[a-zA-Z ]{6,50}$/;
const passRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;


toast.configure()

let obj = {
    givenName: "User", 
    familyName: "Name",
    email: 'UserName@mail.com'
};

function SignUp(props){
    const history = useHistory()

    const [name, setName] = useState('User');
    const [sname, setSName] = useState('Name');
    const [email, setEmail] = useState('UserName@mail.com');

    const [fullName, setFullName] = useState('')
    const [email1, setEmail1] = useState('')
    const [pass, setPass] = useState('')
    const [secPass, setSecPass] = useState('')

    const responseGoogle = (Response) => {
        //console.log(Response);
        obj = Response.profileObj;
        //console.log(Response.profileObj);
        //console.log(obj.givenName);
        setName(obj.givenName);
        setFullName(obj.name)
        setSName(obj.familyName);
        setPass(obj.googleId)
        setEmail(obj.email)
        setEmail1(obj.email)
        props.changeUser(obj.givenName)
        // props.changeSUser(obj.familyName)
        props.changeUEmail(obj.email)
        // props.signedin(true)
        // props.sign(true)
        // {<Redirect to='/dashboard' />}
        // props.history.push('/dashboard')
        
        // axios.post('/saveUser', {
        //     name: Response.profileObj.name,
        //     email: Response.profileObj.email,
        //     password: Response.profileObj.googleId
        // })
        // .then((response) => {
        //     console.log(response)
        //     toast.error(response.error, {
        //         autoClose: 10000
        //     })
        //     history.push('/signIn');
        // })
        // .catch((err) => {
        //     toast.error(err, {
        //         autoClose: 10000
        //     })
        //     console.log(err)
        // })

        fetch("/saveUser", {
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name: Response.profileObj.name,
                email: Response.profileObj.email,
                password: Response.profileObj.googleId
            })
        }).then(res => res.json())
        .then((response) => {
            if(response.error){
                toast.error(response.error, {
                    autoClose: 10000
                })
            } else {
                toast.success(response.message, {
                    autoClose: 10000
                })

                history.push('/signIn')
            }
            //console.log(response)
        })
    }

    const submitDetails = () => {
        if(pass !== secPass){
            toast.error("Please Enter Same Password in both the Fields", {
                autoClose: 10000
            })
            return
        } else {
            if(!emailRegex.test(email1)){
                toast.error("Enter a Valid E-mail", {
                    autoClose: 5000
                })
                return
            }else if( !nameRegex.test(fullName)){
                toast.error("UserName Length Should be between 6 and 50 and UserName Should not Contain any special character", {
                    autoClose: 5000
                })
            }else if( !passRegex.test(pass)){
                toast.error("Password must be atleast 6 character long and not be greater than 16", {
                    autoClose: 5000
                })
            }
            // axios.post('/saveUser', {
            //     name: fullName,
            //     email: email1,
            //     password: pass
            // }).then(res => res.json())
            // .then((response) => {
            //     if(response.error){
            //         toast.error(response.error, {
            //             autoClose: 10000
            //         })
            //     }
            //     console.log(response)
            // })
            // .catch((err) => {
            //     console.log("KK: ",err)
            // })
            else {
                fetch("/saveUser", {
                    method:"post",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({
                        name: fullName,
                        email: email1,
                        password: pass
                    })
                }).then(res => res.json())
                .then((response) => {
                    if(response.error){
                        toast.error(response.error, {
                            autoClose: 10000
                        })
                    } else {
                        toast.success(response.message, {
                            autoClose: 10000
                        })

                        history.push('/signIn')
                    }
                    //console.log(response)
                })
            }
        }
    }

    return (  
        <div id="formContainer">
            <div id='form' className="form">
                <h1 className="heading">Register</h1>

                <div id="socialContainer">
                    <div className="googleLogin">
                        {/* <img className="social" src="http://pluspng.com/img-png/google-logo-png-open-2000.png" alt="Google" /> */}
                        <GoogleLogin
                                    clientId="671510511921-l5u9j6o9dn6uoflbr912kf84uva07th2.apps.googleusercontent.com"
                                    buttonText="Login"
                                    theme='dark'
                                    onSuccess={ responseGoogle }
                                    onFailure={ responseGoogle }
                                    cookiePolicy={'single_host_origin'}
                                />
                    </div>
                </div>

                <div id="inputContainer">
                    <div>
                        <input className="sinput" type="text" name="name" placeholder="Enter Your Name" 
                        value={fullName}
                        onChange = { e => setFullName(e.target.value)}
                        />
                    </div>
                    <div>
                        <input className="sinput" type="email" name="email" placeholder="Email" 
                        value={email1}
                        onChange = { e => setEmail1(e.target.value)}
                        />
                    </div>
                    <div>
                        <input className="sinput" type="password" name="password" placeholder="Password" 
                        value={pass}
                        onChange = { e => setPass(e.target.value)}
                        />
                    </div>
                    <div>
                        <input className="sinput" type="password" name="password" placeholder="Confirm Password" 
                        value={secPass}
                        onChange = { e => setSecPass(e.target.value)}
                        />
                    </div>
                    <div>
                        <button id="submit" className="ssubmit" onClick = { submitDetails } name="submit">Register</button>
                    </div>
                    <div>
                        <p>Already Registered?
                            <Link to='/signin'>
                                <span>Sign IN</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default withRouter(SignUp);