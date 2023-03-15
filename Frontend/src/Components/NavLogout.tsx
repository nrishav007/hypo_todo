import { Box, Flex } from "@chakra-ui/react";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Redux/AuthReducer/Action";
const NavLogout: FC = () => {
  const dispatch = useDispatch();
  const HandleLogout = () => {
    dispatch<any>(logout());
  };
  return (
    <Flex justifyContent={"space-around"} padding={"5px"}>
      <Box cursor={"pointer"}>
        <Link to={"/"}>Home</Link>
      </Box>
      <Box cursor={"pointer"} onClick={HandleLogout}>
        <Link to={"/login"}>Logout</Link>
      </Box>
    </Flex>
  );
};

export default NavLogout;
