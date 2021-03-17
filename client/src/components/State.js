// import './css/SignIN.css';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import GoogleLogin from 'react-google-login';

// let obj = {};

// function SignIN(){

//   const [name, setname] = useState('User Name')

//       responseGoogle = (Response) => {
//           console.log(Response);
//           obj = Response.profileObj;
//           console.log(Response.profileObj);
//           // url = obj.imageUrl;
//           // this.name(url);
//           console.log(obj.name);
//           //console.log('name ', url);
//           setname(obj.name)
//       }

//       return (
//           <div>
//               <div id="formContainer">
//                   <form class="form">
//                       <h1 class="heading">Sign In { name }</h1>
              
//                       <div id="socialContainer">
//                           {/* <img class="social" src="http://pluspng.com/img-png/google-logo-png-open-2000.png" alt="Google" /> */}
//                           <GoogleLogin
//                               clientId="671510511921-l5u9j6o9dn6uoflbr912kf84uva07th2.apps.googleusercontent.com"
//                               buttonText="Login"
//                               onSuccess={ this.responseGoogle }
//                               onFailure={ this.responseGoogle }
//                               cookiePolicy={'single_host_origin'}
//                           />
//                       </div>

//                       <div id="inputContainer">
//                       <div>
//                           <input class="sinput" type="email" name="email" placeholder="Email" />
//                       </div>
//                       <div>
//                           <input class="sinput" type="password" name="password" placeholder="Password" />
//                       </div>
//                       <div>
//                           <input class="ssubmit" type="submit" name="submit" value="Sign In" />
//                       </div>
//                       <div>
//                           <p>Not Registered?
//                               <Link to='/signup'>
//                                   <span>Create an account</span>
//                               </Link>
//                           </p>
//                       </div>
//                   </div>
//               </form>
//           </div>
//       </div>
//       )
// }

// export default SignIN;