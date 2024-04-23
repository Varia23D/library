import { useState, useEffect } from 'react';
import axios from 'axios';
import { userData } from "../helpers/userStorage";

const useBookSearchResults = (searchTerm) => {                                              // Hook for fetching book search results
    const [bookCopies, setBookCopies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {                                                                       // Hook for fetching book copies
        const fetchBookCopies = async () => {
            setIsLoading(true);
            setIsError(false);

            const user = userData();
            const jwt = user.jwt;

            if (!jwt) {                                                                     // Check if JWT token is present
                console.error("JWT token not found. Please ensure the user is logged in.");
                setIsError(true);
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/book-copies?populate=book_type`, {   // Fetches api data from the book copy table instead of from book type like previously
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });

                const transformedData = response.data.data.map(copy => ({                               // Transforming the data by id to book title and availability
                    ...copy,
                    bookTitle: copy.attributes.book_type.data.attributes.title,                         // Mapping the book title
                    isAvailable: !copy.attributes.taken,                                                // Mapping the book availability
                }));

                setBookCopies(transformedData);                                                         // Setting the book copies
            } catch (error) {                                                                           // Error handling
                console.error('Error fetching book copies:', error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookCopies();
    }, []);

    return { bookCopies, isLoading, isError };                                                          // Return the book copies, loading state, error state
};

export default useBookSearchResults;
