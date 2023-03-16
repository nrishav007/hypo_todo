import { Box, Center, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";
const Nav: FC = () => {
  return (
    <Flex justifyContent={"space-around"} padding={"5px"} h={"80px"}>
      <Center>
        <Box cursor={"pointer"}>
          <Link to={"/"}>Home</Link>
        </Box>
      </Center>
      <Center>
        <Box cursor={"pointer"}>
          <Link to={"/login"}>Login</Link>
        </Box>
      </Center>
      <Center>
        <Box cursor={"pointer"}>
          <Link to={"/signup"}>Signup</Link>
        </Box>
      </Center>
    </Flex>
  );
};

export default Nav;
