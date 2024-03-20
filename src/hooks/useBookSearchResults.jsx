import { useState, useEffect } from 'react';
import axios from 'axios';
import { userData } from "../helpers/userStorage";

const useBookSearchResults = (searchTerm) => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { jwt } = userData();

    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true);
            setIsError(false);

            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/book-types?filters[title][$containsi]=${searchTerm}&populate=*`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            setBooks(response.data.data);
            setIsLoading(false);
        };

        if (searchTerm.trim()) {
            fetchBooks();
        }
    }, [searchTerm, jwt]);

    return { books, isLoading, isError };
};

export default useBookSearchResults;
