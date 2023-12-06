import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

const TasksTable = ({ data = [], isLoading = false, action: { edit, remove } }) => {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.length > 0 &&
            data.map((v, idx) => (
              <Tr key={idx}>
                <Td>{v.Title}</Td>
                <Td>{v.Description}</Td>
                <Td>{v.Status}</Td>
                <Td>
                  <IconButton
                    colorScheme={"teal"}
                    icon={<EditIcon />}
                    mr={2}
                    onClick={() => edit(v)}
                  />
                  <IconButton
                    colorScheme={"red"}
                    icon={<DeleteIcon />}
                    onClick={() => remove(v)}
                  />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TasksTable;
