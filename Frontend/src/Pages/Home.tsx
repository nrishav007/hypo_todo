import { Box, Input, Center, Button, Flex, Text } from "@chakra-ui/react";
import { FC, useEffect, useRef } from "react";
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
  const dispatch = useDispatch();
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
  };
  const handleEdit=(id:string)=>{

  }
  const handleStatus=async(id:string)=>{
    await dispatch<any>(
      StatReq(
        `${process.env.REACT_APP_URL}/todo/update/${id}`,
        `bearer ${token}`
      )
    );
    GetData();
  }
  return (
    <Box>
      <Center>
        <Box mr={"20px"}>
          <Input ref={task} placeholder="Enter Task name" />
        </Box>
        <Button onClick={handlePostTask}>Add Task</Button>
      </Center>
      <Flex mt={"30px"} justifyContent={"space-around"}>
        <Box fontWeight={"bold"} fontSize={"18px"}>
          Pending
        </Box>
        <Box fontWeight={"bold"} fontSize={"18px"}>
          {" "}
          Finished
        </Box>
      </Flex>
      <Flex mt={"30px"} justifyContent={"space-around"}>
        <Box h={"400px"} w={"49%"} overflow={"scroll"}>
          <Box>
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
        <Box h={"400px"} w={"49%"} overflow={"scroll"}>
          <Box>
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
      </Flex>
    </Box>
  );
};

export default Home;
