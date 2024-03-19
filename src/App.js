import React from 'react';
import UserSearch from './components/UserSearch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>User Search</h1>
      </header>
      <main>
        <UserSearch />
      </main>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}

export default App;
