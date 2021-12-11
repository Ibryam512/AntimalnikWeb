import logo from './logo.svg';
import './App.css';

import {Posts} from './Posts';
import {LostThings} from './LostThings';
import {Messages} from './Messages';
import {Questions} from './Questions';
import {Navigation} from './Navigation';

import {BrowserRouter as Router, Route, Routes as Switch} from 'react-router-dom';


function App() {
  return (
    
    <Router>
      <Navigation />
      <Switch>
        <Route path='/' element={<Posts/>} exact/>
        <Route path='/lost-things' element={<LostThings/>} />
        <Route path='/messages' element={<Messages/>} />
        <Route path='/questions' element={<Questions/>} />
      </Switch>
    </Router>
  );
}

export default App;
