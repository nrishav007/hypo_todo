import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Nav from './Components/Nav';
import NavLogout from './Components/NavLogout';
import AllRoutes from './Routes/AllRoutes';
interface User {
  AuthReducer:auth;
  AppReducer:object;
}
interface auth {
  token:string;
}
const App:FC=()=> {
  const token = useSelector<User>((state) => state.AuthReducer.token);
  return (
    <div className="App">
      {
        token===""?<Nav/>:<NavLogout/>
      }
      <AllRoutes/>
    </div>
  );
}

export default App;
