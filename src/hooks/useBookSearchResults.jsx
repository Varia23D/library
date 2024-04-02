import { useState, useEffect } from 'react';
import axios from 'axios';
import { userData } from "../helpers/userStorage";

const useBookSearchResults = (searchTerm) => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true);
            setIsError(false);

            const user = userData();
            const jwt = user.jwt;

            if (!jwt) {
                console.error("JWT token not found. Please ensure the user is logged in.");
                setIsError(true);
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/book-types?filters[title][$containsi]=${searchTerm}&populate=*`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });

                setBooks(response.data.data);
            } catch (error) {
                console.error('Error fetching books:', error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        if (searchTerm.trim()) {
            fetchBooks();
        }
    }, [searchTerm]);

    return { books, isLoading, isError };
};

export default useBookSearchResults;
