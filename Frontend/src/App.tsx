import React, { FC } from 'react';
import './App.css';
import Nav from './Components/Nav';
import AllRoutes from './Routes/AllRoutes';

const App:FC=()=> {
  return (
    <div className="App">
      <Nav/>
      <AllRoutes/>
    </div>
  );
}

export default App;
