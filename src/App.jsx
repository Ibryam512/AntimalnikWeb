import './App.css';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import { Posts } from './posts/Posts';
import { Messages } from './messages/Messages';
import { Questions } from './questions/Questions';
import { Navigation } from './ui/Navigation';
import { Login } from './profile/Login';
import { Registration } from './profile/Registration';
import { Users } from './admin/Users';
import { Profile } from './profile/Profile';
import { postType } from './enums/postType';
import GetId from './posts/FullPost';
import GetUserId from './admin/User';

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path='/' element={<Posts type={postType.ad}/>} exact />
        <Route path='/lost-things' element={<Posts type={postType.lostThing}/>} />
        <Route path='/messages' element={<Messages/>} />
        <Route path='/questions' element={<Questions/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/registration' element={<Registration/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/posts/:id' element={<GetId/>} />
        <Route path='/admin/users' element={<Users/>} />
        <Route path='/admin/users/:userName' element={<GetUserId/>} />
      </Switch>
    </Router>
  );
}

export default App;
