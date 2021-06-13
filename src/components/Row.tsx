import DeleteForever from '@material-ui/icons/DeleteForever';
import {
  IconButton,
  Checkbox,
  ListItem
} from '@material-ui/core';

type Todo = {
  id: string
  task: string
  isComplete: boolean
}

type TodoProps = {
  todo: Todo,
  handleRemoveTodo: (id: string) => void,
  handleCheckTodos: (id: string) => void
}

export const Row = ({
  todo: { task, isComplete, id },
  handleRemoveTodo,
  handleCheckTodos
}: TodoProps) => (
  <ListItem style={{margin: '1rem auto', width: '70%', border: 'solid 1px rgba(0,0,0,0.1)', borderRadius: '4px'}}>
      <Checkbox
        value="Complete"
        checked={isComplete}
        onChange={() => handleCheckTodos(id)}
      />
      <div style={{width: '100%'}}>
          <p style={ { textDecoration: isComplete ? 'line-through' : 'none' } }>{task}</p>
      </div>
      <IconButton color="primary" aria-label="Delete todo" onClick={() => handleRemoveTodo(id)}>
        <DeleteForever style={{ color: '#ff0000' }} />
      </IconButton>
  </ListItem>
);
