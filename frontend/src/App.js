import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to store the message we get from the backend
  const [message, setMessage] = useState('Connecting to backend...');

  // useEffect hook to fetch data from the backend when the component mounts
  useEffect(() => {
    // The 'proxy' setting in package.json forwards this to http://localhost:5000/api
    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Update the state with the message from the backend
        setMessage(data.message);
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error);
        setMessage('Could not connect to backend. Is the backend server running?');
      });
  }, []); // The empty array [] means this effect runs only once

  return (
    <div className="App">
      <header className="App-header">
        <h1>ISKCON Temple Web App</h1>
        <p style={{ marginTop: '40px', border: '1px solid white', padding: '10px' }}>
          <strong>Status:</strong> {message}
        </p>
      </header>
    </div>
  );
}

export default App;

