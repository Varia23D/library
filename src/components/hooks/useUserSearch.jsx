import { useQuery } from 'react-query';
import axios from 'axios';

const useUserSearch = (searchTerm) => {
    const fetchUsers = async () => {
        if (!searchTerm.trim()) return [];
        const { data } = await axios.get(`https://strapi.tw1.ru/admin/api/users?username=${searchTerm}`);
        return data.data;
    };

    const { data, isLoading, isError, refetch } = useQuery(['users', searchTerm], fetchUsers, { enabled: false });

    return { users: data, isLoading, isError, search: refetch };
};

export default useUserSearch;
// const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/user/id?filters[title]=${searchTerm}`);
// const { data } = await axios.get(`http://81.200.149.55:1337/api/users?username=${searchTerm}`);
// const { data } = await axios.get(`http://strapi.tw1.ru:1337/api/users?username=${searchTerm}`);
// я не ебу, короче нужен ключ.