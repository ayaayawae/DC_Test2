import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const TasksModal = ({
  isOpen,
  onClose,
  data = null,
  action: { submit, status, type },
}) => {
  const [Id, _Id] = useState("");
  const [Title, _Title] = useState("");
  const [Description, _Description] = useState("");
  const [Status, _Status] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    submit({
      Id: Id,
      Title: Title,
      Description: Description,
      Status: Status,
    })
  }

  useEffect(() => {
    if (data) {
      _Id(data.Id);
      _Title(data.Title);
      _Description(data.Description);
      _Status(data.Status);
    } else {
      _Id("");
      _Title("");
      _Description("");
      _Status("");
    }
  }, [data, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader fontWeight={"bold"}>Form Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <Flex flexDir={"column"} gap={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  disabled={type !== "CREATE"}
                  placeholder="Title"
                  value={Title}
                  onChange={(e) => _Title(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  disabled={type !== "CREATE"}
                  placeholder="Description"
                  value={Description}
                  onChange={(e) => _Description(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <Select
                  disabled={type === 'REMOVE'}
                  placeholder="Status"
                  value={Status}
                  onChange={(e) => _Status(e.target.value)}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </Select>
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme={type === "REMOVE" ? "red" : "blue"}
              isLoading={status}
              type="submit"
            >
              {type === "REMOVE" ? "Delete" : "Submit"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal >
  );
};

export default TasksModal;
