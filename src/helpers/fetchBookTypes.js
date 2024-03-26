import { toast } from 'react-toastify';

export default function fetchBookTypes() {
  return fetch(`${process.env.REACT_APP_BACKEND}/api/book-types/?populate=*`)
    .then(response => response.json())
    .then(data => data.data)
    .catch(error => {
      console.error('Error fetching data:', error);
      toast.error("Error fetching books!" + error.message);   // error message as toast
      throw error
    });
};
