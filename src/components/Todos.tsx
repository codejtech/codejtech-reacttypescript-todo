import { Row } from './Row';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getLocalItems } from '../data';
import { CreateTodo } from './CreateTodo';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Paper, List } from '@material-ui/core';
import SearchBar from "material-ui-search-bar";

type Todo = {
  id: string,
  task: string,
  isComplete: boolean
}

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      paddingBottom: 50,
      width:'95%',
      margin: '0 auto'
    },
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    iconSize: {
      fontSize: '7rem'
    },
    section: {
      paddingBottom:'5rem'
    }
  }),
);

export const Todos = () => {
  const classes = useStyles();

  const [todos, setTodos] = useState<Todo[]>(getLocalItems());
  const [searchTodos, setSearchTodos] = useState<Todo[]>(getLocalItems());
  const [task, setTask] = useState('');
  const [searched, setSearched] = useState<string>('');

  // These constants will be used to check the length of todos
  // that will later on display logical  messages based on length
  const todosLength = todos.length;
  const hasTodos = todos.length > 0;
  const remainingTodos = todos.filter((todo) => !todo.isComplete).length;

  //Since data is local, we will be using useEffect to store
  //localStorage data
  useEffect(() => {
    // Set localStorage data to array of updated todo list items
    window.localStorage.setItem('todolist', `${JSON.stringify(todos)}`);
  }, [todos]);

  // Function to handle creating a todo list item
  const handleCreateTodo = (todo: Todo) => {
    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
    setSearchTodos(updatedTodos);
    setTask('');
  }

  // Function to handle Changes to todo list items
  // i.e Marking as complete or deleting
  const handleChangeTodo = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement
    setTask(value)
  }

  // Function to handle submission of todo
  // list items from handleCreateTodo function
  const handleSubmitTodo = (e: FormEvent) => {
    e.preventDefault()
    const todo = {
      id: uuidv4(),
      task: task,
      isComplete: false
    }
    task && handleCreateTodo(todo)
  }

  // Function to handle removal of todo list items
  const handleRemoveTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    const updatedSearchTodos = searchTodos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    setSearchTodos(updatedSearchTodos)
  }

  // Function to handle if todo list items
  // are marked as complete
  const handleCheckTodos = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if(todo.id === id) {
        return {
          //Used spread operator to copy properties
          //of todo
          ...todo,
          isComplete: !todo.isComplete
        }
      }
      return todo
    });

    const updatedSearchedTodos = searchTodos.map((todo) => {
      if(todo.id === id) {
        return {
          //Used spread operator to copy properties
          //of todo
          ...todo,
          isComplete: !todo.isComplete
        }
      }
      return todo
    });

    setTodos(updatedTodos);
    setSearchTodos(updatedSearchedTodos);
  }

  // Store original search filter list
  const original = searchTodos.filter((todo) => {
    return todo.task.toLowerCase();
  });

  // Handle search request of todo list items
  const requestSearch = (searchValue: string) => {
    const filteredTodos = searchTodos.filter((todo) => {
      return todo.task.toLowerCase().includes(searchValue.toLowerCase());
    });
    setTodos(filteredTodos);
  };

  // Handle cancel search request of todo list items
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
    setTodos(original);
  };

  return(
    <section className={classes.section}>
    <h2>
    {hasTodos !== false ? '👋! Welcome to Your Task List!' : 'What are you waiting for? Click the + symbol to add task to your list.'}
    </h2>
    <p>
    {hasTodos !== false ?
      `[${remainingTodos} of ${todosLength}] todos remaining`
    : 'Your Task List is Empty!'}
    </p>
    {remainingTodos === 0 && hasTodos && (<h2>Todo List done...Like a Boss 😎!</h2>)}
    <Paper elevation={1} className={classes.paper}>
    {!hasTodos && (<h2><span className={classes.iconSize}>🥱 😴</span> <br/>Wake Up! It's time to get some work done</h2>)}
      <List>
      {
        todos.map((todo) =>(
          <Row
            key={todo.id}
            todo={todo}
            handleRemoveTodo={handleRemoveTodo}
            handleCheckTodos={handleCheckTodos}
          />
        ))
      }
      </List>
    </Paper>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <CreateTodo
            task={task}
            handleChangeTodo={handleChangeTodo}
            handleSubmitTodo={handleSubmitTodo}
          />
          <div className={classes.grow} />
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
        </Toolbar>
      </AppBar>
    </section>
  )
}
