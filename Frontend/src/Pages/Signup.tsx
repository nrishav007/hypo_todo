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
import { signup } from "../Redux/AuthReducer/Action";
import { useNavigate } from "react-router-dom";
interface LoginFormValues {
  username: string;
  password: string;
  email:string;
  mobile:string;
}

const Signup = () => {
  const navigate=useNavigate();
  const [values, setValues] = useState<LoginFormValues>({
    username: "",
    password: "",
    email:"",
    mobile:""
  });
  const dispatch=useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch<any>(signup(`${process.env.REACT_APP_URL}/signup`, values));
    navigate("/login")
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
                value={values.mobile}
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
