import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response =>{
      setRepositories(response.data);
      console.log(response.data);
    });
  }, []);

  async function handleAddRepository() {
    api.post('/repositories', {
      title: `Novo Projeto ${Date.now}`,
      url:"https://github.com/thalessn/desafio-conceitos-nodejs",
      techs: ["NodeJs", "..."]
    }).then(response => {
      const repository = response.data;
      setRepositories([...repositories, repository]);
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(response =>{
      const newReposiories = repositories.filter(repository => repository.id !== id);

      setRepositories(newReposiories);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">

      {repositories.map(repository => 
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
      )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
