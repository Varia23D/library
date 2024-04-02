import { toast } from 'react-toastify';   // Import toast

export default function fetchBookTypes() {
  return fetch(`${process.env.REACT_APP_BACKEND}/api/book-types/?populate=*`)
    .then(response => response.json())
    .then(data => data.data)
    .catch(error => {
      console.error('Error fetching data:', error);
      toast.error('Data fetch error. Please try again!');   // Toast error message
      throw error
    });
};
