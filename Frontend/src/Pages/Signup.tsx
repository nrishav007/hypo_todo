import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useToast,
  ModalCloseButton,
  useDisclosure,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../Redux/AuthReducer/Action";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../Components/Firebase";
interface LoginFormValues {
  username: string;
  password: string;
  email: string;
  mobile: string;
}

const Signup = () => {
  const {setUpCaptcha}=useFirebase();
  const navigate = useNavigate();
  const [otp,setotp]=useState("");
  const [values, setValues] = useState<LoginFormValues>({
    username: "",
    password: "",
    email: "",
    mobile: "",
  });
  const dispatch = useDispatch();
interface fbase{
  confirm:any
}
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [result, setResult] = useState<fbase>();
  const toast=useToast();
  const handleSubmitotp=async()=>{
    let otps=await result?.confirm(otp);
    if(otps?.user?.accessToken!==undefined){
      dispatch<any>(signup(`${process.env.REACT_APP_URL}/signup`, values));
      toast({
        title: 'Signup success',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      navigate("/login")
    }
    else{
      toast({
        title: 'Incorrect OTP',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      onClose();
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    handleCaptch()
  };
const handleCaptch=async()=>{
  await onOpen();
  const res:any=await setUpCaptcha(values.mobile);
  console.log(res)
  setResult(res)
  
}
  return (
    <Center mt={"40px"}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter OTP</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box id="recaptcha-container"></Box>
            <Center>
              <PinInput otp onChange={(e)=>setotp(e)}>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
              </PinInput>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" onClick={handleSubmitotp}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={6}
      >
        <form onSubmit={handleSubmit}>
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
            
            <Button type="submit">Signup</Button>
          </VStack>

        </form>
                  
      </Box>
      
    </Center>
  );
};

export default Signup;
