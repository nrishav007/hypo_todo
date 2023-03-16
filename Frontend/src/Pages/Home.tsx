import { Box, Input, Center, Button, Flex, Text,Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useToast,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  SimpleGrid, } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetReq, PostReq, StatReq } from "../Redux/AppReducer/Action";
interface User {
  AuthReducer: auth;
  AppReducer: app;
}
interface auth {
  token: string;
}
interface app {
  userData: object[];
}
interface task {
  task: string;
  _id: string;
  complete: boolean;
}
const Home: FC = () => {
  const [editID,setEditID]=useState("");
  const dispatch = useDispatch();
  const toast=useToast();
  const token: any = useSelector<User>((state) => state.AuthReducer.token);
  const data: any = useSelector<User>((state) => state.AppReducer.userData);
  const GetData = () => {
    if (token !== "") {
      dispatch<any>(
        GetReq(`${process.env.REACT_APP_URL}/todo`, `bearer ${token}`)
      );
    }
  };
  useEffect(() => {
    GetData();
  }, [token]);
  const task = useRef<HTMLInputElement>(null);
  const newtask = useRef<HTMLInputElement>(null);
  const handlePostTask = () => {
    let payload: object = {
      task: task.current?.value,
      complete: false,
    };
    dispatch<any>(
      PostReq(
        `${process.env.REACT_APP_URL}/todo/create`,
        payload,
        `bearer ${token}`
      )
    );
    
    toast({
      title: 'Task added',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  };
  const handleEdit=(id:string)=>{
    setEditID(id);
    onOpen();
  }
  const handleEditTask=async()=>{
    const payload={
      task:newtask.current?.value
    }
    await dispatch<any>(
      StatReq(
        `${process.env.REACT_APP_URL}/todo/update/${editID}`,
        `bearer ${token}`,
        payload
      )
    );
    toast({
      title: 'Task updated',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    GetData();
    onClose();
  }
  const handleStatus=async(id:string)=>{
    const payload={
      complete:true
    }
    await dispatch<any>(
      StatReq(
        `${process.env.REACT_APP_URL}/todo/update/${id}`,
        `bearer ${token}`,
        payload
      )
      
    );
    toast({
      title: 'Task Completed',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    GetData();
    
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your task data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Input ref={newtask} placeholder="Enter Task name" mb={"10px"} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='green' mr={3} onClick={handleEditTask}>Update</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {
          token==""?<Text color={"red"} mb={"10px"} mt={"-10px"}>Please login first</Text>:null
        }
      <Center>
        
        <Box mr={"20px"}>
          <Input ref={task} placeholder="Enter Task name" />
        </Box>
        <Button isDisabled={token==""} onClick={handlePostTask}>Add Task</Button>
      </Center>
      <SimpleGrid columns={[1,1,2,2]} mt={"30px"}>
        <Box minWidth={"49%"}>
        <Box fontWeight={"bold"} fontSize={"18px"}>
          Pending
        </Box>
          <Box h={"400px"} overflow={"scroll"}>
            {data.length == 0 ? (
              <Center>
                <Text>No Pending task</Text>
              </Center>
            ) : (
              data.map((el: task) => {
                if (el.complete == false) {
                  return (
                    <Flex mt={"30px"} justifyContent={"space-around"}>
                      <Box
                        w={"50%"}
                        textAlign={"left"}
                        h={"80px"}
                        backgroundColor={"#1492e0"}
                        borderBottom={"1px solid black"}
                      >
                        <Box ml={"10px"}>
                          <Text fontSize={"20px"} mt={"20px"} color={"white"}>
                            {el.task}
                          </Text>
                        </Box>
                      </Box>
                      <Box
                        w={"50%"}
                        backgroundColor={"#1492e0"}
                        borderBottom={"1px solid black"}
                      >
                        <Flex justifyContent={"flex-end"} gap={"20px"}>
                          <Box mt={"20px"}>
                            <Button onClick={()=>handleEdit(el._id)}>edit</Button>
                          </Box>
                          <Box mt={"20px"} mr={"10px"}>
                            <Button onClick={()=>handleStatus(el._id)}>Mark as finished</Button>
                          </Box>
                        </Flex>
                      </Box>
                    </Flex>
                  );
                }
              })
            )}
          </Box>
        </Box>
        <Box  minW={"49%"} >
        <Box fontWeight={"bold"} fontSize={"18px"}>
          {" "}
          Finished
        </Box>
          <Box h={"400px"} overflow={"scroll"}>
            {data.length == 0 ? (
              <Center>
                <Text>No Finished task</Text>
              </Center>
            ) : (
              data.map((el: task) => {
                if (el.complete == true) {
                  return (
                    <Box
                      textAlign={"left"}
                      h={"80px"}
                      backgroundColor={"green"}
                      borderBottom={"1px solid black"}
                    >
                      <Box ml={"10px"}>
                        <Text fontSize={"20px"} mt={"20px"} color={"white"}>
                          {el.task}
                        </Text>
                      </Box>
                    </Box>
                  );
                }
              })
            )}
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Home;
