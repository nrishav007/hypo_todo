import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postReq } from "../Redux/AppReducer/Action";

interface LoginFormValues {
  username: string;
  password: string;
  email:string;
  phone:string;
}

const Signup = () => {
  const [values, setValues] = useState<LoginFormValues>({
    username: "",
    password: "",
    email:"",
    phone:""
  });
  const dispatch=useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postReq(`${process.env.REACT_APP_URL}/signup`,))
  };
  return (
    <Center mt={"40px"}>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={6}
      >
        <form onSubmit={handleSubmit} >
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Phone No.</FormLabel>
              <Input
                type="number"
                name="mobile"
                value={values.phone}
                onChange={handleChange}
                maxLength={10}
              />
            </FormControl>
            <Button type="submit">Login</Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default Signup;
