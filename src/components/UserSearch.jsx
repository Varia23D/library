import React, { useState } from 'react';
import useUserSearch from './hooks/useUserSearch';
import './UserSearch.css'; 

const UserSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { users, isLoading, isError, search } = useUserSearch(searchTerm);

    const handleSearch = () => {
        search();
    };

    return (
        <div className="user-search">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for users..."
                className="search-input"
            />
            <button onClick={handleSearch} className="search-button">Search</button>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error fetching data</div>}
            <ul className="results-list">
                {users?.map((user) => (
                    <li key={user.id}>
                        <h3>{user.attributes.username}</h3>
                        <p>{user.attributes.email}</p> 
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserSearch;