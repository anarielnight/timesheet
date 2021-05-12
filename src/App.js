import React, { useState } from 'react';
import {
  ChakraProvider,
  Button,
  Link,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Switch,
  theme,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const originalTasks = [
  {
    id: 1,
    timeStart: '10:45',
    timeEnd: '13:55',
    date: '05.05.2021',
    task: '10467',
    isLogged: true
  },
  {
    id: 2,
    timeStart: '15:45',
    timeEnd: '17:05',
    date: '04.05.2021',
    task: '94902',
    isLogged: false
  },
  {
    id: 3,
    timeStart: '14:45',
    timeEnd: '17:50',
    date: '05.04.2021',
    task: '3552',
    isLogged: true
  },
  {
    id: 4,
    timeStart: '10:45',
    timeEnd: '13:15',
    date: '15.05.2021',
    task: '3461',
    isLogged: false
  }
];

function App() {
  const [tasks, setTasks] = useState(originalTasks);
  const [taskID, setTaskID] = useState('');
  return (
    <ChakraProvider theme={theme}>
      <Table variant="simple">
        <TableCaption>Timesheet</TableCaption>
        <Thead>
          <Tr>
            <Th>Time Start</Th>
            <Th>Time End</Th>
            <Th>Date</Th>
            <Th>Task</Th>
            <Th>Logged</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map((task)=>(
            <Tr key={task.id}>
              <Td>{task.timeStart}</Td>
              <Td>{task.timeEnd}</Td>
              <Td>{task.date}</Td>
              <Td><Link href={`https://redmine.globexit.ru/issues/`+task.task} isExternal>{task.task}</Link></Td>
              <Td><Switch size="lg" isChecked={task.isLogged} onChange={() => {
                setTasks(tasks.map((curTask) => {
                  if (curTask.id === task.id) {
                    return {
                      ...curTask,
                      isLogged: !curTask.isLogged
                    }
                  }
                  return curTask;
                }))
              }}/></Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th><ColorModeSwitcher/></Th>
            <Th>into</Th>
            <Th>into</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>

      <form onSubmit={(event)=>{
        event.preventDefault(); 
        setTasks(tasks.concat([  
          {
            id: tasks.length + 1,
            timeStart: '10:45',
            timeEnd: '13:15',
            date: '15.05.2021',
            task: taskID,
            isLogged: false
          }
        ]));
        setTaskID('');
      }}>
        <FormControl id="task">
          <FormLabel>Task ID</FormLabel>
          <Input type="text" value={taskID} onChange={(event) => {
              setTaskID(event.target.value);
            }}/>
          <FormHelperText></FormHelperText>
        </FormControl>
        <Button type='submit'>Send</Button>
      </form>
    </ChakraProvider>
  );
}

export default App;
