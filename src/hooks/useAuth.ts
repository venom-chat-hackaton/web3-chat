import { useContext } from 'react'
import { AuthContext } from 'src/services/providers/Auth'

export const useAuth = () => useContext(AuthContext)
