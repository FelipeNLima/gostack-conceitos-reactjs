import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositorio ${Date.now()}`,
      url: "https://github.com/FelipeNLima",
      techs: ["Node.JS", "React.JS", "React Native"]
    });

    const repo = response.data;
    setRepository([...repository, repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const newRepo = repository.filter(repository => repository.id !== id);

    setRepository(newRepo);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map(repo => (
          <li key={repo.id}>
            {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
