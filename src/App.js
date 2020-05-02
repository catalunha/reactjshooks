import React, { useState } from 'react';

function App() {
  const [tarefas, setTarefas] = useState([
    'Pagar a conta de luz',
    'Estudar React Hooks'
  ]);
  const [input, setInput] = useState('')

  function handleAdd() {
    setTarefas([...tarefas, input])
    setInput('')
  }
  return (
    <div>
      <ul>
        {tarefas.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
      <button type='button' onClick={handleAdd}>Adicionar</button>
    </div>
  );
}

export default App;
