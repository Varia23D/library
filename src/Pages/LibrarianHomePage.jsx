// Import necessary modules
import React, { useState } from 'react';
import BurgerMenu from '../components/BurgerMenu';
import axios from 'axios';

const LibrarianHomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [searchBookId, setSearchBookId] = useState('');
  const [searchBookTitle, setSearchBookTitle] = useState('');
  const [searchStudentName, setSearchStudentName] = useState('');
  const [password, setPassword] = useState('');

  // Add books to the state
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'Harry Potter',
      rentDate: '2024-02-01',
      overdueDate: '2024-03-01',
      overdueStatus: true,
    },
    {
      id: 2,
      title: 'The Bible',
      rentDate: '2024-02-02',
      overdueDate: '2024-03-02',
      overdueStatus: true,
    },
    {
      id: 3,
      title: 'The Great Gatsberino',
      rentDate: '2024-03-03',
      overdueDate: '2024-03-15',
      overdueStatus: false,
    },
  ]);

  // handle login (local test strapi here works)
  const handleLogin = async () => {
    const loginUrl = 'http://localhost:1337/auth/local';
    try {
      if (username.trim() === '' || password.trim() === '') {
        alert('Please enter both username and password.');
        return;
      }

      const loginData = {
        identifier: username,
        password: password,
      };

      const response = await axios.post(loginUrl, loginData);

      if (response.data.jwt) {
        alert('Login successful!');
        setIsLoggedIn(true);
      } else {
        alert('Invalid login credentials!');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('Error during login. Please try again.');
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <BurgerMenu />
          <div>
            <div>Greetings, {username}!</div>
            {/* Display books */}
            <div>
              <h2>Books:</h2>
              <ul>
                {books.map((book) => (
                  <li key={book.id}>
                    {book.title} - Rent Date: {book.rentDate}, Overdue Date: {book.overdueDate} {' '}
                    {book.overdueStatus ? '- OVERDUE' : ' '}
                  </li>
                ))}
              </ul>
            </div>
            {/* Search input fields */}
            <div>
              <input
                type="text"
                placeholder="Search by Book ID"
                value={searchBookId}
                onChange={(e) => setSearchBookId(e.target.value)}
              />
              <input
                type="text"
                placeholder="Search by Book Title"
                value={searchBookTitle}
                onChange={(e) => setSearchBookTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Search by Student Name"
                value={searchStudentName}
                onChange={(e) => setSearchStudentName(e.target.value)}
              />
            </div>
          </div>
        </>
      ) : (
        <div>
          <h2>Login:</h2>
          <label>
            Username:
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default LibrarianHomePage;
