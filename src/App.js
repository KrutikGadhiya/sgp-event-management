//import logo from './logo.svg';
import './App.css';
import SignIN from './components/SignIN';
import SignUp from './components/SignUp';
import Homepage from './components/HomePage';
import Navbar from './components/Navbar';
import CreateEvent from './components/CreateEvent';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Homepage />
        <Switch>
            <Route path='/signup'><SignUp /></Route>
            <Route path='/signin'><SignIN /></Route>
            <Route path='/createEvent'><CreateEvent /></Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
