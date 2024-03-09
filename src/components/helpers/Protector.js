import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { userData } from "./userStorage"

export const Protector = ({Component}) => {
  const navigate = useNavigate()
  const { jwt } = userData()
  useEffect(() => {
    if (!jwt) {
      navigate('/login')
    }
  }, [navigate, jwt])

  return <Component/>
}