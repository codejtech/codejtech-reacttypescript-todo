import { ChangeEvent, FormEvent } from 'react';
import { Paper } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { AddCircle } from '@material-ui/icons';

export type CreateTodoProps = {
  task: string,
  handleSubmitTodo: (e: FormEvent) => void,
  handleChangeTodo: (e: ChangeEvent) => void
}

export const CreateTodo = ({
  task,
  handleSubmitTodo,
  handleChangeTodo
}: CreateTodoProps) => (
  <form onSubmit={(handleSubmitTodo)}>
    <Paper style={{padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 225}}>
      <InputBase
      style={{flex: 1, marginLeft: '8px'}}
        placeholder="Add todo item..."
        inputProps={{ 'aria-label': 'add todo item' }}
        type="text"
        name="task"
        value={task}
        onChange={(handleChangeTodo)}
      />
      <Divider orientation="vertical" style={{height: 28, margin: 4}} />
      <IconButton style={{padding: 10}} color="primary" type="submit">
        <AddCircle />
      </IconButton>
    </Paper>
  </form>
)
