import './App.css';

import { Posts } from './Posts';
import { Messages } from './Messages';
import { Questions } from './Questions';
import { Navigation } from './ui/Navigation';
import { Login } from './Login';
import { Registration } from './Registration';
import { Profile } from './Profile';
import { postType } from './enums/postType';

import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path='/' element={<Posts type={postType.ad}/>} exact/>
        <Route path='/lost-things' element={<Posts type={postType.lostThing}/>} />
        <Route path='/messages' element={<Messages/>} />
        <Route path='/questions' element={<Questions/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/registration' element={<Registration/>} />
        <Route path='/profile' element={<Profile/>} />
      </Switch>
    </Router>
  );
}

export default App;
