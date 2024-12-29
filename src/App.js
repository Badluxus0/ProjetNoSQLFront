import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserList from './components/Pages/UserList/UserList';
import Home from './components/Pages/Home/Home';
import Login from './components/Pages/Login/Login';

function App() {
  const isLogged = () => {
    return !!localStorage.getItem("token");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={isLogged() ? <UserList /> : <Login />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
