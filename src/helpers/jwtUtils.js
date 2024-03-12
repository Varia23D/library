import { userData } from "./userStorage";
// function returns jwt token from server


export const getJWT = () => {
  const { jwt } = userData()
  if (!jwt) {
    throw new Error('JWT token not found in local storage')
  }
  return jwt;
}