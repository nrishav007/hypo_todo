import { Box, Flex } from '@chakra-ui/react'
import React,{FC} from 'react'
import {Link} from "react-router-dom"
const Nav:FC = () => {
  return (
    <Flex justifyContent={"space-around"} padding={"5px"}>
      <Box cursor={"pointer"}><Link to={"/"}>Home</Link></Box>
      <Box cursor={"pointer"}><Link to={"/login"}>Login</Link></Box>
      <Box cursor={"pointer"}><Link to={"/signup"}>Signup</Link></Box>
    </Flex>
  )
}

export default Nav