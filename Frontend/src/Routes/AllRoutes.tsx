import { Box } from '@chakra-ui/react'
import React,{FC} from 'react';
import {Routes,Route} from "react-router-dom";
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';

const AllRoutes:FC = () => {
  return (
    <Box>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
        </Routes>
    </Box>
  )
}

export default AllRoutes