import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Redux/AuthReducer/Action";
interface User {
  AuthReducer:auth;
  AppReducer:object;
}
interface auth {
  name:string;
}
const NavLogout: FC = () => {
  const name:any = useSelector<User>((state) => state.AuthReducer.name);
  const dispatch = useDispatch();
  const HandleLogout = () => {
    dispatch<any>(logout());
  };
  
  return (
    <Flex justifyContent={"space-around"} padding={"5px"} h={"80px"}>
      <Center>
        <Box cursor={"pointer"}>
          <Link to={"/"}>Home</Link>
        </Box>
      </Center>
      <Center>
        <Box>
          <Text>Welcome {name==undefined?"GUEST":name}</Text>
        </Box>
      </Center>
      <Center>
        <Box cursor={"pointer"} onClick={HandleLogout}>
          <Link to={"/login"}>Logout</Link>
        </Box>
      </Center>
    </Flex>
  );
};

export default NavLogout;
