import { useState } from 'react';
import PageTemplate from '../templates/page-template';
import InputField from '../components/input-field';

export default function AddGame() {
  const [name, setName] = useState('');
  const [minPlayers, setMinPlayers] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [minTime, setMinTime] = useState('');
  const [maxTime, setMaxTime] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted!');
  }

  return (
    <PageTemplate>
      <div className="container">
        <h1 className="mb-4">Add Game</h1>
        <form onSubmit={handleSubmit}>
          <InputField 
            id="addGameName"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            label="Name of Game"
          />
          <InputField
            id="addGameMinPlayers"
            value={minPlayers}
            onChange={(e) => setMinPlayers(e.target.value)}
            label="Minimum Number of Players"
            type="number"
          />
          <InputField
            id="addGameMaxPlayers"
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(e.target.value)}
            label="Maximum Number of Players"
            type="number"
          />
          <InputField
            id="addGameMinTime"
            value={minTime}
            onChange={(e) => setMinTime(e.target.value)}
            label="Minimum Time Required"
            type="number"
          />
          <InputField
            id="addGameMaxTime"
            value={maxTime}
            onChange={(e) => setMaxTime(e.target.value)}
            label="Expected Max Time"
            type="number"
          />
          <button className="btn btn-primary">
            Add Game
          </button>
        </form>
      </div>
    </PageTemplate>
  )
}