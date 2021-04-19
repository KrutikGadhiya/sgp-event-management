//import logo from './logo.svg';
import './App.css';
import { useState, createContext, useReducer, useContext, useEffect } from 'react';
import SignIN from './components/SignIN';
import SignUp from './components/SignUp';
// import Homepage from './components/HomePage';
import Navbar from './components/Navbar';
import CreateEvent from './components/CreateEvent';
import PrePdf from './components/PrePdf';
import EventPdf from './components/EventPdf'
import PostEvent from './components/PostEvent';
import EditEvent from './components/EditEvent';
import DeleteEvent from './components/DeleteEvent';
import Dashboard from './components/Dashboard';
import State from './components/State';
import Post from './components/PosteExam';

import { BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom';
import { initialState, reducer } from './reducers/userReducer'


export const UserContext = createContext()

const Routing = (props) => {
  const [uname, setUName] = useState('User')
  const [usname, setUSName] = useState('Name')
  const [uemail, setUEmail] = useState('UserName@mail.com')

  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch({type: "USER", payload: user})
      history.push('/dashboard')
    } else {
      history.push('/signIn')
    }
  }, [])

  props.changeUser(uname)

  return (
    <Switch>
        <Route exact path='/signUp'>
          <SignUp changeUser = {uname => setUName(uname)} 
                  // changeSUser = {usname => setUSName (usname)}
                  changeUEmail = {uemail => setUEmail(uemail)}
          />
        </Route>
        <Route exact path='/signIn'>
          <SignIN changeUser = {uname => setUName(uname)} 
                  // changeSUser = {usname => setUSName (usname)} 
                  changeUEmail = {uemail => setUEmail(uemail)}
          /> 
        </Route>
        <Route exact path='/createEvent'><CreateEvent email = { uemail }/></Route>
        <Route exact path='/postEvent'><Post /></Route>
        <Route exact path='/editEvent'><EditEvent /></Route>
        <Route exact path='/deleteEvent'><DeleteEvent /></Route>
        <Route exact path='/dashboard'><Dashboard /></Route>
        <Route exact path='/createPdf'><PrePdf /></Route>
        <Route exact path='/printPdf'><EventPdf /></Route>
      </Switch>
  )
}


function App() {
  const [uname, setUName] = useState('User')
  const [state, dispatch] = useReducer(reducer, initialState)
 
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <Router>
        <div className="App">
          <Navbar name = { uname }  />
          <Routing  changeUser = {uname => setUName(uname)}/>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
