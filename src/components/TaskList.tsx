import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (newTaskTitle.length != 0) {

      // Gerando id eleatório
      let id_random = Math.floor(Math.random() * 1000) + 1;

      // Montando nossa tarefa com dados
      let task: Task = {
        id: id_random,
        title: newTaskTitle,
        isComplete: false
      };

      // Limpando o campo input
      setNewTaskTitle('');

      // Fazendo desistruturação (imutabilidade)
      setTasks([...tasks, task]);
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    // Loop retornando todos os item, mas o que precisa mudar modificado
    let newArrayTasks = tasks.map(item => {

      // Verifica se o item do loop é o que preciso mudar o isComplete
      if (item.id == id) {

        // Se tiver true fica como false ou o contrario
        item.isComplete = item.isComplete ? false : true;
      }

      // Retorna o item para criação do novo array
      return item;
    });

    // Seta o novo array para atualização
    setTasks(newArrayTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    // Não retorna o item que foi do id para remover
    let newArrayTasks = tasks.filter(item => item.id != id ? true : false);

    // Atualiza nosso state
    setTasks(newArrayTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}