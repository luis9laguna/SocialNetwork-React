import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthState from './context/authState';

//LAYOUT
import Header from './layout/Header'
import LayoutProfile from './layout/LayoutProfile'
import LayoutSearch from './layout/LayoutSearch'

//PAGES
import Login from './pages/Login';
import Home from './pages/Home';
import Saved from './pages/Saved';
import AllSearch from './pages/AllSearch';
import UserProfile from './pages/UserProfile';
import UserSearch from './pages/UserSearch';
import Post from './pages/Post';
import PostSearch from './pages/PostSearch';

function App() {



  return (
    <AuthState>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header />}>
            <Route index element={<Home />} />
            <Route path="search" element={<LayoutSearch />}>
              <Route path=':term' element={<AllSearch />} />
              <Route path='users/:term' element={<UserSearch />} />
              <Route path='posts/:term' element={<PostSearch />} />
            </Route>
            <Route path="profile" element={<LayoutProfile />}>
              <Route path=':id' element={<UserProfile />} />
              <Route path="saved" element={<Saved />} />
            </Route>
            <Route path="post/:id" element={<Post />} />
          </Route>
          <Route path='login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthState>
  );
}

export default App;
