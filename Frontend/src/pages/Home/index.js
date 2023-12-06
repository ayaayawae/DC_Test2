import { Button, Container, Text, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TasksModal from "../../components/Modal/Tasks";
import TasksTable from "../../components/Table/Tasks";
import useToastHook from "../../components/Toast";

const Home = () => {
  const [toast, setToast] = useToastHook();
  const [data, _data] = useState([]);
  const [selectedData, _selectedData] = useState(null)
  const [submitLoading, _submitLoading] = useState(false)
  const [submitType, _submitType] = useState('CREATE')
  const { isOpen, onOpen, onClose } = useDisclosure();

  const init = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_HOST}/tasks`);
      _data(data.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (data) => {
    try {
      _submitLoading(true)
      let result
      if (submitType === "EDIT") {
        result = await axios.patch(`${process.env.REACT_APP_HOST}/tasks/${data.Id}`, data);
      } else if (submitType === "CREATE") {
        result = await axios.post(`${process.env.REACT_APP_HOST}/tasks`, data);
      } else if (submitType === "REMOVE") {
        result = await axios.delete(`${process.env.REACT_APP_HOST}/tasks/${data.Id}`);
      }

      setToast({
        message: result.data.message,
        type: "success",
      });
      onClose()
      init()
    } catch (e) {
      setToast({
        message: `Error occured`,
        type: "error",
      });
      console.log(e);
    } finally {
      _submitLoading(false)
    }
  };

  const handleCreate = () => {
    _selectedData(null)
    _submitType("CREATE")
    onOpen()
  }

  const handleEdit = (v) => {
    _selectedData(v)
    _submitType("EDIT")
    onOpen()
  }

  const handleRemove = (v) => {
    _selectedData(v)
    _submitType("REMOVE")
    onOpen()
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <TasksModal
        isOpen={isOpen}
        onClose={onClose}
        data={selectedData}
        action={{
          submit: handleSubmit,
          status: submitLoading,
          type: submitType
        }}
      />

      <Container maxW={"4xl"}>
        <Text fontSize={"6xl"} fontWeight={"bold"} mt={8} textAlign={"center"}>
          Tasks
        </Text>

        <Button onClick={handleCreate} colorScheme="blue" mb={4}>Create</Button>

        <TasksTable
          data={data}
          action={{
            edit: handleEdit,
            remove: handleRemove
          }} />
      </Container>
    </>
  );
};

export default Home;
