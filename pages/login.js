import { useState } from 'react';
import Router from 'next/router';
import "../styles/login.css";
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [team, setTeam] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform login request to your server
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, team }), // Include team in the request
      });
      
      if (response.ok) {
        // Redirect to the appropriate page based on the selected team
        switch (team) {
          case 'Mosquitoes':
            Router.push('/mosquitoes');
            break;
          case 'Hyenas':
            Router.push('/hyenas');
            break;
          case 'Pacey':
            Router.push('/pacey');
            break;
          case 'Chickens':
            Router.push('/chickens');
            break;
          case 'Grasskickers':
            Router.push('/grasskickers');
            break;
          case 'Emus':
            Router.push('/emus');
            break;
          case 'Mockingbirds':
            Router.push('/mockingbirds');
            break;
          default:
            Router.push('/dashboard'); // Default page for unknown teams
            break;
        }
      } else {
        // Handle authentication failure (e.g., show error message)
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select value={team} onChange={(e) => setTeam(e.target.value)}>
        <option value="">Select Team</option>
        <option value="Mosquitoes">Mosquitoes</option>
        <option value="Hyenas">Hyenas</option>
        <option value="Pacey">Pacey</option>
        <option value="Chickens">Chickens</option>
        <option value="Grasskickers">Grasskickers</option>
        <option value="Emus">Emus</option>
        <option value="Mockingbirds">Mockingbirds</option>
      </select>
      <button type="submit">Login</button>
    </form>
  );
}
