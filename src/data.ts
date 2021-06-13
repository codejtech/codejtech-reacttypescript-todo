// Export function to get localStorage items todolist
export const getLocalItems = () => {
    let list = localStorage.getItem('todolist');
    if(list) {
      return JSON.parse(list);
    } else {
      return [];
    }

  }
