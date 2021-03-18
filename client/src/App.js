//import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import SignIN from './components/SignIN';
import SignUp from './components/SignUp';
import Homepage from './components/HomePage';
//import Navbar from './components/Navbar';
import CreateEvent from './components/CreateEvent';
import PrePdf from './components/PrePdf';
import PostEvent from './components/PostEvent';
import EditEvent from './components/EditEvent';
import DeleteEvent from './components/DeleteEvent';
import Dashboard from './components/Dashboard';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  const [uname, setUName] = useState('User')
  const [usname, setUSName] = useState('Name')

  return (
    <Router>
      <div className="App">
        
        <Homepage name = { uname } usname = { usname } />        
        <Switch>
            <Route exact path='/signUp'>
              <SignUp changeUser = {uname => setUName(uname)} 
                      changeSUser = {usname => setUSName (usname)}
              /></Route>
            <Route exact path='/signIn'>
              <SignIN changeUser = {uname => setUName(uname)} 
                      changeSUser = {usname => setUSName (usname)} 
              /> 
              {/* {console.log("in APP",uname, usname)} */}
            </Route>
            <Route exact path='/createEvent'><CreateEvent /></Route>
            <Route exact path='/postEvent'><PostEvent /></Route>
            <Route exact path='/editEvent'><EditEvent /></Route>
            <Route exact path='/deleteEvent'><DeleteEvent /></Route>
            <Route exact path='/dashboard'><Dashboard /></Route>
            <Route exact path='/createPdf'><PrePdf /></Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
