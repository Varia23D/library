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
                let bookTypesResponse = await axios.get(`${process.env.REACT_APP_BACKEND}/api/book-types?filters[title][$containsi]=${searchTerm}&populate=*`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });

                const booksWithAvailability = await Promise.all(bookTypesResponse.data.data.map(async (bookType) => {
                    const bookCopiesResponse = await axios.get(`${process.env.REACT_APP_BACKEND}/api/book-copies?filters[book_type][id][$eq]=${bookType.id}&populate=*`, {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    });

                    const isAvailable = bookCopiesResponse.data.data.some(copy => !copy.attributes.taken);

                    return {
                        ...bookType,
                        isAvailable,
                    };
                }));

                setBooks(booksWithAvailability);
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
