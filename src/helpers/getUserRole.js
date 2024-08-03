import axios from "axios"

export const getUserRole = async (token) => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/users/me?populate=role`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.role.name
}