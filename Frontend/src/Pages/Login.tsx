import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  useToast,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/AuthReducer/Action";

interface LoginFormValues {
  username: string;
  password: string;
}

const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const toast=useToast();
    const [values, setValues] = useState<LoginFormValues>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch<any>(login(`${process.env.REACT_APP_URL}/login`, values));
      toast({
        title: 'Login success',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    navigate("/")
    } catch (error) {
      console.log(error)
      toast({
        title: 'Login Error',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
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
            <Button type="submit">Login</Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default Login;
