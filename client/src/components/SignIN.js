import './css/SignIN.css';
// import Dashboard from './Dashboard';
import axios from 'axios'
import { useState, useContext } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from '../App'

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameRegex = /^[a-zA-Z ]{6,50}$/;
const passRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

toast.configure()
let obj = {
    givenName: "User", 
    familyName: "Name",
    email: 'UserName@mail.com'
};

const validateEmail = (em) => {
    const x = document.getElementById('e-mail')
    if(em === ''){
        x.className = "sinput inValidEmail"
    }
    else if(!emailRegex.test(em)){
        x.className = "sinput inValidEmail"
    }
    else{
        x.className = "sinput validEmail"
    }
}
const validatePass = (em) => {
    const x = document.getElementById('pass')
    if(em === ''){
        x.className = "sinput inValidEmail"
    }
    else if(!passRegex.test(em)){
        x.className = "sinput inValidEmail"
    }
    else{
        x.className = "sinput validEmail"
    }
}

function SignIN(props){
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    //console.log(props)
    const [name, setName] = useState('User');
    //const [sname, setSName] = useState('Name');
    const [email, setEmail] = useState('UserName@mail.com');

    const [email1, setEmail1] = useState('')
    const [pass, setPass] = useState('')

    const responseGoogle = (Response) => {
        //console.log(Response);
        obj = Response.profileObj;
        //console.log(Response.profileObj);
        //console.log(obj.givenName);
        setName(Response.profileObj.givenName);
        //setSName(obj.familyName);
        setPass(Response.profileObj.googleId)
        setEmail(Response.profileObj.email)
        setEmail1(Response.profileObj.email)
        props.changeUser(Response.profileObj.givenName)
        //props.changeSUser(obj.familyName)\

        // props.changeUEmail(Response.profileObj.email)
        // // {<Redirect to='/dashboard' />}
        // // props.history.push('/dashboard')
        // axios.post('/userSignin', {
        //     email: Response.profileObj.email,
        //     password: Response.profileObj.googleId
        // })
        // .then((response) => {
        //     console.log(response)
        //     if(response.error){
        //         toast.error(response.error, {
        //             autoClose: 10000
        //         })
        //         return
        //     } else {
        //         localStorage.setItem('jwt', response.data.token)
        //         localStorage.setItem('user', JSON.stringify(response.data.user))
        //         dispatch({type: "USER", payload: response.data.user})
        //         toast.success("SignedIN Succesfully", {
        //             autoClose: 10000
        //         })
        //         history.push('/dashboard')
        //     }
        // })
        // .catch((err) => {
        //     toast.error("error", {
        //         autoClose: 5000
        //     })
        //     console.log(err)
        // });

        fetch("/userSignin", {
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                email: Response.profileObj.email,
                password: Response.profileObj.googleId
            })
        }).then(res => res.json())
        .then((response) => {
            if(response.error){
                toast.error(response.error, {
                    autoClose: 10000
                })

                return
            } else {
                localStorage.setItem('jwt', response.token)
                localStorage.setItem('user', JSON.stringify(response.user))

                dispatch({type: "USER", payload: response.user})

                toast.success("SignedIN Succesfully", {
                    autoClose: 10000
                })
                history.push('/dashboard')
            }
            //console.log(response)
        })
    }

    const submitDetails = () => {
        if( !emailRegex.test(email1)){
            toast.error("Enter a Valid E-mail", {
                autoClose: 5000
            })
            return
        }else if( !passRegex.test(pass)){
            toast.error("Password must be atleast 6 character long and can't be greater than 16", {
                autoClose: 5000
            })
        }
        else{
            fetch("/userSignin", {
                method:"post",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    email: email1,
                    password: pass
                })
            }).then(res => res.json())
            .then((response) => {
                if(response.error){
                    toast.error(response.error, {
                        autoClose: 10000
                    })

                    return
                } else {
                    //console.log("in");
                    //console.log(response);
                    props.changeUser(response.user.userName)
                    props.changeUEmail(response.user.email)
                    localStorage.setItem('jwt', response.token)
                    localStorage.setItem('user', JSON.stringify(response.user))

                    dispatch({type: "USER", payload: response.user})

                    toast.success("SignedIN Succesfully", {
                        autoClose: 10000
                    })
                    history.push('/dashboard')
                }
                //console.log(response)
            })
        }
    }

        return (
            <div>
                <div id="formContainer">
                    <div className="form">
                        <h1 className="heading">Sign In</h1>
                        {/* <h1 className="heading">Sign In { name } {sname}</h1> */}
                
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
                            <input id='e-mail' className="sinput" type="email" name="email" placeholder="Email" 
                            value={ email1 }
                            onChange={ e => { setEmail1(e.target.value); validateEmail(e.target.value)} }
                            />
                        </div>
                        <div>
                            <input id="pass" className="sinput" type="password" name="password" placeholder="Password" 
                            value={ pass }
                            onChange={ e => { setPass(e.target.value); validatePass(e.target.value)} }
                            />
                        </div>
                        <div>
                            <button onClick = { submitDetails } id="submit" className="ssubmit" name="submit" >SignIn</button>
                        </div>
                        <div>
                            <p>Not Registered?
                                <Link to='/signup'>
                                    <span>Create an account</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}

export {obj};
export default withRouter(SignIN);